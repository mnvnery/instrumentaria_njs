import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ questionsAnswers }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderedQuestionsAnswers = questionsAnswers.map((item, index) => {
        const showDescription = index === activeIndex ? "block" : "hidden";
        const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
        const ariaExpanded = index === activeIndex ? "true" : "false";
        const plus = index === activeIndex ? "block" : "hidden";
        const minus = index === activeIndex ? "hidden" : "block";
        return (
        <AccordionItem key={index}
            showDescription={showDescription}
            fontWeightBold={fontWeightBold}
            ariaExpanded={ariaExpanded}
            item={item}
            index={index}
            plus={plus}
            minus={minus}
            onClick={() => {
            setActiveIndex(index);
            }}
        />
        );
    });

    return (
        <div className="faq__list">{renderedQuestionsAnswers}</div>
    );
};

export default Accordion;