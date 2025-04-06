// src/app/about/page.js
'use client';
import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Paper,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Code, 
  Groups, 
  Lightbulb, 
  School, 
  Timeline, 
  Insights, 
  ArrowForward,
  CheckCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Composants animés
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

// Animation pour les sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Animation pour les membres de l'équipe
const teamVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const memberVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// Données sur l'histoire du club (ajout de l'année de création comme demandé)
const clubHistory = {
  foundedYear: 2012,
  currentBureau: 11,
  story: `Le Club Génie Informatique (Club GI) de l'École Nationale Supérieure Polytechnique de Yaoundé a été fondé en 2012 par un groupe d'étudiants passionnés par la technologie et l'innovation. 
  
  Depuis sa création, le club a joué un rôle déterminant dans la promotion de la culture informatique au sein de l'école et a contribué à l'émergence de nombreux talents dans le domaine. Au fil des années, nous avons organisé plus de 30 formations techniques, développé plus de 50 projets open-source, et accompagné plus de 200 étudiants dans leur parcours académique et professionnel.
  
  Aujourd'hui, en tant que 11ème bureau exécutif, nous poursuivons cette tradition d'excellence tout en apportant notre vision propre: rendre l'informatique plus accessible et plus impactante pour résoudre les défis locaux.`
};

// Données sur la mission et les valeurs
const missionValues = {
  mission: `Promouvoir la maîtrise des technologies de l'information et de la communication parmi les étudiants et préparer les futurs leaders du numérique au Cameroun. Nous créons un environnement d'apprentissage collaboratif où chaque membre peut développer ses compétences techniques, son esprit d'innovation et son réseau professionnel.`,
  values: [
    {
      icon: <Code fontSize="large" color="primary" />,
      title: "Apprendre",
      description: "Cultiver une curiosité permanente et partager les connaissances pour une progression collective."
    },
    {
      icon: <Groups fontSize="large" color="primary" />,
      title: "Accomplir",
      description: "Transformer les idées en projets concrets à travers le travail d'équipe et la persévérance."
    },
    {
      icon: <Lightbulb fontSize="large" color="primary" />,
      title: "Innover",
      description: "Encourager la créativité et l'originalité pour développer des solutions adaptées aux défis locaux."
    }
  ],
  objectives: [
    "Organiser des formations et ateliers techniques pour renforcer les compétences des membres",
    "Développer des projets innovants répondant à des problématiques concrètes",
    "Faciliter l'insertion professionnelle des étudiants grâce à un réseau de partenaires",
    "Promouvoir la culture de l'open source et du partage de connaissances",
    "Représenter l'ENSPY lors des compétitions nationales et internationales"
  ]
};

// Données sur les réalisations
const achievements = [
  {
    year: "2023",
    title: "Champion national Huawei ICT Competition",
    description: "Premier prix dans la catégorie Network lors de la compétition nationale."
  },
  {
    year: "2022",
    title: "Lancement de la plateforme eStudent",
    description: "Application de gestion des parcours académiques utilisée par plus de 500 étudiants."
  },
  {
    year: "2021",
    title: "Organisation du premier hackathon IA à l'ENSPY",
    description: "Événement ayant réuni plus de 100 participants pendant 48 heures."
  },
  {
    year: "2020",
    title: "Prix de l'innovation au Forum Afrique Innovation",
    description: "Récompense pour le projet de télémédecine rurale."
  }
];

// Données sur l'équipe (séparation en bureau exécutif et bureau élargi comme demandé)
const teamData = {
  executiveCommittee: [
    { name: 'NOMO GABRIEL', role: 'Président', image: '/NomoGabriel.jpeg' },
    { name: 'NZIKO TALLA FÉLIX', role: 'Vice-président', image: '/NzikoTalla.jpeg' },
    { name: 'ABADA GEORGES', role: 'Secrétaire Général', image: '/GeorgeAbada.jpeg' },
    { name: 'MBASSI LOIC', role: 'Co-Chef Cellule Projet', image: '/LoicMbassi.jpeg' },
    { name: 'KOUASSI DE YOBO', role: 'Co-Chef Cellule Projet', image: '/KouassiBryan.jpeg' },
    { name: 'NGOUPAYE DJIO THIERRY', role: 'Chef Cellule Financière', image: '/NgoupayeThierry.jpeg' },
    { name: 'MAFFO NATACHA', role: 'Chef Cellule Communication', image: '/NatachaMaffo.jpeg' },
    { name: 'KOMGUEM ISIS HELCIAS', role: 'Chef Relations Extérieures', image: '/Isis.jpg' },
  ],
  extendedCommittee: [
    { name: 'TSAFACK FOTSO SAVIO', role: 'Adjoint des Projets', image: '/TsafackFotso.jpeg' },
    { name: 'ELA FRÉDÉRIC THÉOPHILE', role: 'Adjoint Communication', image: '/ElaFoeTheophile.jpeg' },
    { name: 'DANWE MANUELLA', role: 'Adjointe Relations Extérieures', image: '/ManuellaDanwe.jpeg' },
    { name: 'TSAMO FLORETTE MIROSLAVA', role: 'SG Cellule Projet', image: '/TsamoFlorette.jpeg' },
    // Espace pour ajouter d'autres membres selon la liste complète
  ]
};

export default function AboutPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
              <MotionBox
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
                  À propos du Club GI
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
                  Découvrez notre histoire, notre mission et les personnes qui font du Club GI 
                  un espace d'innovation et d'excellence en informatique.
                </Typography>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Notre Histoire */}
      <Box
        id="histoire"
        component={MotionBox}
        className="scroll-trigger"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                component="p"
                color="primary"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Notre Histoire
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Plus d'une décennie d'innovation
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  color: 'text.secondary',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.8 
                }}
              >
                {clubHistory.story}
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 4, 
                  flexWrap: 'wrap',
                  mt: 4
                }}
              >
                <Box>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                    {new Date().getFullYear() - clubHistory.foundedYear}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    années d'existence
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                    {clubHistory.currentBureau}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    bureau exécutif
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700, mb: 1 }}>
                    200+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    membres actifs et alumni
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: { xs: '80%', md: '70%' },
                    height: { xs: '80%', md: '70%' },
                    borderRadius: 2,
                    bgcolor: 'primary.main',
                    opacity: 0.1,
                    bottom: { xs: -20, md: -30 },
                    right: { xs: -20, md: -30 },
                    zIndex: 0,
                  },
                }}
              >
                <Box
                  component="img"
                  src="/images/club-histoire.jpg"
                  alt="Histoire du Club GI"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Réalisations */}
      <Box
        className="scroll-trigger"
        component={MotionBox}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.accent' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Nos Réalisations
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Ce qui nous rend fiers
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Quelques-unes de nos réussites marquantes au fil des années.
            </Typography>
          </Box>
          
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              mt: 8,
              mb: 4
            }}
          >
            {/* Ligne de temps verticale */}
            <Box
              sx={{
                position: 'absolute',
                width: 4,
                bgcolor: 'primary.main',
                opacity: 0.3,
                top: 0,
                bottom: 0,
                left: { xs: 20, md: '50%' },
                transform: { xs: 'none', md: 'translateX(-50%)' },
                zIndex: 0,
              }}
            />
            
            <Grid container spacing={4}>
              {achievements.map((item, index) => (
                <Grid 
                  item 
                  xs={12} 
                  key={index}
                  sx={{
                    position: 'relative'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                      position: 'relative',
                      padding: { xs: '0 0 0 50px', md: 0 },
                    }}
                  >
                    {/* Point sur la ligne de temps */}
                    <Box
                      sx={{
                        position: 'absolute',
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        top: { xs: 0, md: 20 },
                        left: { xs: 12, md: '50%' },
                        transform: { xs: 'none', md: 'translateX(-50%)' },
                        zIndex: 1,
                      }}
                    />
                    
                    {/* Date */}
                    <Box
                      sx={{
                        position: { xs: 'absolute', md: 'relative' },
                        top: { xs: 0, md: 'auto' },
                        left: { xs: 50, md: 'auto' },
                        width: { xs: 'auto', md: '50%' },
                        pr: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                        pl: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                        textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                        display: { xs: 'block', md: 'flex' },
                        flexDirection: { md: index % 2 === 0 ? 'row-reverse' : 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="primary"
                        sx={{ 
                          fontWeight: 700,
                          mt: { xs: 0, md: 1 }
                        }}
                      >
                        {item.year}
                      </Typography>
                    </Box>
                    
                    {/* Contenu */}
                    <Box
                      sx={{
                        width: { xs: '100%', md: '50%' },
                        mt: { xs: 6, md: 0 },
                        pr: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                        pl: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                      }}
                    >
                      <Paper
                        elevation={2}
                        sx={{
                          p: 3,
                          borderRadius: 2,
                          borderLeft: '4px solid',
                          borderColor: 'primary.main',
                          mb: 4,
                          transition: 'transform 0.3s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 3
                          }
                        }}
                      >
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Section Mission et Valeurs */}
      <Box
        id="mission"
        className="scroll-trigger"
        component={MotionBox}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography
                variant="h6"
                component="p"
                color="primary"
                sx={{ fontWeight: 600, mb: 2 }}
              >
                Notre Mission
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Ce qui nous anime
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.8 }}>
                {missionValues.mission}
              </Typography>
              
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Nos Objectifs
              </Typography>
              
              <List>
                {missionValues.objectives.map((objective, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={objective} 
                      primaryTypographyProps={{ 
                        variant: 'body2', 
                        color: 'text.secondary' 
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: { xs: 'left', md: 'center' } }}>
                Nos Valeurs
              </Typography>
              <Grid container spacing={3}>
                {missionValues.values.map((value, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                        }
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                          {value.icon}
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section Équipe */}
      <Box
        id="equipe"
        className="scroll-trigger"
        component={MotionBox}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.accent' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h6"
              component="p"
              color="primary"
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Notre Équipe
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: 700, mb: 3 }}
            >
              Les visages du Club GI
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
              Découvrez les membres du bureau exécutif et élargi qui font vivre le Club GI 
              au quotidien.
            </Typography>
          </Box>

          {/* Bureau Exécutif */}
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
            Bureau Exécutif
          </Typography>

          <Box
            component={motion.div}
            variants={teamVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            sx={{ mb: 8 }}
          >
            <Grid container spacing={4} justifyContent="center">
              {teamData.executiveCommittee.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <MotionCard
                    variants={memberVariants}
                    sx={{
                      height: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: 280,
                        overflow: 'hidden',
                        position: 'relative',
                      }}
                    >
                      <Box
                        component="img"
                        src={member.image || "/images/placeholder-avatar.jpg"}
                        alt={member.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    </Box>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                        {member.role}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Bureau Élargi */}
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
            Bureau Élargi
          </Typography>

          <Box
            component={motion.div}
            variants={teamVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Grid container spacing={3}>
              {teamData.extendedCommittee.map((member, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <MotionCard
                    variants={memberVariants}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      height: '100%',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 3
                      },
                    }}
                  >
                    <Avatar
                      src={member.image || "/images/placeholder-avatar.jpg"}
                      alt={member.name}
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                        {member.role}
                      </Typography>
                    </Box>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Section CTA */}
      <Box
        className="scroll-trigger"
        component={MotionBox}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        sx={{ 
          py: { xs: 8, md: 10 }, 
          bgcolor: 'primary.main',
          color: 'white',
          position: 'relative',
          overflow: 'hidden' 
        }}
      >
        {/* Cercles décoratifs */}
        <Box
          sx={{
            position: 'absolute',
            width: '30vw',
            height: '30vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            top: '-15vw',
            right: '10vw',
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            width: '20vw',
            height: '20vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            bottom: '-10vw',
            left: '5vw',
            zIndex: 0,
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
            Rejoignez le Club GI
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
            Développez vos compétences, élargissez votre réseau et contribuez à des projets innovants.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            href="/contact"
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
            Devenir membre
          </Button>
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