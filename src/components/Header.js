import React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Tooltip } from '@mui/material';
import { Menu as MenuIcon, GitHub, LinkedIn, Brightness4, Brightness7 } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ pages, toggleDarkMode, mode }) {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: mode === 'light' ? (theme) => theme.palette.primary.main
                : (theme) => theme.palette.background.paper, borderRadius: 0}}>
            <Toolbar sx={{ minHeight: 50 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src="logo.png" 
                    alt="Logo"
                    style={{ width: 80, height: 60, marginRight: 16 }} 
                />
                </Box>
                <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                    {pages.map((page) => (
                        <Link key={page.title} href={page.path} passHref>
                            <Button sx={{ color: 'white' }}>
                                {page.title}
                            </Button>
                        </Link>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="GitHub">
                        <IconButton color="inherit" component="a" href="https://github.com/club-genie-informatique-enspy" target="_blank" rel="noopener noreferrer">
                            <GitHub />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="LinkedIn">
                        <IconButton color="inherit" component="a" href="https://www.linkedin.com/in/club-gi-enspy-1a919b29b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                            <LinkedIn />
                        </IconButton>
                    </Tooltip>

                    {/* Theme Toggle Icon */}
                    <Tooltip title="Basculez le thème">
                        <IconButton color="inherit" onClick={toggleDarkMode}>
                            {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
                        </IconButton>
                    </Tooltip>
                </Box>

            </Toolbar>
        </AppBar>
    );
}
