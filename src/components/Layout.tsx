import React from 'react';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

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
