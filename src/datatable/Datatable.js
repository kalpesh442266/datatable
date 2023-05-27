// react
import { useEffect, useState } from "react";

// @mui
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// components
import axiosInstance from "../utils";
import FarmersTable from "./FarmersTable";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "", label: "", alignRight: false },
  { id: "name", label: "Name", alignRight: false, sort: true },
  { id: "uniqueRegNumber", label: "UID", alignRight: false, sort: true },
  { id: "landOwned", label: "Land (ha)", alignRight: false, sort: true },
  { id: "email", label: "E-mail", alignRight: false, sort: true },
  { id: "city", label: "City", alignRight: false, sort: true },
  { id: "state", label: "State", alignRight: false, sort: true },
  { id: "mobileNumber", label: "Mobile No.", alignRight: false, sort: true },
];

// ----------------------------------------------------------------------

function DataTable() {
  const [farmerList, setFarmerList] = useState([]);
  const [total, setTotal] = useState();
  const [openDialogue, setOpenDialogue] = useState();
  const [selected, setSelected] = useState([]);

  // filter initialisation data
  const defaultFilter = {
    category: "all",
    department: "all",
    page: 0,
    limit: 10,
    search: "",
    sortBy: "",
    order: "desc",
    unassigned: true,
  };

  const [filter, setFilter] = useState(defaultFilter);

  const handleSort = (e, key) => {
    const isAsc = filter?.order === "asc";
    getData({ ...filter, sortBy: key, order: isAsc ? "desc" : "asc" });
  };

  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  useEffect(() => {
    getData(defaultFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = (filters) => {
    if (!filters) filters = defaultFilter;
    setFilter(filters);

    let filterData = `?page=${filters?.page || 1}&limit=${
      filters?.limit || 10
    }`;

    filterData += filters?.search ? `&search=${filters?.search}` : "";

    filterData +=
      filters?.sortBy && filters.order
        ? `&sortBy=${filters?.sortBy}&order=${filters.order === "asc" ? -1 : 1}`
        : "";

    axiosInstance.get(`/farmers${filterData}`).then((response) => {
      setFarmerList(response.data.data);
      setFilter({ ...filters, page: response.data.page - 1 });
      setTotal(response.data.total);
    });
  };

  const isNotFound = !farmerList.length;

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Paper
        sx={{
          p: 5,
          m: 5,
          borderRadius: 10,
        }}
        elevation={7}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" fontWeight="bold">
            Farmers
          </Typography>
          <Stack spacing={2} direction="row">
            <TextField
              size="small"
              label="Search..."
              value={filter?.search}
              onChange={(e) => {
                setFilter({ ...filter, search: e.target.value });
              }}
              InputProps={{
                startAdornment: filter?.search && (
                  <IconButton
                    onClick={() => {
                      getData({ ...filter, search: "" });
                    }}
                  >
                    <HighlightOffIcon />
                  </IconButton>
                ),
                endAdornment: (
                  <Button
                    size="small"
                    onClick={() => {
                      getData(filter);
                    }}
                    position="start"
                    variant="contained"
                  >
                    Search
                  </Button>
                ),
              }}
              sx={{ width: "320px", "& .MuiOutlinedInput-root": { pr: 0.5 } }}
            />
          </Stack>
        </Stack>
        <FarmersTable
          isNotFound={isNotFound}
          filter={filter}
          handleSort={handleSort}
          TABLE_HEAD={TABLE_HEAD}
          handleClick={handleClick}
          selected={selected}
          farmerList={farmerList}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={total}
          rowsPerPage={filter.limit}
          page={filter?.page}
          onPageChange={(e, page) => {
            getData({ ...filter, page: page + 1 });
          }}
          onRowsPerPageChange={(e, row) => {
            getData({ ...filter, limit: e.target.value });
          }}
        />
        <Dialog
          open={openDialogue}
          keepMounted
          onClose={() => setOpenDialogue(false)}
          aria-describedby="form"
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>Please select a category</Box>
            <IconButton onClick={() => setOpenDialogue(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ my: 2 }}></DialogContent>
        </Dialog>
      </Paper>
    </Box>
  );
}

export default DataTable;
