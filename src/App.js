import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Card, Navbar, NavLink } from 'reactstrap';

import QuestionDetails from './QuestionDetails';

import './App.css';

export const API_BASE = 'https://polls.apiblueprint.org';

const Polls = () => (
  <Router>
    <div className="app-container">
      <Navbar color="dark">
        <Link to="/">All Questions</Link>
      </Navbar>

      <Route exact path="/" component={Questions} />
      <Route path={`/questions/:questionId`} component={QuestionDetails} />
    </div>
  </Router>
);

class Questions extends React.Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`${API_BASE}/questions`)
      .then(response => {
        return response.json();
      })
      .then(questions => {
        this.setState({ questions, loading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: true });
      });
  }

  render() {
    const { questions } = this.state;
    return questions ? (
      <div className="question-list">
        {questions.map((question, index) => (
          <QuestionLink question={question} key={index} />
        ))}
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
}

const QuestionLink = props => {
  const { question, published_at, choices, url } = props.question;
  return (
    <Card className="question-link">
      <Link to={{ pathname: url, state: { question: props.question } }}>
        <h3>{question}</h3>
      </Link>
      <p>
        Published on <DateString dateString={published_at} />
      </p>
      <p>{choices.length} choices</p>
    </Card>
  );
};

const DateString = ({ dateString }) => new Date(dateString).toDateString();

export default Polls;
