import { Button } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';
import Typography from '@mui/material/Typography';

interface EstimateProps {
    sx?: SxProps;
}

const EstimateButton: React.FC<EstimateProps> = (props) => {
    const { sx } = props;

    return (
        <React.Fragment>
            <Button
                variant="contained"
                sx={{
                    ...sx,
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: (theme) => theme.palette.primary.contrastText,
                    borderRadius: '50px',
                    height: '45px',
                    fontSize: '1rem',
                }}
            >
                <Typography variant="estimate"> Free Estimate</Typography>
            </Button>
        </React.Fragment>
    );
};

export default EstimateButton;
