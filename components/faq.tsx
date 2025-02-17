import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does this work?",
    answer:
      "By leveraging the power of LLMs, we can provide personalized travel recommendations based on your preferences and location. Our AI-powered chatbot will guide you through the booking process, ensuring a hassle-free and enjoyable experience.",
  },
  {
    question: "Is this a paid service?",
    answer:
      "No. Our partnership with Expedia allows us to offer a seamless and hassle-free booking experience. We're committed to providing you with the best possible service, and we're dedicated to making it accessible to everyone.",
  },
  {
    question: "What if I need to cancel my booking?",
    answer:
      "Since you can book directly through Expedia, you'll have the option to cancel your booking at any time. Simply log in to your Expedia account and cancel the booking.",
  },
  {
    question: "What happens if I don't like the recommendations?",
    answer:
      "By continuing to chat with our AI-powered chatbot, you'll be able to refine your preferences and receive even more personalized recommendations. Our goal is to provide you with the best possible experience, so don't hesitate to ask any questions or provide feedback.",
  },
  {
    question: "How do I book excursions or make reservations?",
    answer:
      "Our team is working diligently to push these features. In the meantime, you can book hotels and flights directly through our platform.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="w-full text-primary">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 py-6 mx-auto">
          <h2 className="text-[14px] text-primary font-mono font-medium tracking-tight">
            FAQ
          </h2>
          <h4 className="text-[42px] font-medium mb-2 text-balance max-w-3xl mx-auto tracking-tighter">
            Frequently Asked Questions
          </h4>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
