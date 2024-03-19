import React from 'react';
import './startPage.css';
import {Link} from "react-router-dom";


function StartPage() {
    return (
        <div className="container">
            <div className="flex prose prose-sm flex-col">
                <header className='flex justify-center'>
                    <div className="text-xl mb-[25px]">
                        Игра в города на время
                    </div>
                </header>
                <hr className="mx-[-25px] my-0 border-2"/>
                <div className="mb-3 mt-5 prose-sm">
                    Цель: Назвать как можно больше реальных городов.
                </div>
                <ul className="ml-2 mb-4 mt-3 prose-sm">
                    <li>
                        <span>
                            Запрещается повторение городов.
                        </span>
                    </li>
                    <li>
                        <span>
                        Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.
                        </span>
                    </li>
                    <li>
                        <span>
                        Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим
                        </span>
                    </li>
                </ul>
                <Link to="/game" className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded self-center no-underline">
                    Начать игру
                </Link>
            </div>
        </div>
    );
}

export default StartPage;