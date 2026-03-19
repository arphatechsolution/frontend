import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'userType', label: 'User Type', minWidth: 120 },
    { id: 'user', label: 'User Name', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 300 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];


  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    
    let userType = 'Unknown';
    let userName = 'N/A';
    
    if (complain.user && complain.user.name) {
        userName = complain.user.name;
    }
    
    if (complain.user && complain.user.role) {
        userType = complain.user.role.charAt(0).toUpperCase() + complain.user.role.slice(1);
    } else if (complain.user && complain.user._id) {
        userType = 'User';
    }
    
    return {
      userType,
      user: userName,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });



  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox {...label} />
      </>
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {Array.isArray(complainsList) && complainsList.length > 0 &&
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              }
            </Paper>
          }
        </>
      }
    </>
  );
};

export default SeeComplains;