import React from 'react';
import {useState} from "react";
import {useSelector} from 'react-redux'
import {images} from './SelectFigureImage'
import {useNavigate} from "react-router-dom";

const GameBoard = () => {

    const [num1, setNum1] = useState(null)
    const [num2, setNum2] = useState(null)
    const num3 = num1 + num2
    const [playerMoney, setPlayerMoney] = useState(200)
    const [purchasedStreets, setPurchasedStreets] = useState([])
    const colors = [
        'yellow',
        'green',
        'red',
        'aqua',
        'lime',
        'lightgray',
        'teal',
        'blue',
        'brown',
        'orange',
        'crimson',
        'dimgrey',
        'lightblue',
        'burlywood',
        'violet',
        'purple',
        'orangered',
        'saddlebrown',
        'gold',
        'seagreen',

    ]
    const selectedFigureIndex = useSelector(state => state.user.selectedFigure) || 0
    const [playerPosition, setPlayerPosition] = useState(1)
    const isAllBlocksOwned = purchasedStreets.length === 19
    const navigate = useNavigate()


    const generateDice = () => {
        const newNum1 = Math.floor(Math.random() * 6 + 1)
        const newNum2 = Math.floor(Math.random() * 6 + 1)
        const newPosition = (playerPosition + newNum1 + newNum2) % 20 || 20
        if (newPosition < playerPosition) {
            setPlayerMoney(playerMoney + 200)
        }
        setNum1(newNum1)
        setNum2(newNum2)
        setPlayerPosition(newPosition)
    }
    const getColorIndex = (blockNumber) => {
        const numericPart = blockNumber.replace('block', '')
        return parseInt(numericPart) - 1
    }
    const buyStreet = (blockNumber, price) => {
        if (playerMoney >= price) {
            setPlayerMoney(playerMoney - price)
            setPurchasedStreets([...purchasedStreets, blockNumber])
        }

    }
    const BuyOnlyOnce = (blockNumber) => {
        const blockId = `block${blockNumber}`
        const isBlockPurchased = purchasedStreets.includes(blockId)
        const isButtonDisabled = playerPosition !== blockNumber
        if (purchasedStreets.includes(blockId)) {
            return <button className="boardButtonBuy disabled cursorNot-allowed bgRed">Sold</button>
        } else {
            return (
                <button className={`boardButtonBuy${isBlockPurchased ? ' disabled bgRed' : ''}${isButtonDisabled ? ' cursorNot-allowed' : ''}`}
                        onClick={() => buyStreet(blockId, blockNumber * 10)} disabled={isButtonDisabled}>{isBlockPurchased ? 'Sold' : 'Buy'}</button>
            )
        }
    }

    const restartGame = () => {
        navigate('/')

    }

    return (
        <div className="gamePhase">


            <div className="boardDiv d-flex flex5 align-center">

                <div className="board">

                    <div className="topSide d-flex flex1 align-center j-center marginTop5">
                        <div key="start" className="block startDiv">
                            <div className="colorBox" style={{ backgroundColor: 'transparent' }}></div>
                            {playerPosition === 1 && (
                                <img src={selectedFigureIndex !== null ? images[selectedFigureIndex] : ''} alt="" className="playerFigure" />
                            )}
                            <p>Start</p>
                        </div>
                        {[2, 3, 4, 5, 6, 7, 8].map(blockNumber => (
                            <div key={blockNumber} id={`block${blockNumber}`} className="block">
                                <div className="colorBox"
                                     style={{backgroundColor: colors[getColorIndex(`block${blockNumber}`)]}}></div>
                                <p>Price: {blockNumber * 10}</p>
                                {playerPosition === blockNumber && (
                                    <img src={selectedFigureIndex !== null ? images[selectedFigureIndex] : ''} alt=""
                                         className="playerFigure"/>
                                )}
                                {BuyOnlyOnce(blockNumber)}
                            </div>
                        ))}
                    </div>


                    <div className="middleSide d-flex flex2">
                        <div className="left d-flex flex1 flex-column">
                            {[20, 19].map(blockNumber => (
                                <div key={blockNumber} id={`block${blockNumber}`} className="block1">
                                    <div className="middleBlock colorBox"
                                         style={{backgroundColor: colors[getColorIndex(`block${blockNumber}`)]}}></div>
                                    <p>Price: {blockNumber * 10}</p>
                                    {playerPosition === blockNumber && (
                                        <img src={selectedFigureIndex !== null ? images[selectedFigureIndex] : ''}
                                             alt="" className="playerFigure"/>
                                    )}
                                    {BuyOnlyOnce(blockNumber)}
                                </div>
                            ))}
                        </div>


                        {isAllBlocksOwned ? (
                            <div className="middle d-flex flex6 align-center">
                                <div className="d-flex flex1 flex-column j-center align-center">
                                    <h1>Congratulations, you won!</h1>
                                    <button onClick={restartGame} className="restartButton cursorP margin10">
                                        Restart the game
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="middle d-flex flex6">
                                <div className="d-flex flex1 j-center align-center">
                                    <div className="dice j-center align-center d-flex border1">
                                        <p>{num1}</p>
                                    </div>
                                    <div className="dice j-center align-center d-flex border1">
                                        <p>{num2}</p>
                                    </div>

                                </div>

                                <div className="d-flex flex1 flex-column j-center align-center">
                                    <h3 className="margin10">You rolled: <span>{num3}</span>!</h3>
                                    <button onClick={generateDice} className="rollButton cursorP margin10">Roll Dice
                                    </button>
                                </div>

                            </div>
                        )}

                            <div className="right d-flex flex1 flex-column">
                        {[9, 10].map(blockNumber => (
                            <div key={blockNumber} id={`block${blockNumber}`} className="block1">
                        <div className="middleBlock colorBox"
                             style={{backgroundColor: colors[getColorIndex(`block${blockNumber}`)]}}></div>
                        <p>Price: {blockNumber * 10}</p>
                        {playerPosition === blockNumber && (
                            <img src={selectedFigureIndex !== null ? images[selectedFigureIndex] : ''}
                                 alt="" className="playerFigure"/>
                        )}
                        {BuyOnlyOnce(blockNumber)}
                    </div>
                    ))}
                </div>
            </div>


            <div className="bottomSide d-flex flex1 align-center j-center marginBot5">
                {[18, 17, 16, 15, 14, 13, 12, 11].map(blockNumber => (
                    <div key={blockNumber} id={`block${blockNumber}`} className="block">
                        <div className="colorBox"
                             style={{backgroundColor: colors[getColorIndex(`block${blockNumber}`)]}}></div>
                        <p>Price: {blockNumber * 10}</p>
                        {playerPosition === blockNumber && (
                            <img src={selectedFigureIndex !== null ? images[selectedFigureIndex] : ''} alt=""
                                 className="playerFigure"/>
                        )}
                        {BuyOnlyOnce(blockNumber)}
                    </div>
                ))}
            </div>

        </div>

</div>


    <div className="playerTab d-flex flex2 flex-column j-center align-center textCenter">
        <img src={selectedFigureIndex !== null ? images[selectedFigureIndex] : ''} alt=""/>
        <h1 className="margin10">Player money: <span>{playerMoney}</span></h1>
        <h2 className="margin10">Player Streets:</h2>
        <div className="ownedStreets">
            {purchasedStreets.map(purchasedBlock => {
                const colorIndex = getColorIndex(purchasedBlock)
                const boughtPrice = parseInt(purchasedBlock.replace('block', '')) * 10
                return (
                    <div key={purchasedBlock}
                         className="ownedStreet margin10 border1 pad10 d-flex j-space-between align-center">
                        <div className="flex2"
                             style={{backgroundColor: colors[colorIndex], color: 'transparent'}}>
                            {purchasedBlock}
                        </div>
                        <div className="flex2">
                            Worth: <span>{boughtPrice / 2}</span>
                        </div>
                        <button className="sellButton flex1" onClick={() => {
                            setPlayerMoney(playerMoney + boughtPrice / 2)
                            setPurchasedStreets(prevStreets => prevStreets.filter(block => block !== purchasedBlock))
                        }}>Sell
                        </button>
                    </div>
                )
            })}
        </div>
    </div>

</div>
)
}

export default GameBoard;