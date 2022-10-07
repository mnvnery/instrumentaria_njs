import React from "react";
import SlideDown from "react-slidedown";
import 'react-slidedown/lib/slidedown.css'

const AccordionItem = ({
    showDescription,
    ariaExpanded,
    fontWeightBold,
    item,
    index,
    onClick,
}) => (
    <div className="faq__question" key={item.question}>
        <dt>
        <button
            aria-expanded={ariaExpanded}
            aria-controls={`faq${index + 1}_desc`}
            data-qa="faq__question-button"
            className={`mb-2 uppercase text-xs 2xl:text-sm sinopse-btn flex w-full justify-between font-ag-narrow tracking-wider hover:text-yellow-100 3xl:text-xl" ${fontWeightBold}`}
            onClick={onClick}
        >
            <span>{item.question}</span>
            <span>–</span>
        </button>
        </dt>
        <dd>
        <SlideDown>
        <div
            id={`faq${index + 1}_desc`}
            data-qa="faq__desc"
            className={`mb-5 ${index === 0 ? 'mt-2 font-ag-narrow tracking-wide leading-5 text-base 3xl:text-xl' : 'text-xxs 2xl:text-sm mt-2 ficha-tecnica font-ag-narrow tracking-wide 3xl:text-xl' } ${showDescription}`}
            dangerouslySetInnerHTML={{__html: item.answer}}
        >
        </div>
        </SlideDown>
        </dd>
    </div>
);

export default AccordionItem;