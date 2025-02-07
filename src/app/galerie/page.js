'use client'
import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Image from 'next/image';
// Ceci est un exemple de données. Dans une application réelle, ces données proviendraient d'une API ou d'une base de données.
const galleryItems = [
    { id: 1, title: "Mariage de Grand-père et Grand-mère", image: "/images/wedding.jpg", description: "La cérémonie traditionnelle qui a uni nos grands-parents en 1950." },
    { id: 2, title: "Premier jour d'école de Papa", image: "/images/school.jpg", description: "Papa, nerveux mais excité, lors de son premier jour d'école en 1975." },
    { id: 3, title: "Réunion familiale de 1990", image: "/images/family-reunion.jpg", description: "La grande réunion familiale qui a rassemblé toutes les branches de la famille." },
    { id: 4, title: "Naissance de ma petite sœur", image: "/images/baby.jpg", description: "L'arrivée de notre petite princesse en 2000, un jour de grand bonheur pour toute la famille." },
    // Ajoutez d'autres éléments selon vos besoins
];

const GalleryPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClickOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Galerie Familiale
                </Typography>
                <Typography variant="h5" align="justify" color="text.secondary" sx={{ my: 4 }}>
                    Explorez les moments précieux de notre histoire familiale
                </Typography>

                <Grid container spacing={4}>
                    {galleryItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={item.image}
                                    alt={item.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => handleClickOpen(item)}>Voir plus</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Dialog onClose={handleClose} open={open}>
                {selectedItem && (
                    <>
                        <DialogTitle>{selectedItem.title}</DialogTitle>
                        <DialogContent>
                            <Image src={selectedItem.image} alt={selectedItem.title} style={{ width: '100%', marginBottom: '1rem' }} />
                            <Typography variant="body1">{selectedItem.description}</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Fermer</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Container>
    );
};

export default GalleryPage;