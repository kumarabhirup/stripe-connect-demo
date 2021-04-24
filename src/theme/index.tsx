import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme({
  palette: {
    background: { paper: '#fff', default: '#fff' },
    primary: {
      main: '#6b46c1',
    },
    secondary: {
      main: '#d53f8c',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
