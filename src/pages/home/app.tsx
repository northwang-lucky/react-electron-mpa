import { Avatar } from '@douyinfe/semi-ui';
import React, { FC } from 'react';
import './app.scss';
import GitHub from './assets/github.png';

const App: FC = () => {
  return (
    <div className="body">
      <p>Hello, this is Home!</p>
      <a href="/pages/editor">To Editor</a>
      <Avatar src={GitHub} />
    </div>
  );
};

export default App;
