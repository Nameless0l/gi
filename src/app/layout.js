// src/app/layout.js
'use client';
import { useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createCustomTheme } from '@/configs/theme';
import Header from '@/components/Header';
import Head from "next/head";
import Footer from "@/components/Footer";


const pages = [
    { title: 'Accueil', path: '/' },
    { title: 'À propos', path: '/about' },
    { title: 'Activités', path: '/activities' },
    { title: 'Membres', path: '/members' },
    { title: 'Partenariats', path: '/partnerships' },
    { title: 'Contact', path: '/contact' },
    // Ajoutez d'autres pages ici
];

export default function RootLayout({ children }) {
    const [mode, setMode] = useState('light'); // Gestion du mode clair/sombre

    const theme = useMemo(() => createCustomTheme(mode), [mode]);

    const toggleDarkMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <html lang="fr">
    <Head>
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
            rel="stylesheet"
        />
        <title>Club GI - L'innovation au service de l'informatique</title>
        <link rel="icon" href="/favicon.ico" /> 
        <meta name="application-name" content="Club GI" />
        <meta name="description" content="Découvrez les initiatives, projets et événements du Club GI, le club de Génie Informatique de l'ENSPY." />
        <meta property="og:title" content="Club GI - L'innovation au service de l'informatique" />
        <meta property="og:description" content="Rejoignez-nous pour explorer l'innovation technologique et découvrir les opportunités en informatique avec le Club GI." />
        <meta property="og:image" content="/assets/images/club-gi-og-image.png" />
        <meta property="og:url" content="https://www.clubgi.com" />
    </Head>
    <body>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header pages={pages} toggleDarkMode={toggleDarkMode} mode={mode} />
            {children}
            <Footer pages={pages} />
        </ThemeProvider>
    </body>
    </html>

    );
}
