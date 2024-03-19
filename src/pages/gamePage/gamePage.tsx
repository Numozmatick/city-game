import React, {useEffect, useState} from 'react';
import GameHeader from "../../features/citiesGame/answersField/gameHeader";
import InputWithButton from "../../shared/ui/inputWithButton/inputWithButton";
import AnswersField from "../../features/citiesGame/answersField/answersField";
import citiesData from '../../shared/settings/cities.json';
import useTimer from "../../features/timer/hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { ReactComponent as AirplaneIcon } from '../../shared/assets/AirplaneIcon.svg';


function GamePage() {
    const [myTurn, setMyTurn] = useState<boolean>(true);
    const [citiesPool, setCitiesPool] = useState<string[] >([]);
    const [placeholder, setPlaceholder] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    function checkWinner(citiesPool:string[]){
        const lastCity = citiesPool.length > 0 ? citiesPool[citiesPool.length - 1] : '';
        const status = myTurn ? 'loser' : 'winner';

        const queryParams = new URLSearchParams({
            status: status,
            lastCity: lastCity,
            score: citiesPool.length.toString()
        });

        navigate(`/result?${queryParams}`);
    }

    const { seconds, progress, resetTimer} = useTimer({initialSeconds:120, endingHandler: () => checkWinner(citiesPool)});

    function changeTurn(){
        if (citiesPool.length % 2 === 0) {
            if(citiesPool.length < 1){
                setPlaceholder('Напишите любой город, например: Где вы живете?');
            }
            else {
                setPlaceholder(`Знаете город на букву "${getLastCityEndSymbol(citiesPool).toUpperCase()}"?`);
            }
            setMyTurn(true);
        } else {
            setPlaceholder('Ожидаем ответа соперника...')
            setMyTurn(false);
        }
    }

    useEffect(() => {
        if(!myTurn){
            AIFunction()
        }
    }, [myTurn]);

    useEffect(() => {
        changeTurn()
    }, [citiesPool]);

    function sendAnswer(city: string){
        setError('');
        if(validation(city)){
            setCitiesPool(prevCities => [...prevCities, city]);
            setInputValue('');
            resetTimer();
        }
    }

    function getLastCityEndSymbol(cities: string[]) {
        const lastCity = cities[cities.length - 1].toLowerCase();
        const lastChar = lastCity.slice(-1);
        if (lastChar === 'ь' || lastChar === 'ы') {
            return lastCity.slice(-2,-1);
        } else {
            return lastChar;
        }
    }

    function AIFunction(){
        const lastCityEndSymbol = getLastCityEndSymbol(citiesPool);
        const foundCity = citiesData.find(city =>
            city.toLowerCase().startsWith(lastCityEndSymbol) && !citiesPool.includes(city)
        );
        if (foundCity) {
            const randomTimeout = Math.floor(Math.random() * (121 - 10 + 1)) + 10;
            setTimeout(() => {
                sendAnswer(foundCity);
            }, randomTimeout * 1000);
            // setTimeout(() => {
            //     sendAnswer(foundCity);
            // }, 1000);

        } else {
            checkWinner(citiesPool);
        }
    }

    function isLastCityMatchingInitial(value:string){
        return citiesPool.length > 0 && getLastCityEndSymbol(citiesPool).endsWith(value[0].toLowerCase())
    }

    function validation(value: string){
        if(!citiesData.includes(value)){
            setError('Программа не знает такого города');
            return false
        }

        if(citiesPool.includes(value)){
            setError('Данный город уже использовался');
            return false
        }

        if(!citiesPool.length){
            return true
        }

        if (isLastCityMatchingInitial(value)) {
            return true;
        }
        setError('Данный город не подходит');
        return false
    }

    return (
        <div className={'container game-page'}>
             <GameHeader myTurn={myTurn} seconds={seconds} progress={progress}/>
             <AnswersField answers={citiesPool}/>
                {citiesPool.length ? <div className="text-center mb-3 prose-sm text-gray-400">Всего перечислено городов: {citiesPool.length}</div> : ''}
                {error ? <div className="text-center mb-3 prose-sm text-red-500">{error}</div> : ''}
             <InputWithButton inputValue={inputValue} setInputValue={setInputValue} disabled={!myTurn} placeholder={placeholder} onSubmit={()=>sendAnswer(inputValue)}>
                <AirplaneIcon/>
             </InputWithButton>
        </div>
    );
}

export default GamePage;