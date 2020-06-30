import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import EditLocationPage from './EditLocationPage'

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
      <EditLocationPage {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
