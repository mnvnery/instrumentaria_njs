import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = ({ questionsAnswers }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const renderedQuestionsAnswers = questionsAnswers.map((item, index) => {
        const showDescription = index === activeIndex ? "show" : "hidden";
        const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
        const ariaExpanded = index === activeIndex ? "true" : "false";
        return (
        <AccordionItem
            showDescription={showDescription}
            fontWeightBold={fontWeightBold}
            ariaExpanded={ariaExpanded}
            item={item}
            index={index}
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