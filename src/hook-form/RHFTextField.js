import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextField({ name, onChangeHandler, ...other }) {
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
            onChangeHandler && onChangeHandler(e);
          }}
          {...other}
        />
      )}
    />
  );
}
