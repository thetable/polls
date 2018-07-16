import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

const Polls = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">All Questions</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Questions} />
      <Route path={`/questions/:questionId`} component={Question} />
    </div>
  </Router>
);

const Questions = () => <h1>Questions</h1>;

const Question = ({ match }) => (
  <div>
    <h1>Questions Detail</h1>
    <h3>{match.params.questionId}</h3>
  </div>
);

export default Polls;
