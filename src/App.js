import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Navbar } from 'reactstrap';

import QuestionsOverview from './QuestionsOverview';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';

import './App.css';

export const API_BASE = 'https://polls.apiblueprint.org';

const Polls = () => (
  <Router>
    <div className="app-container">
      <Navbar color="dark">
        <Link to="/">All Questions</Link>
        <Button>
          <Link to="/new">New Question</Link>
        </Button>
      </Navbar>

      <Route exact path="/" component={QuestionsOverview} />
      <Route path={`/questions/:questionId`} component={QuestionDetails} />
      <Route path="/new" component={NewQuestion} />
    </div>
  </Router>
);

export default Polls;
