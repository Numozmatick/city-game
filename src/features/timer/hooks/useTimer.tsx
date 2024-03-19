import { useEffect, useState } from "react";

interface TimerHookProps {
    initialSeconds: number;
    endingHandler: () => void;
}

const useTimer = ({ initialSeconds, endingHandler }: TimerHookProps) => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const [progress, setProgress] = useState<number>(100);
    const [initialTime, setInitialTime] = useState<number>(initialSeconds);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => {
                if (prevSeconds <= 0) {
                    clearInterval(intervalId);
                    setTimeout(endingHandler, 0);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [endingHandler]);
    function handler(){
        endingHandler();
    }

    useEffect(() => {
        const progressPercentage = (seconds / initialTime) * 100;
        setProgress(progressPercentage);
    }, [seconds, initialTime]);

    const resetTimer = () => {
        setSeconds(initialTime);
    };

    return { seconds, progress, resetTimer };
}

export default useTimer;