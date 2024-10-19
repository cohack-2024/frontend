import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Stack,
  Link, CircularProgress, ImageList, Card, CardActionArea,
  Button,
} from "@mui/material";
import { fetchGeminiResult } from './apis/gemini';
import { Actor, fetchStableDiffusionTxt2img } from './apis/stablediffusionapi';
import { TESTIMG } from './data/testimg';
import db from './db/jsondb';
import { uuidv4 } from './utility/utility';
import ImageStyleSelect from "./components/StyleSelect";
import { harrypottertext } from "./data/harrypottertxt";

const FirstPage: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [lastGenPrompt, setLastGenPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedCast, setSelectedCast] = useState<Actor[]>([])
  const [checkpoint, setCheckpoint] = useState('Semi_Realistic')
  const [lastSelectedText, setLastSelectedText] = useState('')
  const text = "The palace still shook occasionally as the earth rumbled in memory, groaned as if it would deny what had happened. Bars of sunlight cast through rents in the walls made motes of dust glitter where they yet hung in the air. Scorch-marks marred the walls, the floors, the ceilings. Broad black smears crossed the blistered paints and gilt of once-bright murals, soot overlaying crumbling friezes of men and animals which seemed to have attempted to walk before the madness grew quiet. The dead lay everywhere, men and women and children, struck down in attempted flight by the lightnings that had flashed down every corridor, or seized by the fires that had stalked them, or sunken into stone of the palace, the stones that had flowed and sought, almost alive, before stillness came again. In odd counterpoint, colorful tapestries and paintings, masterworks all, hung undisturbed except where bulging walls had pushed them awry. Finely carved furnishings, inlaid with ivory and gold, stood untouched except where rippling floors had toppled them. The mind-twisting had struck at the core, ignoring peripheral things."


  // Handle mouse up event to get selected text and fetch from Gemini API
  const handleMouseUp = () => {
    setPrompt("");
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const selectedText = selection.toString();
      fetchGeminiResult(selectedText)
        .then((apiResult) => {
          if (apiResult.candidates.length > 0) {
            setPrompt(apiResult.candidates[0]["content"]["parts"][0]["text"]);
            setLastSelectedText(selectedText)
        }
        })
        .catch((error) => {
          console.error("Error fetching Gemini result:", error);
        });
    }
  };

  const sendPromptToStableDiffusionAPI = () => {
    console.log(prompt);
  };
    
    const onGenerate = () => {
        const lgprompt = prompt
        setLoading(true)
        fetchStableDiffusionTxt2img(prompt, checkpoint,false, selectedCast).then(
            res => {
                const image = `data:image/png;base64,${res.data.images[0]}`
                setGeneratedImage(image)
                setLastGenPrompt(lgprompt)
            }
        ).catch(e=> {console.log(e)}).finally(() => setLoading(false))
    } 
    
    const handleCastSelect = (actor:Actor) => {
        // Can only handle one lora at a time. Woops
        setSelectedCast([actor])
    }
    const cast:Actor[] = [
        {name:"Baylan Skoll", image: "https://m.media-amazon.com/images/M/MV5BZDg3ZjMxYWEtNzAwNy00MjczLWE2OTItZWNhMjM3NmRlNTRmXkEyXkFqcGc@._V1_.jpg", triggerwords:"BAYLAN SKOLL <lora:Baylan_Skoll:.8>"},
        {name:"Omar Nobody", image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/42396cbc-828d-4e39-a346-86f7415f67e3/original=true,quality=90/_SDXL_OmarCover.jpeg", triggerwords:"OMARNOBODY <lora:OmarNobody:.8>"},
        {name:"Nova", image:"https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/094f08e0-b428-41b2-9ac5-4678ac93d389/width=450/00280-3731251447.jpeg", triggerwords: "NOVA <lora:nova_nobody_v2_xl:.8>"}
    ]

    const handleSave = () => {
        const savedImage = {id:uuidv4(), img:generatedImage, prompt:lastGenPrompt, selectedText: lastSelectedText}
        db.addGeneratedImage(savedImage)
    }

    // const handleStyleChange = (checkpoint_label:string) =>{
    //     setCheckpoint(checkpoint_label)
    // }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Application Heading */}
        <Box sx={{ marginBottom: 4, textAlign: "center" }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: "bold" }}>
            Storybook
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "gray" }}>
            Turn text into comic-style images!
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Left Section */}
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "#cfe8fc",
                minHeight: "80vh",
                padding: 2,
              }}>
              <Typography variant="h4">Book Content</Typography>
              {/* Book content that users can select text from */}
              <Box sx={{ marginTop: 2 }} onMouseUp={handleMouseUp}>
                <Typography variant="body1">
                  {harrypottertext}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "#f0e68c",
                minHeight: "80vh",
                padding: 2,
              }}>
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

                            { /* Style */ }
                            <ImageStyleSelect handleStyleChange={setCheckpoint}/>



              {/* Prompt Input Section */}
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  label="Prompt"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
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
                            {generatedImage && <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{margin:'10px}'}}>
                                <Button variant="contained" onClick={handleSave}>Save</Button>
                            </Stack>}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default FirstPage;