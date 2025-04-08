import { useState, useEffect } from "react";
import Card from "../components/Card";
import CardBtn from "../components/CardBtn";

function PlayerCard({ player, index, onSave, onRemove}) {
    const [editName, setEditName] = useState(player.name);

    useEffect(() => {
        setEditName(player.name);
      }, [player.name])
        

    return (
        <Card
        // Title shows the current name in the player’s color
        titleContent={
            <p
            style={{ color: player.color }}
            >
                {player.name}
            </p>
        }

        // Content is the input field to edit the name
        content={
            <div className ="playerCard">
                <div>
                    <input
                    type="text"
                    className="playerCard__input"
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    />
                    <CardBtn    
                        onClick={() => onSave(index, { name: editName })}
                        content="Set Name"
                    />
                </div>
                <div>
                    <select
                        className="playerCard__select"
                        value={player.color}
                        onChange={(e) => onSave(index, { color: e.target.value })}
                    >
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="orange">Orange</option>
                        <option value="white">White</option>
                    </select>
                </div>
                <CardBtn 
                    content={player.statsOpen ? "^" : "v"}
                    onClick={() => onSave(index, { statsOpen: !player.statsOpen })}
                />
                { player.statsOpen &&
                    <div className="playerCard__container">
                        <div className="playerCard__points">
                            <p>Settlements: {player.settlements}</p>
                            <div className="playerCard__buttons">
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, { settlements: player.settlements + 1 })}
                                    content="+"
                                />
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, { settlements: player.settlements - 1 })}
                                    content="-"
                                />
                            </div> 
                        </div>
                        <div className="playerCard__points">
                            <p>Cities: {player.cities}</p>
                            <div className="playerCard__buttons">
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, { cities: player.cities + 1 })}
                                    content="+"
                                />
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, { cities: player.cities - 1 })}
                                    content="-"
                                />
                            </div> 
                        </div>
                        <div className="playerCard__points">
                            <p>Connected Roads: {player.roads}</p>
                            <div className="playerCard__buttons">
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, { roads: player.roads + 1})}
                                    content="+"
                                />
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, { roads: player.roads - 1})}
                                    content="-"
                                />
                            </div> 
                        </div>
                        <div className="playerCard__points">
                            <p>Metropolis: {player.metropolis}</p>
                            <div className="playerCard__buttons">
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, {metropolis: player.metropolis + 1})}
                                    content="+"
                                />
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, {metropolis: player.metropolis - 1})}
                                    content="-"
                                />
                            </div> 
                        </div>
                        <div className="playerCard__points">
                            <p>Extra points: {player.extra}</p>
                            <div className="playerCard__buttons">
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, {extra: player.extra + 1})}
                                    content="+"
                                />
                                <CardBtn
                                    className="playerCard__btn--points"
                                    onClick={() => onSave(index, {extra: player.extra - 1})}
                                    content="-"
                                />
                            </div> 
                        </div>
                        <div>
                            <p>Longest Road: {player.longestRoad ? "Yes" : "No"}</p>
                            <div className="playerCard__points">
                                <CardBtn
                                    onClick={() => onSave(index, { longestRoad: !player.longestRoad })}
                                    content={player.longestRoad ? "Remove Longest Road" : "Set Longest Road"}
                                />
                            </div>
                        </div>
                    </div>
                }
                <p> Victory Points: {player.settlements + 2*(player.cities + player.longestRoad + player.metropolis) + player.extra}</p>
            </div>
        }

        // Footer has Save and Remove buttons
        footerContent={
            <>
            <CardBtn
                onClick={() => onRemove(index)}
                content="Remove"
            />
            </>
        }
        />
    )
}

export default PlayerCard
