import React from 'react';
import { Link, useLocation } from "react-router-dom";

function ResultPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const status = queryParams.get('status');
    const lastCity = queryParams.get('lastCity');
    const score = queryParams.get('score');

    const message = status === 'winner' ? <span>Поздравляем тебя с победой! <br/>Твой противник не вспомнил нужный город!</span> : <span>К сожалению твое время вышло!<br/> Твой противник победил!</span>;

    const resultColorClass = status === 'winner' ? 'text-green-500' : 'text-red-500';

    return (
        <div className="container mx-auto px-4 py-4 text-center">
            <h1 className="text-xl mb-7 ">{message}</h1>
            <p className={`text-3xl mb-7 font-medium ${resultColorClass}`}>00:00</p>
            <div className="text-lg">Всего было перечислено городов: {score}</div>
            <div className="text-lg mb-7">Очень не плохой результат!</div>
            <div className="text-lg">Последний город названный победителем: </div>
            <div className="text-2xl mb-7">{lastCity}</div>
            <Link to="/game" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-4 rounded">
                Начать новую игру
            </Link>
        </div>
    );
}

export default ResultPage;