import React from 'react';
import { shallow } from 'enzyme';
import QuestionDetails from '../QuestionDetails';

const question = {
  published_at: '2015-05-27T21:22:26.457000+00:00',
  question: 'Who is the best Avenger?',
  url: '/questions/2',
  choices: [
    {
      choice: 'Iron Man',
      url: '/questions/2/choices/8',
      votes: 21
    },
    {
      choice: 'Captain America',
      url: '/questions/2/choices/11',
      votes: 11
    }
  ]
};

beforeEach(() => {
  fetch.resetMocks();
});
it('renders', () => {
  shallow(<QuestionDetails location={{ state: { question } }} />);
});

it('votes and integrates response', async () => {
  const el = shallow(<QuestionDetails location={{ state: { question } }} />);
  const updatedChoice = { ...question.choices[1], votes: 12 };
  const updatedQuestion = {
    ...question,
    choices: [question.choices[0], updatedChoice]
  };
  fetch
    .once(JSON.stringify(updatedChoice))
    .once(JSON.stringify(updatedQuestion));
  await el.instance().onVote(question.choices[1]);
  expect(el.state('question').choices[1].votes).toEqual(12);
});
