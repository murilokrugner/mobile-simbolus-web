import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
      <ul className={styles.squares} />

    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
