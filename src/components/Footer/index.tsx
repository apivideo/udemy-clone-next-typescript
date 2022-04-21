import React from 'react';
import { StyledFooter, LinkFooter } from './style';

const Footer: React.FC = (): JSX.Element => {
  return (
    <StyledFooter>
      Made with 🧡 &nbsp;by
      <LinkFooter href="https://api.video" target="_blank" rel="noreferrer">
        &nbsp;api.video
      </LinkFooter>
    </StyledFooter>
  );
};

export default Footer;
