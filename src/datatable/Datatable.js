// react
import { useEffect, useState } from "react";

// @mui
import {
  Alert,
  Box,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";

// components
import DataTableBody from "./DataTableBody";
import DataTableHeader from "./DataTableHeader";
import DataTableToolbar from "./DataTableToolbar";
import { Loader, Page } from "../components";
import { axiosInstance } from "../utils";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
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
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
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

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleSort = (e, key) => {
    const isAsc = filter?.order === "asc";
    getData({ ...filter, sortBy: key, order: isAsc ? "desc" : "asc" });
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = farmerList.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelected = (id) => {
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
    setIsLoading(true);
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

    axiosInstance
      .get(`/farmers${filterData}`)
      .then((response) => {
        setFarmerList(response.data.data);
        setFilter({ ...filters, page: response.data.page - 1 });
        setTotal(response.data.total);
        setIsLoading(false);
      })
      .catch((error) => {
        handleSnackbarOpen(error.message, "error");
        isLoading(false);
      });
  };
  const handleDelete = (selectedData) => {
    axiosInstance
      .delete(`/farmers?ids=${selected}`)
      .then((resp) => {
        handleSnackbarOpen("Data deleted successfully", "success");
      })
      .catch((e) => {
        handleSnackbarOpen("e.message", "error");
      });
  };
  const isNotFound = !farmerList.length;

  return (
    <Page title="Supra Assign ment">
      <Box sx={{ overflow: "hidden" }}>
        <Paper
          sx={{
            m: 5,
            borderRadius: "35px",
          }}
          elevation={7}
        >
          <DataTableToolbar
            handleDelete={handleDelete}
            selected={selected}
            setFilter={setFilter}
            getData={getData}
            setSelected={setSelected}
          />
          <TableContainer
            sx={{
              maxHeight: "calc(100vh - 270px)",
              overflow: "auto",
            }}
          >
            <Table>
              <DataTableHeader
                handleSelectAllClick={handleSelectAllClick}
                filter={filter}
                rowCount={farmerList.length}
                numSelected={selected.length}
                handleSort={handleSort}
                headLabel={TABLE_HEAD}
              />
              {isLoading ? (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                      <Loader style={{ align: "center", height: 100 }} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <DataTableBody
                  handleSelectAllClick={handleSelectAllClick}
                  isNotFound={isNotFound}
                  filter={filter}
                  handleSort={handleSort}
                  TABLE_HEAD={TABLE_HEAD}
                  handleSelected={handleSelected}
                  selected={selected}
                  farmerList={farmerList}
                />
              )}
            </Table>
          </TableContainer>
          <Box sx={{ pt: 2, pb: 2, marginX: 5 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={total}
              rowsPerPage={filter.limit}
              page={filter?.page}
              onPageChange={(e, page) => {
                setSelected([]);
                getData({ ...filter, page: page + 1 });
              }}
              onRowsPerPageChange={(e, row) => {
                getData({ ...filter, limit: e.target.value });
              }}
            />
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Page>
  );
}

export default DataTable;
