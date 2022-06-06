import React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

const SurveyField = ({ input, label, meta: {error, touched} }) => {
  return (
    <FormControl
      variant="standard"
      sx={{
        display: "flex",
        width:'70ch',
        flexDirection: "column",
      }}
    >
      <InputLabel htmlFor="component-simple">{label}</InputLabel>
      <Input id="component-simple" {...input} />
      <p style={{color:"red"}}>{touched && error}</p>
    </FormControl>
  );
};

export default SurveyField;
