import React from 'react';

// child components
import BarChart from './components/BarChart';

// styles
import './app.css';

function App() {
  return (
    <div className="app">
      <h1>Visx Simple Bar Chart</h1>
      <BarChart width={360} height={280} />
    </div>
  );
}

export default App;
