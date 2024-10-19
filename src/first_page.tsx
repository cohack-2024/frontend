import React, { useEffect, useState } from "react";
import {
    Box,
    Container,
    CssBaseline,
    Grid,
    Typography,
    TextField,
    Stack,
    Link,
    CircularProgress,
    ImageList,
    ImageListItem,
    Card,
    CardActionArea,
    Button,
    Modal,
} from "@mui/material";
import { fetchGeminiResult } from './apis/gemini';
import { Actor, fetchStableDiffusionTxt2img } from './apis/stablediffusionapi';
import { uuidv4 } from './utility/utility';
import db from './db/jsondb';
import ImageStyleSelect from "./components/StyleSelect";
import { harrypottertext } from "./data/harrypottertxt";

interface GeneratedImage {
    id: string;
    img: string;
    prompt: string;
}

const FirstPage: React.FC = () => {
    const [prompt, setPrompt] = useState("");
    const [lastGenPrompt, setLastGenPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedCast, setSelectedCast] = useState<Actor[]>([]);
    const [openGallery, setOpenGallery] = useState(false); // State for gallery modal
    const [savedImages, setSavedImages] = useState<GeneratedImage[]>([]); // State for saved images
    const [checkpoint, setCheckpoint] = useState('Semi_Realistic'); // Style checkpoint
    const [openImageModal, setOpenImageModal] = useState(false); // State for individual image modal
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // Selected image for modal
    const [selectedImagePrompt, setSelectedImagePrompt] = useState<string>(''); // Selected image prompt

    const [lastSelectedText, setLastSelectedText] = useState('')
  const text = "The palace still shook occasionally as the earth rumbled in memory, groaned as if it would deny what had happened. Bars of sunlight cast through rents in the walls made motes of dust glitter where they yet hung in the air. Scorch-marks marred the walls, the floors, the ceilings. Broad black smears crossed the blistered paints and gilt of once-bright murals, soot overlaying crumbling friezes of men and animals which seemed to have attempted to walk before the madness grew quiet. The dead lay everywhere, men and women and children, struck down in attempted flight by the lightnings that had flashed down every corridor, or seized by the fires that had stalked them, or sunken into stone of the palace, the stones that had flowed and sought, almost alive, before stillness came again. In odd counterpoint, colorful tapestries and paintings, masterworks all, hung undisturbed except where bulging walls had pushed them awry. Finely carved furnishings, inlaid with ivory and gold, stood untouched except where rippling floors had toppled them. The mind-twisting had struck at the core, ignoring peripheral things.";

    const cast: Actor[] = [
        { name: "Baylan Skoll", image: "https://m.media-amazon.com/images/M/MV5BZDg3ZjMxYWEtNzAwNy00MjczLWE2OTItZWNhMjM3NmRlNTRmXkEyXkFqcGc@._V1_.jpg", triggerwords: "BAYLAN SKOLL <lora:Baylan_Skoll:.8>" },
        { name: "Omar Nobody", image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/42396cbc-828d-4e39-a346-86f7415f67e3/original=true,quality=90/_SDXL_OmarCover.jpeg", triggerwords: "OMARNOBODY <lora:OmarNobody:.8>" },
        { name: "Nova", image: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/094f08e0-b428-41b2-9ac5-4678ac93d389/width=450/00280-3731251447.jpeg", triggerwords: "NOVA <lora:nova_nobody_v2_xl:.8>" }
    ];

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

    const onGenerate = () => {
        const lgprompt = prompt;
        setLoading(true);
        fetchStableDiffusionTxt2img(prompt, checkpoint, false, selectedCast)
            .then((res) => {
                const image = `data:image/png;base64,${res.data.images[0]}`;
                setGeneratedImage(image);
                setLastGenPrompt(lgprompt);
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => setLoading(false));
    };

    const handleCastSelect = (actor: Actor) => {
        // Can only handle one lora at a time.
        if (selectedCast.find(f => f.name ===actor.name)){
            setSelectedCast([])
            return
        }

        setSelectedCast([actor]);
    };

    const handleSave = () => {
        if (generatedImage) {
            // const savedImage = { id: uuidv4(), img: generatedImage, prompt:lastGenPrompt, selectedText: lastSelectedText };
            // db.addGeneratedImage(savedImage); // Save image to local db
            // setSavedImages((prev) => [...prev, generatedImage]); // Add image to gallery
            const savedImage: GeneratedImage = {
                id: uuidv4(),
                img: generatedImage,
                prompt: lastGenPrompt
            };
            db.addGeneratedImage(savedImage);
            setSavedImages((prev) => [...prev, savedImage]);
        }
    };

    // Handle opening and closing the gallery modal
    const handleOpenGallery = () => setOpenGallery(true);
    const handleCloseGallery = () => setOpenGallery(false);

    // Handle opening and closing the individual image modal
    const handleOpenImageModal = (img: string, imgPrompt: string) => {
        setSelectedImage(img);
        setSelectedImagePrompt(imgPrompt);
        setOpenImageModal(true);
    };
    const handleCloseImageModal = () => setOpenImageModal(false);

    const loadImagesFromDB = () => {
        const images = Object.values(db.database)
        setSavedImages(images);
      };
    
      // useEffect to load images when the component mounts
      useEffect(() => {
        loadImagesFromDB();
      }, []);

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
                            }}
                        >
                            {/* Generate and Gallery Links */}
                            <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                                <Typography variant="h5">Generate</Typography>
                                <Link
                                    component="button"
                                    variant="body1"
                                    underline="hover"
                                    onClick={handleOpenGallery}
                                >
                                    Gallery
                                </Link>
                            </Stack>

                            {/* Cast Selection */}
                            <Stack direction="row" spacing={2}>
                                {cast.map((c, i) => (
                                    <Card
                                        key={i}
                                        sx={{
                                            border: selectedCast.find((f) => f.name === c.name)
                                                ? "3px solid #3f51b5"
                                                : "1px solid #ccc",
                                            borderRadius: 2,
                                            width: 150,
                                            height: 150,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <CardActionArea onClick={() => handleCastSelect(c)}>
                                            <img
                                                src={c.image}
                                                alt={`image-${i}`}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </Stack>

                            {/* Style Selection */}
                            <ImageStyleSelect handleStyleChange={setCheckpoint} />

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
                                    sx={{ marginTop: 2, width: "100%" }}
                                    onClick={onGenerate}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress sx={{ color: "#8edfe8" }} />
                                    ) : (
                                        "Generate"
                                    )}
                                </Button>
                            </Box>

                            {/* Image Generation Section */}
                            <Box
                                sx={{
                                    bgcolor: "#f5f5f5",
                                    height: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1px solid #ccc",
                                }}
                            >
                                {generatedImage ? (
                                    <img
                                        src={generatedImage}
                                        alt=""
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                ) : (
                                    <Typography variant="body1" color="textSecondary">
                                        Generated image will appear here
                                    </Typography>
                                )}
                            </Box>

                            {/* Save Button */}
                            {generatedImage && (
                                <Stack
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ margin: "10px" }}
                                >
                                    <Button variant="contained" onClick={handleSave}>
                                        Save
                                    </Button>
                                </Stack>
                            )}
                        </Box>
                    </Grid>
                </Grid>

                {/* Gallery Modal */}
                <Modal
                    open={openGallery}
                    onClose={handleCloseGallery}
                    aria-labelledby="gallery-modal-title"
                    aria-describedby="gallery-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "80%",
                            maxHeight: "80%",
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                            overflowY: "auto",
                        }}
                    >
                        <Typography
                            id="gallery-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ mb: 2 }}
                        >
                            Gallery
                        </Typography>
                        <ImageList cols={4} rowHeight={164} sx={{ marginBottom: 2 }}>
                            {savedImages.map((imgObj, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        src={imgObj.img}
                                        alt={`Generated-${index}`}
                                        loading="lazy"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        onClick={() => handleOpenImageModal(imgObj.img, imgObj.prompt)}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                        <Button
                            variant="contained"
                            sx={{ width: "100%", mt: 2 }}
                            onClick={handleCloseGallery}
                        >
                            Generate Storybook
                        </Button>
                    </Box>
                </Modal>

                 {/* Individual Image Modal */}
                 <Modal
                    open={openImageModal}
                    onClose={handleCloseImageModal}
                    aria-labelledby="image-modal-title"
                    aria-describedby="image-modal-description"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "50%",
                            maxHeight: "70%",
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                            overflowY: "auto",
                        }}
                    >
                        {selectedImage && (
                            <>
                                <img
                                    src={selectedImage}
                                    alt="Selected"
                                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                                />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    Prompt: {selectedImagePrompt}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Modal>
            </Container>
        </React.Fragment>
    );
};

export default FirstPage;
