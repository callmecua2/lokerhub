import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { GoogleGenAI } from "@google/genai";
import { prompt } from "./prompt";
import { marked } from "marked";
import Markdown from "react-markdown";
import { DotLoader } from "react-spinners";
import Typed from "typed.js";

function App() {
  let [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [userInput, setUserInput] = useState("");
  const apikey = "AIzaSyA12RAUOSKvlIHN6rJslTyoNo2GRxyWdyY";
  const ai = new GoogleGenAI({ apiKey: `${apikey}` });
  const prompting = prompt;

  // Tracking for form onChange event

  function handleChange(e) {
    e.preventDefault();
    const textContent =  e.target.value;
    setUserInput(textContent)
    console.log(userInput);
  }

  // Asking Gemini and getting response

  async function handleAdd() {
    setLoading(true);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${prompting + userInput}`,
    });

    try {
      if (response) {
        setLoading(false);
        const textResponse = response.text;
        setResult([...result, textResponse]);
        console.log(result);
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }

  return (
    <>
      <div className="main-content w-full min-h-screen flex items-center flex-col sm:text-2xl md:text-3xl lg:text-xl">
        <h1 className="mt-10 text-3xl font-bold">Welcome To Looker Hub</h1>
        <div className="content w-full min-h-screen flex flex-col lg:flex-row gap-5 mt-10">
          <div className="before-changes w-full min-h-screen pl-5 pr-5 ">
            <h1 className="text-center mb-10 font-bold">Sebelum Update</h1>
            <form name="input-form">
              <textarea
                onChange={handleChange}
                className="w-full min-h-[80vh] border-2 border-black outline-none pl-3 pr-3"
                placeholder="Salin CV kamu disini"
                name="question"
              ></textarea>
              <button
                type="button"
                onClick={handleAdd}
                className="w-[200px] h-[50px] bg-black text-amber-50 rounded-xl mt-5"
              >
                Tingkatkan
              </button>
            </form>
          </div>
          <div className="after-changes w-full min-h-screen pr-5 pl-5">
            <h1 className="text-center mb-10 font-bold">Setelah Perubahan</h1>
            <div className="w-full h-[80vh] border-2 overflow-y-auto border-black outline-none pl-3 pr-3">
              {result.map((item, index) => {
                return <Markdown key={index}>{item}</Markdown>;
              })}

              <DotLoader loading={loading} color="cyan" size={50} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
{
  /* <div className="input-form bg-amber-500">
      <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
    </div> */
}
{
  /* <div>
          <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Paste CV disini</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 w-3/4 min-h-[70vh]">
            <Textarea className={`w-full h-full outline-none border-black `}/>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
        </div> */
}
{
  /* <div className=" w-full h-[100vh] flex flex-col items-start mt-10 ">
          <div className="w-2/3 min-h-[80vh] mt-10 ">
            <form name="cv-form" className="w-3/4 h-full">
              <textarea
                onChange={handleChange}
                className="w-full h-full border-2 border-black outline-none pl-3 pr-3"
                placeholder="Salin CV kamu disini"
                name="cv-content"
              ></textarea>

              <button
                type="button"
                onClick={handleAdd}
                className="w-[200px] h-[50px] bg-black text-amber-50 rounded-xl mt-5"
              >
                Tingkatkan
              </button>
            </form>
          </div>
        </div>

        <div className="result w-full min-h-screen bg-fuchsia-500 gap-5">
          <div className="inner-result w-full min-h-screen bg-cyan-500 pl-5 pr-5 break-words whitespace-pre-wrap">
            {result.map((item, index) => {
              return <Markdown key={index}>{item}</Markdown>;
            })}
          </div>
        </div> */
}
