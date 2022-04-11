import styled from 'styled-components';

export const NavbarContainer = styled.div<{ videoMode: boolean }>`
  height: 72px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  display: flex;
  align-items: center;
  gap: 20px;
  padding-left: 26px;
  background: ${(props) => props.videoMode && '#1c1d1f'};
  color: ${(props) => props.videoMode && '#fff'};
  border-bottom: ${(props) => props.videoMode && '1px solid #3e4143'};
  font-family: 'Roboto', sans-serif;
`;

export const LogoContainer = styled.a`
  width: 91px;
  height: auto;
`;

export const Title = styled.div`
  font-size: 15px;
`;

export const NameIcon = styled.div`
  background: #1c1d1f;
  color: #ffffff;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
`;
