// src/configs/theme.js
import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#D0600E', // Couleur principale orange chaleureuse
            light: '#E87D40',
            dark: '#A34800',
          },
          secondary: {
            main: '#334155', // Bleu-gris foncé comme couleur secondaire (similaire à Mila)
            light: '#64748B',
            dark: '#1E293B',
          },
          background: {
            default: '#ffffff',
            paper: '#f8fafc', // Légèrement teinté comme Mila
            accent: '#F1F5F9', // Pour les sections alternées
          },
          text: {
            primary: '#0F172A', // Presque noir pour texte principal
            secondary: '#475569', // Gris pour le texte secondaire
            light: '#94A3B8', // Gris clair pour les éléments moins importants
          },
        }
      : {
          primary: {
            main: '#E87D40', // Version plus claire pour le mode sombre
            light: '#F59B6C',
            dark: '#A34800',
          },
          secondary: {
            main: '#64748B',
            light: '#94A3B8',
            dark: '#334155',
          },
          background: {
            default: '#0F172A', // Bleu très foncé comme fond principal
            paper: '#1E293B', // Plus clair que le fond mais toujours foncé
            accent: '#334155', // Pour les sections alternées en mode sombre
          },
          text: {
            primary: '#F8FAFC', // Blanc cassé pour le texte principal
            secondary: '#CBD5E1', // Gris clair pour le texte secondaire
            light: '#64748B', // Gris moyen pour les éléments moins importants
          },
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '0.75rem 1.5rem',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          textTransform: 'none',
          boxShadow: 'none',
        },
        containedPrimary: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(208, 96, 14, 0.2)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'rgba(203, 213, 225, 0.3)', // Bordure subtile comme sur Mila
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '2rem',
          paddingRight: '2rem',
          '@media (max-width:600px)': {
            paddingLeft: '1rem',
            paddingRight: '1rem',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            width: '0',
            height: '2px',
            bottom: '-4px',
            left: '0',
            background: 'currentColor',
            transition: 'width 0.3s ease',
          },
          '&:hover:after': {
            width: '100%',
          },
        },
      },
    },
  },
});

// Fonction pour créer le thème avec le mode
export const createCustomTheme = (mode) => createTheme(getDesignTokens(mode));