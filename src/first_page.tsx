import React, { useState } from "react";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  Stack,
  Link,
  Button,
} from "@mui/material";
import { fetchGeminiResult } from "./apis/gemini";

const FirstPage: React.FC = () => {
  const [prompt, setPrompt] = useState("");

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
                height: "80vh",
                padding: 2,
              }}>
              <Typography variant="h4">Book Content</Typography>
              {/* Book content that users can select text from */}
              <Box sx={{ marginTop: 2 }} onMouseUp={handleMouseUp}>
                <Typography variant="body1">
                  The palace still shook occasionally as the earth rumbled in
                  memory, groaned as if it would deny what had happened. Bars of
                  sunlight cast through rents in the walls made motes of dust
                  glitter where they yet hung in the air. Scorch-marks marred
                  the walls, the floors, the ceilings. Broad black smears
                  crossed the blistered paints and gilt of once-bright murals,
                  soot overlaying crumbling friezes of men and animals which
                  seemed to have attempted to walk before the madness grew
                  quiet. The dead lay everywhere, men and women and children,
                  struck down in attempted flight by the lightnings that had
                  flashed down every corridor, or seized by the fires that had
                  stalked them, or sunken into stone of the palace, the stones
                  that had flowed and sought, almost alive, before stillness
                  came again. In odd counterpoint, colorful tapestries and
                  paintings, masterworks all, hung undisturbed except where
                  bulging walls had pushed them awry. Finely carved furnishings,
                  inlaid with ivory and gold, stood untouched except where
                  rippling floors had toppled them. The mind-twisting had struck
                  at the core, ignoring peripheral things.
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item xs={6}>
            <Box
              sx={{
                bgcolor: "#f0e68c",
                height: "80vh",
                padding: 2,
              }}>
              {/* Generate and Gallery Links */}
              <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                <Typography variant="h5">Generate</Typography>
                <Link href="/src/second_page" underline="hover">
                  <Typography variant="h5">Gallery</Typography>
                </Link>
              </Stack>

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
                  onClick={sendPromptToStableDiffusionAPI}>
                  New Prompt
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
                }}>
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