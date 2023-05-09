import React, { FC } from 'react';
import GitHub from './assets/github.png';
import './app.scss';

const App: FC = () => {
  return (
    <div className="body">
      <p>Hello, this is Home!</p>
      <img src={GitHub} alt="GitHub" />
      <a href="/pages/editor">To Editor</a>
    </div>
  );
};

export default App;
