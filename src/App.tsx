import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import StartPage from "./pages/startPage/startPage";
import GamePage from "./pages/gamePage/gamePage";
import ResultPage from "./pages/resultPage/resultPage";

function App() {
    return (
        <main className="p-[25px] bg-white rounded-xl w-100 sm:w-[576px]">
                <Router>
                    <Routes>
                        <Route path="/" element={<StartPage/>}>
                        </Route>
                        <Route path="/game" element={<GamePage/>}>
                        </Route>
                        <Route path="/result?status=:status&lastCity=:lastCity" element={<ResultPage/>}>
                        </Route>
                    </Routes>
                </Router>
        </main>
    );
}

export default App;
