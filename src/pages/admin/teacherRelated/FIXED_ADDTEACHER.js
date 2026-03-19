import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Typography, Button, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AddTeacher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, response, error, currentUser } = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const role = 'Teacher';
  const school = currentUser?._id;

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const getFields = () => {
    const baseFields = { name, email, password, role, school };
    return photo ? { ...baseFields, photo } : baseFields;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!school) {
      setMessage('School not found. Please login as admin.');
      setShowPopup(true);
      return;
    }

    console.log('Registering teacher with:', getFields());
    setLoader(true);
    const fields = getFields();
    dispatch(registerUser(fields, role));
  };

  useEffect(() => {
    if (status === 'added') {
      setLoader(false);
      dispatch(underControl());
      navigate('/Admin/teachers');
    } else if (status === 'failed') {
      setMessage(response || 'Failed to add teacher');
      setShowPopup(true);
      setLoader(false);
    } else if (status === 'error') {
      setMessage(error || 'Network Error');
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">
            Add New Teacher
          </span>
          <br />
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Note: Class and subject can be assigned later from the Teachers dashboard using Assign Teacher.
          </Typography>

          <label>Name *</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
          />

          <label>Email *</label>
          <input
            className="registerInput"
            type="email"
            placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label>Password *</label>
          <input
            className="registerInput"
            type="password"
            placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
            required
          />

          <label>Teacher Photo (Optional)</label>
          <Box sx={{ mb: 2 }}>
            {!photoPreview ? (
              <Box
                sx={{
                  border: '2px dashed #ccc',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: '#f5f5f5',
                  },
                }}
                onClick={() => document.getElementById('teacher-photo-upload').click()}
              >
                <CloudUploadIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Click to upload photo
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  (JPG, PNG, GIF - Max 5MB)
                </Typography>
              </Box>
            ) : (
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={photoPreview}
                  alt="Teacher preview"
                  style={{
                    width: 150,
                    height: 150,
                    objectFit: 'cover',
                    borderRadius: 8,
                    border: '2px solid #ddd',
                  }}
                />
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={removePhoto}
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    minWidth: 'auto',
                    p: 0.5,
                  }}
                >
                  ×
                </Button>
              </Box>
            )}

            <input
              id="teacher-photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
          </Box>

          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register Teacher'
            )}
          </button>
        </form>
      </div>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  );
};

export default AddTeacher;

