import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ProblemsPage from './ProblemsPage'

it('renders without crashing', () => {
  const props = {
    match: {
      params: {
        id: "1"
      }
    }
  }
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <ProblemsPage {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
