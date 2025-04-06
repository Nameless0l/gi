// src/app/resources/page.js
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
  TextField,
  InputAdornment,
  Chip,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  Book,
  Code,
  DevicesOther,
  ExpandMore,
  GetApp,
  Link as LinkIcon,
  Description,
  ArrowForward,
  School,
  AttachFile,
  VideoLibrary,
  MenuBook,
  Bookmarks
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

// Données pour les ressources
const tutorialsData = [
  {
    id: 1,
    title: "Introduction à Python pour débutants",
    description: "Un guide complet pour les débutants qui souhaitent apprendre Python, couvrant les bases de la syntaxe et les concepts fondamentaux.",
    image: "/images/resources/python-tutorial.jpg",
    category: "Programmation",
    level: "Débutant",
    author: "Gabriel Nomo",
    date: "15 janvier 2024",
    type: "Tutoriel",
    link: "/resources/tutorials/python-intro"
  },
  {
    id: 2,
    title: "Web moderne avec React & Node.js",
    description: "Apprenez à créer des applications web modernes avec React en frontend et Node.js en backend.",
    image: "/images/resources/react-node-tutorial.jpg",
    category: "Développement Web",
    level: "Intermédiaire",
    author: "Félix Nziko",
    date: "5 mars 2024",
    type: "Tutoriel",
    link: "/resources/tutorials/react-node"
  },
  {
    id: 3,
    title: "Intelligence Artificielle pour la vision par ordinateur",
    description: "Introduction aux techniques de vision par ordinateur avec TensorFlow et OpenCV.",
    image: "/images/resources/computer-vision.jpg",
    category: "IA & Machine Learning",
    level: "Avancé",
    author: "Thierry Ngoupaye",
    date: "20 avril 2024",
    type: "Tutoriel",
    link: "/resources/tutorials/computer-vision"
  },
  {
    id: 4,
    title: "Docker pour les applications web",
    description: "Apprenez à conteneuriser vos applications web et à les déployer facilement sur différentes plateformes.",
    image: "/images/resources/docker-tutorial.jpg",
    category: "DevOps",
    level: "Intermédiaire",
    author: "Loïc Mbassi",
    date: "10 février 2024",
    type: "Tutoriel",
    link: "/resources/tutorials/docker-web"
  }
];

const libraryData = [
  {
    id: 1,
    title: "Introduction à la programmation avec Python",
    description: "Un livre complet pour les débutants qui couvre tous les aspects de base de la programmation avec Python.",
    image: "/images/resources/python-book.jpg",
    category: "Programmation",
    author: "Dr. Jean Kamga",
    year: "2023",
    type: "Livre",
    format: "PDF",
    size: "12.5 MB",
    link: "/resources/library/python-programming"
  },
  {
    id: 2,
    title: "Algorithmes et structures de données",
    description: "Un recueil d'algorithmes et de structures de données essentiels pour tout informaticien.",
    image: "/images/resources/algorithms-book.jpg",
    category: "Algorithmes",
    author: "Prof. Marie Tchuente",
    year: "2022",
    type: "Livre",
    format: "PDF",
    size: "15.2 MB",
    link: "/resources/library/algorithms"
  },
  {
    id: 3,
    title: "Slides du cours de Bases de Données",
    description: "Les diapositives complètes du cours de Bases de Données relationnelles enseigné à l'ENSPY.",
    image: "/images/resources/database-slides.jpg",
    category: "Bases de Données",
    author: "Dr. Samuel Mbarga",
    year: "2024",
    type: "Slides",
    format: "PDF",
    size: "8.7 MB",
    link: "/resources/library/database-slides"
  },
  {
    id: 4,
    title: "Cours de Réseaux Informatiques",
    description: "Support de cours complet sur les réseaux informatiques, les protocoles et leur mise en œuvre.",
    image: "/images/resources/networking-course.jpg",
    category: "Réseaux",
    author: "Dr. Paul Tsogo",
    year: "2023",
    type: "Cours",
    format: "PDF",
    size: "20.1 MB",
    link: "/resources/library/networking"
  },
  {
    id: 5,
    title: "Introduction à la Cybersécurité",
    description: "Un recueil de documents et d'exercices pratiques sur les fondamentaux de la cybersécurité.",
    image: "/images/resources/cybersecurity-book.jpg",
    category: "Sécurité",
    author: "Ing. Sophie Kamdem",
    year: "2024",
    type: "Livre",
    format: "PDF",
    size: "14.3 MB",
    link: "/resources/library/cybersecurity"
  },
  {
    id: 6,
    title: "Intelligence Artificielle : Fondements et Applications",
    description: "Un ouvrage de référence sur l'intelligence artificielle, le machine learning et le deep learning.",
    image: "/images/resources/ai-book.jpg",
    category: "IA & Machine Learning",
    author: "Prof. Bernard Moussa",
    year: "2023",
    type: "Livre",
    format: "PDF",
    size: "18.9 MB",
    link: "/resources/library/ai-foundations"
  }
];

const toolsData = [
  {
    id: 1,
    title: "GitLab ENSPY",
    description: "Plateforme de gestion de code source basée sur Git pour les projets des étudiants de l'ENSPY.",
    image: "/images/resources/gitlab.jpg",
    category: "Développement",
    type: "Plateforme",
    link: "https://gitlab.enspy.cm"
  },
  {
    id: 2,
    title: "Jupyter Hub ENSPY",
    description: "Environnement Jupyter pour l'apprentissage et la pratique de la data science et du machine learning.",
    image: "/images/resources/jupyter.jpg",
    category: "Data Science",
    type: "Plateforme",
    link: "https://jupyter.enspy.cm"
  },
  {
    id: 3,
    title: "Modèle de Rapport de Projet",
    description: "Template LaTeX pour la rédaction de rapports de projets suivant les normes de l'ENSPY.",
    image: "/images/resources/latex-template.jpg",
    category: "Documentation",
    type: "Template",
    format: "ZIP",
    size: "2.3 MB",
    link: "/resources/tools/project-report-template"
  },
  {
    id: 4,
    title: "Pack de Développement Web",
    description: "Ensemble d'outils et de bibliothèques pour le développement web front-end et back-end.",
    image: "/images/resources/web-dev-pack.jpg",
    category: "Développement Web",
    type: "Pack d'outils",
    format: "ZIP",
    size: "45.7 MB",
    link: "/resources/tools/web-dev-pack"
  },
  {
    id: 5,
    title: "Moodle ENSPY",
    description: "Plateforme d'apprentissage en ligne avec les cours et ressources pédagogiques de l'ENSPY.",
    image: "/images/resources/moodle.jpg",
    category: "Éducation",
    type: "Plateforme",
    link: "https://moodle.enspy.cm"
  },
  {
    id: 6,
    title: "Dataset Cameroun",
    description: "Ensemble de données à utiliser pour vos projets d'analyse de données et de machine learning.",
    image: "/images/resources/dataset.jpg",
    category: "Data Science",
    type: "Dataset",
    format: "ZIP",
    size: "203.5 MB",
    link: "/resources/tools/cameroon-dataset"
  },
  {
    id: 7,
    title: "VS Code avec extensions recommandées",
    description: "Visual Studio Code préconfiguré avec des extensions recommandées pour le développement.",
    image: "/images/resources/vscode.jpg",
    category: "Développement",
    type: "IDE",
    format: "ZIP",
    size: "75.2 MB",
    link: "/resources/tools/vscode-pack"
  },
  {
    id: 8,
    title: "API du Club GI",
    description: "Documentation et accès à l'API du Club GI pour développer des applications intégrées.",
    image: "/images/resources/api-docs.jpg",
    category: "API",
    type: "Documentation",
    link: "https://api.clubgi.enspy.cm/docs"
  }
];

export default function ResourcesPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };
  
  // Filtrage des données en fonction de la recherche et de la catégorie
  const getFilteredData = (data) => {
    return data.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || 
        (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  };
  
  const filteredTutorials = getFilteredData(tutorialsData);
  const filteredLibrary = getFilteredData(libraryData);
  const filteredTools = getFilteredData(toolsData);
  
  // Obtenir toutes les catégories uniques pour les filtres
  const getAllCategories = () => {
    const allData = [...tutorialsData, ...libraryData, ...toolsData];
    const categories = allData.map(item => item.category);
    return ['all', ...new Set(categories)];
  };

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
                  Ressources
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
                  Découvrez notre collection de tutoriels, livres, cours et outils pour développer
                  vos compétences en informatique.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Barre de recherche et filtres */}
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Rechercher une ressource..."
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: 1
              }}
            >
              {getAllCategories().map((category, index) => (
                <Button
                  key={index}
                  variant={categoryFilter === category ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => handleCategoryFilter(category)}
                  sx={{ 
                    textTransform: 'capitalize',
                    mb: 1
                  }}
                >
                  {category === 'all' ? 'Toutes' : category}
                </Button>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>

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
              label="Tutoriels" 
              icon={<MenuBook />} 
              iconPosition="start"
            />
            <Tab 
              label="Bibliothèque" 
              icon={<Book />} 
              iconPosition="start"
            />
            <Tab 
              label="Outils" 
              icon={<DevicesOther />} 
              iconPosition="start"
            />
          </Tabs>
        </Container>
      </Box>

      {/* Contenu des tabs */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Tab Tutoriels */}
          <Box role="tabpanel" hidden={tabValue !== 0}>
            {tabValue === 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                  <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                    Tutoriels
                  </Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                    Apprendre par la pratique
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
                    Découvrez nos tutoriels détaillés pour apprendre de nouvelles technologies
                    et développer vos compétences techniques.
                  </Typography>
                </Box>

                {filteredTutorials.length > 0 ? (
                  <Grid container spacing={4}>
                    {filteredTutorials.map((tutorial, index) => (
                      <Grid item xs={12} md={6} key={tutorial.id}>
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
                              image={tutorial.image || "/images/placeholder-tutorial.jpg"}
                              alt={tutorial.title}
                            />
                            <CardContent sx={{ flex: '1 0 auto', p: 3 }}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                <Chip 
                                  label={tutorial.category} 
                                  size="small"
                                  color="primary"
                                  sx={{ fontWeight: 600 }}
                                />
                                <Chip 
                                  label={tutorial.level} 
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontWeight: 500 }}
                                />
                              </Box>
                              
                              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {tutorial.title}
                              </Typography>
                              
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {tutorial.description}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                  {tutorial.author} • {tutorial.date}
                                </Typography>
                                
                                <Button
                                  component={Link}
                                  href={tutorial.link}
                                  color="primary"
                                  endIcon={<ArrowForward />}
                                  sx={{ fontWeight: 600 }}
                                >
                                  Voir
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      Aucun tutoriel ne correspond à votre recherche.
                    </Typography>
                  </Box>
                )}
                
                {/* CTA pour demander de nouveaux tutoriels */}
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
                    Vous ne trouvez pas ce que vous cherchez ?
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700, mx: 'auto' }}>
                    Suggérez-nous un sujet de tutoriel et nous ferons de notre mieux pour le créer et le partager.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    href="/contact"
                    sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                  >
                    Suggérer un tutoriel
                  </Button>
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Tab Bibliothèque */}
          <Box role="tabpanel" hidden={tabValue !== 1}>
            {tabValue === 1 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                  <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                    Bibliothèque
                  </Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                    Ressources pédagogiques
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
                    Accédez à notre collection de livres, cours, présentations et autres ressources
                    pédagogiques pour approfondir vos connaissances.
                  </Typography>
                </Box>

                {filteredLibrary.length > 0 ? (
                  <Grid container spacing={4}>
                    {filteredLibrary.map((item, index) => (
                      <Grid item xs={12} sm={6} md={4} key={item.id}>
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
                                transform: 'translateY(-10px)',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                              }
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="200"
                              image={item.image || "/images/placeholder-book.jpg"}
                              alt={item.title}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                <Chip 
                                  label={item.category} 
                                  size="small"
                                  color="primary"
                                  sx={{ fontWeight: 600 }}
                                />
                                <Chip 
                                  label={item.type} 
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontWeight: 500 }}
                                />
                              </Box>
                              
                              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {item.title}
                              </Typography>
                              
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {item.description}
                              </Typography>
                              
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                  <strong>Auteur:</strong> {item.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  <strong>Année:</strong> {item.year}
                                </Typography>
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Description sx={{ fontSize: 16, mr: 0.5, color: 'primary.main' }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {item.format} • {item.size}
                                  </Typography>
                                </Box>
                                
                                <Button
                                  component={Link}
                                  href={item.link}
                                  color="primary"
                                  startIcon={<GetApp />}
                                  sx={{ fontWeight: 600 }}
                                >
                                  Télécharger
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      Aucune ressource ne correspond à votre recherche.
                    </Typography>
                  </Box>
                )}
                
                {/* Ressources externes recommandées */}
                <Box sx={{ mt: 8 }}>
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
                    Ressources externes recommandées
                  </Typography>
                  
                  <Grid container spacing={3}>
                    {[
                      {
                        title: "Cours CS50 de Harvard",
                        description: "Introduction à l'informatique et à l'art de la programmation.",
                        link: "https://cs50.harvard.edu/"
                      },
                      {
                        title: "Documentation Python",
                        description: "Documentation officielle du langage Python.",
                        link: "https://docs.python.org/"
                      },
                      {
                        title: "MDN Web Docs",
                        description: "Ressources pour développeurs Web par Mozilla.",
                        link: "https://developer.mozilla.org/"
                      },
                      {
                        title: "OpenClassrooms",
                        description: "Plateforme d'apprentissage en ligne avec des cours gratuits.",
                        link: "https://openclassrooms.com/"
                      }
                    ].map((resource, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper
                          sx={{ 
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: 2
                            }
                          }}
                        >
                          <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 600 }}>
                            {resource.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {resource.description}
                          </Typography>
                          <Button
                            component="a"
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            endIcon={<LinkIcon />}
                            sx={{ mt: 'auto', alignSelf: 'flex-start', fontWeight: 600 }}
                          >
                            Accéder
                          </Button>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </motion.div>
            )}
          </Box>

          {/* Tab Outils */}
          <Box role="tabpanel" hidden={tabValue !== 2}>
            {tabValue === 2 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                  <Typography variant="h6" component="p" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
                    Outils et Plateformes
                  </Typography>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                    Boostez votre productivité
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
                    Explorez notre collection d'outils, de modèles et de plateformes pour
                    faciliter votre apprentissage et vos projets.
                  </Typography>
                </Box>

                {filteredTools.length > 0 ? (
                  <Grid container spacing={4}>
                    {filteredTools.map((tool, index) => (
                      <Grid item xs={12} sm={6} md={4} key={tool.id}>
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
                                transform: 'translateY(-10px)',
                                boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                              }
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="180"
                              image={tool.image || "/images/placeholder-tool.jpg"}
                              alt={tool.title}
                            />
                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                                <Chip 
                                  label={tool.category} 
                                  size="small"
                                  color="primary"
                                  sx={{ fontWeight: 600 }}
                                />
                                <Chip 
                                  label={tool.type} 
                                  size="small"
                                  variant="outlined"
                                  sx={{ fontWeight: 500 }}
                                />
                              </Box>
                              
                              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                                {tool.title}
                              </Typography>
                              
                              <Typography variant="body2" color="text.secondary" paragraph>
                                {tool.description}
                              </Typography>
                              
                              <Box sx={{ mt: 'auto' }}>
                                {tool.format && tool.size && (
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <AttachFile sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                    <Typography variant="caption" color="text.secondary">
                                      {tool.format} • {tool.size}
                                    </Typography>
                                  </Box>
                                )}
                                
                                <Button
                                  component={tool.link.startsWith('http') ? 'a' : Link}
                                  href={tool.link}
                                  target={tool.link.startsWith('http') ? '_blank' : '_self'}
                                  rel={tool.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                  color="primary"
                                  endIcon={tool.link.startsWith('http') ? <LinkIcon /> : <GetApp />}
                                  sx={{ fontWeight: 600 }}
                                >
                                  {tool.link.startsWith('http') ? 'Accéder' : 'Télécharger'}
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                      Aucun outil ne correspond à votre recherche.
                    </Typography>
                  </Box>
                )}
                
                {/* FAQ */}
                <Box sx={{ mt: 8 }}>
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
                    Questions fréquentes
                  </Typography>
                  
                  <Box sx={{ mb: 6 }}>
                    {[
                      {
                        question: "Comment puis-je installer et configurer ces outils ?",
                        answer: "La plupart des outils téléchargeables sont fournis avec un guide d'installation et de configuration. Si vous rencontrez des difficultés, n'hésitez pas à nous contacter via le formulaire de contact."
                      },
                      {
                        question: "Est-ce que ces ressources sont gratuites ?",
                        answer: "Oui, toutes les ressources disponibles sur cette page sont gratuites pour les membres du Club GI et les étudiants de l'ENSPY."
                      },
                      {
                        question: "Comment suggérer un nouvel outil ou ressource ?",
                        answer: "Vous pouvez nous suggérer de nouveaux outils ou ressources via le formulaire de contact. Nous sommes toujours à la recherche de nouvelles ressources utiles à partager avec la communauté."
                      },
                      {
                        question: "Je rencontre des problèmes pour accéder à certaines plateformes. Que faire ?",
                        answer: "Si vous rencontrez des problèmes d'accès, assurez-vous d'abord que vous êtes connecté avec votre compte ENSPY. Si le problème persiste, contactez l'équipe technique du Club GI."
                      }
                    ].map((faq, index) => (
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
                </Box>
              </motion.div>
            )}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
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
            Vous avez des ressources à partager ?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, fontWeight: 400, opacity: 0.9 }}>
            Contribuez à enrichir notre bibliothèque de ressources en partageant vos tutoriels,
            livres ou outils avec la communauté.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<Bookmarks />}
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
            Contribuer aux ressources
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