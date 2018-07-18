import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';

import QuestionsOverview from './QuestionsOverview';
import QuestionDetails from './QuestionDetails';

import './App.css';

export const API_BASE = 'https://polls.apiblueprint.org';

const Polls = () => (
  <Router>
    <div className="app-container">
      <Navbar color="dark">
        <Link to="/">All Questions</Link>
      </Navbar>

      <Route exact path="/" component={QuestionsOverview} />
      <Route path={`/questions/:questionId`} component={QuestionDetails} />
    </div>
  </Router>
);

export default Polls;
