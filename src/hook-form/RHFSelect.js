import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

// ----------------------------------------------------------------------

RHFSelect.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      // width: 500,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
};

export default function RHFSelect({
  name,
  label,
  isOther,
  children,
  handleSelectOther,
  options,
  dataLabel,
  val,
  ...other
}) {
  const { control } = useFormContext();
  isOther && options.push({ label: "Add New", value: "OTHER" });
  let selectOptions = options?.map((option) => {
    return {
      label: option[dataLabel],
      value: option[val],
    };
  });
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl fullWidth>
            <InputLabel error={!!error} id="select-label">
              {label}
            </InputLabel>
            <Select
              MenuProps={MenuProps}
              fullWidth
              labelId="select-label"
              // select
              label={label}
              value={value}
              error={!!error}
              onChange={(e) => {
                onChange(e.target.value);
                isOther && handleSelectOther(e.target.value);
              }}
            >
              {selectOptions?.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {!!error && (
              <FormHelperText sx={{ color: "red" }}>
                {error?.message}
              </FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
}
