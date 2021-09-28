import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { NavLink as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';

import logo from '../../assets/logo.svg';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import EstimateButton from '../common/EstimateButton';

interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
}

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

const ElevationScroll: React.FC<Props> = (props: Props) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};

const Header: React.FC<HeaderProps> = (props) => {
    const { sections } = props;

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll>
                <AppBar color="primary" position="fixed">
                    <Toolbar
                        disableGutters
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-ends',
                        }}
                    >
                        <Box
                            component="img"
                            src={logo}
                            alt="Company logo"
                            sx={{
                                height: 64,
                                mr: 'auto',
                            }}
                        />
                        {/* Nav groups */}
                        <Box
                            component="nav"
                            sx={{
                                display: 'flex',
                            }}
                        >
                            {sections.map((section) => (
                                <Link
                                    component={RouterLink}
                                    to={section.url}
                                    activeClassName="active"
                                    key={section.title}
                                    noWrap
                                    variant="body2"
                                    href={section.url}
                                    sx={{
                                        textDecoration: 'none',
                                        p: 1,
                                        flexShrink: 0,
                                        color: 'inherit',
                                        '&.active': {
                                            color: (theme) => theme.palette.secondary.main,
                                        },
                                    }}
                                >
                                    {section.title}
                                </Link>
                            ))}
                        </Box>
                        {/* Nav groups */}

                        {/* Free Estimate Button */}
                        <EstimateButton
                            sx={{
                                px: '16px',
                                mx: '16px',
                            }}
                        />

                        {/* Free Estimate Button */}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
        </React.Fragment>
    );
};

export default Header;
