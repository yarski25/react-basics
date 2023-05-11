import React, { useState } from 'react';
import Counter from './components/Counter';

function App() {

  const [value, setValue] = useState('TEXT IN INPUT')

  return (
    <div className="App">
      <Counter />
    </div>
  );
}

export default App;
