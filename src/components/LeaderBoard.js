import { useState, useEffect } from "react"
import axios from 'axios'
import { Table } from 'react-bootstrap'

const LeaderBoard = ({ newusername, newscore }) => {

    const [scores, setscores] = useState([]);



    useEffect(() => {

        const getScores = async () => {
            const scores = await axios.get('api/scores/')
            console.log(scores)
            const data = scores.data
            data.sort((a, b) => b.score - a.score)
            setscores(data)
        }

        const postScores = async () => {
            const object = {
                username: newusername,
                score: newscore
            }
            const { response } = await axios.post('api/scores/', object)
            console.log(response)
        }

        postScores();
        getScores();
    }, [])


    return (
        <div className="leaderboard-wrapper">
            <div className="container-fluid">
                <div className=" leaderboard-title d-flex align-items-center justify-content-center">
                    <h1>LeaderBoard</h1>
                </div>
                <Table bordered hover >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score) => {
                            return (
                                <tr key={Math.floor(Math.random() * 1000)}>
                                    <td>{score.username}</td>
                                    <td>{score.score}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default LeaderBoard
