import AuthStack from 'navigation/stacks/auth';
import MainStack from 'navigation/stacks/main';
import React from 'react';

const user = false; // TODO: Only an example, here we can do some session check ;)

const NavigationStack: React.FunctionComponent = () => {
  if (!user) {
    return <AuthStack />;
  }

  return <MainStack />;
};

export default NavigationStack;
