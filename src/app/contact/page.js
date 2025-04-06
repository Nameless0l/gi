// src/app/contact/page.js
'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
  Link as MuiLink,
  useTheme,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  Send,
  Email,
  Phone,
  LocationOn,
  School,
  Facebook,
  LinkedIn,
  Twitter as X,
  Instagram,
  GitHub
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

const contactInfo = [
  { 
    icon: <Email fontSize="large" color="primary" />, 
    title: "Email", 
    content: "clubinfoenspy@gmail.com",
    link: "mailto:clubinfoenspy@gmail.com" 
  },
  { 
    icon: <Phone fontSize="large" color="primary" />, 
    title: "Téléphone", 
    content: "+237 683 86 24 42",
    link: "tel:+237683862442" 
  },
  { 
    icon: <LocationOn fontSize="large" color="primary" />, 
    title: "Adresse", 
    content: "École Nationale Supérieure Polytechnique de Yaoundé, BP 8390, Yaoundé, Cameroun",
    link: "https://maps.google.com/?q=École+Nationale+Supérieure+Polytechnique+de+Yaoundé" 
  },
  { 
    icon: <School fontSize="large" color="primary" />, 
    title: "Campus", 
    content: "Campus principal, Bâtiment A, Niveau 2, Salle 205",
    link: null 
  }
];

const socialLinks = [
  { icon: <Facebook />, name: "Facebook", url: "https://www.facebook.com/clubgenieinformatique" },
  { icon: <X />, name: "X (Twitter)", url: "https://x.com/club_info_enspy" },
  { icon: <Instagram />, name: "Instagram", url: "https://www.instagram.com/club_info_enspy" },
  { icon: <LinkedIn />, name: "LinkedIn", url: "https://www.linkedin.com/in/club-gi-enspy-1a919b29b" },
  { icon: <GitHub />, name: "GitHub", url: "https://github.com/club-genie-informatique-enspy" }
];

export default function ContactPage() {
  const theme = useTheme();
  
  // État du formulaire
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactType: 'general',
    status: 'student',
  });
  
  // État pour les messages de succès/erreur
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Ici, vous ajouteriez la logique pour envoyer le formulaire à votre backend
    
    // Message de succès (simulation)
    setSnackbar({
      open: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      severity: 'success'
    });
    
    // Réinitialiser le formulaire
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      contactType: 'general',
      status: 'student',
    });
  };
  
  // Fermeture du snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '40vh',
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
                  Contactez-nous
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
                  Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter.
                  Nous sommes là pour vous aider.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Contenu principal */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
        <Grid container spacing={6}>
          {/* Formulaire de contact */}
          <Grid item xs={12} md={8}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 3, sm: 5 }, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }}
              >
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                  Envoyez-nous un message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={3}>
                    {/* Type de contact */}
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 500 }}>
                          Comment pouvons-nous vous aider ?
                        </FormLabel>
                        <RadioGroup
                          row
                          name="contactType"
                          value={formData.contactType}
                          onChange={handleChange}
                        >
                          <FormControlLabel 
                            value="general" 
                            control={<Radio />} 
                            label="Renseignement général" 
                          />
                          <FormControlLabel 
                            value="membership" 
                            control={<Radio />} 
                            label="Adhésion au club" 
                          />
                          <FormControlLabel 
                            value="partnership" 
                            control={<Radio />} 
                            label="Partenariat" 
                          />
                          <FormControlLabel 
                            value="other" 
                            control={<Radio />} 
                            label="Autre" 
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    
                    {/* Nom et Prénom */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Prénom"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Nom"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </Grid>
                    
                    {/* Email et Téléphone */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Téléphone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    
                    {/* Statut */}
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        label="Votre statut"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                      >
                        <MenuItem value="student">Étudiant à l'ENSPY</MenuItem>
                        <MenuItem value="external_student">Étudiant (autre établissement)</MenuItem>
                        <MenuItem value="alumni">Ancien élève</MenuItem>
                        <MenuItem value="professional">Professionnel</MenuItem>
                        <MenuItem value="other">Autre</MenuItem>
                      </TextField>
                    </Grid>
                    
                    {/* Sujet et Message */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Sujet"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        multiline
                        rows={6}
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </Grid>
                    
                    {/* Bouton d'envoi */}
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<Send />}
                        sx={{ 
                          px: 4, 
                          py: 1.2, 
                          fontWeight: 600,
                          mt: 2
                        }}
                      >
                        Envoyer le message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
          
          {/* Informations de contact */}
          <Grid item xs={12} md={4}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Box>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
                  Coordonnées
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  {contactInfo.map((info, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        mb: 2,
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{ pt: 0.5 }}>
                          {info.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {info.title}
                          </Typography>
                          {info.link ? (
                            <MuiLink
                              href={info.link}
                              underline="hover"
                              sx={{ color: 'text.secondary' }}
                              target={info.link.startsWith('http') ? '_blank' : '_self'}
                              rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            >
                              {info.content}
                            </MuiLink>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              {info.content}
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                
                <Divider sx={{ my: 4 }} />
                
                {/* Réseaux sociaux */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Suivez-nous
                </Typography>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    gap: 2,
                    flexWrap: 'wrap'
                  }}
                >
                  {socialLinks.map((social, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      color="primary"
                      startIcon={social.icon}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        mb: 1,
                        borderRadius: 2,
                        textTransform: 'none'
                      }}
                    >
                      {social.name}
                    </Button>
                  ))}
                </Box>
                
                <Divider sx={{ my: 4 }} />
                
                {/* Heures d'ouverture */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Heures d'ouverture
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Lundi - Vendredi
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    10:00 - 17:00
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Samedi
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    10:00 - 14:00
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Google Maps embed (à remplacer par les coordonnées exactes de l'ENSPY) */}
      <Box sx={{ height: '450px', width: '100%', mt: 2 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.7738556415513!2d11.491766675468064!3d3.866207096542134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcf7eb5615e35%3A0xe79b7cbeff830b59!2s%C3%89cole%20Nationale%20Sup%C3%A9rieure%20Polytechnique%20de%20Yaound%C3%A9!5e0!3m2!1sfr!2scm!4v1712433215639!5m2!1sfr!2scm"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte de l'ENSPY"
        ></iframe>
      </Box>
      
      {/* Snackbar pour les messages de succès/erreur */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}