import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Autocomplete, TextField } from "@mui/material";

// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFAutocomplete({
  name,
  label,
  options,
  dataLabel,
  value,
  ...other
}) {
  const { control } = useFormContext();
  let selectOptions = options?.map((option) => {
    return {
      label: option[dataLabel]?.toUpperCase(),
      value: option[value],
    };
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedValue = selectOptions?.find(
          (option) => option?.value === value
        );
        return (
          <Autocomplete
            {...other}
            value={selectedValue || { value: "", label: "" }}
            freeSolo
            options={selectOptions || []}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...other}
                error={!!error}
                helperText={error?.message}
                {...params}
                label={label}
              />
            )}
            getOptionDisabled={(option) => option?.disabled === true}
            onChange={(_, data) => {
              onChange(data?.value);
            }}
          />
        );
      }}
    />
  );
}
