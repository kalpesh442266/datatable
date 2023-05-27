import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import TableToolbar from "./TableToolbar";

function FarmersTable({
  isNotFound,
  filter,
  handleSort,
  TABLE_HEAD,
  handleClick,
  selected,
  farmerList,
}) {
  return (
    <TableContainer sx={{ maxHeight: "calc(100vh - 270px)", overflow: "auto" }}>
      <Table>
        <TableToolbar
          filter={filter}
          handleSort={handleSort}
          headLabel={TABLE_HEAD}
        />
        <TableBody>
          {farmerList.map((row) => {
            const {
              _id,
              name,
              email,
              uniqueRegNumber,
              landOwned,
              city,
              state,
              mobileNumber,
            } = row;
            const isItemSelected = selected.indexOf(_id) !== -1;

            return (
              <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    onClick={() => handleClick(_id)}
                  />
                </TableCell>
                <TableCell align="left">
                  <Typography variant="subtitle2" noWrap>
                    {name}
                  </Typography>
                </TableCell>
                <TableCell align="left">{uniqueRegNumber}</TableCell>

                <TableCell align="left">
                  <Typography variant="caption" noWrap>
                    {landOwned}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography variant="caption" noWrap>
                    {email}
                  </Typography>
                </TableCell>

                <TableCell align="left">
                  <Typography variant="caption" noWrap>
                    {city}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="caption" noWrap>
                    {state}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Typography variant="caption" noWrap>
                    {mobileNumber}
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {isNotFound && (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                Data not found
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default FarmersTable;
