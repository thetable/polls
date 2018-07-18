import React from 'react';
import { Button, Table } from 'reactstrap';
import { API_BASE } from './App';

class QuestionDetails extends React.Component {
  constructor(props) {
    super(props);
    const { question } = this.props.location.state;
    this.state = {
      question
    };
  }

  componentDidMount = () => this.refresh();

  onVote = async choice => {
    this.setState({ loading: true });
    return await fetch(`${API_BASE}${choice.url}`, { method: 'POST' })
      .then(response => {
        return response.json();
      })
      .then(response => {
        this.refresh();
      });
  };

  refresh = async () => {
    const { question } = this.state;
    this.setState({ loading: true });
    return await fetch(`${API_BASE}/${question.url}`)
      .then(response => {
        return response.json();
      })
      .then(question => {
        this.setState({ question, loading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: true });
      });
  };

  render() {
    const {
      question: { question, choices },
      loading
    } = this.state;
    return (
      <div className="question-details">
        <h1>Questions Detail</h1>
        <h3>Question: {question}</h3>
        <ChoicesTable
          choices={choices}
          onVote={this.onVote}
          loading={loading}
        />
      </div>
    );
  }
}

const ChoicesTable = ({ choices, onVote, loading }) => {
  const totalVotes = choices.reduce((sum, choice) => sum + choice.votes, 0);
  return (
    <Table>
      <tbody>
        {choices.map((choice, index) => (
          <tr key={index}>
            <td>{choice.choice}</td>
            <td>{choice.votes}</td>
            <td>
              {totalVotes
                ? Math.round((choice.votes / totalVotes) * 100 * 10) / 10
                : 0}%
            </td>
            <td>
              <VoteButton onVote={() => onVote(choice)} disabled={loading} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const VoteButton = ({ onVote, disabled }) => (
  <Button onClick={onVote} disabled={disabled}>
    Vote
  </Button>
);

export default QuestionDetails;
