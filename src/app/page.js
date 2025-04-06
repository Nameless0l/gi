// src/app/page.js
'use client';
import React, { useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowForward, Code, School, Groups, Event, Engineering, Lightbulb } from '@mui/icons-material';

// Composants animés avec Framer Motion
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionCard = motion(Card);

// Animation pour le défilement
const scrollRevealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Données pour les différentes sections
const featuredProjects = [
  {
    title: "Assistant IA pour Étudiants",
    description: "Un chatbot alimenté par GPT pour aider les étudiants dans leurs études d'informatique.",
    image: "/images/projects/ai-assistant.jpg",
    link: "/activities/projects/ai-assistant"
  },
  {
    title: "Application Mobile de Campus",
    description: "Application mobile pour aider les étudiants à naviguer sur le campus et accéder aux ressources.",
    image: "/images/projects/campus-app.jpg",
    link: "/activities/projects/campus-app"
  },
  {
    title: "Système de Gestion de Bibliothèque",
    description: "Plateforme numérique pour gérer les emprunts et retours de livres de la bibliothèque de l'ENSPY.",
    image: "/images/projects/library-system.jpg",
    link: "/activities/projects/library-system"
  }
];

const upcomingEvents = [
  {
    title: "Hackathon IA",
    date: "15 Janvier 2025",
    description: "Un hackathon intensif de 24 heures sur les applications de l'intelligence artificielle.",
    image: "/images/events/hackathon-ia.jpg",
    link: "/hackathon"
  },
  {
    title: "Workshop Cloud Computing",
    date: "22 Février 2025",
    description: "Atelier pratique sur les services cloud et le déploiement d'applications.",
    image: "/images/events/cloud-workshop.jpg",
    link: "/events/cloud-workshop"
  }
];

const features = [
  {
    icon: <Code fontSize="large" color="primary" />,
    title: "Projets Innovants",
    description: "Développez des solutions techniques concrètes et innovantes en collaboration avec d'autres passionnés."
  },
  {
    icon: <School fontSize="large" color="primary" />,
    title: "Formation Continue",
    description: "Accédez à des ressources et ateliers exclusifs pour développer vos compétences techniques."
  },
  {
    icon: <Groups fontSize="large" color="primary" />,
    title: "Réseau Professionnel",
    description: "Connectez-vous avec d'autres étudiants, alumni et professionnels du secteur informatique."
  },
  {
    icon: <Event fontSize="large" color="primary" />,
    title: "Événements Tech",
    description: "Participez à des hackathons, conférences et compétitions de programmation."
  },
  {
    icon: <Engineering fontSize="large" color="primary" />,
    title: "Mentorat",
    description: "Bénéficiez de l'expérience d'étudiants seniors et de professionnels de l'industrie."
  },
  {
    icon: <Lightbulb fontSize="large" color="primary" />,
    title: "Incubation d'Idées",
    description: "Transformez vos idées en projets viables avec notre soutien et nos ressources."
  }
];

export default function HomePage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Références pour l'animation au scroll
  const sectionsRef = useRef([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observer tous les éléments avec la classe section-animate
    document.querySelectorAll('.section-animate').forEach((section) => {
      observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Section Hero */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 'calc(100vh - 70px)', md: '85vh' },
          minHeight: { xs: 500, md: 600 },
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'background.default',
          overflow: 'hidden',
        }}
      >
        {/* Cercles décoratifs */}
        <Box
          sx={{
            position: 'absolute',
            width: { xs: '250px', md: '400px' },
            height: { xs: '250px', md: '400px' },
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(208, 96, 14, 0.15) 0%, rgba(208, 96, 14, 0) 70%)'
              : 'radial-gradient(circle, rgba(208, 96, 14, 0.1) 0%, rgba(208, 96, 14, 0) 70%)',
            top: { xs: '-120px', md: '-150px' },
            right: { xs: '-100px', md: '10%' },
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: { xs: '300px', md: '500px' },
            height: { xs: '300px', md: '500px' },
            borderRadius: '50%',
            background: theme.palette.mode === 'dark'
              ? 'radial-gradient(circle, rgba(208, 96, 14, 0.15) 0%, rgba(208, 96, 14, 0) 70%)'
              : 'radial-gradient(circle, rgba(208, 96, 14, 0.1) 0%, rgba(208, 96, 14, 0) 70%)',
            bottom: { xs: '-150px', md: '-200px' },
            left: { xs: '-150px', md: '-100px' },
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    mb: 1,
                    display: 'block'
                  }}
                >
                  École Nationale Supérieure Polytechnique de Yaoundé
                </Typography>
                
                <MotionTypography
                  variant="h1"
                  component="h1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  Club Génie
                  <Typography
                    component="span"
                    variant="h1"
                    sx={{
                      display: 'block',
                      color: 'primary.main',
                      fontWeight: 700,
                      fontSize: 'inherit',
                    }}
                  >
                    Informatique
                  </Typography>
                </MotionTypography>

                <MotionTypography
                  variant="subtitle1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    maxWidth: '600px',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}
                >
                  Forgez votre avenir dans le domaine de l'informatique en rejoignant notre communauté
                  d'innovateurs, de créateurs et de passionnés de technologies.
                </MotionTypography>

                <MotionBox
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  gap={2}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForward />}
                    component={Link}
                    href="/about"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    Découvrir le club
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    component={Link}
                    href="/contact"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    Nous rejoindre
                  </Button>
                </MotionBox>
              </MotionBox>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 }, mb: { xs: 4, md: 0 } }}>
              <MotionBox
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <Box
                  component="img"
                  src="/hero.jpg"
                  alt="Étudiants travaillant sur un projet informatique"
                  sx={{
                    width: '100%',
                    maxWidth: 600,
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                />
                {/* Badges décoratifs */}
                <Paper
                  elevation={4}
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '-10px', md: '30px' },
                    left: { xs: '10px', md: '-30px' },
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    zIndex: 2,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    +5 Projets
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    réalisés chaque année
                  </Typography>
                </Paper>
                <Paper
                  elevation={4}Histoire du Club GI
                  sx={{
                    position: 'absolute',
                    top: { xs: '-10px', md: '40px' },
                    right: { xs: '10px', md: '-20px' },
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    zIndex: 2,
                    display: { xs: 'none', sm: 'block' }
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    +200 Membres
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    actifs et alumni
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Section À propos */}
      <Box
        className="section-animate"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: 'background.accent',
        }}
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography
                variant="h6"
                component="p"
                color="primary"
                sx={{ fontWeight: 600, mb: 2 }}
                className="animate-text"
              >
                À propos de nous
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 700, mb: 3 }}
                className="animate-text"
              >
                Le Club Génie Informatique de l'ENSPY
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 4, color: 'text.secondary' }}
                className="animate-text"
              >
                Fondé en 2012, le Club GI est une association étudiante dynamique dédiée à l'innovation 
                et au partage de connaissances dans le domaine du génie informatique. Depuis sa création, 
                le club a servi de plateforme pour explorer, apprendre et collaborer sur des projets 
                informatiques innovants. En tant que 11ème bureau exécutif, nous poursuivons cette 
                tradition d'excellence et d'innovation.
              </Typography>
              <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="/about"
                  sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                  className="animate-button"
                >
                  En savoir plus
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 3,
                }}
                className="animate-grid"
              >
                <Card sx={{ 
                  borderRadius: 2, 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  height: '100%' 
                }}>
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <Code color="primary" sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                      Apprendre
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Développez vos compétences techniques à travers des ateliers pratiques et des projets concrets.
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card sx={{ 
                  borderRadius: 2, 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  height: '100%'  
                }}>
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <Groups color="primary" sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                      Accomplir
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Travaillez en équipe pour relever des défis technologiques et réaliser des projets ambitieux.
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card 
                  sx={{ 
                    borderRadius: 2, 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    gridColumn: { xs: 'auto', sm: '1 / span 2' },
                    height: '100%' 
                  }}
                >
                  <CardContent>
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2
                      }}
                    >
                      <Lightbulb color="primary" sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h6" align="center" gutterBottom>
                      Innover
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Explorez de nouvelles idées et technologies pour créer des solutions innovantes aux problèmes réels.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Projets */}
      <Box
        className="section-animate"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: 'background.default',
        }}
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: 600, mb: 2 }}
              className="animate-text"
            >
              Nos réalisations
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 3 }}
              className="animate-text"
            >
              Projets innovants
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                color: 'text.secondary'
              }}
              className="animate-text"
            >
              Découvrez les projets développés par nos membres, allant des applications web et mobiles
              aux systèmes embarqués et solutions basées sur l'intelligence artificielle.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {featuredProjects.map((project, index) => (
              <Grid item xs={12} md={4} key={project.title}>
                <MotionCard
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  }}
                  variants={scrollRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2 }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={project.image || "/images/placeholder-project.jpg"}
                    alt={project.title}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {project.description}
                    </Typography>
                    <Button
                      component={Link}
                      href={project.link}
                      color="primary"
                      sx={{ mt: 1, fontWeight: 600 }}
                      endIcon={<ArrowForward />}
                    >
                      Voir le projet
                    </Button>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href="/activities/projects"
              endIcon={<ArrowForward />}
              sx={{ px: 4, py: 1.5, fontWeight: 600 }}
            >
              Tous nos projets
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Section Services/Features */}
      <Box
        className="section-animate"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: 'background.accent',
        }}
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: 600, mb: 2 }}
              className="animate-text"
            >
              Ce que nous offrons
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 3 }}
              className="animate-text"
            >
              Rejoignez notre communauté
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                color: 'text.secondary'
              }}
              className="animate-text"
            >
              Le Club GI offre de nombreuses opportunités pour développer vos compétences,
              élargir votre réseau et concrétiser vos idées.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <MotionCard
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    }
                  }}
                  variants={scrollRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Section Événements */}
      <Box
        className="section-animate"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: 'background.default',
        }}
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: 600, mb: 2 }}
              className="animate-text"
            >
              Nos événements
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 3 }}
              className="animate-text"
            >
              Prochains rendez-vous
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                color: 'text.secondary'
              }}
              className="animate-text"
            >
              Participez à nos événements pour apprendre, réseauter et vous amuser.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {upcomingEvents.map((event, index) => (
              <Grid item xs={12} md={6} key={event.title}>
                <MotionCard
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                  }}
                  variants={scrollRevealVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.2 }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      height: { xs: 200, sm: 'auto' }
                    }}
                    image={event.image || "/images/placeholder-event.jpg"}
                    alt={event.title}
                  />
                  <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                    <Typography 
                      variant="caption" 
                      component="p" 
                      sx={{ 
                        color: 'primary.main', 
                        fontWeight: 600,
                        mb: 1 
                      }}
                    >
                      {event.date}
                    </Typography>
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {event.description}
                    </Typography>
                    <Button
                      component={Link}
                      href={event.link}
                      color="primary"
                      sx={{ mt: 1, fontWeight: 600 }}
                      endIcon={<ArrowForward />}
                    >
                      Détails
                    </Button>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              href="/events"
              endIcon={<ArrowForward />}
              sx={{ px: 4, py: 1.5, fontWeight: 600 }}
            >
              Tous nos événements
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Section CTA */}
      <Box
        className="section-animate"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: 'primary.main',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        {/* Cercles décoratifs */}
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            top: '-200px',
            right: '-100px',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            bottom: '-150px',
            left: '-50px',
            zIndex: 1,
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box 
            sx={{ 
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                maxWidth: 900,
                mx: 'auto'
              }}
              className="animate-text"
            >
              Prêt à rejoindre le Club GI ?
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{
                mb: 4,
                maxWidth: 700,
                mx: 'auto',
                fontWeight: 'normal',
                opacity: 0.9
              }}
              className="animate-text"
            >
              Que vous soyez débutant ou expert en informatique, nous vous accueillons pour apprendre, 
              développer vos compétences et concrétiser vos idées dans un environnement collaboratif.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mt: 2
              }}
              className="animate-button"
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/contact"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  }
                }}
              >
                Rejoindre maintenant
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="/hackathon"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Découvrir notre hackathon
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Section CSS pour les animations */}
      <style jsx global>{`
        .section-animate .animate-text,
        .section-animate .animate-button,
        .section-animate .animate-grid {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .section-animate.animate .animate-text,
        .section-animate.animate .animate-button,
        .section-animate.animate .animate-grid {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-animate .animate-text:nth-child(1) { transition-delay: 0.1s; }
        .section-animate .animate-text:nth-child(2) { transition-delay: 0.2s; }
        .section-animate .animate-text:nth-child(3) { transition-delay: 0.3s; }
        .section-animate .animate-button { transition-delay: 0.4s; }
        .section-animate .animate-grid { transition-delay: 0.3s; }
      `}</style>
    </Box>
  );
}