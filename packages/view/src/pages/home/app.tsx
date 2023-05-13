import { Avatar, Button } from '@douyinfe/semi-ui';
import React, { FC, useState } from 'react';
import styles from './app.module.scss';
import GitHub from './assets/github.png';

const App: FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.body}>
      <p className={styles.bodyContent}>Hello, this is Home!</p>
      <a href="/pages/editor">To Editor</a>
      <Avatar src={GitHub} />
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>Click Me</Button>
    </div>
  );
};

export default App;
