import React, {useRef, useEffect} from 'react';

interface AnswersFieldProps {
    answers: string[] | [];
}

const AnswersField: React.FC<AnswersFieldProps> = ({ answers }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [answers]);
    return (
        <div ref={containerRef} className={`flex flex-col overflow-scroll space-y-4 p-4 overflow-y-auto max-h-[320px] min-h-[320px] ${!answers.length ? 'flex justify-center': ''}`}>
            {!answers.length ? <div className="mb-3 prose-sm text-gray-400 text-center"><span>Первый участник вспоминает города...</span></div> : ''}
            {answers.map((answer, index) => (
                <div key={index} className={` p-4 ${index % 2 === 0 ? 'ml-auto bg-green-200 rounded-tr-[12px] rounded-l-[12px]' : 'mr-auto bg-gray-200 rounded-tl-[12px] rounded-r-[12px]'}`}>
                    <p className="text-sm">{answer}</p>
                </div>
            ))}
        </div>
    );
};

export default AnswersField;