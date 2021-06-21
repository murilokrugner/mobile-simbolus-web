import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

 import { Container } from './styles';

function Loading({loading}) {
  return (
    <Container>
        <ClipLoader color={'#fff'} loading={loading} size={100} />
    </Container>
  );
}

export default Loading;