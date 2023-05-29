// @mui
import { TextField } from "@mui/material";
// libs
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          size="small"
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          onChange={(e) => {
            field.onChange(e);
          }}
          {...other}
        />
      )}
    />
  );
}
