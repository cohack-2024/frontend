import React from 'react';
import { Box, Container, CssBaseline, Typography, ImageList, ImageListItem } from '@mui/material';

const SecondPage: React.FC = () => {
    const itemData = [
        {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
        },
        {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
        },
        {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
        },
        {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
        },
        {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
        },
    ];

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {/* Page Heading */}
                <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                        Gallery
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                        Explore generated images here
                    </Typography>
                </Box>

                {/* Image Gallery */}
                <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
        </React.Fragment>
    );
};

export default SecondPage;
