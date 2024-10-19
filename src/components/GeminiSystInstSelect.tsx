import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SYSTEM_INSTRUCTION } from "../apis/gemini";
interface ImageStyleSelectProps {
  handleSystInstChange: (systInst: string) => void;
}

const gemini_syst_inst = [
  {
    label: "Describe Dialect Scene",
    value:
      "You are a text-to-image generation expert and with goal of descripe dialog scene. Whenever provided with text, generate a list of image prompts by focusing on key elements and themes of a person at time, using a concise, comma-separated list of important keywords for each list.",
  },
  { label: "Default", value: SYSTEM_INSTRUCTION },
];

const GeminiSystInstSelector: React.FC<ImageStyleSelectProps> = ({
  handleSystInstChange,
}) => {
  const [systInst, setSystInst] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSystInst(event.target.value as string);
    handleSystInstChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="style-select-label">Image Style</InputLabel>
      <Select
        labelId="style-select-label"
        value={systInst}
        label="Gemini Syst Inst"
        onChange={handleChange}
      >
        {gemini_syst_inst.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GeminiSystInstSelector;
