import React from 'react';
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';

const FirstPage: React.FC = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {/* Application Heading storybook */}
                <Box sx={{ marginBottom: 4, textAlign: 'center' }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                        Storybook
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                        Turn text into comic-style images!
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    {/* Left Section */}
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                bgcolor: '#cfe8fc',
                                height: '80vh',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h4"></Typography>
                        </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={6}>
                        <Box
                            sx={{
                                bgcolor: '#f0e68c',
                                height: '80vh',
                                padding: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Typography variant="h4"></Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default FirstPage;
