import React from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { API_BASE } from './App';

class NewQuestion extends React.Component {
  state = {
    question: {
      question: '',
      choices: ['', '', '', '']
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    fetch(`${API_BASE}/questions`, {
      method: 'POST',
      body: JSON.stringify(this.state.question)
    })
      .then(response => {
        return response.json();
      })
      .then(question => {
        this.setState({ question, success: true, loading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ error, loading: false });
      });
  };

  updateChoice = (index, newChoice) => {
    const choices = this.state.question.choices.map(
      (choice, i) => (i === index ? newChoice : choice)
    );
    this.setState({ question: { ...this.state.question, choices } });
  };

  render() {
    const { question, success, loading, error } = this.state;
    if (success) {
      return <Redirect to={{ pathname: question.url, state: { question } }} />;
    }

    return (
      <div className="margin">
        {error ? (
          <Alert color="danger">
            Something went wrong when trying to create this question. Please
            check your input.
          </Alert>
        ) : null}
        <h1>New Question</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="question">Question</Label>
            <Input
              id="question"
              value={question.question}
              onChange={e =>
                this.setState({
                  question: {
                    question: e.target.value,
                    choices: question.choices
                  }
                })
              }
            />
          </FormGroup>

          <FormGroup>
            <Label>Choices</Label>
            {question.choices.map((choice, index) => (
              <Input
                key={index}
                value={choice}
                onChange={e => this.updateChoice(index, e.target.value)}
              />
            ))}
          </FormGroup>

          <Button disabled={loading}>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default NewQuestion;
