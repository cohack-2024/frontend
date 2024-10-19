import React, { useEffect, useState } from 'react';
import { Box, Container, CssBaseline, Grid, Typography, Button, TextField, Stack, Link, CircularProgress, ImageList, Card, CardActionArea } from '@mui/material';
import { fetchGeminiResult } from './apis/gemini';
import { Actor, fetchStableDiffusionTxt2img } from './apis/stablediffusionapi';
import { TESTIMG } from './data/testimg';

const FirstPage: React.FC = () => {
    const [prompt, setPrompt] = useState('')
    const [generatedImage, setGeneratedImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedCast, setSelectedCast] = useState<Actor[]>([])
    const text = "The palace still shook occasionally as the earth rumbled in memory, groaned as if it would deny what had happened. Bars of sunlight cast through rents in the walls made motes of dust glitter where they yet hung in the air. Scorch-marks marred the walls, the floors, the ceilings. Broad black smears crossed the blistered paints and gilt of once-bright murals, soot overlaying crumbling friezes of men and animals which seemed to have attempted to walk before the madness grew quiet. The dead lay everywhere, men and women and children, struck down in attempted flight by the lightnings that had flashed down every corridor, or seized by the fires that had stalked them, or sunken into stone of the palace, the stones that had flowed and sought, almost alive, before stillness came again. In odd counterpoint, colorful tapestries and paintings, masterworks all, hung undisturbed except where bulging walls had pushed them awry. Finely carved furnishings, inlaid with ivory and gold, stood untouched except where rippling floors had toppled them. The mind-twisting had struck at the core, ignoring peripheral things."
    
    //fire, earthquake, palace, man walking towards camera
    
    // useEffect(() => {
    //     fetchGeminiResult(text).then(data => {
    //         console.log(data)
    //     }).catch(e => console.log(e))
    // },[])

    const onGenerate = () => {
        // setGeneratedImage(TESTIMG)

        console.log('sending')
        
        setLoading(true)
        fetchStableDiffusionTxt2img(prompt, 'Graphic Novel',false, selectedCast).then(
            res => {
                const image = `data:image/png;base64,${res.data.images[0]}`
                setGeneratedImage(image)
                // console.log(res)
                // console.log(res.data.images[0])
            }
        ).catch(e=> {console.log(e)}).finally(() => setLoading(false))
    } 
    
    const handleCastSelect = (actor:Actor) => {

        const i = selectedCast.findIndex(f => f.name ===actor.name)
        if (i ===-1){
            console.log('here')
            // selectedCast.push(actor)
            setSelectedCast([...selectedCast, actor])
            return
        }
        setSelectedCast([...selectedCast.slice(0,i),...selectedCast.slice(i+1)])
    }
    console.log(selectedCast)
    const cast:Actor[] = [
        {name:"Baylan Skoll", image: "https://m.media-amazon.com/images/M/MV5BZDg3ZjMxYWEtNzAwNy00MjczLWE2OTItZWNhMjM3NmRlNTRmXkEyXkFqcGc@._V1_.jpg", triggerwords:"Baylan Skoll"}
    ]

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
                {/* Application Heading */}
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
                                minHeight: '80vh',
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
                        <Box
                            sx={{
                                bgcolor: '#f0e68c',
                                minHeight: '80vh',
                                padding: 2
                            }}
                        >
                            {/* Generate and Gallery Links */}
                            <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                                <Typography variant="h5">Generate</Typography>
                                <Link href="/src/second_page" underline="hover">
                                    <Typography variant="h5">Gallery</Typography>
                                </Link>
                            </Stack>

                            {/* Cast */}
                            <Stack direction="row" spacing={2}>
                                {cast.map((c, i)=> <Card key={i}
                                                            sx={{
                                                            // border:'1px solid #ccc',
                                                            border: selectedCast.find(f => f.name ===c.name) ? '3px solid #3f51b5' : '1px solid #ccc',
                                                            borderRadius: 2,
                                                            width: 150,
                                                            height: 150,
                                                            overflow: 'hidden',
                                                            }}
                                                        >
                                                        <CardActionArea onClick={() => handleCastSelect(c)}>
                                                            <img
                                                                src={c.image}
                                                                alt={`image-${i}`}
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            />
                                                            </CardActionArea>
                                                        </Card>)}
                            </Stack>



                            {/* Prompt Input Section 01*/}
                            <Box sx={{ marginBottom: 2 }}>
                                <TextField
                                    label="Prompt"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setPrompt(e.target.value)}
                                    value={prompt}
                                />
                                <Button
                                    variant="contained"
                                    sx={{ marginTop: 2, width: '100%' }}
                                    onClick={onGenerate}
                                    disabled={loading ? true: false}
                                >
                                    {loading? <CircularProgress sx={{ color: '#8edfe8' }}/>: 'Generate'}
                                </Button>
                            </Box>

                            {/* Image Generation Section */}
                            <Box
                                sx={{
                                    bgcolor: '#f5f5f5',
                                    // maxWidth:512,
                                    // maxHeight:512,
                                    // height:512,
                                    height: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid #ccc'
                                }}
                            >
                                { generatedImage ? <img src={generatedImage} alt="" 
                                style={{width: '100%', height: '100%',objectFit: 'cover'}}
                                />: <Typography variant="body1" color="textSecondary">
                                Generated image will appear here
                            </Typography>
                                }
                                
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default FirstPage;