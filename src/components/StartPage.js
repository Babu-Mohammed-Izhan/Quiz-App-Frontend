import { useState } from "react"
import { Redirect } from 'react-router-dom'


const StartPage = ({ handleusername }) => {

    const [username, setusername] = useState("")
    const [redirectstart, setredirectstart] = useState(false)

    if (redirectstart) {
        return <Redirect to='/quiz' />;
    }

    return (
        <div className="d-flex container align-items-center flex-column justify-content-center page" >
            <div className="row top">
                <h1 className="title">Quizz Me Not</h1>
                <h3 className="name">Enter you name</h3>
            </div>
            <div className="row username">
                <input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
            </div>
            <div className="row">
                <button type="button" className="btn btn-dark" onClick={() => {
                    handleusername(username)
                    setredirectstart(true)
                }}>Start Quiz</button>
            </div>
        </div>
    )
}

export default StartPage
