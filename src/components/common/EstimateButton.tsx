import { Button } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';

interface EstimateProps {
    sx?: SxProps;
}

const EstimateButton: React.FC<EstimateProps> = (props) => {
    const { sx } = props;

    return (
        <React.Fragment>
            <Button
                sx={{
                    ...sx,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    borderRadius: '50px',
                    fontFamily: 'Pacifico',
                    textTransform: 'none',
                    height: '45px',
                    fontSize: '1rem',
                }}
            >
                Free Estimate
            </Button>
        </React.Fragment>
    );
};

export default EstimateButton;
