import PropTypes from "prop-types";
// @mui
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";

// ----------------------------------------------------------------------

DataTableHeader.propTypes = {
  headLabel: PropTypes.array,
  handleSort: PropTypes.func,
  filter: PropTypes.object,
  handleSelectAllClick: PropTypes.func,
  rowCount: PropTypes.number,
  numSelected: PropTypes.number,
};

export default function DataTableHeader({
  headLabel,
  handleSort,
  filter,
  handleSelectAllClick,
  rowCount,
  numSelected,
}) {
  const theme = useTheme();

  const createSortHandler = (property) => (event) => {
    handleSort(event, property);
  };

  return (
    <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
      <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
          />
        </TableCell>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
          >
            {headCell.sort ? (
              <TableSortLabel
                active
                direction={
                  filter?.sortBy === headCell.id ? filter.order : "desc"
                }
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <> {headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
