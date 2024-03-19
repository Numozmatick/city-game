interface GameHeader {
    myTurn: boolean;
    seconds: number;
    progress: number;
}

const GameHeader: React.FC<GameHeader> = ({seconds, progress, myTurn}) => {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    return (
        <>
            <div className="flex justify-between align-center">
                <div className="leading-[2.3]">{myTurn ? `Сейчас ваша очередь`:`Сейчас очередь соперника`}</div>
                <div className="prose-xl font-medium">{minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}</div>
            </div>
            <div className='flex mx-[-25px] bg-gray-100 mt-4'>
                <div style={{ width: `${progress}%`, height: '5px', backgroundColor: '#C4B5FD'}}></div>
            </div>
        </>
    );
}

export default GameHeader;
