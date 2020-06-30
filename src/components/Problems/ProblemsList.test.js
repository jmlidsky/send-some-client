import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ProblemsList from './ProblemsList'

it('renders without crashing', () => {
  const problemsToDisplay= []
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ProblemsList problems={problemsToDisplay} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
