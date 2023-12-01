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
        button: {
            main: '#34de2f',
            dark: '#1a6900'
        },
        button_red: {
            main: '#bf0000',
            dark: '#ff0000'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#8c8585'
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