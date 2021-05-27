import {
  FormControl,
  FormHelperText,
   InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

const Select = (props:any) => {
  const { name, label, value, onChange, error = null, options } = props;
  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">None</MenuItem>
        {options.map((item:any) => (
          <MenuItem key={item.id} value={item.title}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;
