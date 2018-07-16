import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

class Questions extends React.Component {
  state = {
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://polls.apiblueprint.org/questions")
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
      questions.map((question, index) => (
        <QuestionLink question={question} key={index} />
      ))
    ) : (
      <div>Loading...</div>
    );
  }
}

const QuestionLink = ({
  question: { question, published_at, choices, url }
}) => (
  <div>
    <a href={url}>
      <h3>{question}</h3>
    </a>
    <h4>{published_at}</h4>
    <h4>{choices.length} choices</h4>
  </div>
);

const Question = ({ match }) => (
  <div>
    <h1>Questions Detail</h1>
    <h3>{match.params.questionId}</h3>
  </div>
);

export default Polls;
