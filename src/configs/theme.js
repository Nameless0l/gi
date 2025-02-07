// src/theme.js
import { createTheme } from '@mui/material/styles';

// Fonction pour définir les tokens de design en fonction du mode
export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: '#0071ff', // Bleu principal pour le mode clair
                },
                secondary: {
                    main: '#ff4081', // Couleur secondaire
                },
                error: {
                    main: '#d32f2f', // Couleur d'erreur
                },
                warning: {
                    main: '#ff9800', // Couleur d'avertissement
                },
                info: {
                    main: '#1976d2', // Couleur d'information
                },
                success: {
                    main: '#388e3c', // Couleur de succès
                },
                background: {
                    default: '#f5f5f5', // Fond principal pour le mode clair
                    paper: '#ffffff', // Papier pour les composants comme les cartes
                },
                text: {
                    primary: '#000000', // Texte principal pour le mode clair
                    secondary: '#555555', // Texte secondaire
                    disabled: '#aaaaaa', // Texte désactivé
                },
            }
            : {
                primary: {
                    main: '#686868', // Gris pour le mode sombre
                },
                secondary: {
                    main: '#ff4081', // Couleur secondaire
                },
                error: {
                    main: '#d32f2f',
                },
                warning: {
                    main: '#ff9800',
                },
                info: {
                    main: '#1976d2',
                },
                success: {
                    main: '#388e3c',
                },
                background: {
                    default: '#121212', // Fond principal pour le mode sombre
                    paper: '#1e1e1e', // Papier pour le mode sombre
                },
                text: {
                    primary: '#ffffff', // Texte principal pour le mode sombre
                    secondary: '#e0e0e0', // Texte secondaire
                    disabled: '#757575', // Texte désactivé
                },
            }),
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif', // Police utilisée
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
            letterSpacing: '-0.5px',
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 700,
        },
        h4: {
            fontSize: '1.25rem',
            fontWeight: 600,
        },
        h5: {
            fontSize: '1rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: '0.875rem',
            fontWeight: 600,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
        },
        button: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Coins arrondis pour les boutons
                    padding: '10px 20px', // Espacement interne
                    textTransform: 'none', // Pas de transformation de texte (par défaut en majuscules)
                    boxShadow: 'none', // Pas de shadow sur les boutons
                    '&:hover': {
                        backgroundColor: '#1976d2', // Changer la couleur au survol
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    padding: '20px', // Espacement interne des papiers
                    borderRadius: '10px', // Coins arrondis
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px', // Coins arrondis pour les cartes
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Ombre légère
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: '8px', // Coins arrondis pour les champs de texte
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ccc', // Bordure initiale
                        },
                        '&:hover fieldset': {
                            borderColor: '#1976d2', // Bordure au survol
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#1976d2', // Bordure quand focus
                        },
                    },
                },
            },
        },
    },
});

// Fonction pour créer le thème avec le mode
export const createCustomTheme = (mode) => createTheme(getDesignTokens(mode));
