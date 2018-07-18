import React from 'react';

const QuestionDetails = props => {
  const {
    question: { question, choices, url }
  } = props.location.state;
  return (
    <div className="questionDetails">
      <h1>Questions Detail</h1>
      <h3>Question: {question}</h3>
      <ChoicesTable choices={choices} />
    </div>
  );
};

const ChoicesTable = ({ choices }) => {
  const totalVotes = choices.reduce((sum, choice) => sum + choice.votes, 0);
  return (
    <table className="choicesTable">
      <tbody>
        {choices.map((choice, index) => (
          <tr key={index}>
            <td>{choice.choice}</td>
            <td>{choice.votes}</td>
            <td>{Math.round((choice.votes / totalVotes) * 100 * 10) / 10}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionDetails;
