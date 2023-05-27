import PropTypes from "prop-types";
// @mui
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useTheme,
} from "@mui/material";

// ----------------------------------------------------------------------

TableToolbar.propTypes = {
  headLabel: PropTypes.array,
};

export default function TableToolbar({ headLabel, handleSort, filter }) {
  const theme = useTheme();

  const createSortHandler = (property) => (event) => {
    handleSort(event, property);
  };

  return (
    <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
      <TableRow sx={{ backgroundColor: theme.palette.grey[200] }}>
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
