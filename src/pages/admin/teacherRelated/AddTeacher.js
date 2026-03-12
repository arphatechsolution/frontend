import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Typography, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const subjectID = params.id
  const isSubjectMode = !!subjectID;

  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);

  useEffect(() => {
    if (isSubjectMode) {
      dispatch(getSubjectDetails(subjectID, "Subject"));
    }
  }, [dispatch, subjectID, isSubjectMode]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails ? subjectDetails.school : null
  const teachSubject = subjectDetails ? subjectDetails._id : null
  const teachSclass = subjectDetails && subjectDetails.sclassName ? subjectDetails.sclassName._id : null

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
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
    
    // Only add subject/class info if in subject mode
    if (isSubjectMode && teachSubject && teachSclass) {
      return photo 
        ? { ...baseFields, teachSubject, teachSclass, photo }
        : { ...baseFields, teachSubject, teachSclass };
    }
    
    return photo ? { ...baseFields, photo } : baseFields;
  };

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    const fields = getFields();
    dispatch(registerUser(fields, role))
  }

  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      // Navigate based on mode
      if (isSubjectMode) {
        navigate("/Admin/teachers")
      } else {
        navigate("/Admin/teachers")
      }
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch, isSubjectMode]);

  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">
            {isSubjectMode ? 'Add Teacher for Subject' : 'Add New Teacher'}
          </span>
          <br />
          
          {isSubjectMode && subjectDetails ? (
            <>
              <label>
                Subject : {subjectDetails.subName}
              </label>
              <label>
                Class : {subjectDetails.sclassName && subjectDetails.sclassName.sclassName}
              </label>
            </>
          ) : (
            <label>
              Adding teacher to school
            </label>
          )}
          
          <label>Name</label>
          <input className="registerInput" type="text" placeholder="Enter teacher's name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name" required />

          <label>Email</label>
          <input className="registerInput" type="email" placeholder="Enter teacher's email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email" required />

          <label>Password</label>
          <input className="registerInput" type="password" placeholder="Enter teacher's password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password" required />

          {/* Photo Upload Section */}
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
                    backgroundColor: '#f5f5f5'
                  }
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
                    border: '2px solid #ddd'
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
                    p: 0.5
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
              'Register'
            )}
          </button>
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </div>
  )
}

export default AddTeacher
