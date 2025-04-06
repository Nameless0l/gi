// src/app/layout.js
'use client';
import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createCustomTheme } from '@/configs/theme';
import Head from "next/head";
import Header from '@/components/Header';
import Footer from "@/components/Footer";

// Importation de polices de caractères
import { Inter } from 'next/font/google';
import NextTopLoader from "nextjs-toploader";
import { motion, AnimatePresence } from 'framer-motion';

// Configuration de la police Inter
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  // Gestion du mode clair/sombre
  const [mode, setMode] = useState('light');
  const [mounted, setMounted] = useState(false);

  // Créer le thème en fonction du mode
  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  // Vérifier les préférences du système et les préférences sauvegardées
  useEffect(() => {
    setMounted(true);
    
    // Vérifier s'il y a une préférence sauvegardée
    const savedMode = localStorage.getItem('theme-mode');
    
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Sinon, utiliser les préférences du système
      setMode('dark');
    }
    
    // Ajouter un listener pour les changements de préférences système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme-mode')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Fonction pour basculer entre les modes clair et sombre
  const toggleDarkMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  // Attend que le composant soit monté pour éviter les problèmes d'hydratation
  if (!mounted) {
    return null;
  }

  return (
    <html lang="fr" className={`${inter.variable}`}>
      <Head>
        <title>Club GI - L'innovation au service de l'informatique</title>
        <meta name="application-name" content="Club GI" />
        <meta name="description" content="Découvrez les initiatives, projets et événements du Club GI, le club de Génie Informatique de l'École Nationale Supérieure Polytechnique de Yaoundé." />
        <meta property="og:title" content="Club GI - L'innovation au service de l'informatique" />
        <meta property="og:description" content="Rejoignez-nous pour explorer l'innovation technologique et découvrir les opportunités en informatique avec le Club GI de l'ENSPY." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.clubgi-enspy.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" /> 
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          {/* Indicateur de chargement pour la navigation */}
          <NextTopLoader 
            color={theme.palette.primary.main}
            showSpinner={false}
            height={3}
          />
          
          {/* En-tête */}
          <Header toggleDarkMode={toggleDarkMode} mode={mode} />
          
          {/* Contenu principal avec animation de transition */}
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
          
          {/* Pied de page */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}