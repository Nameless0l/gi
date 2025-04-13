// src/app/faq/page.js
'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Button,
  Paper,
  Grid,
  Divider,
  useTheme
} from '@mui/material';
import {
  ExpandMore,
  Search,
  Help,
  School,
  Person,
  AttachMoney,
  Event,
  Code,
  ContactSupport
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';

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

// Données FAQ
const faqData = [
  {
    category: "Adhésion",
    icon: <Person />,
    questions: [
      {
        question: "Comment devenir membre du Club GI ?",
        answer: "Pour devenir membre du Club GI, vous devez remplir le formulaire d'adhésion disponible sur notre site ou physiquement au bureau du club, et payer la cotisation annuelle de 2000 FCFA. Les adhésions sont ouvertes principalement en début d'année académique, mais vous pouvez nous contacter à tout moment pour rejoindre le club."
      },
      {
        question: "Faut-il être étudiant en Génie Informatique pour rejoindre le club ?",
        answer: "Non, le Club GI est ouvert à tous les étudiants de l'ENSPY, quelle que soit leur filière. Nous accueillons également des étudiants d'autres établissements qui souhaitent participer à nos activités. Tout ce qui compte est votre passion pour l'informatique et la technologie."
      },
      {
        question: "Quels sont les avantages d'être membre du Club GI ?",
        answer: "En tant que membre, vous bénéficiez d'un accès prioritaire à nos formations, ateliers et événements, souvent gratuitement ou à tarif réduit. Vous pourrez également participer aux projets du club, recevoir un mentorat de la part des membres plus expérimentés et développer votre réseau professionnel. Nous fournissons aussi des lettres de recommandation aux membres actifs."
      },
      {
        question: "Comment s'impliquer davantage dans le club ?",
        answer: "Vous pouvez vous impliquer davantage en rejoignant l'une de nos cellules (Projets, Communication, Relations extérieures ou Finances), en proposant des idées de projets ou d'événements, en animant des ateliers ou en participant au bureau du club. Manifestez votre intérêt auprès d'un membre du bureau, et nous vous guiderons dans votre implication."
      }
    ]
  },
  {
    category: "Activités",
    icon: <Event />,
    questions: [
      {
        question: "Quels types d'événements le Club GI organise-t-il ?",
        answer: "Le Club GI organise divers événements tout au long de l'année, notamment des hackathons, des workshops techniques, des conférences avec des professionnels de l'industrie, des compétitions de programmation, des sessions de coding et des visites d'entreprises. Nous organisons également des événements de networking et des sessions de mentorat."
      },
      {
        question: "Comment puis-je m'inscrire aux événements du club ?",
        answer: "Les informations sur les événements sont partagées sur notre site web, nos réseaux sociaux et par email aux membres. Pour vous inscrire, vous pouvez généralement le faire directement sur notre site ou via les liens d'inscription partagés lors des annonces. Les membres du club bénéficient souvent d'une priorité d'inscription."
      },
      {
        question: "Puis-je proposer une idée d'événement ou d'activité ?",
        answer: "Absolument ! Nous encourageons les membres à proposer des idées d'événements ou d'activités. Vous pouvez soumettre votre proposition par email, via notre formulaire de contact, ou directement à un membre du bureau. Nous étudierons votre proposition et vous contacterons pour discuter de sa mise en œuvre."
      },
      {
        question: "Les événements du club sont-ils gratuits ?",
        answer: "La plupart de nos ateliers et petits événements sont gratuits pour les membres du club. Pour les événements plus importants comme les hackathons ou les conférences, il peut y avoir des frais d'inscription, mais les membres bénéficient généralement de tarifs préférentiels. Certains événements sont également ouverts gratuitement à tous les étudiants."
      }
    ]
  },
  {
    category: "Formations",
    icon: <School />,
    questions: [
      {
        question: "Quels types de formations sont proposés par le Club GI ?",
        answer: "Nous proposons des formations sur diverses technologies et compétences informatiques : langages de programmation (Python, JavaScript, Java, etc.), développement web et mobile, intelligence artificielle et machine learning, bases de données, DevOps, cybersécurité, et bien d'autres. Nos formations sont adaptées à différents niveaux, du débutant à l'avancé."
      },
      {
        question: "Comment sont organisées les formations ?",
        answer: "Nos formations sont généralement organisées sous forme d'ateliers pratiques ou de bootcamps intensifs. Elles sont animées par des membres expérimentés du club, des alumni, ou parfois des professionnels de l'industrie. Elles comprennent une partie théorique et beaucoup de pratique. Pour certaines formations, nous fournissons aussi des ressources complémentaires et un suivi après la formation."
      },
      {
        question: "Puis-je obtenir une certification suite à une formation ?",
        answer: "Pour la plupart de nos formations internes, nous délivrons des attestations de participation. Pour certaines formations plus spécialisées, notamment celles organisées en partenariat avec des entreprises ou des plateformes éducatives, des certifications officielles peuvent être proposées, généralement moyennant des frais supplémentaires."
      },
      {
        question: "Comment s'inscrire à une formation ?",
        answer: "Les informations sur les formations à venir sont publiées sur notre site web et nos réseaux sociaux. Pour vous inscrire, suivez le lien d'inscription fourni. Les places étant souvent limitées, nous vous recommandons de vous inscrire rapidement. Les membres du club sont prioritaires pour les inscriptions."
      }
    ]
  },
  {
    category: "Projets",
    icon: <Code />,
    questions: [
      {
        question: "Comment rejoindre un projet existant ?",
        answer: "Pour rejoindre un projet existant, consultez la liste des projets actifs sur notre site ou contactez le responsable de la cellule Projets. Vous pouvez manifester votre intérêt pour un projet spécifique, et en fonction de vos compétences et des besoins du projet, vous pourrez y être intégré. Nous organisons régulièrement des présentations des projets en cours pour permettre aux nouveaux membres de les découvrir."
      },
      {
        question: "Comment proposer un nouveau projet ?",
        answer: "Pour proposer un nouveau projet, préparez une brève description du projet, ses objectifs, les technologies envisagées et les ressources nécessaires. Soumettez votre proposition à la cellule Projets du club via notre formulaire en ligne ou lors des réunions dédiées. Votre proposition sera évaluée, et si elle est validée, vous pourrez constituer une équipe pour la réaliser."
      },
      {
        question: "Quel type de soutien le club offre-t-il pour les projets ?",
        answer: "Le club offre un cadre structuré pour le développement de vos projets : mentorat technique par des membres expérimentés ou des alumni, accès à certaines ressources matérielles (serveurs, matériel spécifique), aide pour le financement via nos partenaires si nécessaire, et visibilité pour votre projet à travers nos canaux de communication et événements."
      },
      {
        question: "Les projets du club peuvent-ils devenir des startups ?",
        answer: "Absolument ! Plusieurs projets initiés au sein du Club GI ont évolué pour devenir des startups à part entière. Nous encourageons l'esprit entrepreneurial et pouvons vous mettre en relation avec notre réseau d'incubateurs et d'investisseurs si votre projet montre un potentiel commercial. Nous organisons également des sessions sur l'entrepreneuriat et le business development."
      }
    ]
  },
  {
    category: "Partenariats",
    icon: <AttachMoney />,
    questions: [
      {
        question: "Comment devenir partenaire du Club GI ?",
        answer: "Pour devenir partenaire du Club GI, contactez-nous via notre formulaire de contact ou directement à notre adresse email dédiée aux partenariats : partnerships@clubgi.enspy.cm. Nous vous enverrons notre dossier de partenariat détaillant les différentes formules disponibles et les avantages associés. Nous sommes ouverts à discuter de partenariats personnalisés qui répondent à vos objectifs spécifiques."
      },
      {
        question: "Quels types de partenariats le club propose-t-il ?",
        answer: "Nous proposons différents types de partenariats : sponsoring d'événements (hackathons, conférences), partenariats pour des formations techniques, programmes de stages ou de recrutement, mentorat pour nos membres, soutien matériel ou financier pour nos projets, et bien d'autres. Nous sommes flexibles et pouvons adapter notre collaboration à vos besoins."
      },
      {
        question: "Quels sont les avantages pour les partenaires ?",
        answer: "En tant que partenaire, vous bénéficierez d'une visibilité auprès de notre communauté d'étudiants talentueux, d'un accès privilégié pour le recrutement de stagiaires ou d'employés, de la possibilité de présenter vos technologies ou produits lors de nos événements, et de collaborer sur des projets innovants. C'est également une opportunité de contribuer à la formation de la prochaine génération de professionnels de l'informatique."
      },
      {
        question: "Quels sont vos partenaires actuels ?",
        answer: "Nous collaborons avec diverses organisations, notamment des entreprises technologiques locales et internationales, des institutions académiques, des incubateurs et des organismes gouvernementaux. Parmi nos partenaires figurent Orange Cameroun, MTN, Microsoft, l'Université de Yaoundé, Google Developer Groups, et l'ENSPY. Vous pouvez consulter la liste complète de nos partenaires sur notre page Partenariats."
      }
    ]
  },
  {
    category: "Support",
    icon: <Help />,
    questions: [
      {
        question: "Comment contacter le Club GI pour une question spécifique ?",
        answer: "Vous pouvez nous contacter de plusieurs façons : via notre formulaire de contact sur le site, par email à clubinfoenspy@gmail.com, par téléphone au +237 683 86 24 42, ou en personne à notre bureau sur le campus de l'ENSPY (Bâtiment A, Niveau 2, Salle 205). Pour des questions spécifiques, vous pouvez également contacter directement le responsable de la cellule concernée."
      },
      {
        question: "Quels sont les horaires d'ouverture du bureau du club ?",
        answer: "Notre bureau est généralement ouvert du lundi au vendredi de 10h00 à 17h00, et le samedi de 10h00 à 14h00. Cependant, ces horaires peuvent varier pendant les périodes d'examens ou de vacances. Il est recommandé de vérifier nos horaires actuels sur notre site web ou de nous contacter avant de vous déplacer."
      },
      {
        question: "Comment signaler un problème technique sur le site ou les plateformes du club ?",
        answer: "Pour signaler un problème technique, envoyez un email à support@clubgi.enspy.cm en décrivant le problème rencontré de manière aussi détaillée que possible. N'hésitez pas à inclure des captures d'écran si nécessaire. Notre équipe technique vous répondra dans les plus brefs délais."
      },
      {
        question: "Comment puis-je faire un don ou soutenir financièrement le club ?",
        answer: "Nous apprécions grandement tout soutien financier qui nous permet de continuer à offrir des activités de qualité. Vous pouvez faire un don via notre page de dons sur le site, par virement bancaire, ou en nous contactant directement pour discuter d'autres modalités de soutien. Les dons peuvent être dédiés à des projets ou activités spécifiques si vous le souhaitez."
      }
    ]
  }
];

export default function FAQPage() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleCategoryChange = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };
  
  const handleQuestionChange = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  // Filtrer les questions en fonction de la recherche
  const getFilteredQuestions = () => {
    if (!searchTerm) {
      return faqData;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    
    return faqData.map(category => ({
      ...category,
      questions: category.questions.filter(q => 
        q.question.toLowerCase().includes(searchTermLower) || 
        q.answer.toLowerCase().includes(searchTermLower)
      )
    })).filter(category => category.questions.length > 0);
  };
  
  const filteredQuestions = getFilteredQuestions();

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section using the reusable component */}
      <HeroSection
        title="Questions fréquemment posées"
        subtitle="Trouvez rapidement des réponses à vos questions sur le Club GI, nos activités, nos projets et bien plus encore."
        minHeight={40}
      />

      {/* Barre de recherche */}
      <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Rechercher une question..."
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
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
      </Container>

      {/* Catégories en chips */}
      <Container maxWidth="md" sx={{ mb: 6 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1.5
          }}
        >
          {faqData.map((category, index) => (
            <Chip
              key={index}
              label={category.category}
              icon={category.icon}
              color={expandedCategory === category.category ? "primary" : "default"}
              variant={expandedCategory === category.category ? "filled" : "outlined"}
              onClick={() => handleCategoryChange(category.category)}
              sx={{ 
                px: 1, 
                py: 2.5,
                '& .MuiChip-label': {
                  fontWeight: 600
                }
              }}
            />
          ))}
        </Box>
      </Container>

      {/* Contenu FAQ */}
      <Container maxWidth="md" sx={{ pb: 8 }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          {searchTerm && filteredQuestions.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                Aucune question ne correspond à votre recherche.
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={() => setSearchTerm('')}
                sx={{ mt: 2 }}
              >
                Effacer la recherche
              </Button>
            </Box>
          )}

          {filteredQuestions.map((category, categoryIndex) => (
            <Box
              key={categoryIndex}
              sx={{ 
                mb: 6,
                display: category.questions.length === 0 ? 'none' : 'block',
                ...(expandedCategory && expandedCategory !== category.category ? { display: 'none' } : {})
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  fontWeight: 600,
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                {category.icon}
                {category.category}
              </Typography>
              
              {category.questions.map((q, questionIndex) => {
                const questionId = `${categoryIndex}-${questionIndex}`;
                
                return (
                  <Accordion
                    key={questionId}
                    expanded={expandedQuestion === questionId}
                    onChange={() => handleQuestionChange(questionId)}
                    sx={{
                      mb: 2,
                      borderRadius: '8px !important',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
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
                      overflow: 'hidden'
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{ 
                        padding: 2,
                        '& .MuiAccordionSummary-content': {
                          margin: 0
                        }
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {q.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 2, pt: 0, pb: 3 }}>
                      <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {q.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          ))}
        </motion.div>
      </Container>

      {/* Section "Vous n'avez pas trouvé votre réponse ?" */}
      <Box sx={{ py: 8, bgcolor: 'background.accent' }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
              Vous n'avez pas trouvé votre réponse ?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
              Nous sommes là pour vous aider. N'hésitez pas à nous contacter directement et nous vous
              répondrons dans les plus brefs délais.
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <ContactSupport fontSize="large" color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Contactez-nous
                  </Typography>
                  <Typography variant="body2" align="center" color="text.secondary">
                    Posez-nous votre question via notre formulaire de contact
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href="/contact"
                    sx={{ mt: 1, fontWeight: 600 }}
                  >
                    Formulaire de contact
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <School fontSize="large" color="primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Ressources
                  </Typography>
                  <Typography variant="body2" align="center" color="text.secondary">
                    Consultez nos guides et ressources pédagogiques
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    href="/resources"
                    sx={{ mt: 1, fontWeight: 600 }}
                  >
                    Voir les ressources
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}