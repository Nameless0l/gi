// src/components/Footer.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  Button,
  TextField,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import {
  Facebook,
  Twitter as X,
  Instagram,
  LinkedIn,
  GitHub,
  YouTube,
  WhatsApp,
  Email,
  LocationOn,
  Phone,
  ArrowForward,
  KeyboardArrowUp
} from '@mui/icons-material';
import Link from 'next/link';

const socialLinks = [
  { icon: <Facebook />, name: 'Facebook', url: 'https://www.facebook.com/clubgenieinformatique' },
  { icon: <X />, name: 'X (Twitter)', url: 'https://x.com/club_info_enspy' },
  { icon: <Instagram />, name: 'Instagram', url: 'https://www.instagram.com/club_info_enspy' },
  { icon: <LinkedIn />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/club-gi-enspy-1a919b29b' },
  { icon: <GitHub />, name: 'GitHub', url: 'https://github.com/club-genie-informatique-enspy' },
  { icon: <WhatsApp />, name: 'WhatsApp', url: 'https://chat.whatsapp.com/clubgilink' },
  { icon: <YouTube />, name: 'YouTube', url: 'https://www.youtube.com/clubgichannel' },
];

const mainLinks = [
  { title: 'Accueil', path: '/' },
  { title: 'À propos', path: '/about' },
  { title: 'Activités', path: '/activities' },
  { title: 'Ressources', path: '/resources' },
  { title: 'Événements', path: '/events' },
  { title: 'Notre Hackathon', path: '/hackathon' },
  { title: 'Contact', path: '/contact' },
];

const otherLinks = [
  { title: 'Projets', path: '/activities/projects' },
  { title: 'Formations', path: '/activities/trainings' },
  { title: 'Équipe', path: '/about#equipe' },
  { title: 'Partenariats', path: '/partnerships' },
  { title: 'Tutoriels', path: '/resources/tutorials' },
  { title: 'FAQ', path: '/faq' },
];

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box 
      component="footer" 
      sx={{
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Pré-footer avec newsletter */}
      <Box 
        sx={{ 
          py: 6,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(208, 96, 14, 0.05)' : 'rgba(208, 96, 14, 0.03)', 
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Restez informé
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Abonnez-vous à notre newsletter pour recevoir les dernières actualités, 
                événements et opportunités du Club GI.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Votre adresse e-mail"
                  variant="outlined"
                  size="medium"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '4px',
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ 
                    minWidth: { xs: 'auto', sm: '180px' },
                    px: { xs: 2, sm: 3 },
                    whiteSpace: 'nowrap',
                  }}
                >
                  S'abonner
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contenu principal du footer */}
      <Container maxWidth="lg">
        <Box sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {/* Logo et description */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  component="img"
                  src="/logo.png"
                  alt="Club GI Logo"
                  sx={{ height: 50, mr: 1 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Club GI
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Le Club de Génie Informatique de l'École Nationale Supérieure Polytechnique de Yaoundé est 
                une association étudiante dédiée à l'innovation technologique et à l'excellence académique.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.name}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    sx={{
                      color: 'text.secondary',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-3px)',
                      },
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>
            
            {/* Liens */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
                Navigation
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {mainLinks.map((link) => (
                  <Link key={link.title} href={link.path} passHref>
                    <MuiLink
                      underline="none"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease-in-out',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        display: 'block',
                      }}
                    >
                      {link.title}
                    </MuiLink>
                  </Link>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
                Liens rapides
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {otherLinks.map((link) => (
                  <Link key={link.title} href={link.path} passHref>
                    <MuiLink
                      underline="none"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease-in-out',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        display: 'block',
                      }}
                    >
                      {link.title}
                    </MuiLink>
                  </Link>
                ))}
              </Box>
            </Grid>
            
            {/* Contact */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <LocationOn color="primary" sx={{ fontSize: 22 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    École Nationale Supérieure Polytechnique de Yaoundé<br />
                    BP 8390, Yaoundé, Cameroun
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Email color="primary" sx={{ fontSize: 22 }} />
                  <MuiLink
                    href="mailto:clubinfoenspy@gmail.com"
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    clubinfoenspy@gmail.com
                  </MuiLink>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Phone color="primary" sx={{ fontSize: 22 }} />
                  <MuiLink
                    href="tel:+237683862442"
                    underline="none"
                    sx={{
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                    }}
                  >
                    +237 683 86 24 42
                  </MuiLink>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Divider />
        
        {/* Copyright */}
        <Box 
          sx={{ 
            py: 4, 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © {currentYear} Club GI ENSPY. Tous droits réservés.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/privacy" passHref>
              <MuiLink
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Confidentialité
              </MuiLink>
            </Link>
            <Link href="/terms" passHref>
              <MuiLink
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.85rem',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                Conditions d'utilisation
              </MuiLink>
            </Link>
          </Box>
          
          <IconButton
            onClick={scrollToTop}
            aria-label="Retour en haut"
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <KeyboardArrowUp />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}