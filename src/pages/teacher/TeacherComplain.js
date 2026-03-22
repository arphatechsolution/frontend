import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { createComplain } from '../../redux/complainRelated/complainHandle';

const TeacherComplain = () => {
  const [complaint, setComplaint] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, response: complainResponse, error: complainError } = useSelector((state) => state.complain);

  const user = currentUser?._id;
  const school = currentUser?.school?._id;

  const fields = {
    user,
    userModel: "teacher",
    date,
    complaint,
    school,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComplain(fields));
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', padding: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Teacher Complaint Form
      </Typography>

      {complainResponse && <Alert severity="success">{complainResponse}</Alert>}
      {complainError && <Alert severity="error">{complainError}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Date"
          type="date"
          variant="outlined"
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Complaint Details"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2, backgroundColor: '#02250b' }} 
          fullWidth 
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Complaint'}
        </Button>
      </form>
    </Box>
  );
};

export default TeacherComplain;
