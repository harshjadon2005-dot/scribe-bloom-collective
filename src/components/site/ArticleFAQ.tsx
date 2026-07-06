import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Container } from "./Container";

interface FAQ {
  question: string;
  answer: string;
}

interface ArticleFAQProps {
  faqs?: FAQ[];
}

export function ArticleFAQ({ faqs }: ArticleFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <Container size="narrow" className="py-16">
      <div className="w-full h-px bg-border mb-16" aria-hidden />
      
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground tracking-tight">
          Common Questions
        </h2>
        <p className="mt-3 text-ink-soft text-lg font-display italic">
          Quick answers to the most common questions related to this article.
        </p>
      </div>

      <div className="divide-y divide-border rule-t rule-b" itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div 
              key={idx} 
              className={`group transition-colors duration-300 ${isOpen ? "bg-secondary/20" : "hover:bg-secondary/40"}`}
              itemScope 
              itemProp="mainEntity" 
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full text-left py-6 px-4 sm:px-6 flex items-center justify-between focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-expanded={isOpen}
              >
                <span className="font-display text-xl leading-snug pr-8" itemProp="name">
                  {faq.question}
                </span>
                <span className="shrink-0 text-ink-soft group-hover:text-accent transition-colors duration-300">
                  {isOpen ? <Minus className="h-5 w-5 animate-in spin-in-90 duration-300" /> : <Plus className="h-5 w-5 animate-in spin-in-90 duration-300" />}
                </span>
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0 pb-0"}`}
              >
                <div className="overflow-hidden min-h-0 px-4 sm:px-6">
                  <div 
                    className="text-ink-soft leading-relaxed text-lg"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <span itemProp="text">{faq.answer}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
