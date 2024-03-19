import React, {useEffect, useState} from 'react';
import './gamePage.css';
import GameHeader from "../../features/timer/ui/timer";
import InputWithButton from "../../shared/ui/inputWithButton/inputWithButton";
import AnswersField from "../../shared/ui/answersField/answersField";
import citiesData from '../../cities.json';
import useTimer from "../../features/timer/hooks/useTimer";
import {Navigate} from "react-router-dom";


function GamePage() {
    const [myTurn, setMyTurn] = useState<boolean>(true);
    const [citiesPool, setCitiesPool] = useState<string[] >(['Амстердам','Мадрид']);
    const [placeholder, setPlaceholder] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');

    function checkWinner(){
        if (myTurn){
            return <Navigate to="/result" />;
        }
    }

    const { seconds, progress, resetTimer} = useTimer({initialSeconds:120, endingHandler: checkWinner});

    function changeTurn(){
        if (citiesPool.length % 2 === 0) {
            setPlaceholder('Напишите любой город, например: Где вы живете?');
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
        if(validation(city)){
            setCitiesPool(prevCities => [...prevCities, city]);
            setInputValue('');
            resetTimer();
        }
    }



    function getLastCityEndSymbol(cities: string[]) {
        const lastCity = cities[cities.length - 1].toLowerCase();
        const lastChar = lastCity.slice(-1);

        if (lastChar === 'ь') {
            return lastCity.slice(-2);
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
            setTimeout(() => {
                sendAnswer(foundCity);
            }, 1000);

        } else {
            //Todo напиши обработчик ошибки
        }
    }

    function isLastCityMatchingInitial(value:string){
        return citiesPool.length > 0 && getLastCityEndSymbol(citiesPool).endsWith(value[0].toLowerCase())
    }

    function validation(value: string){
        if(!citiesData.includes(value)){
            return false
        }

        if(citiesPool.includes(value)){
            return false
        }

        if (isLastCityMatchingInitial(value)) {
            return true;
        }

        return false
    }

    return (
        <div className={'container sаtart-page'}>
             <GameHeader myTurn={myTurn} seconds={seconds} progress={progress}/>
             <AnswersField answers={citiesPool}/>
             <InputWithButton inputValue={inputValue} setInputValue={setInputValue} disabled={!myTurn} placeholder={placeholder} onSubmit={()=>sendAnswer(inputValue)}/>
        </div>
    );
}

export default GamePage;