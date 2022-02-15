import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import { SpinnerStyled } from './Spinner.styles';

function Spinner() {
  return (
    <SpinnerStyled>
      <BallTriangle color="#ffc400" height={100} width={100} />
    </SpinnerStyled>
  );
}

export default Spinner;
