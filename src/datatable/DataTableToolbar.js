// react
import React, { useEffect, useState } from "react";
// @mui
import {
  Button,
  Dialog,
  DialogActions,
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
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

// libs
import PropTypes from "prop-types";
import FarmerForm from "./FarmerForm";

DataTableToolbar.propTypes = {
  getData: PropTypes.func,
  filter: PropTypes.object,
  selected: PropTypes.array,
  handleDelete: PropTypes.func,
  setSelected: PropTypes.func,
};

function DataTableToolbar({
  filter,
  getData,
  selected,
  handleDelete,
  setSelected,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialogue, setOpenDialogue] = useState("");
  const [editSelected, setEditSelected] = useState();

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

  const handleDeleteData = async (selected) => {
    await handleDelete(selected);
    setSelected([]);
    setOpenDialogue("");
    getData();
  };

  const handleEdit = (id) => {
    setEditSelected(id);
    setOpenDialogue("EDIT");
    setSelected([]);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{
        borderRadius: "35px 35px 0 0",
        paddingX: 5,
        paddingY: 3,
        ...(selected?.length && {
          backgroundColor: "#d1e9fc",
        }),
      }}
    >
      {selected?.length ? (
        <>
          <Typography
            color="primary.main"
            variant="subtitle1"
            fontWeight="bold"
          >
            {selected?.length} Selected
          </Typography>
          <Stack spacing={2} direction="row">
            {selected.length === 1 && (
              <Button
                startIcon={<ModeEditIcon />}
                onClick={() => {
                  handleEdit(selected[0]);
                }}
                color="primary"
                sx={{ pr: 2 }}
                variant="contained"
                size="medium"
              >
                Edit
              </Button>
            )}
            <Button
              startIcon={<DeleteIcon />}
              onClick={() => {
                setOpenDialogue("DELETE");
              }}
              color="error"
              sx={{ pr: 2 }}
              variant="contained"
              size="medium"
            >
              Delete
            </Button>
          </Stack>
        </>
      ) : (
        <>
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
                setOpenDialogue("EDIT");
              }}
              sx={{ pr: 2 }}
              variant="contained"
              size="small"
            >
              New Farmer
            </Button>
          </Stack>
        </>
      )}
      <Dialog
        open={openDialogue === "EDIT"}
        onClose={() => setOpenDialogue("")}
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
            onClick={() => {
              setOpenDialogue("");
              setEditSelected("");
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ my: 2 }}>
          <FarmerForm
            farmerId={editSelected}
            setFarmerId={setEditSelected}
            setOpenDialogue={setOpenDialogue}
            openDialogue={openDialogue}
            getData={getData}
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialogue === "DELETE"}
        onClose={() => setOpenDialogue("")}
        maxWidth="sm"
      >
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selected.length} entries ?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mb: 2 }}>
          <Stack spacing={2} direction="row">
            <Button
              onClick={() => {
                setOpenDialogue("");
              }}
              color="primary"
              variant="contained"
              size="small"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDeleteData(selected);
              }}
              color="error"
              variant="contained"
              size="small"
            >
              Delete
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default DataTableToolbar;
