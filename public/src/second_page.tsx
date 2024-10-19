import React from 'react';
import { Box, Container, CssBaseline, Typography } from '@mui/material';

const SecondPage: React.FC = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {/* Page Heading */}
                <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                    <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                        Gallery Page
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                        View all the generated comic-style images here.
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default SecondPage;
