import { Typography } from '@douyinfe/semi-ui';
import React, { FC } from 'react';

const { Text } = Typography;

const App: FC = () => {
  return (
    <div>
      <p>Hello, this is Editor!</p>
      <Text link={{ href: '/pages/home' }}>To Home</Text>
    </div>
  );
};

export default App;
