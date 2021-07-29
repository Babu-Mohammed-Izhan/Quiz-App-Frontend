import { Alert } from 'react-bootstrap'

const Alertbar = ({ alertcolor, correct }) => {
    if (alertcolor === 'success') {
        return (
            <Alert variant={alertcolor}>
                Congratulations its the correct answer!
            </Alert>
        )
    }

    if (alertcolor === 'danger') {
        return (
            <Alert variant={alertcolor}>
                You got the wrong answer, the correct answer is {correct}
            </Alert>
        )
    }

    return (
        null
    )
}

export default Alertbar
