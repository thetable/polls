Simple frontend for the [Apiary Polls
API](http://docs.pollsapi.apiary.io/). Displays a list of questions, a detail view with voting function, and a screen to create a new question.

## Installation

`npm install` or `yarn install`

## Running the app

`npm start` or `yarn start`

## Design decisions

I tried to keep the design as simple as possible, relying on only a few libraries (namely, `create-react-app`, `react-router`, and `reactstrap`).

In the spirit of the assignment, I did not add the following:

- Advanced state management
- Form validation
- Preventing multiple votes
- permalink-ability
- Adding input fields for more than 4 choices

On the question detail page, I deviated from the design a bit and added a 'Vote' button next to each choice.
