import React from 'react';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  Toolbar,
} from '@material-ui/core';
import Spacer from './Spacer';
import ExternalLink from './ExternalLink';
import NextLink from 'next/link';
import { Bold } from './StyleUtils';
import styled from 'styled-components';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const TitleLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)}px;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <MainContent>
        <>{children}</>
      </MainContent>
    </Box>
  );
};

export default Layout;
