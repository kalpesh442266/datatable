// react
import React, { useEffect, useState } from "react";
// @mui
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
// icons
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// libs
import PropTypes from "prop-types";
import FarmerForm from "./FarmerForm";

DataTableToolbar.propTypes = {
  getData: PropTypes.func,
  filter: PropTypes.object,
  setFilter: PropTypes.func,
};

function DataTableToolbar({ filter, setFilter, getData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialogue, setOpenDialogue] = useState();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getData({ ...filter, search: searchTerm });
    }, 700); // Adjust the debounce delay as needed (e.g., 500ms)

    return () => {
      clearTimeout(debounceTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 2 }}
    >
      <Typography variant="h5" fontWeight="bold">
        Farmers Table
      </Typography>
      <Stack spacing={2} direction="row">
        <TextField
          size="small"
          label="Search farmers..."
          value={searchTerm}
          onChange={(e) => {
            handleSearchInputChange(e);
          }}
          InputProps={{
            startAdornment: searchTerm && (
              <IconButton
                onClick={() => {
                  getData({ ...filter, search: "" });
                  setSearchTerm("");
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            ),
          }}
          sx={{
            width: "270px",
            "& .MuiOutlinedInput-root": { pr: 0.5, pl: 0 },
          }}
        />
        <Button
          startIcon={<AddIcon />}
          onClick={() => {
            setOpenDialogue(true);
          }}
          sx={{ pr: 2 }}
          variant="contained"
          size="small"
        >
          New Farmer
        </Button>
      </Stack>
      <Dialog
        open={openDialogue}
        onClose={() => setOpenDialogue(false)}
        maxWidth="sm"
      >
        <DialogTitle
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="700">
            Add new farmer
          </Typography>
          <IconButton
            sx={{ position: "absolute", right: 7 }}
            onClick={() => setOpenDialogue(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ my: 2 }}>
          <FarmerForm setOpenDialogue={setOpenDialogue} getData={getData} />
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export default DataTableToolbar;
