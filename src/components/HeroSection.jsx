// src/components/HeroSection.js
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Composant HeroSection réutilisable pour les entêtes de pages
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Titre principal
 * @param {string} props.subtitle - Sous-titre ou description
 * @param {string} props.overline - Texte affiché au-dessus du titre (optionnel)
 * @param {string} props.primaryButtonText - Texte du bouton principal (optionnel)
 * @param {string} props.primaryButtonLink - Lien du bouton principal (optionnel)
 * @param {string} props.secondaryButtonText - Texte du bouton secondaire (optionnel)
 * @param {string} props.secondaryButtonLink - Lien du bouton secondaire (optionnel)
 * @param {React.ReactNode} props.endIcon - Icône à la fin du bouton principal (optionnel)
 * @param {React.ReactNode} props.secondaryEndIcon - Icône à la fin du bouton secondaire (optionnel)
 * @param {string} props.imageSrc - Source de l'image (optionnel)
 * @param {string} props.imageAlt - Texte alternatif pour l'image (optionnel)
 * @param {number} props.minHeight - Hauteur minimale en vh (par défaut: 50)
 * @param {boolean} props.fullWidth - Si true, le contenu prend toute la largeur (par défaut: false)
 * @param {React.ReactNode} props.children - Contenu supplémentaire (optionnel)
 */
const HeroSection = ({
  title,
  subtitle,
  overline,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  endIcon,
  secondaryEndIcon,
  imageSrc,
  imageAlt,
  minHeight = 50,
  fullWidth = false,
  children
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: `${minHeight}vh`,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'white',
        overflow: 'hidden',
        py: { xs: 8, md: 10 }
      }}
    >
      {/* Cercles décoratifs */}
      <Box
        sx={{
          position: 'absolute',
          width: '35vw',
          height: '35vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          top: '-10vw',
          right: '-5vw',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          width: '25vw',
          height: '25vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
          bottom: '5vw',
          left: '-10vw',
          zIndex: 0,
        }}
      />

      <Container maxWidth={fullWidth ? false : "lg"} sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            maxWidth: fullWidth ? 'none' : '800px',
            mx: fullWidth ? 0 : 'auto',
            textAlign: fullWidth ? 'left' : 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {overline && (
              <Typography
                variant="overline"
                component="p"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 600,
                  letterSpacing: 2,
                  mb: 2,
                  fontSize: { xs: '0.8rem', md: '0.9rem' }
                }}
              >
                {overline}
              </Typography>
            )}
            
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                lineHeight: 1.2
              }}
            >
              {title}
            </Typography>
            
            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: 4,
                fontWeight: 400,
                opacity: 0.9,
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.25rem' }
              }}
            >
              {subtitle}
            </Typography>
            
            {(primaryButtonText || secondaryButtonText) && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                  mt: 4,
                  justifyContent: fullWidth ? 'flex-start' : 'center'
                }}
              >
                {primaryButtonText && (
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={endIcon}
                    component={Link}
                    href={primaryButtonLink || '#'}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                      }
                    }}
                  >
                    {primaryButtonText}
                  </Button>
                )}
                
                {secondaryButtonText && (
                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={secondaryEndIcon}
                    component={Link}
                    href={secondaryButtonLink || '#'}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    {secondaryButtonText}
                  </Button>
                )}
              </Box>
            )}
            
            {/* Image si fournie */}
            {imageSrc && (
              <Box
                sx={{
                  mt: 6,
                  display: 'flex',
                  justifyContent: fullWidth ? 'flex-start' : 'center'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <Box
                    component="img"
                    src={imageSrc}
                    alt={imageAlt || "Image d'illustration"}
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: 2,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    }}
                  />
                </motion.div>
              </Box>
            )}
            
            {/* Contenu supplémentaire si fourni */}
            {children}
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;