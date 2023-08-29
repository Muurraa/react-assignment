import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedFigure } from './selectedFigure'
import { images } from './SelectFigureImage'

const StartTheGame = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [selectedFigure, setSelectedFigureIndex] = useState(null)


    const selectImage = (index) => {
        setSelectedFigureIndex(index)
        dispatch(setSelectedFigure(index))
    };

    const goToGamePhase = () => {
        if (selectedFigure !== null) {
            navigate('/game')
        }
    }

    return (
        <div className="selectPhase">
            <h1 className="colorWhite font40">Select your companion</h1>
            <div className="figures pad5">
                {images.map((src, index) => (
                    <img key={index} src={src} alt="" onClick={() => selectImage(index)} style={{ border: selectedFigure === index ? '1px solid white' : 'none' }}/>
                ))}
            </div>
            <button onClick={goToGamePhase}>Start the game</button>
        </div>
    )
}

export default StartTheGame;
