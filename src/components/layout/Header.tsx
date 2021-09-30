import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';

import Tab from '@mui/material/Tab';

import logo from '../../assets/logo.svg';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

import EstimateButton from '../common/EstimateButton';
import { HeaderSection } from '../../App';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

interface HeaderProps {
    sections: ReadonlyArray<HeaderSection>;
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
    const history = useHistory();
    const { sections } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const childrenPaths = sections
            .filter((p) => p.children)
            .reduce((a: string[], b) => [...a, ...b.children!.map((p) => p.url!)], []);
        const pathIndex = childrenPaths.indexOf(window.location.pathname);
        if (pathIndex >= 0) {
            setSelectedIndex(pathIndex);
        }
    }, [sections]);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNavigate = (parentRef: HTMLAnchorElement, url: string) => {
        // parentRef.classList.add('active');
        history.push(url);
    };

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
                            {sections.map((section) => {
                                const { title, url, children } = section;
                                if (children) {
                                    const tabId = `header-nav-tab-${title}`;
                                    const menuId = `header-nav-menu-${title}`;
                                    const tabRef = useRef<HTMLAnchorElement>(null);
                                    return (
                                        <React.Fragment key={title}>
                                            <Tab
                                                // id={tabId}
                                                key={title}
                                                label={title}
                                                component={RouterLink}
                                                to={url!}
                                                ref={tabRef}
                                                sx={{
                                                    textTransform: 'none',
                                                    p: 1,
                                                    flexShrink: 0,
                                                    opacity: 0.6,
                                                    '&:hover': {
                                                        backgroundColor: (theme) => theme.palette.primary.dark,
                                                        opacity: 1,
                                                    },
                                                    '&.active': {
                                                        color: (theme) => theme.palette.secondary.main,
                                                        opacity: 1,
                                                    },
                                                }}
                                                aria-controls={menuId}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleOpenMenu}
                                                onMouseOver={handleOpenMenu}
                                            />
                                            <Menu
                                                // id={menuId}
                                                aria-labelledby={tabId}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                MenuListProps={{ onMouseLeave: handleClose }}
                                                transitionDuration={100}
                                                elevation={0}
                                                sx={{
                                                    '& .MuiMenu-paper': {
                                                        backgroundColor: (theme) => theme.palette.primary.main,
                                                        color: (theme) => theme.palette.primary.contrastText,
                                                        opacity: 0.6,
                                                    },
                                                    '& .MuiMenuItem-root': {
                                                        opacity: 0.6,
                                                        fontSize: '0.875rem',
                                                        '&:hover': {
                                                            backgroundColor: (theme) => theme.palette.primary.dark,
                                                            opacity: 1,
                                                        },
                                                        '&.Mui-selected': {
                                                            color: (theme) => theme.palette.secondary.main,
                                                            opacity: 1,
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem key="-1" onClick={handleClose}>
                                                    {title}
                                                </MenuItem>
                                                {children.map((menuItem, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        onClick={() => {
                                                            handleNavigate(tabRef.current!, menuItem.url!);
                                                            setSelectedIndex(index);
                                                            handleClose();
                                                        }}
                                                        selected={index === selectedIndex}
                                                    >
                                                        {menuItem.title}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        </React.Fragment>
                                    );
                                } else {
                                    return (
                                        <Tab
                                            key={title}
                                            label={title}
                                            value={url}
                                            to={url!}
                                            component={RouterLink}
                                            sx={{
                                                textTransform: 'none',
                                                p: 1,
                                                flexShrink: 0,
                                                '&:hover': {
                                                    backgroundColor: (theme) => theme.palette.primary.dark,
                                                    opacity: 1,
                                                },
                                                '&.active': {
                                                    color: (theme) => theme.palette.secondary.main,
                                                    opacity: 1,
                                                },
                                            }}
                                        />
                                    );
                                }
                            })}
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
