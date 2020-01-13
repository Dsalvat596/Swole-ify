import React from 'react';
import Index from './components/layout/Index';
import Navbar from './components/layout/Navbar';
import { Provider } from './context';
import './App.css';

function App() {
  return (
    <Provider>
      <React.Fragment>
        <Navbar />
        <Index />
      </React.Fragment>
    </Provider>
  );
}

export default App;
