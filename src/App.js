import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import LeaderBoard from './components/LeaderBoard'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [username, setusername] = useState('')
  const [score, setscore] = useState(0)

  const handleusername = (user) => {
    setusername(user)
    console.log(user)
  }

  const handlescore = async (num) => {
    setscore(num)
    console.log(num)
  }
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/quiz">
            <QuizPage handlescore={(e) => handlescore(e)} />
          </Route>
          <Route path="/leaderboard">
            <LeaderBoard newusername={username} newscore={score} />
          </Route>
          <Route path="/">
            <StartPage handleusername={(e) => handleusername(e)} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
