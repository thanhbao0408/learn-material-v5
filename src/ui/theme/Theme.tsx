import React from 'react';
import { createTheme } from '@mui/material';
import { purple, orange } from '@mui/material/colors';

import '@mui/material/styles/createPalette';
declare module '@mui/material/styles/createPalette' {
    interface CommonColors {
        tan: React.CSSProperties['color'];
        lightRed: React.CSSProperties['color'];
        red: React.CSSProperties['color'];
        offBlack: React.CSSProperties['color'];
    }
}

declare module '@mui/material/styles/components' {
    interface Components {
        MyThemeComponent: {
            color?: 'primary' | 'secondary';
            variant?: 'normal' | 'dashed';
        };
    }
}

declare module '@mui/material/styles' {
    interface TypographyVariants {
        estimate: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        estimate?: React.CSSProperties;
    }

    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        estimate: true;
    }
}

const tan = 'tan';
const lightRed = '#f99';
const red = 'red';
const offBlack = '#444';
const white = 'white';

const Theme = createTheme({
    palette: {
        common: {
            tan,
            lightRed,
            red,
            offBlack,
            white,
        },
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
    status: {
        danger: orange[500],
    },
    typography: {
        estimate: {
            fontFamily: 'Pacifico',
            fontSize: '1rem',
            textTransform: 'none',
            color: 'white',
        },
    },
    components: {
        MyThemeComponent: {},
    },
});

export default Theme;
