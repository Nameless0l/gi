import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Button, Tooltip, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, GitHub, LinkedIn, Brightness4, Brightness7 } from '@mui/icons-material';
import Link from 'next/link';

export default function Header({ pages, toggleDarkMode, mode }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: mode === 'light' ? (theme) => theme.palette.primary.main
                : (theme) => theme.palette.background.paper, borderRadius: 0 }}>
            <Toolbar sx={{ minHeight: 50, display: 'flex', justifyContent: 'space-between' }}>

                {/* Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="logo.png"
                        alt="Logo"
                        style={{ width: 80, height: 60 }}
                    />
                </Box>

                {/* Navigation (visible à partir de 1000px) */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' },
                        justifyContent: 'center',
                        gap: 2
                    }}
                >
                    {pages.map((page) => (
                        <Link key={page.title} href={page.path} passHref>
                            <Button sx={{ color: 'white' }}>
                                {page.title}
                            </Button>
                        </Link>
                    ))}
                </Box>

                {/* Icônes + Menu Burger */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="GitHub">
                        <IconButton color="inherit" component="a" href="https://github.com/club-genie-informatique-enspy" target="_blank" rel="noopener noreferrer">
                            <GitHub />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="LinkedIn">
                        <IconButton color="inherit" component="a" href="https://www.linkedin.com/in/club-gi-enspy-1a919b29b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer">
                            <LinkedIn />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Basculez le thème">
                        <IconButton color="inherit" onClick={toggleDarkMode}>
                            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                        </IconButton>
                    </Tooltip>

                    {/* Menu Hamburger (mobile - en dessous de 1000px) */}
                    <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}>
                        <IconButton color="inherit" onClick={handleMenuOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Box>

            </Toolbar>

            {/* Menu Dropdown (sous la navbar) */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    width: '100%', // Même largeur que la navbar
                    '& .MuiPaper-root': {
                        width: '100%', // Ajustement pour occuper toute la largeur
                        backgroundColor: mode === 'light' ? '#fff' : '#333',
                    }
                }}
            >
                {pages.map((page) => (
                    <MenuItem
                        key={page.title}
                        onClick={handleMenuClose}
                        sx={{ width: '100%', padding: 0 }} // Force le menu à prendre toute la largeur
                    >
                        <Link href={page.path} passHref style={{ width: '100%' }}>
                            <Button
                                sx={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    padding: '12px 16px',
                                    color: mode === 'light' ? '#000' : '#fff'
                                }}
                            >
                                {page.title}
                            </Button>
                        </Link>
                    </MenuItem>
                ))}
            </Menu>

        </AppBar>
    );
}
