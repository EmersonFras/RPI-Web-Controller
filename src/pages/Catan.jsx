import { useState } from "react"
import Card from "../components/Card"
import CardBtn from "../components/CardBtn"
import PlayerCard from "../components/PlayerCard"

function Catan() {
    const [players, setPlayers] = useState([])

    function addPlayer() {
        setPlayers((prevPlauers) => {
            const newPlayers = [...prevPlauers]
            newPlayers.push({name: `Player ${newPlayers.length + 1}`, color: "red", settlements: 1, cities: 1, roads: 1, extra: 0, metropolis: 0, longestRoad: false, statsOpen: false})
            return newPlayers
        })
    }

    function removePlayer(index) {
        setPlayers((prevPlayers) => {
            const newPlayers = [...prevPlayers]
            newPlayers.splice(index, 1)
            return newPlayers
        })
    }

    function updatePlayer(index, updates) {
        setPlayers(prev =>
            prev.map((p, i) =>
                i === index
                ? { ...p, ...updates }
                : p
            )
        )
    }


    const playerCards = players.map((player, index) => {
        return (
            <PlayerCard
                key={index}
                player={player}
                index={index}
                onSave={updatePlayer}
                onRemove={removePlayer}
            />
        )
    })

    const barbarianCard = (
        <Card
            titleContent={<p className="card__content">Barbarian</p>}
            content={
                <div>
                    <p>Barbarian Strength: {players.reduce((acc, player) => acc + player.cities, 0)}</p>
                </div>
            }
        />
    )

    return (
        <div className="page catan">
            {barbarianCard}
            {playerCards}
            {players.length < 4 && 
                <Card 
                    titleContent={<p className="card__content">Add Players</p>}
                    content={
                        <CardBtn
                            onClick={() => addPlayer()}
                            content="Add Player"
                        />
                        
                    }
                
            />
            }
        </div>
    )
}

export default Catan