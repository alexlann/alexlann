import { useEffect, useState } from "react"
import t from "../../../data/translation"
import B from "./B";
import Balloon from "../Tags/Balloon";

export default function ContactLine({ title, copiedText, setCopiedText } : { title: string, copiedText: string, setCopiedText: (text: string)=>void }) {
  //@ts-ignore
  const boldText: string = t[`contact-card-${title}`];
  //@ts-ignore
  const text: string = t[`contact-card-${title}-link`];
  const [isCopied, setIsCopied] = useState(copiedText === text);

  const copyInformation = () => {
    setIsCopied(true);
    setCopiedText(text);
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    setIsCopied(copiedText === text);
  }, [copiedText, text])
  
  

  return (
    <p className="leading-loose relative w-fit">
      <button
        className={`text-left group transition ease-in delay-150 transition-all`}
        onClick={copyInformation}
      >
        <Balloon>
          { isCopied ? t["btn-copied"] : t["btn-copy"] }
        </Balloon>
          <B>{ boldText }:</B> <span className="group-hover:underline">{ text }</span>
      </button>
    </p>
  )
}
