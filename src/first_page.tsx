import React from 'react';
import { Box, Container, CssBaseline, Grid, Typography, Button, TextField, Stack, Link } from '@mui/material';

const FirstPage: React.FC = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                <Grid container spacing={2}>
                    {/* Left Section */}
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                bgcolor: '#cfe8fc',
                                height: '80vh',
                                padding: 2
                            }}
                        >
                            <Typography variant="h4">Book Content</Typography>
                            {/* Placeholder text for book content */}
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                                Here you can display the book or novel content that the user will select for generating images.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={6}>
                        <Box sx={{ height: '80vh', padding: 2 }}>
                            {/* Generate and Gallery Links */}
                            <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                                <Typography variant="h5">Generate</Typography>
                                <Link href="#/gallery" underline="hover">
                                    <Typography variant="h5">Gallery</Typography>
                                </Link>
                            </Stack>

                            {/* Prompt Input Section */}
                            <Box sx={{ marginBottom: 2 }}>
                                <TextField
                                    label="Prompt"
                                    variant="outlined"
                                    fullWidth
                                />
                                <Button
                                    variant="contained"
                                    sx={{ marginTop: 2, width: '100%' }}
                                >
                                    New Prompt
                                </Button>
                            </Box>

                            {/* Image Generation Section */}
                            <Box
                                sx={{
                                    bgcolor: '#f5f5f5',
                                    height: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #ccc'
                                }}
                            >
                                <Typography variant="body1" color="textSecondary">
                                    Generated image will appear here
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default FirstPage;
