// src/app/activities/page.js
'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Tabs,
  Tab,
  Paper,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Code, 
  School, 
  Event, 
  ArrowForward, 
  CalendarToday, 
  AccessTime,
  LocationOn
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: index => ({ 
    opacity: 1, 
    y: 0,
    transition: {
      delay: index * 0.1, 
      duration: 0.5, 
      ease: "easeOut"
    }
  })
};

// Données pour les différentes activités
const projectsData = [
  {
    id: 1,
    title: "Application Mobile Campus",
    description: "Application pour aider les étudiants à naviguer sur le campus, accéder aux horaires des cours et aux ressources académiques.",
    image: "/images/projects/campus-app.jpg",
    category: "Mobile",
    status: "En cours",
    tech: ["React Native", "Firebase", "Node.js"],
    link: "/activities/projects/campus-app"
  },
  {
    id: 2,
    title: "Système de Gestion de Bibliothèque",
    description: "Plateforme web pour gérer les emprunts et retours de livres de la bibliothèque de l'ENSPY.",
    image: "/images/projects/library-system.jpg",
    category: "Web",
    status: "Terminé",
    tech: ["React", "Express", "MongoDB"],
    link: "/activities/projects/library-system"
  },
  {
    id: 3,
    title: "Assistant IA pour Étudiants",
    description: "Chatbot alimenté par GPT pour aider les étudiants dans leurs études d'informatique.",
    image: "/images/projects/ai-assistant.jpg",
    category: "IA",
    status: "En cours",
    tech: ["Python", "TensorFlow", "OpenAI API"],
    link: "/activities/projects/ai-assistant"
  },
  {
    id: 4,
    title: "Plateforme de Covoiturage",
    description: "Application web permettant aux étudiants de l'ENSPY de partager des trajets pour le transport quotidien.",
    image: "/images/projects/carpooling.jpg",
    category: "Web",
    status: "En cours",
    tech: ["Vue.js", "Laravel", "MySQL"],
    link: "/activities/projects/carpooling"
  },
  {
    id: 5,
    title: "Système IoT de Surveillance Environnementale",
    description: "Réseau de capteurs pour surveiller les conditions environnementales sur le campus (température, humidité, qualité de l'air).",
    image: "/images/projects/environmental-monitoring.jpg",
    category: "IoT",
    status: "Prototype",
    tech: ["Arduino", "ESP32", "MQTT", "React"],
    link: "/activities/projects/environmental-monitoring"
  },
  {
    id: 6,
    title: "Plateforme d'E-learning",
    description: "Site web offrant des cours et ressources d'apprentissage pour les étudiants en informatique.",
    image: "/images/projects/e-learning.jpg",
    category: "Web",
    status: "Terminé",
    tech: ["Next.js", "MongoDB", "AWS"],
    link: "/activities/projects/e-learning"
  }
];

const trainingsData = [
  {
    id: 1,
    title: "Introduction à l'Intelligence Artificielle",
    description: "Formation complète couvrant les bases de l'IA, du machine learning et des réseaux de neurones.",
    image: "/images/trainings/ai-intro.jpg",
    duration: "8 semaines",
    level: "Débutant",
    instructor: "Dr. Marie Kamdem",
    upcoming: true,
    date: "10 Mai 2025",
    link: "/activities/trainings/ai-intro"
  },
  {
    id: 2,
    title: "Développement Web Full Stack",
    description: "Apprenez à créer des applications web complètes avec les technologies modernes.",
    image: "/images/trainings/web-dev.jpg",
    duration: "12 semaines",
    level: "Intermédiaire",
    instructor: "Ing. Paul Ngannou",
    upcoming: false,
    date: "Formation continue",
    link: "/activities/trainings/web-dev"
  },
  {
    id: 3,
    title: "DevOps et Déploiement Cloud",
    description: "Maîtrisez les pratiques DevOps et le déploiement d'applications sur les plateformes cloud.",
    image: "/images/trainings/devops.jpg",
    duration: "6 semaines",
    level: "Avancé",
    instructor: "Ing. Samuel Mbarga",
    upcoming: true,
    date: "15 Juin 2025",
    link: "/activities/trainings/devops"
  },
  {
    id: 4,
    title: "Développement Mobile avec Flutter",
    description: "Créez des applications mobiles multiplateformes avec Flutter et Dart.",
    image: "/images/trainings/flutter.jpg",
    duration: "8 semaines",
    level: "Intermédiaire",
    instructor: "Ing. Sarah Bessong",
    upcoming: true,
    date: "1 Juillet 2025",
    link: "/activities/trainings/flutter"
  }
];

const eventsData = [
  {
    id: 1,
    title: "Hackathon IA 2025",
    description: "Un hackathon intensif de 24 heures axé sur l'innovation dans le domaine de l'intelligence artificielle.",
    image: "/images/events/hackathon-ia.jpg",
    date: "15-17 Janvier 2025",
    location: "Campus ENSPY, Yaoundé",
    type: "Hackathon",
    upcoming: true,
    link: "/hackathon"
  },
  {
    id: 2,
    title: "Workshop Cloud Computing",
    description: "Atelier pratique sur les services cloud et le déploiement d'applications.",
    image: "/images/events/cloud-workshop.jpg",
    date: "22 Février 2025",
    location: "Salle des conférences, ENSPY",
    type: "Workshop",
    upcoming: true,
    link: "/events/cloud-workshop"
  },
  {
    id: 3,
    title: "GI Tech Day 2024",
    description: "Journée dédiée aux dernières innovations technologiques avec des présentations et démonstrations.",
    image: "/images/events/tech-day.jpg",
    date: "5 Septembre 2024",
    location: "Amphi 250, ENSPY",
    type: "Conférence",
    upcoming: false,
    link: "/events/tech-day"
  },
  {
    id: 4,
    title: "Coding Competition",
    description: "Compétition de programmation ouverte à tous les étudiants en informatique.",
    image: "/images/events/coding-competition.jpg",
    date: "15 Mars 2025",
    location: "Laboratoire informatique, ENSPY",
    type: "Compétition",
    upcoming: true,
    link: "/events/coding-competition"
  }
];

export default function ActivitiesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [projectFilter, setProjectFilter] = useState('all');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleProjectFilterChange = (filter) => {
    setProjectFilter(filter);
  };
  
  const filteredProjects = projectFilter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category.toLowerCase() === projectFilter.toLowerCase());

  // Animation au défilement
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    document.querySelectorAll('.scroll-trigger').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.scroll-trigger').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '50vh',
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

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={10} textAlign="center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  }}
                >
                  Nos Activités
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    maxWidth: 800,
                    mx: 'auto',
                    fontWeight: 400,
                    opacity: 0.9,
                    lineHeight: 1.6,
                  }}
                >
                  Découvrez les projets, formations et événements organisés par le Club GI 
                  pour développer vos compétences et votre réseau.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Tabs de navigation */}
      <Box 
        sx={{ 
          bgcolor: 'background.paper', 
          position: 'sticky', 
          top: 70, 
          zIndex: 10,
          borderBottom: 1, 
          borderColor: 'divider',
          boxShadow: theme.palette.mode === 'light' 
            ? '0 2px 10px rgba(0, 0, 0, 0.05)' 
            : '0 2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Container maxWidth="lg">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 'auto',
                px: 3,
                py: 2,
                fontWeight: 600,
              }
            }}
          >
            <Tab 
              label="Projets" 
              icon={<Code />} 
              iconPosition="start"
            />
            <Tab 
              label="Formations" 
              icon={<School />} 
              iconPosition="start"
            />
            <Tab 
              label="Événements" 
              icon={<Event />} 
              iconPosition="start"
            />
          </Tabs>
        </Container>
      </Box>

      {/* Contenu des tabs */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Section Projets */}
          <Box role="tabpanel" hidden={tabValue !== 0}>
            {tabValue === 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                  <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                    Nos Projets
                  </Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                    Innovation et créativité
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: 800,
                      mx: 'auto',
                      color: 'text.secondary',
                      mb: 4
                    }}
                  >
                    Découvrez les projets développés par nos membres, allant des applications web et mobiles
                    aux systèmes embarqués et solutions basées sur l'intelligence artificielle.
                  </Typography>
                </Box>

                {/* Filtres de projets */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 4 
                  }}
                >
                  {['all', 'web', 'mobile', 'ia', 'iot'].map((filter) => (
                    <Button
                      key={filter}
                      variant={projectFilter === filter ? 'contained' : 'outlined'}
                      size="small"
                      onClick={() => handleProjectFilterChange(filter)}
                      sx={{ 
                        textTransform: 'capitalize',
                        px: 2,
                        py: 0.7,
                        borderRadius: 5
                      }}
                    >
                      {filter === 'all' ? 'Tous' : filter === 'ia' ? 'IA' : filter}
                    </Button>
                  ))}
                </Box>

                {/* Liste des projets */}
                <Grid container spacing={4}>
                  {filteredProjects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                      <motion.div
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <Card 
                          sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s',
                            '&:hover': {
                              transform: 'translateY(-10px)',
                            }
                          }}
                        >
                          <Box sx={{ position: 'relative' }}>
                            <CardMedia
                              component="img"
                              height="200"
                              image={project.image || "/images/placeholder-project.jpg"}
                              alt={project.title}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                display: 'flex',
                                gap: 1
                              }}
                            >
                              <Chip 
                                label={project.category} 
                                size="small" 
                                color="primary" 
                                sx={{ fontWeight: 600 }}
                              />
                              <Chip 
                                label={project.status} 
                                size="small" 
                                variant="outlined"
                                sx={{ 
                                  bgcolor: 'background.paper',
                                  fontWeight: 600
                                }}
                              />
                            </Box>
                          </Box>
                          <CardContent sx={{ flexGrow: 1, p: 3 }}>
                            <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                              {project.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {project.description}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                              {project.tech.map((tech, i) => (
                                <Chip
                                  key={i}
                                  label={tech}
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontSize: '0.7rem' }}
                                />
                              ))}
                            </Box>
                            
                            <Button
                              component={Link}
                              href={project.link}
                              color="primary"
                              endIcon={<ArrowForward />}
                              sx={{ mt: 'auto', fontWeight: 600 }}
                            >
                              Voir le projet
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
                
                {/* CTA pour soumission de projets */}
                <Box
                  sx={{
                    mt: 8,
                    p: 4,
                    borderRadius: 2,
                    bgcolor: 'background.accent',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Vous avez une idée de projet ?
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
                    Soumettez votre idée et rejoignez une équipe pour la développer avec le soutien du Club GI.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    href="/contact"
                    sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                  >
                    Proposer un projet
                  </Button>
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Section Formations */}
          <Box role="tabpanel" hidden={tabValue !== 1}>
            {tabValue === 1 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                  <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                    Nos Formations
                  </Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                    Développez vos compétences
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: 800,
                      mx: 'auto',
                      color: 'text.secondary',
                      mb: 4
                    }}
                  >
                    Le Club GI propose des formations pour vous aider à acquérir et approfondir
                    vos compétences dans différents domaines de l'informatique.
                  </Typography>
                </Box>

                {/* Formations à venir */}
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    position: 'relative',
                    pl: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '70%',
                      width: 4,
                      bgcolor: 'primary.main',
                      borderRadius: 2
                    }
                  }}
                >
                  Formations à venir
                </Typography>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                  {trainingsData
                    .filter(training => training.upcoming)
                    .map((training, index) => (
                      <Grid item xs={12} md={6} key={training.id}>
                        <motion.div
                          custom={index}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Card 
                            sx={{ 
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              height: '100%',
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            }}
                          >
                            <CardMedia
                              component="img"
                              sx={{
                                width: { xs: '100%', sm: 200 },
                                height: { xs: 200, sm: 'auto' }
                              }}
                              image={training.image || "/images/placeholder-training.jpg"}
                              alt={training.title}
                            />
                            <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 1 }}>
                                <Chip 
                                  label={training.level}
                                  size="small"
                                  color="primary"
                                  sx={{ fontWeight: 600, mb: 1 }}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {training.date}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {training.title}
                              </Typography>
                              
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {training.description}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {training.duration}
                                </Typography>
                              </Box>
                              
                              <Button
                                component={Link}
                                href={training.link}
                                color="primary"
                                endIcon={<ArrowForward />}
                                sx={{ fontWeight: 600 }}
                              >
                                S'inscrire
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                </Grid>

                {/* Autres formations */}
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    position: 'relative',
                    pl: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '70%',
                      width: 4,
                      bgcolor: 'primary.main',
                      borderRadius: 2
                    }
                  }}
                >
                  Formations continues
                </Typography>

                <Grid container spacing={4}>
                  {trainingsData
                    .filter(training => !training.upcoming)
                    .map((training, index) => (
                      <Grid item xs={12} sm={6} md={4} key={training.id}>
                        <motion.div
                          custom={index}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Card 
                            sx={{ 
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                              transition: 'transform 0.3s',
                              '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                              }
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="180"
                              image={training.image || "/images/placeholder-training.jpg"}
                              alt={training.title}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                              <Chip 
                                label={training.level}
                                size="small"
                                color="primary"
                                sx={{ fontWeight: 600, mb: 2 }}
                              />
                              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {training.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {training.description}
                              </Typography>
                              
                              <Box sx={{ mt: 'auto' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <AccessTime sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {training.duration}
                                  </Typography>
                                </Box>
                                
                                <Button
                                  component={Link}
                                  href={training.link}
                                  color="primary"
                                  endIcon={<ArrowForward />}
                                  sx={{ fontWeight: 600 }}
                                >
                                  En savoir plus
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                </Grid>
                
                {/* CTA pour demande de formations */}
                <Box
                  sx={{
                    mt: 8,
                    p: 4,
                    borderRadius: 2,
                    bgcolor: 'background.accent',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Vous avez besoin d'une formation spécifique ?
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
                    Proposez-nous des thèmes de formation qui vous intéressent, et nous ferons de notre mieux pour les organiser.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    href="/contact"
                    sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                  >
                    Suggérer une formation
                  </Button>
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Section Événements */}
          <Box role="tabpanel" hidden={tabValue !== 2}>
            {tabValue === 2 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                  <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                    Nos Événements
                  </Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                    Rencontres et échanges
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: 800,
                      mx: 'auto',
                      color: 'text.secondary',
                      mb: 4
                    }}
                  >
                    Participez à nos événements pour apprendre, échanger et réseauter avec d'autres
                    passionnés d'informatique et de nouvelles technologies.
                  </Typography>
                </Box>

                {/* Événements à venir */}
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    position: 'relative',
                    pl: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '70%',
                      width: 4,
                      bgcolor: 'primary.main',
                      borderRadius: 2
                    }
                  }}
                >
                  Événements à venir
                </Typography>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                  {eventsData
                    .filter(event => event.upcoming)
                    .map((event, index) => (
                      <Grid item xs={12} md={6} key={event.id}>
                        <motion.div
                          custom={index}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Card 
                            sx={{ 
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              height: '100%',
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                            }}
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
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Chip 
                                  label={event.type}
                                  size="small"
                                  color="primary"
                                  sx={{ fontWeight: 600 }}
                                />
                              </Box>
                              
                              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {event.title}
                              </Typography>
                              
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {event.description}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {event.date}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {event.location}
                                  </Typography>
                                </Box>
                              </Box>
                              
                              <Button
                                component={Link}
                                href={event.link}
                                color="primary"
                                endIcon={<ArrowForward />}
                                sx={{ fontWeight: 600 }}
                              >
                                En savoir plus
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                </Grid>

                {/* Événements passés */}
                <Typography
                  variant="h4"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 4,
                    position: 'relative',
                    pl: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      height: '70%',
                      width: 4,
                      bgcolor: 'primary.main',
                      borderRadius: 2
                    }
                  }}
                >
                  Événements passés
                </Typography>

                <Grid container spacing={4}>
                  {eventsData
                    .filter(event => !event.upcoming)
                    .map((event, index) => (
                      <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <motion.div
                          custom={index}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <Card 
                            sx={{ 
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              borderRadius: 2,
                              overflow: 'hidden',
                              boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
                              filter: 'grayscale(40%)',
                              transition: 'all 0.3s',
                              '&:hover': {
                                filter: 'grayscale(0%)',
                                transform: 'translateY(-5px)',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                              }
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="180"
                              image={event.image || "/images/placeholder-event.jpg"}
                              alt={event.title}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                              <Chip 
                                label={event.type}
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: 600, mb: 2 }}
                              />
                              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {event.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {event.description}
                              </Typography>
                              
                              <Box sx={{ mt: 'auto' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {event.date}
                                  </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                  <Typography variant="body2" color="text.secondary">
                                    {event.location}
                                  </Typography>
                                </Box>
                                
                                <Button
                                  component={Link}
                                  href={event.link}
                                  color="primary"
                                  endIcon={<ArrowForward />}
                                  sx={{ fontWeight: 600 }}
                                >
                                  Voir les photos
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                </Grid>
                
                {/* CTA pour inscription aux événements */}
                <Box
                  sx={{
                    mt: 8,
                    p: 4,
                    borderRadius: 2,
                    bgcolor: 'background.accent',
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    Ne manquez aucun événement
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
                    Inscrivez-vous à notre newsletter pour être informé des prochains événements organisés par le Club GI.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    href="/contact"
                    sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                  >
                    S'inscrire à la newsletter
                  </Button>
                </Box>
              </motion.div>
            )}
          </Box>
        </Container>
      </Box>

      {/* Styles CSS pour les animations au scroll */}
      <style jsx global>{`
        .scroll-trigger {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-trigger.in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </Box>
  );
}