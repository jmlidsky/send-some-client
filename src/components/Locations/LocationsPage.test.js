import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import LocationsPage from './LocationsPage'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <LocationsPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
