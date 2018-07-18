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

  onVote = async choice => {
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
    const { question, choices, url } = this.state.question;
    return (
      <div className="question-details">
        <h1>Questions Detail</h1>
        <h3>Question: {question}</h3>
        <ChoicesTable choices={choices} onVote={this.onVote} />
      </div>
    );
  }
}

const ChoicesTable = ({ choices, onVote }) => {
  const totalVotes = choices.reduce((sum, choice) => sum + choice.votes, 0);
  return (
    <Table>
      <tbody>
        {choices.map((choice, index) => (
          <tr key={index}>
            <td>{choice.choice}</td>
            <td>{choice.votes}</td>
            <td>{Math.round((choice.votes / totalVotes) * 100 * 10) / 10}%</td>
            <td>
              <VoteButton onVote={() => onVote(choice)} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const VoteButton = ({ onVote }) => <Button onClick={onVote}>Vote</Button>;

export default QuestionDetails;
