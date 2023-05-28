// react
import React from "react";
// @mui
import {
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

// libs
import PropTypes from "prop-types";

DataTableBody.propTypes = {
  isNotFound: PropTypes.bool,
  handleSelected: PropTypes.func,
  selected: PropTypes.array,
  farmerList: PropTypes.array,
};

function DataTableBody({ isNotFound, handleSelected, selected, farmerList }) {
  return (
    <>
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
                  onClick={() => handleSelected(_id)}
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
            <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
              <Typography variant="subtitle1" fontWeight="700">
                No data Found!
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      )}
    </>
  );
}

export default DataTableBody;
