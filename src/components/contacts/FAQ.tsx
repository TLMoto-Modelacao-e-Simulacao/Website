import { useState } from "react";
import { faqs } from "@/src/components/textContent/FAQText";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto w-[80vw] md:w-[50vw] mt-[4vh] text-white p-2.5 pb-[10vw] mb-[10vh] md:mb-[5vh] lg:mb-[0vh]">
      <h2 className="text-center text-[4.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] 2xl:text-[1.5vw] underline mb-[2vh]">
        Frequently Asked Questions
      </h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b border-white/30 py-[1.5vh]">
          <button
            onClick={() => toggleFAQ(index)}
            className={`w-full flex justify-between items-center text-left font-bold text-[4vw] sm:text-[2.7vw] md:text-[2vw] lg:text-[1.5vw] 2xl:text-[1.2vw] 
                             transition-colors ${openIndex === index ? "texclt-[#39a6ff]" : "text-white hover:text-[#39a6ff]"}`}
          >
            {faq.question}
            <span className="text-[clamp(2vh,2vw,3vh)]">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && (
            <p className="mt-[0.5vh] text-[3.7vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.3vw] 2xl:text-[1vw] font-bold text-white/80 pl-[1vw]">
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
