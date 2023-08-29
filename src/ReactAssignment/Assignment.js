import React from 'react';
import {Route, Routes} from "react-router-dom";
import StartTheGame from "../ReactAssignmentComponents/StartTheGame";
import GameBoard from "../ReactAssignmentComponents/GameBoard";

const Assignment = () => {
    return (
        <div className="container">

            <Routes>
                <Route path="/" element={<StartTheGame/>} />
                <Route path="game" element={<GameBoard/>} />

            </Routes>


        </div>
    );
};

export default Assignment;