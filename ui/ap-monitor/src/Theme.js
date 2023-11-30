import { createTheme } from '@mui/material/styles';
const theme = createTheme({
    palette: {
        primary: {
            main: '#181b20',
            light: '#E1BEE7',
            dark: '#7C4DFF'
        },
        secondary: {
            main: '#03DAC6',
            light: '#B2DFDB',
            dark: '#00BFA5'
        },
        background: {
            default: '#111218',
            paper: '#1E1E1E'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#000000'
        }
    },
    components: {
        MuiListItemText: {
            styleOverrides: {
                primary: {

                    fontSize: '1.3rem',
                    fontWeight: 'bold',

                },
                secondary: {
                    color: '#808080',
                    fontSize: '1rem',

                },
            },
        },
    },
    typography: {
        h1: {
            fontFamily: 'Arial, sans-serif',
            fontSize: '2.5rem',
        },
        body: {
            fontFamily: 'Arial, sans-serif',
        }
    },

});

export default theme;