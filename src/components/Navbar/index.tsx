import React from 'react';
import {
  NavbarContainer,
  LogoContainer,
  Title,
  NameIcon,
  NavItems,
} from './style';
import Logo from '@public/logo-udemy.svg';
import LogoLight from '@public/logo-udemy-light.svg';
import SearchBar from '@components/SearchBar';
import Video from '@api.video/nodejs-client/lib/model/Video';

interface NavbarProps {
  videoMode?: boolean;
  video?: Video;
}

const Navbar: React.FC<NavbarProps> = ({ videoMode, video }): JSX.Element => {
  return (
    <NavbarContainer videoMode={videoMode}>
      <NavItems>
        <LogoContainer href={'/'}>
          {videoMode ? <LogoLight /> : <Logo />}
        </LogoContainer>
        {videoMode ? (
          <Title>{video?.title}</Title>
        ) : (
          <>
            <span>Categories</span>
            <SearchBar />
          </>
        )}
      </NavItems>
      {!videoMode && <NameIcon>API</NameIcon>}
    </NavbarContainer>
  );
};

export default Navbar;
