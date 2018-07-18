import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

import { API_BASE } from './App';

export default class QuestionsOverview extends React.Component {
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
