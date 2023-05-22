import React from 'react';

import Header from '@components/Header';
import {Container} from '@components/uikit';
import GradientBackgroundView from '@components/GradientBackgroundView';

const FuncComponent: React.FC = () => {
  return (
    <Container safeAreaStyle={{backgroundColor: 'white'}}>
      <GradientBackgroundView>
        <Header title="Home" />
      </GradientBackgroundView>
    </Container>
  );
};
export default FuncComponent;
