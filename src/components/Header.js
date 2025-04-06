// src/components/Header.js
'use client';
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Divider,
  useMediaQuery,
  useScrollTrigger,
  Fade,
  Link as MuiLink
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Structure de navigation améliorée avec sous-menus
const navItems = [
  {
    title: 'Accueil',
    path: '/',
    featured: false
  },
  {
    title: 'À propos',
    path: '/about',
    featured: false,
    submenu: [
      { title: 'Notre Histoire', path: '/about#histoire' },
      { title: 'Notre Mission', path: '/about#mission' },
      { title: 'Notre Équipe', path: '/about#equipe' }
    ]
  },
  {
    title: 'Activités',
    path: '/activities',
    featured: false,
    submenu: [
      { title: 'Projets', path: '/activities#projets' },
      { title: 'Hackathons', path: '/activities#hackathons' },
      { title: 'Formations', path: '/activities#formations' }
    ]
  },
  {
    title: 'Ressources',
    path: '/resources',
    featured: false,
    submenu: [
      { title: 'Tutoriels', path: '/resources/tutorials' },
      { title: 'Bibliothèque', path: '/resources/library' },
      { title: 'Outils', path: '/resources/tools' }
    ]
  },
  {
    title: 'Notre Hackathon',
    path: '/hackathon',
    featured: true // Élément mis en avant
  }
];

// Composant Header inspiré de Mila
export default function Header({ toggleDarkMode, mode }) {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Animation du header au scroll
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSubmenuToggle = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  // Style de lien actif 
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        color="inherit" 
        sx={{
          bgcolor: trigger ? (mode === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)') : 'transparent',
          backdropFilter: trigger ? 'blur(10px)' : 'none',
          boxShadow: trigger ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
          borderBottom: trigger ? 'none' : `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          transition: 'all 0.3s ease'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: trigger ? 70 : 90, transition: 'height 0.3s ease' }}>
            {/* Logo */}
            <Link href="/" passHref>
              <Box 
                component="a" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mr: 4,
                  textDecoration: 'none'
                }}
              >
                <Box 
                  component="img"
                  src="/logo.png"
                  alt="Club GI Logo"
                  sx={{ 
                    height: trigger ? 40 : 50, 
                    transition: 'height 0.3s ease',
                    mr: 1
                  }}
                />
                <Box 
                  sx={{ 
                    typography: 'h6',
                    fontWeight: 700, 
                    color: 'text.primary',
                    display: { xs: 'none', md: 'block' },
                    fontSize: trigger ? '1.1rem' : '1.25rem',
                    transition: 'font-size 0.3s ease'
                  }}
                >
                  Club GI
                </Box>
              </Box>
            </Link>

            {/* Navigation Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: '0.5rem' }}>
              {navItems.map((item, index) => (
                <Box 
                  key={item.title}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  sx={{ position: 'relative' }}
                >
                  <Link href={item.path} passHref>
                    <Button
                      component="a"
                      sx={{
                        color: 'text.primary',
                        mx: 1,
                        py: 1,
                        px: 1.5,
                        fontWeight: isActive(item.path) ? 700 : 500,
                        position: 'relative',
                        '&:after': isActive(item.path) ? {
                          content: '""',
                          position: 'absolute',
                          width: '30%',
                          height: '3px',
                          bottom: '6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'primary.main',
                          borderRadius: '2px'
                        } : {},
                        ...(item.featured && {
                          color: 'primary.main',
                          fontWeight: 600,
                        }),
                      }}
                    >
                      {item.title}
                    </Button>
                  </Link>
                  
                  {/* Sous-menu desktop */}
                  {item.submenu && (
                    <Fade in={hoveredItem === index}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          zIndex: 1000,
                          mt: 0.5,
                          py: 1,
                          borderRadius: 1,
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                          bgcolor: 'background.paper',
                          minWidth: 180,
                          display: hoveredItem === index ? 'block' : 'none',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: -5,
                            left: 0,
                            width: '100%',
                            height: 10,
                          },
                        }}
                      >
                        <List disablePadding>
                          {item.submenu.map((subItem) => (
                            <ListItem key={subItem.title} disablePadding>
                              <Link href={subItem.path} passHref style={{ width: '100%' }}>
                                <ListItemText 
                                  primary={subItem.title} 
                                  primaryTypographyProps={{ 
                                    sx: { 
                                      py: 1, 
                                      px: 2,
                                      fontWeight: 500,
                                      fontSize: '0.9rem',
                                      '&:hover': {
                                        color: 'primary.main',
                                        bgcolor: 'background.accent',
                                      }
                                    } 
                                  }} 
                                />
                              </Link>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Fade>
                  )}
                </Box>
              ))}
            </Box>

            {/* Boutons d'action */}
            <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              {/* Bouton thème */}
              <IconButton
                onClick={toggleDarkMode}
                color="inherit"
                aria-label="Changer de thème"
                sx={{ ml: 1 }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>

              {/* Bouton Contact (uniquement sur desktop) */}
              <Button
                component={Link}
                href="/contact"
                variant="contained"
                color="primary"
                sx={{
                  ml: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 600,
                }}
              >
                Nous Contacter
              </Button>

              {/* Bouton Menu (mobile) */}
              <IconButton
                color="inherit"
                aria-label="Ouvrir le menu"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 1, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Navigation Mobile (Drawer) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: { xs: '100%', sm: 400 },
            boxSizing: 'border-box',
            bgcolor: 'background.default',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Club GI Logo"
              sx={{ height: 40, mr: 1 }}
            />
            <Box sx={{ typography: 'h6', fontWeight: 700 }}>Club GI</Box>
          </Box>
          <IconButton color="inherit" onClick={handleDrawerToggle} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider />
        
        <List sx={{ pt: 1 }}>
          {navItems.map((item, index) => (
            <React.Fragment key={item.title}>
              <ListItem disablePadding>
                {item.submenu ? (
                  <ListItemText
                    onClick={() => handleSubmenuToggle(index)}
                    primary={
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        color: item.featured ? 'primary.main' : 'text.primary',
                        fontWeight: isActive(item.path) || item.featured ? 700 : 500,
                        py: 1.5,
                        px: 2
                      }}>
                        {item.title}
                        {openSubmenu === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </Box>
                    }
                  />
                ) : (
                  <Link href={item.path} passHref style={{ width: '100%' }}>
                    <ListItemText 
                      onClick={handleDrawerToggle}
                      primary={item.title} 
                      primaryTypographyProps={{ 
                        sx: { 
                          py: 1.5, 
                          px: 2,
                          color: item.featured ? 'primary.main' : 'text.primary',
                          fontWeight: isActive(item.path) || item.featured ? 700 : 500
                        } 
                      }} 
                    />
                  </Link>
                )}
              </ListItem>
              
              {item.submenu && (
                <Collapse in={openSubmenu === index} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ bgcolor: 'background.accent', mx: 2, borderRadius: 1 }}>
                    {item.submenu.map((subItem) => (
                      <ListItem key={subItem.title} disablePadding>
                        <Link href={subItem.path} passHref style={{ width: '100%' }}>
                          <ListItemText 
                            onClick={handleDrawerToggle}
                            primary={subItem.title} 
                            primaryTypographyProps={{ 
                              sx: { 
                                py: 1.5, 
                                px: 2,
                                pl: 4,
                                fontSize: '0.9rem'
                              } 
                            }} 
                          />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
              
              <Divider sx={{ my: 0.5 }} />
            </React.Fragment>
          ))}
          
          {/* Bouton Contact (mobile) */}
          <ListItem sx={{ mt: 2, px: 2 }}>
            <Button
              component={Link}
              href="/contact"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleDrawerToggle}
              sx={{ py: 1.5 }}
            >
              Nous Contacter
            </Button>
          </ListItem>
        </List>
      </Drawer>
      
      {/* Espacement pour compenser la hauteur de la navbar fixe */}
      <Toolbar sx={{ height: trigger ? 70 : 90, transition: 'height 0.3s ease' }} />
    </>
  );
}