import React from 'react';
import { Box, Typography, Grid, Avatar, Card, CardContent, Paper, Container } from '@mui/material';
import { Code, Group, Lightbulb } from '@mui/icons-material';


const aboutData = {
  history: `
    Le Club GI (Génie Informatique) de l'École Nationale Supérieure Polytechnique de Yaoundé est une communauté d'étudiants dédiée à l'innovation technologique 
    et à l'excellence académique. Depuis sa création, le club a servi de plateforme pour explorer, 
    apprendre et collaborer sur des projets informatiques.`,
  mission: `
    Promouvoir la maîtrise des technologies de l'information et de la communication parmi ses membres 
    et préparer les futurs leaders du numérique.`,
  values: [
    {
      icon: <Code fontSize="large" />,
      title: "Apprendre",
      description: "Nous visons l'excellence dans tous nos projets informatiques."
    },
    {
      icon: <Group fontSize="large" />,
      title: "Accomplir",
      description: "La collaboration est au cœur de notre approche."
    },
    {
      icon: <Lightbulb fontSize="large" />,
      title: "Innover",
      description: "Nous encourageons la créativité et les nouvelles idées."
    }
  ],
  team: [
    { name: 'John Doe', role: 'Président', image: '/path-to-image-1.jpg' },
    { name: 'Jane Smith', role: 'Vice-présidente', image: '/path-to-image-2.jpg' },
    { name: 'Alice Brown', role: 'Secrétaire générale', image: '/path-to-image-3.jpg' },
    { name: 'Bob White', role: 'Responsable des projets', image: '/path-to-image-4.jpg' },
  ],
};

const About = () => {
  return (
    <Container>

    <Box sx={{ mt: 12, mb: 6, px: 3 }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: 4,
          textAlign: 'center',
        //   backgroundImage: 'linear-gradient(135deg, #003a6b 30%, #0071ff 90%)',
        //   color: 'white',
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          À propos de nous
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 300 }}>
          Découvrez notre mission, notre histoire et les visages derrière le succès du Club GI.
        </Typography>
      </Box>

      {/* Section Historique */}
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
          Notre Histoire
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8 }}>
          {aboutData.history}
        </Typography>
      </Box>

      {/* Section Mission et Valeurs */}
      <Box
          sx={{
            py: 6,
            px : 4,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Notre Mission et Nos Valeurs
          </Typography>
          <Typography
            variant="body1"
            sx={{ maxWidth: 800, mx: 'auto', fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}
          >
            {aboutData.mission}
          </Typography>
          <Grid container spacing={4}>
            {aboutData.values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                  }}
                >
                  {value.icon}
                  <Typography variant="h6" sx={{ my: 2 }}>
                    {value.title}
                  </Typography>
                  <Typography>{value.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

      {/* Section Équipe */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
            Rencontrez notre équipe
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {aboutData.team.map((member, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    textAlign: 'center',
                    boxShadow: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mt: 3,
                      mb: 2,
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
    </Box>
    </Container>
  );
};

export default About;
