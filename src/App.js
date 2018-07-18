import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import QuestionDetails from './QuestionDetails';

import './App.css';

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
    fetch('https://polls.apiblueprint.org/questions')
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
      <div className="questionList">
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
    <div className="questionLink">
      <Link to={{ pathname: url, state: { question: props.question } }}>
        <h3>{question}</h3>
      </Link>
      <h4>
        Published on <DateString dateString={published_at} />
      </h4>
      <h4>{choices.length} choices</h4>
    </div>
  );
};

const DateString = ({ dateString }) => new Date(dateString).toDateString();

export default Polls;
