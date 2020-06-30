import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import EditProblemPage from './EditProblemPage'

it('renders without crashing', () => {
  const props = {
    match: {
      params: {
        id: "1"
      }
    },
    location: {
      state: {
        id: 1
      }
    }
  }


  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditProblemPage {...props} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
