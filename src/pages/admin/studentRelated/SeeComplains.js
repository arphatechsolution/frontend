import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Typography, Button
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { getAllComplains, deleteComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import { useNavigate } from 'react-router-dom';

const SeeComplains = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const complainColumns = [
    { id: 'userType', label: 'User Type', minWidth: 120 },
    { id: 'complaint', label: 'Complaint', minWidth: 300 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

    const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    
    let userType = 'Unknown';
    
    // Prioritize userModel (always available), fallback to populated role
    if (complain.userModel) {
        userType = complain.userModel.charAt(0).toUpperCase() + complain.userModel.slice(1);
    } else if (complain.user && complain.user.role) {
        userType = complain.user.role.charAt(0).toUpperCase() + complain.user.role.slice(1);
    } else if (complain.user && complain.user._id) {
        userType = 'User';
    }
    
    return {
      userType,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = complainRows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length -1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const numSelected = selected.length;

  const handleDelete = () => {
    if (numSelected > 0) {
      dispatch(deleteComplains(currentUser._id, selected));
      setSelected([]);
    }
  };

  const ComplainButtonHaver = ({ row }) => {
    const isItemSelected = isSelected(row.id);
    return (
      <Checkbox
        checked={isItemSelected}
        onChange={(event) => handleClick(event, row.id)}
        inputProps={{
          'aria-labelledby': `checkbox-list-label-${row.id}`,
        }}
      />
    );
  };

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {response ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              No Complains Right Now
            </Box>
            :
            <>
              {Array.isArray(complainsList) && complainsList.length > 0 && (
                <>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2 }}>
                    <Typography color="inherit" variant="h6">
                      {numSelected} selected
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={handleDelete} 
                      disabled={numSelected === 0}
                      size="small"
                    >
                      Delete selected ({numSelected})
                    </Button>
                  </Box>
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                  </Paper>
                </>
              )}
            </>
          }
        </>
      }
    </>
  );
};

export default SeeComplains;

