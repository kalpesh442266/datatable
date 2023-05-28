// react
import { useState } from "react";
// @mui
import { MenuItem, IconButton, Popover } from "@mui/material";
// icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// libs
import PropTypes from "prop-types";
// ----------------------------------------------------------------------

DataTableMoreMenu.propTypes = {
  setFarmerId: PropTypes.func,
  id: PropTypes.string,
};

function DataTableMoreMenu({ setFarmerId, id }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreVertIcon />
      </IconButton>

      <Popover
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 200,
            overflow: "inherit",
          },
        }}
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <MenuItem onClick={() => setFarmerId(id)}>
          <ModeEditIcon sx={{ height: 20, mr: 1 }} /> Edit
        </MenuItem>
      </Popover>
    </>
  );
}

export default DataTableMoreMenu;
