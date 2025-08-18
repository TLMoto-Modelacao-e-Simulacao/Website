import { useState } from "react";
import { faqs } from "@/src/components/textContent/FAQText";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto mt-[-2.5%] text-white p-2.5 pb-[10%] font-sans max-sm:mb-30 max-md:mb-20 max-lg:mb-10">
      <h2 className="text-center text-2xl md:text-3xl mb-2.5">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border-b  border-opacity-30 border-white py-2.5">
          <button
            onClick={() => toggleFAQ(index)}
            className={`w-full text-left flex  font-bold justify-between items-center  p-2.5 text-lg md:text-xl text-white hover:text-[#39a6ff] transition-colors ${openIndex === index ? 'text-[#39a6ff]' : ''}`}
          >
            {faq.question}
            <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
          </button>
          {openIndex === index && <p className="mt-2.5 text-base text-white/80 pl-2.5">{faq.answer}</p>}
        </div>
      ))}
    </div>
  );
}
