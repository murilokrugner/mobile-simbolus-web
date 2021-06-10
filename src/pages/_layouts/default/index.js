import React from 'react';
import PropTypes from 'prop-types';

import HeaderClient from '../../../components/Header';
import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <HeaderClient />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
