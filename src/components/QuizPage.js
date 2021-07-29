import { Row, Button, Card, Spinner, Navbar } from "react-bootstrap";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Alertbar from './Alertbar'
import { decode } from 'html-entities';



const QuizPage = ({ handlescore }) => {

    const [options, setoptions] = useState([])
    const [score, setScore] = useState(0);
    const [number, setNumber] = useState(0);
    const [visible, setVisible] = useState(false);
    const [ques, setques] = useState()
    const [redirectboard, setredirectboard] = useState(false)
    const [alert, setalert] = useState(null)


    useEffect(() => {

        const getData = async () => {
            const data = await axios.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
            setques(data.data.results)
            randomizeans(data.data.results, 0);
            setVisible(true)
        }
        getData();
    }, [])



    const randomizeans = (question, num) => {
        const answers = [...question[num].incorrect_answers, question[num].correct_answer]
        answers.sort(() => .5 - Math.random())
        setoptions(answers)
    }


    const handleAnswerOptionClick = e => {
        const chosenAns = e.target.value
        const correct = ques[number].correct_answer

        //Incrementing the question number and going to the next question
        if (number <= 8) {

            //Setting the score
            if (chosenAns === correct) {
                setScore(score + 1)
                setalert('success')
            }

            if (chosenAns !== correct) {
                setalert('danger')
            }

            setTimeout(() => {
                setalert(null)
                setNumber(number + 1)
                randomizeans(ques, number + 1);
            }, 3000)
        } else {
            handlescore(score)
            setredirectboard(true)
        }

    };

    // Redirect to leaderboard
    if (redirectboard) {
        return <Redirect to='/leaderboard' />;
    }

    return (
        //This is the quiz app page
        <div className="container wrapper quiz bg-dark " >
            {visible ?
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand>
                            <h1 className="nav-title">Quizz Me Not</h1>
                        </Navbar.Brand>
                    </Navbar>
                    <div className="container d-flex align-items-center justify-content-center flex-column page bg-dark">
                        <Alertbar alertcolor={alert} correct={ques[number].correct_answer} />
                        <Row>
                            <Card id="question" className=" w-auto ">
                                <Card.Body>{decode(ques[number].question)}</Card.Body>
                            </Card>
                        </Row>
                        <Row id="buttons" >
                            <div className="col d-flex justify-content-around">
                                <Button className="options btn-block" id="quiz-button" variant="light" onClick={handleAnswerOptionClick} value={options[0]}>{decode(options[0])}</Button>
                                <Button className="options btn-block" id="quiz-button" variant="light" onClick={handleAnswerOptionClick} value={options[1]}>{decode(options[1])}</Button>
                            </div>
                        </Row>
                        <Row id="buttons">
                            <div className="col d-flex justify-content-around">
                                <Button className="options btn-block" id="quiz-button" variant="light" onClick={handleAnswerOptionClick} value={options[2]}>{decode(options[2])}</Button>
                                <Button className="options btn-block" id="quiz-button" variant="light" onClick={handleAnswerOptionClick} value={options[3]}>{decode(options[3])}</Button>
                            </div>
                        </Row>
                    </div>
                </div>
                : <div>
                    <div id="loading" className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status" variant="light">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            }
        </div>
    )
}

export default QuizPage
