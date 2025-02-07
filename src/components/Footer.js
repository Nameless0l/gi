import React from 'react';
import { Box, Container, Typography, Divider, Grid, IconButton, Paper, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Phone, Email, LocationOn } from '@mui/icons-material';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';

const SectionDivider = () => (
    <Box sx={{ my: 6 }}>
        <Divider>
            <Box
                component="span"
                sx={{
                    width: 10,
                    height: 10,
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    display: 'inline-block',
                }}
            />
        </Divider>
    </Box>
);

export default function Footer({ pages }) {
    const theme = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <Paper
            component="footer"
            sx={{
                mt: '5px',
                backgroundColor: 'background.paper',
                borderTop: `1px solid ${theme.palette.divider}`,
                borderRadius: 0
            }}
        >
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {/* À propos */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Club GI
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Le Club GI est une association étudiante dynamique dédiée à l'innovation
                            et au partage de connaissances dans le domaine du génie informatique.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {/* Facebook Icon with Link */}
                            <IconButton
                                color="primary"
                                aria-label="Facebook"
                                component="a"
                                href="https://www.facebook.com/clubgenieinformatique"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Facebook />
                            </IconButton>

                            {/* Twitter Icon with Link */}
                            <IconButton
                                color="primary"
                                aria-label="Twitter"
                                component="a"
                                href="https://twitter.com/clubgenieinfo"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Twitter />
                            </IconButton>

                            {/* Instagram Icon with Link */}
                            <IconButton
                                color="primary"
                                aria-label="Instagram"
                                component="a"
                                href="https://www.instagram.com/club_info_enspy?igsh=MWU1MXdhNDQxa3NjMQ=="
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Instagram />
                            </IconButton>

                            {/* LinkedIn Icon with Link */}
                            <IconButton
                                color="primary"
                                aria-label="LinkedIn"
                                component="a"
                                href="https://www.linkedin.com/in/club-gi-enspy-1a919b29b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <LinkedIn />
                            </IconButton>
                        </Box>

                    </Grid>

                    {/* Liens rapides */}
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Liens rapides
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {pages.map((page) => (
                                <Link key={page.title} href={page.path} passHref>
                                    <Typography variant="body2" color="text.secondary">
                                        {page.title}
                                    </Typography>
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Contact */}
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <LocationOn color="primary" />
                                <Typography variant="body2" color="text.secondary">
                                   Melen, Yaoundé, Cameroun
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Email color="primary" />
                                <Typography variant="body2" color="text.secondary">
                                    clubgenieinformatique@gmail.com
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <Phone color="primary" />
                                <Typography variant="body2" color="text.secondary">
                                    +237 683 86 24 42
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Newsletter */}
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Newsletter
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Restez informé de nos dernières actualités.
                        </Typography>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                size="small"
                                label="Email"
                                variant="outlined"
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: 'fit-content' }}
                            >
                                S'abonner
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* Copyright */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 8, borderTop: `1px solid ${theme.palette.divider}`, pt: 3 }}
                >
                    © {currentYear} Club GI. Tous droits réservés.
                </Typography>
            </Container>
        </Paper>
    );
}

export { SectionDivider };
