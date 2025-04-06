// src/components/BackToTopButton.js
import React, { useState, useEffect } from 'react';
import { Fab, useScrollTrigger, Zoom, Box } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

/**
 * Composant qui affiche un bouton flottant pour revenir en haut de la page
 * ou à une position spécifique lorsque l'utilisateur fait défiler la page.
 * 
 * @param {Object} props - Propriétés du composant
 * @param {number} props.threshold - Seuil de défilement à partir duquel le bouton apparaît (en pixels)
 * @param {string} props.targetId - ID de l'élément cible pour le défilement (facultatif)
 * @param {number} props.offset - Décalage par rapport à la cible ou au haut de la page (en pixels)
 */
const BackToTopButton = ({ 
  threshold = 100,
  targetId = null,
  offset = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Détecter le défilement au-delà du seuil
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });
  
  useEffect(() => {
    setIsVisible(trigger);
  }, [trigger]);
  
  const handleClick = () => {
    // Si un ID cible est fourni, faire défiler jusqu'à cet élément
    if (targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = targetPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        return;
      }
    }
    
    // Sinon, faire défiler jusqu'en haut de la page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <Zoom in={isVisible}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Fab
          color="primary"
          size="medium"
          aria-label="retour en haut"
          sx={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Zoom>
  );
};

export default BackToTopButton;