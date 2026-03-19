import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box, Typography, Paper, Container, Card, CardContent,
    Grid, Avatar, Divider, List, ListItem, ListItemAvatar,
    ListItemText, Chip, Button, TextField, IconButton, CircularProgress

} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Person as PersonIcon,
    School as SchoolIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    LocationOn as LocationIcon,
    KeyboardArrowLeft as ArrowBackIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ParentProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const { userDetails, loading } = useSelector((state) => state.parent);
    
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getParentDashboard(currentUser._id));
        }
    }, [dispatch, currentUser]);


    useEffect(() => {
        if (userDetails) {
            setProfileData(userDetails);
            setFormData(userDetails);
        }
    }, [userDetails]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const result = await axios.put(
                `${process.env.REACT_APP_BASE_URL}/Parent/${profileData._id}`,
                formData
            );
            setProfileData(result.data);
            setEditMode(false);
            // Profile updated successfully
            console.log('Profile updated:', result.data);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };


    const getPrimaryContact = () => {
        const contacts = [
            { label: 'Father Phone', value: profileData?.fatherPhone },
            { label: 'Mother Phone', value: profileData?.motherPhone },
            { label: 'Guardian Phone', value: profileData?.guardianPhone }
        ].find(contact => contact.value);

        return contacts ? `${contacts.label}: ${contacts.value}` : 'No contact';
    };

    if (loading || !profileData) {
        return (
            <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={() => navigate('/Parent/dashboard')} sx={{ mr: 2 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" fontWeight="bold">
                        My Profile
                    </Typography>
                </Box>

                {/* Profile Header */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mb: 4, textAlign: 'center' }}>
                    <Avatar 
                        src={profileData.photo ? `http://localhost:5000/${profileData.photo}` : null}
                        sx={{ 
                            width: 120, 
                            height: 120, 
                            mb: { xs: 2, md: 0 },
                            bgcolor: 'primary.main',
                            mr: { md: 4 }
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 60 }} />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Guardian Information
                        </Typography>
                        <Chip 
                            label={`${profileData.fatherName || ''} / ${profileData.motherName || ''}`}
                            color="primary" 
                            size="medium" 
                            sx={{ mb: 1 }}
                        />
                        <Typography variant="body1" color="text.secondary">
                            School: {profileData.school?.schoolName || 'Not assigned'}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={() => setEditMode(!editMode)} size="large">
                            {editMode ? <SaveIcon color="success" /> : <EditIcon />}
                        </IconButton>
                    </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                {/* Contact Information */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                📞 Primary Contact
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemAvatar>
                                        <PhoneIcon color="primary" />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={getPrimaryContact()}
                                        secondary="Primary contact number"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <EmailIcon color="primary" />
                                    </ListItemAvatar>
                                    <ListItemText 
                                        primary={profileData.email || profileData.fatherEmail || 'No email'}
                                        secondary="Email address"
                                    />
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom fontWeight="bold">
                                📍 Address
                            </Typography>
                            <Typography variant="body1">
                                {profileData.address || 'Address not provided'}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>

                {/* Family Members */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        👨‍👩‍👧 Family Members
                    </Typography>
                    
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        {[
                            {
                                title: 'Father',
                                name: profileData.fatherName,
                                occupation: profileData.fatherOccupation,
                                phone: profileData.fatherPhone,
                                email: profileData.fatherEmail
                            },
                            {
                                title: 'Mother',
                                name: profileData.motherName,
                                occupation: profileData.motherOccupation,
                                phone: profileData.motherPhone,
                                email: profileData.motherEmail
                            },
                            {
                                title: 'Guardian',
                                name: profileData.guardianName,
                                relation: profileData.guardianRelation,
                                phone: profileData.guardianPhone,
                                email: profileData.guardianEmail,
                                address: profileData.guardianAddress
                            }
                        ].map((member, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Card sx={{ p: 2 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {member.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {member.name || 'Not provided'}
                                    </Typography>
                                    {member.occupation && (
                                        <Typography variant="caption" color="text.secondary">
                                            {member.occupation}
                                        </Typography>
                                    )}
                                    {member.relation && (
                                        <Typography variant="caption" color="text.secondary">
                                            ({member.relation})
                                        </Typography>
                                    )}
                                    {member.phone && (
                                        <Chip 
                                            label={member.phone} 
                                            size="small" 
                                            color="primary"
                                            sx={{ mt: 1 }}
                                        />
                                    )}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Linked Children */}
                {profileData.students && profileData.students.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            👧 Linked Children ({profileData.students.length})
                        </Typography>
                        <Paper sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {profileData.students.map((student) => (
                                    <Grid item xs={12} sm={6} md={4} key={student._id}>
                                        <Card sx={{ p: 2, height: '100%' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 40, height: 40 }}>
                                                    {student.name?.charAt(0)}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight="bold">
                                                        {student.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Class {student.class} | Roll {student.rollNum}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Box>
                )}

                {/* Edit Mode */}
                {editMode && (
                    <Paper sx={{ p: 4, mt: 4 }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Edit Profile
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Father Name"
                                    name="fatherName"
                                    value={formData.fatherName || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Father Phone"
                                    name="fatherPhone"
                                    value={formData.fatherPhone || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            {/* Add more fields as needed */}
                        </Grid>
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button 
                                variant="contained" 
                                startIcon={<SaveIcon />}
                                onClick={handleSave}
                            >
                                Save Changes
                            </Button>
                            <Button 
                                variant="outlined"
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Paper>
                )}
            </Paper>
        </Container>
    );
};

export default ParentProfile;

