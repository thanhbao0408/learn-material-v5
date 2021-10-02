import React, { useState, useRef, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Theme from '../../ui/theme/Theme';

import Tab from '@mui/material/Tab';

import logo from '../../assets/logo.svg';
import Box from '@mui/material/Box';

import EstimateButton from '../common/EstimateButton';
import { HeaderSection } from '../../App';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

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

    const mdMatches = useMediaQuery(Theme.breakpoints.up('md'));

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

    const handleDrawerOpen = () => {
        if (openDrawer) {
            setOpenDrawer(false);
        } else {
            setOpenDrawer(true);
        }
    };
    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.target && (event.target as HTMLElement).classList.contains('MuiDrawer-paper')) {
            return;
        }

        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpenDrawer(open);
        // setState({ ...state, [anchor]: open });
    };

    const desktopNavigations = (
        <React.Fragment>
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
                                component={RouterLink}
                                to={url!}
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
            <EstimateButton
                sx={{
                    px: '16px',
                    mx: '16px',
                }}
            />
        </React.Fragment>
    );

    const mobileMenuIcon = (
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
            <MenuIcon />
        </IconButton>
    );

    const drawerWidth = 240;
    const [openDrawer, setOpenDrawer] = useState(false);
    const mobileNavigations = (
        <SwipeableDrawer
            anchor="left"
            open={openDrawer}
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
            // variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                '& .MuiListItem-root': {
                    color: (theme) => theme.palette.primary.contrastText,
                    '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                        opacity: 1,
                    },
                    '&.active, .Mui-selected': {
                        color: (theme) => theme.palette.secondary.main,
                        opacity: 1,
                    },
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {sections.map((section) => {
                        const { title, url, children } = section;
                        if (children) {
                            const [expanded, setExpanded] = useState(false);
                            const handleExpanded = () => {
                                setExpanded(!expanded);
                            };
                            return (
                                <React.Fragment key={title}>
                                    <ListItem
                                        component={RouterLink}
                                        to={url!}
                                        onClick={(event: any) => {
                                            event.preventDefault();
                                            handleExpanded();
                                        }}
                                    >
                                        <ListItemText primary={title} />
                                        {expanded ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <List disablePadding sx={{ pl: 1 }}>
                                            {children.map((child, index) => (
                                                <ListItem
                                                    key={child.title}
                                                    component={RouterLink}
                                                    to={child.url!}
                                                    selected={index === selectedIndex}
                                                    onClick={() => {
                                                        handleDrawerClose();
                                                        setSelectedIndex(index);
                                                    }}
                                                >
                                                    <ListItemText primary={child.title} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <ListItem
                                    button
                                    key={title}
                                    component={RouterLink}
                                    to={url!}
                                    onClick={handleDrawerClose}
                                >
                                    <ListItemText primary={title} />
                                </ListItem>
                            );
                        }
                    })}
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemText primary="Free Estimate" />
                    </ListItem>
                </List>
            </Box>
        </SwipeableDrawer>
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll>
                <AppBar
                    color="primary"
                    position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                >
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

                        {mdMatches ? desktopNavigations : mobileMenuIcon}
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            {!mdMatches ? mobileNavigations : null}
            <Toolbar />
        </React.Fragment>
    );
};

export default Header;
