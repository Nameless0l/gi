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
        <title>Club GI ENSPY - Innovation et Projets Informatiques à Polytechnique Yaoundé</title>
        <meta name="application-name" content="Club GI - École Nationale Supérieure Polytechnique de Yaoundé" />
        <meta name="description" content="Le Club de Génie Informatique (GI) de l'ENSPY propose des projets innovants, formations technologiques, hackathons et ateliers pour les étudiants en informatique à Yaoundé." />
        <meta name="keywords" content="Club GI, ENSPY, Polytechnique Yaoundé, génie informatique, programmation, technologie, innovation, projets étudiants, Cameroun" />
        <meta name="author" content="Club GI ENSPY" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Club GI ENSPY - L'excellence en informatique à Polytechnique Yaoundé" />
        <meta property="og:description" content="Découvrez les projets innovants, formations et événements du Club de Génie Informatique de l'École Nationale Supérieure Polytechnique de Yaoundé." />
        <meta property="og:image" content="/images/club-gi-cover.jpg" />
        <meta property="og:url" content="https://www.gi-enspy.com" />
        <meta property="og:site_name" content="Club GI ENSPY" />
        <meta property="og:locale" content="fr_FR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Club GI ENSPY - L'excellence en informatique à Polytechnique Yaoundé" />
        <meta name="twitter:description" content="Découvrez les projets innovants, formations et événements du Club de Génie Informatique de l'École Nationale Supérieure Polytechnique de Yaoundé." />
        <meta name="twitter:image" content="/images/club-gi-cover.jpg" />
        
        {/* Responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Favicon et liens d'icônes */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.gi-enspy.com" />
        
        {/* Contrôle du thème pour les navigateurs mobiles */}
        <meta name="theme-color" content={mode === 'dark' ? '#121212' : '#ffffff'} />
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
          
          {/* Schéma structuré pour l'organisation */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Club GI - École Nationale Supérieure Polytechnique de Yaoundé",
              "alternateName": "Club GI ENSPY",
              "url": "https://www.gi-enspy.com",
              "logo": "https://api-hw.gi-enspy.com/mini_orange.png",
              "description": "Club de Génie Informatique de l'École Nationale Supérieure Polytechnique de Yaoundé",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Yaoundé",
                "addressRegion": "Centre",
                "addressCountry": "Cameroun"
              },
              "parentOrganization": {
                "@type": "EducationalOrganization",
                "name": "École Nationale Supérieure Polytechnique de Yaoundé",
                "url": "https://www.polytechnique.cm"
              }
            })}
          </script>
          
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