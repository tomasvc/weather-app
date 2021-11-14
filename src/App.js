import axios from 'axios';
import React, { useEffect, createContext } from 'react'
import Homepage from './components/Homepage'

function App() {
  return (
    <div className="App" style={{background: '#fafafa'}}>
      <Homepage />
    </div>
  );
}

export default App;
