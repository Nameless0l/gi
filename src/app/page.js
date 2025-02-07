// src/app/page.js
'use client';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    useTheme
} from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { Code, Event, Groups, School } from '@mui/icons-material';
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
    const features = [
        {
            icon: <Code sx={{ fontSize: 40 }}/>,
            title: "Projets Innovants",
            description: "Développez des projets concrets avec les dernières technologies"
        },
        {
            icon: <Event sx={{ fontSize: 40 }}/>,
            title: "Événements Tech",
            description: "Participez à des hackathons et des conférences tech"
        },
        {
            icon: <Groups sx={{ fontSize: 40 }}/>,
            title: "Communauté",
            description: "Rejoignez une communauté passionnée d'étudiants en informatique"
        },
        {
            icon: <School sx={{ fontSize: 40 }}/>,
            title: "Formation",
            description: "Accédez à des formations et workshops exclusifs"
        }
    ];
    const theme = useTheme();
    return (
        <Container>
            {/* Hero Section */}
            <HeroSection />
            {/* Features */}
            <Grid container spacing={4} sx={{ mb: 8 }}>
                {features.map((feature, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        <Card sx={{ height: '100%', textAlign: 'center' }}>
                            <CardContent>
                                <Box sx={{ mb: 2, color: 'primary.main' }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant="h6" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Timeline */}
            <Box sx={{ mb: 8 }}>
                <Typography variant="h4" gutterBottom textAlign="center" sx={{ mb: 4 }}>
                    Nos Prochains Événements
                </Typography>
                <Timeline position="alternate">
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot color="primary"/>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography variant="h6">Hackathon IA</Typography>
                            <Typography>15 Janvier 2025</Typography>
                        </TimelineContent>
                    </TimelineItem>
                    {/* Ajoutez d'autres événements */}
                </Timeline>
            </Box>
        </Container>
    );
}