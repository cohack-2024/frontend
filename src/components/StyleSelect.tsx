import React, { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
interface ImageStyleSelectProps {
  handleStyleChange: (checkpoint_label: string) => void;
}

const ImageStyleSelect: React.FC<ImageStyleSelectProps> = ({ handleStyleChange }) => {
  const [style, setStyle] = useState('Semi_Realistic');

  const handleChange = (event: SelectChangeEvent) => {
    setStyle(event.target.value as string);
    handleStyleChange(event.target.value as string)
  };

  return (
    <FormControl fullWidth > 
      <InputLabel id="systinst-select-label">Syst Inst</InputLabel>
      <Select
        labelId="systinst-select-label"
        value={style}
        label="Image Style"
        onChange={handleChange}
      >
        <MenuItem value="Graphic_Novel">Graphic Novel</MenuItem>
        <MenuItem value="Manga">Manga</MenuItem>
        <MenuItem value="Semi_Realistic">Semi-Realistic</MenuItem>
        <MenuItem value="Realistic">Realistic</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ImageStyleSelect;