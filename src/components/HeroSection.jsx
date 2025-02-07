import React from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';

// Styled components
const GradientBox = styled(Box)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
    minHeight: '100vh',
    width: '100vw', // Ajout de la largeur complète
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    margin: 0, // Réinitialisation des marges
    marginBottom: 100, // Réinitialisation des marges
    padding: 0, // Réinitialisation des paddings
    boxSizing: 'border-box', // S'assure que les paddings sont inclus dans la largeur
    left: '50%', // Centre l'élément
    right: '50%', // Centre l'élément
    marginLeft: '-50vw', // Compense le décalage
    marginRight: '-50vw', // Compense le décalage
}));

const WHATSAPP_NUMBER = '00237683862442'; // Replace with actual number


const HeroSection = () => {
    const theme = useTheme();

    const handleWhatsAppClick = () => {
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
        window.open(whatsappUrl, '_blank');
    };
    return (
        <GradientBox>
            {/* Decorative circles */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '5%',
                    right: '10%',
                    width: '40vw',
                    height: '40vw',
                    maxWidth: 800,
                    maxHeight: 800,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                }}
            />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '5%',
                    width: '20vw',
                    height: '20vw',
                    maxWidth: 400,
                    maxHeight: 400,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', py: 8 }}>
                <Box sx={{ maxWidth: 800 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            opacity: 0.9,
                            letterSpacing: 2,
                            mb: 2,
                            display: 'block'
                        }}
                    >
                        École Nationale Supérieure Polytechnique
                    </Typography>

                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                            lineHeight: 1.1
                        }}
                    >
                        Club Génie
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{
                                display: 'block',
                                fontWeight: 700,
                                fontSize: 'inherit',
                                color: 'rgba(255, 255, 255, 0.9)'
                            }}
                        >
                            Informatique
                        </Typography>
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mb: 4,
                            opacity: 0.9,
                            maxWidth: '600px',
                            lineHeight: 1.5
                        }}
                    >
                        Forge ton avenir dans l'innovation technologique et rejoins une communauté
                        passionnée d'étudiants en informatique.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForward />}
                            onClick={handleWhatsAppClick}
                            sx={{
                                bgcolor: 'white',
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                                }
                            }}
                        >
                            Nous rejoindre
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': {
                                    borderColor: 'white',
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                }
                            }}
                        >
                            En savoir plus
                        </Button>
                    </Box>
                </Box>
            </Container>
        </GradientBox>
    );
};

export default HeroSection;