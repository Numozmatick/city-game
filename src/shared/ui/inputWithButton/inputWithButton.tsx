import React from 'react';


interface AnswerInputProps {
    inputValue: string;
    disabled: boolean;
    placeholder: string;
    onSubmit:(value:string)=>void;
    setInputValue: (value: string) => void;
    children?: string | React.ReactElement;
}

const InputWithButton: React.FC<AnswerInputProps> = ({inputValue, setInputValue, disabled, placeholder , onSubmit, children}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(inputValue)
    };

    return (
        <div className="flex">
            <div className="flex flex-grow rounded-[6px] py-2 px-2 focus:outline-none bg-[#F3F4F6] max-h-[48px]">
                <input
                    type="text"
                    className={`flex-grow py-2 pr-4 pl-2 bg-[#F3F4F6]  focus:outline-none ${disabled ? 'text-gray-500' : 'placeholder-black'}`}
                    placeholder={placeholder || ''}
                    value={inputValue}
                    onChange={handleChange}
                    disabled={disabled}
                />
                <button
                    className={`text-white font-bold py-2 px-2 nax-w-[32px] max-h-[32px] rounded-[6px] flex items-center ${disabled ? 'bg-[#A1A1AA] cursor-not-allowed' : 'bg-[#8B5CF6] hover:bg-purple-800'}`}
                    onClick={handleSubmit}
                    disabled={disabled}
                >
                    {children}
                </button>
            </div>


        </div>
    );
};

export default InputWithButton