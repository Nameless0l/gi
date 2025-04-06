// src/app/hackathon/page.js
'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Paper,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Tab,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Code,
  Lightbulb,
  People,
  Timer,
  CheckCircle,
  EmojiEvents,
  LocationOn,
  CalendarToday,
  PersonAdd,
  ArrowForward,
  Groups,
  School,
  Build,
  Category,
  ExpandMore,
  ArrowDownward,
  KeyboardArrowUp
} from '@mui/icons-material';
import { motion } from 'framer-motion';

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: transition => ({
    opacity: 1,
    y: 0,
    transition: { delay: transition * 0.1, duration: 0.5 }
  })
};

// Composant pour les icônes manquantes - remplaçant l'ancienne déclaration
const CustomIcon = ({ emoji, label }) => (
    <Box component="span" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span role="img" aria-label={label}>{emoji}</span>
    </Box>
);


// Données pour le hackathon
  const hackathonData = {
  title: "HackVerse 2025",
  slogan: "Innovations avec l'Intelligence Artificielle",
  date: "3-4 Mai 2025",
  location: "Campus ENSPY, Yaoundé",
  description: "Un hackathon de 24 heures non-stop axé sur l'innovation dans le domaine de l'intelligence artificielle et ses applications dans divers secteurs au Cameroun.",
  registrationDeadline: "18 Avril 2025",
  
  prizes: [
    {
      title: "1er Prix",
      value: "100 000 FCFA",
      benefits: ["Accompagnement pour incubation", "Visibilité médiatique", "Mentorat personnalisé"]
    },
    {
      title: "2ème Prix",
      value: "50 000 FCFA",
      benefits: ["Accompagnement technique", "Visibilité médiatique"]
    },
    {
      title: "3ème Prix",
      value: "25 000 FCFA",
      benefits: ["Accompagnement technique"]
    }
  ],
  
  fullSchedule: [
    { date: "7 avril 2025", activity: "Lancement de l'appel à participation et ouverture des inscriptions" },
    { date: "18 avril 2025", activity: "Clôture des inscriptions pour la phase de présélection ENSPY" },
    { date: "21 avril 2025", activity: "Début des épreuves de présélection (en ligne)" },
    { date: "28 avril 2025", activity: "Annonce des équipes ENSPY sélectionnées" },
    { date: "29 avril - 2 mai 2025", activity: "Briefing des équipes sélectionnées et préparation" },
    { date: "3-4 mai 2025", activity: "Hackathon en présentiel (24 heures non-stop)" },
    { date: "10 mai 2025", activity: "Cérémonie de remise des prix et cocktail networking" },
    { date: "Mai - Juin 2025", activity: "Accompagnement des projets lauréats" }
  ],
  
  schedule: [
    { day: "HackVerse Day", date: "3-4 Mai", events: [
      { time: "09:00 - 10:00", title: "Enregistrement des participants" },
      { time: "10:00 - 11:00", title: "Cérémonie d'ouverture" },
      { time: "11:00 - 12:00", title: "Présentation des défis" },
      { time: "12:00 - 13:00", title: "Déjeuner et formation des équipes" },
      { time: "13:00", title: "Lancement officiel du hackathon" },
      { time: "13:00 - 19:00", title: "Hackathon - Phase 1" },
      { time: "19:00 - 20:00", title: "Dîner" },
      { time: "20:00 - 00:00", title: "Hackathon - Phase 2" },
      { time: "00:00 - 01:00", title: "Collation de minuit" },
      { time: "01:00 - 08:00", title: "Hackathon - Phase 3 (toute la nuit)" },
      { time: "08:00 - 09:00", title: "Petit-déjeuner" },
      { time: "09:00 - 11:00", title: "Finalisation des projets" },
      { time: "11:00 - 13:00", title: "Présentations des projets" },
      { time: "13:00 - 14:00", title: "Déjeuner et délibération du jury" },
      { time: "14:00 - 15:00", title: "Annonce des résultats et remise des prix" },
      { time: "15:00 - 16:00", title: "Clôture et photo de groupe" }
    ]}
  ],
  
  themes: [
    {
      title: "IA pour la Santé",
      icon: <CustomIcon emoji="🏥" label="hospital" />,
      description: "Développer des solutions basées sur l'IA pour améliorer l'accès aux soins de santé au Cameroun."
    },
    {
      title: "IA pour l'Éducation",
      icon: <School />,
      description: "Créer des outils d'apprentissage automatisés pour soutenir l'éducation dans les zones rurales."
    },
    {
      title: "IA pour l'Agriculture",
      icon: <CustomIcon emoji="🌱" label="leaf" />,
      description: "Concevoir des solutions pour optimiser les rendements agricoles et la gestion des ressources."
    },
    {
      title: "IA pour l'Environnement",
      icon: <CustomIcon emoji="🌍" label="earth" />,
      description: "Développer des applications pour surveiller et préserver l'environnement."
    }
  ],
  
  jury: [
    {
      name: "Dr. Marie Ngoende",
      role: "Professeur en IA, Université de Yaoundé I",
      image: "/images/jury/marie-ngoende.jpg"
    },
    {
      name: "Ing. Jean Kamga",
      role: "Directeur Technique, TechInov Cameroun",
      image: "/images/jury/jean-kamga.jpg"
    },
    {
      name: "Mme. Sophie Mboula",
      role: "Fondatrice, AI4Africa",
      image: "/images/jury/sophie-mboula.jpg" 
    },
    {
      name: "M. Patrick Ndedi",
      role: "CTO, CamerTech Solutions",
      image: "/images/jury/patrick-ndedi.jpg"
    }
  ],
  
  sponsors: [
    { name: "Orange Cameroun", logo: "/images/sponsors/orange.png", level: "Platine" },
    { name: "MTN Cameroun", logo: "/images/sponsors/mtn.png", level: "Or" },
    { name: "Microsoft", logo: "/images/sponsors/microsoft.png", level: "Or" },
    { name: "Université de Yaoundé", logo: "/images/sponsors/univ-yaounde.png", level: "Argent" },
    { name: "Google Developer Groups", logo: "/images/sponsors/gdg.png", level: "Argent" },
    { name: "ENSPY", logo: "/images/sponsors/enspy.png", level: "Partenaire" }
  ],
  
  faqs: [
    {
      question: "Qui peut participer au hackathon?",
      answer: "Le hackathon est ouvert à tous les étudiants, développeurs, designers et entrepreneurs intéressés par l'IA. Aucune expérience préalable en IA n'est requise, mais des connaissances de base en programmation sont recommandées."
    },
    {
      question: "Comment se déroulent les inscriptions?",
      answer: "Les inscriptions se font en ligne via le formulaire ci-dessous. Vous pouvez vous inscrire individuellement ou en équipe (maximum 4 personnes par équipe). Si vous vous inscrivez individuellement, vous pourrez former une équipe le jour du hackathon."
    },
    {
      question: "Que dois-je apporter?",
      answer: "Vous devez apporter votre ordinateur portable, chargeur, et tout autre équipement dont vous pourriez avoir besoin pour votre projet. Des repas seront fournis pendant l'événement."
    },
    {
      question: "Est-ce que je peux dormir sur place?",
      answer: "Oui, des espaces de repos seront disponibles pour ceux qui souhaitent rester sur place pendant la nuit. Cependant, nous vous recommandons d'apporter votre sac de couchage."
    },
    {
      question: "Comment les projets seront-ils évalués?",
      answer: "Les projets seront évalués sur leur innovation, leur faisabilité technique, leur impact potentiel et la qualité de la présentation. Le jury sera composé d'experts en IA, d'entrepreneurs et de représentants des sponsors."
    }
  ]
};


// Composant principal
export default function HackathonPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // ID de référence pour le saut aux onglets de navigation
  const navTabsId = "hackathon-tabs";
  
  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Bouton de retour en haut */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          display: 'trigger' ? 'block' : 'none',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => scrollToSection(navTabsId)}
          sx={{
            minWidth: 0,
            width: 50,
            height: 50,
            borderRadius: '50%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            },
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          }}
        >
          <KeyboardArrowUp />
        </Button>
      </Box>
      
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 'auto', md: '100vh' },
          minHeight: { xs: 500, sm: 600, md: 700 },
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          overflow: 'hidden',
          pb: { xs: 10, md: 0 }
        }}
      >
        {/* Formes abstraites décoratives */}
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
        
        <Box
          sx={{
            position: 'absolute',
            width: '20vw',
            height: '20vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
            top: '20%',
            left: '15%',
            zIndex: 0,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 12, md: 0 } }}>
          <Grid container spacing={4} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={7}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
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
                  15-17 Janvier 2025 • Campus ENSPY
                </Typography>
                
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                    lineHeight: 1.1
                  }}
                >
                  Hackathon IA 
                  <Typography
                    component="span"
                    variant="h1"
                    sx={{
                      display: 'block',
                      fontWeight: 800,
                      fontSize: 'inherit',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    2025
                  </Typography>
                </Typography>
                
                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    mb: 4,
                    maxWidth: 600,
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                  }}
                >
                  24 heures pour créer des solutions innovantes basées sur l'IA 
                  qui changeront l'avenir du Cameroun.
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    mt: 4
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => scrollToSection('inscription')}
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
                    S'inscrire maintenant
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => scrollToSection('details')}
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
                    En savoir plus
                  </Button>
                </Box>
                
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    mt: 5,
                    flexWrap: 'wrap'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Timer sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      24 heures
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <People sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      150+ participants
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmojiEvents sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      1 750 000 FCFA en prix
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Box
                  component="img"
                  src="/images/events/hackathon-illustration.png"
                  alt="Hackathon IA illustration"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    filter: 'drop-shadow(0 10px 16px rgba(0, 0, 0, 0.2))',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
          
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              position: 'absolute',
              bottom: 30,
              left: '50%',
              transform: 'translateX(-50%)',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => scrollToSection('details')}
          >
            <Typography variant="body2" sx={{ mb: 1, color: 'rgba(255, 255, 255, 0.8)' }}>
              En savoir plus
            </Typography>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDownward sx={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* Navigation par sections */}
      <Box 
        id={navTabsId}
        sx={{ 
          position: 'sticky', 
          top: 70, 
          bgcolor: 'background.paper', 
          borderBottom: 1, 
          borderColor: 'divider',
          zIndex: 10,
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Container maxWidth="xl">
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
            <Tab label="À propos" onClick={() => scrollToSection('details')} />
            <Tab label="Programme" onClick={() => scrollToSection('programme')} />
            <Tab label="Challenges" onClick={() => scrollToSection('themes')} />
            <Tab label="Jury" onClick={() => scrollToSection('jury')} />
            <Tab label="Prix" onClick={() => scrollToSection('prix')} />
            <Tab label="FAQ" onClick={() => scrollToSection('faq')} />
            <Tab label="Inscription" onClick={() => scrollToSection('inscription')} />
          </Tabs>
        </Container>
      </Box>

      {/* Section Détails */}
      <Box 
        id="details"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'background.default' }}
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
                À propos de l'événement
              </Typography>
              
              <Typography
                variant="h3"
                component="h2"
                sx={{ fontWeight: 700, mb: 3 }}
              >
                Le plus grand hackathon d'IA au Cameroun
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
                Le Hackathon IA 2025 est un événement intensif de 24 heures où les participants,
                organisés en équipes, relèveront des défis technologiques concrets en développant
                des solutions innovantes basées sur l'intelligence artificielle.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
                Que vous soyez étudiant, professionnel ou simplement passionné par la technologie,
                cet événement vous offre l'opportunité de mettre en pratique vos compétences,
                d'apprendre auprès d'experts du domaine et potentiellement de remporter des prix importants.
              </Typography>
              
              <List sx={{ mb: 2 }}>
                {[
                  { icon: <CalendarToday color="primary" />, text: "15-17 Janvier 2025" },
                  { icon: <LocationOn color="primary" />, text: "Campus ENSPY, Yaoundé" },
                  { icon: <Groups color="primary" />, text: "Ouvert aux étudiants, professionnels et passionnés" },
                  { icon: <Timer color="primary" />, text: "Date limite d'inscription: 10 janvier 2025" }
                ].map((item, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/hackathon-team.jpg"
                alt="Équipe de hackathon"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section pourquoi participer */}
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{
          py: 10,
          bgcolor: 'background.accent',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Pourquoi participer
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Ce que vous y gagnerez
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Au-delà des prix à gagner, le Hackathon IA 2025 est une opportunité unique
              de développer vos compétences, d'élargir votre réseau et de contribuer
              à l'innovation technologique au Cameroun.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {[
              {
                icon: <Code fontSize="large" color="primary" />,
                title: "Apprentissage pratique",
                description: "Appliquez vos connaissances en IA à des problèmes concrets et apprenez de nouvelles technologies."
              },
              {
                icon: <Groups fontSize="large" color="primary" />,
                title: "Réseautage",
                description: "Rencontrez des professionnels, des mentors et d'autres participants passionnés par l'innovation."
              },
              {
                icon: <EmojiEvents fontSize="large" color="primary" />,
                title: "Prix attractifs",
                description: "Gagnez des prix en espèces, des opportunités d'incubation et du mentorat pour développer votre projet."
              },
              {
                icon: <Build fontSize="large" color="primary" />,
                title: "Mentorat d'experts",
                description: "Bénéficiez des conseils et du soutien d'experts du domaine tout au long de l'événement."
              },
              {
                icon: <School fontSize="large" color="primary" />,
                title: "Ateliers de formation",
                description: "Participez à des ateliers sur les dernières technologies et méthodologies en IA."
              },
              {
                icon: <Lightbulb fontSize="large" color="primary" />,
                title: "Impact réel",
                description: "Développez des solutions à des problèmes réels qui peuvent avoir un impact positif sur la société."
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  custom={index}
                  variants={itemVariants}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      {item.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Section Programme */}
      <Box
        id="programme"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Programme
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              24 heures d'innovation
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Un hackathon intensif de trois jours pour concevoir, développer et présenter
              des solutions innovantes basées sur l'intelligence artificielle.
            </Typography>
          </Box>

          {/* Calendrier détaillé complet */}
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 3,
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
            Calendrier détaillé
          </Typography>
          
          <Paper 
            elevation={1} 
            sx={{ 
              mb: 6,
              overflow: 'hidden',
              borderRadius: 2
            }}
          >
            <Box
              sx={{
                width: '100%',
                overflowX: 'auto',
              }}
            >
              <Box
                component="table"
                sx={{
                  minWidth: '100%',
                  borderCollapse: 'collapse',
                  '& th': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 700,
                    p: 2,
                    textAlign: 'left',
                  },
                  '& td': {
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                  '& tbody tr:last-child td': {
                    borderBottom: 'none',
                  },
                  '& tbody tr:nth-of-type(odd)': { 
                    bgcolor: 'background.accent'
                  },
                }}
              >
                <Box component="thead">
                  <Box component="tr">
                    <Box component="th">Date</Box>
                    <Box component="th">Activité</Box>
                  </Box>
                </Box>
                <Box component="tbody">
                  {hackathonData.fullSchedule.map((item, index) => (
                    <Box component="tr" key={index}>
                      <Box component="td" sx={{ fontWeight: 600 }}>{item.date}</Box>
                      <Box component="td">{item.activity}</Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
          
          {/* Programme détaillé du jour du hackathon */}
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 3,
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
            Programme du Hackathon (3-4 Mai)
          </Typography>
          
          <Box sx={{ width: '100%', mt: 3, mb: 4 }}>
            <Tabs
              value={tabValue % 1} // Modifié pour n'avoir qu'un seul jour
              onChange={(e, val) => setTabValue(val)}
              variant="fullWidth"
              sx={{ mb: 4, borderBottom: 1, borderColor: 'divider', display: 'none' }} // Masqué car un seul onglet
            >
              {hackathonData.schedule.map((day, index) => (
                <Tab
                  key={index}
                  label={
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {day.day}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {day.date}
                      </Typography>
                    </Box>
                  }
                  sx={{
                    py: 2,
                    '&.Mui-selected': {
                      color: 'primary.main',
                    }
                  }}
                />
              ))}
            </Tabs>

            {hackathonData.schedule.map((day, index) => (
              <Box
                key={index}
                role="tabpanel"
                hidden={tabValue % 3 !== index}
                sx={{ px: { xs: 1, sm: 2 } }}
              >
                {tabValue % 3 === index && (
                  <Box>
                    <Grid container spacing={2}>
                      {day.events.map((event, eventIndex) => (
                        <Grid item xs={12} key={eventIndex}>
                          <Paper
                            elevation={1}
                            sx={{
                              p: 3,
                              borderRadius: 2,
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              gap: 2,
                              borderLeft: '4px solid',
                              borderColor: 'primary.main',
                            }}
                          >
                            <Box
                              sx={{
                                minWidth: { xs: '100%', sm: 180 },
                                mb: { xs: 1, sm: 0 },
                                fontWeight: 600,
                                color: 'primary.main'
                              }}
                            >
                              {event.time}
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {event.title}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Section Thèmes/Défis */}
      <Box
        id="themes"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'background.accent' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Challenges
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Thématiques du hackathon
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Choisissez parmi ces thématiques ou proposez votre propre idée innovante
              basée sur l'intelligence artificielle.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {hackathonData.themes.map((theme, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  custom={index}
                  variants={itemVariants}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 2,
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mb: 3,
                        '& .MuiSvgIcon-root': {
                          fontSize: 36
                        }
                      }}
                    >
                      {theme.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {theme.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {theme.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Section Jury */}
      <Box
        id="jury"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Jury
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Nos experts évaluateurs
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Présentez votre projet devant un panel d'experts reconnus dans le domaine
              de l'intelligence artificielle et de l'innovation technologique.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {hackathonData.jury.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  custom={index}
                  variants={itemVariants}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Avatar
                      src={member.image || "/images/placeholder-avatar.jpg"}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mb: 2,
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Section Prix */}
      <Box
        id="prix"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'primary.main', color: 'white' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h6" component="p" sx={{ fontWeight: 600, mb: 2, color: 'rgba(255, 255, 255, 0.9)' }}>
              Récompenses
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Prix à gagner
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.9)'
              }}
            >
              Gagnez des prix en espèces et des opportunités pour développer votre projet.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {hackathonData.prizes.map((prize, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  custom={index}
                  variants={itemVariants}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 4,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'hidden',
                      bgcolor: index === 0 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    {index === 0 && (
                      <Chip
                        label="Grand Prix"
                        color="secondary"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          fontWeight: 600,
                          bgcolor: 'white',
                          color: 'primary.main'
                        }}
                      />
                    )}
                    
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3, mt: index === 0 ? 4 : 0 }}>
                      {prize.title}
                    </Typography>
                    
                    <Typography variant="h3" component="p" sx={{ fontWeight: 800, mb: 4 }}>
                      {prize.value}
                    </Typography>
                    
                    <Box sx={{ mt: 'auto' }}>
                      {prize.benefits.map((benefit, benefitIndex) => (
                        <Box
                          key={benefitIndex}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1.5,
                            justifyContent: 'center'
                          }}
                        >
                          <CheckCircle sx={{ mr: 1, fontSize: 20, color: 'rgba(255, 255, 255, 0.9)' }} />
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            {benefit}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Section Sponsors */}
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Partenaires
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Nos sponsors
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 800,
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Le Hackathon IA 2025 est rendu possible grâce au soutien de nos partenaires.
            </Typography>
          </Box>

          <Box sx={{ mt: 6 }}>
            {/* Sponsors Platine */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textAlign: 'center',
                mb: 4,
                color: 'text.secondary',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 3,
                  bgcolor: 'primary.main',
                  borderRadius: 1.5
                }
              }}
            >
              Sponsors Platine
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
              {hackathonData.sponsors
                .filter(sponsor => sponsor.level === 'Platine')
                .map((sponsor, index) => (
                  <Grid item xs={8} sm={6} md={4} key={index}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 4,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={sponsor.logo || "/logo-placeholder.png"}
                        alt={sponsor.name}
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 100,
                          objectFit: 'contain'
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
            </Grid>

            {/* Sponsors Or */}
            <Typography
              variant="h6"
              component="h3"
              sx={{
                textAlign: 'center',
                mb: 4,
                color: 'text.secondary',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 60,
                  height: 3,
                  bgcolor: 'primary.main',
                  borderRadius: 1.5
                }
              }}
            >
              Sponsors Or
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
              {hackathonData.sponsors
                .filter(sponsor => sponsor.level === 'Or')
                .map((sponsor, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: 2
                        }
                      }}
                    >
                      <Box
                        component="img"
                        src={sponsor.logo || "/logo-placeholder.png"}
                        alt={sponsor.name}
                        sx={{
                          maxWidth: '100%',
                          maxHeight: 80,
                          objectFit: 'contain'
                        }}
                      />
                    </Paper>
                  </Grid>
                ))}
            </Grid>

            {/* Sponsors Argent et Partenaires */}
            <Grid container spacing={6} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    textAlign: 'center',
                    mb: 4,
                    color: 'text.secondary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 60,
                      height: 3,
                      bgcolor: 'primary.main',
                      borderRadius: 1.5
                    }
                  }}
                >
                  Sponsors Argent
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  {hackathonData.sponsors
                    .filter(sponsor => sponsor.level === 'Argent')
                    .map((sponsor, index) => (
                      <Grid item xs={6} sm={4} key={index}>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            transition: 'transform 0.3s',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: 1
                            }
                          }}
                        >
                          <Box
                            component="img"
                            src={sponsor.logo || "/logo-placeholder.png"}
                            alt={sponsor.name}
                            sx={{
                              maxWidth: '100%',
                              maxHeight: 60,
                              objectFit: 'contain'
                            }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    textAlign: 'center',
                    mb: 4,
                    color: 'text.secondary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 60,
                      height: 3,
                      bgcolor: 'primary.main',
                      borderRadius: 1.5
                    }
                  }}
                >
                  Partenaires
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                  {hackathonData.sponsors
                    .filter(sponsor => sponsor.level === 'Partenaire')
                    .map((sponsor, index) => (
                      <Grid item xs={6} sm={4} key={index}>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 2,
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 2,
                            transition: 'transform 0.3s',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: 1
                            }
                          }}
                        >
                          <Box
                            component="img"
                            src={sponsor.logo || "/logo-placeholder.png"}
                            alt={sponsor.name}
                            sx={{
                              maxWidth: '100%',
                              maxHeight: 60,
                              objectFit: 'contain'
                            }}
                          />
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Section FAQ */}
      <Box
        id="faq"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'background.accent' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Questions fréquentes
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              FAQ
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
              Retrouvez les réponses aux questions les plus fréquemment posées sur le Hackathon IA 2025.
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {hackathonData.faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  borderRadius: '8px !important',
                  '&:before': {
                    display: 'none',
                  },
                  '&:not(:last-child)': {
                    borderBottom: 0,
                  },
                  '&:first-of-type': {
                    borderTopLeftRadius: '8px !important',
                    borderTopRightRadius: '8px !important',
                  },
                  '&:last-of-type': {
                    borderBottomLeftRadius: '8px !important',
                    borderBottomRightRadius: '8px !important',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{ 
                    '& .MuiAccordionSummary-content': {
                      my: 1.5,
                    }
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Section Inscription */}
      <Box
        id="inscription"
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ py: 10, bgcolor: 'background.default' }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
              Rejoindre l'aventure
            </Typography>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
              Inscrivez-vous maintenant
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Complétez le formulaire ci-dessous pour réserver votre place au Hackathon IA 2025.
              Les places sont limitées !
            </Typography>
          </Box>

          <Paper
            elevation={2}
            component="form"
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 2,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Prénom"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Téléphone"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Statut"
                  variant="outlined"
                  defaultValue=""
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="" disabled>Sélectionnez votre statut</option>
                  <option value="student">Étudiant</option>
                  <option value="professional">Professionnel</option>
                  <option value="other">Autre</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Compétences principales"
                  variant="outlined"
                  defaultValue=""
                  SelectProps={{
                    native: true,
                    multiple: false,
                  }}
                >
                  <option value="" disabled>Sélectionnez votre domaine d'expertise</option>
                  <option value="development">Développement</option>
                  <option value="data">Data Science / IA</option>
                  <option value="design">Design UX/UI</option>
                  <option value="business">Business / Marketing</option>
                  <option value="other">Autre</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="Pourquoi souhaitez-vous participer au hackathon?"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Avez-vous déjà une idée de projet ou une équipe?"
                  variant="outlined"
                  defaultValue=""
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="" disabled>Sélectionnez une option</option>
                  <option value="idea">J'ai une idée mais pas d'équipe</option>
                  <option value="team">J'ai une équipe mais pas d'idée précise</option>
                  <option value="both">J'ai une idée et une équipe</option>
                  <option value="none">Je n'ai ni idée ni équipe pour le moment</option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<PersonAdd />}
                  sx={{ py: 1.5, mt: 2 }}
                >
                  S'inscrire au hackathon
                </Button>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              Les inscriptions sont ouvertes jusqu'au 10 janvier 2025. Pour toute question, 
              contactez-nous à{' '}
              <a href="mailto:hackathon@clubgi.com" color="primary">
                hackathon@clubgi.com
              </a>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{
          py: 10,
          bgcolor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Cercles décoratifs */}
        <Box
          sx={{
            position: 'absolute',
            width: '20vw',
            height: '20vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            top: '-5vw',
            right: '10vw',
            zIndex: 0,
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            width: '30vw',
            height: '30vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
            bottom: '-15vw',
            left: '-10vw',
            zIndex: 0,
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" component="h2" sx={{ fontWeight: 800, mb: 2 }}>
            Prêt à relever le défi?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 5, opacity: 0.9, fontWeight: 400 }}>
            Rejoignez-nous pour 24 heures d'innovation, de collaboration et d'apprentissage.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => scrollToSection('inscription')}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 5,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Je m'inscris maintenant
          </Button>
        </Container>
      </Box>
    </Box>
  );
}