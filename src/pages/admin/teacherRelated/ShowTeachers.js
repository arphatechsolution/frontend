import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import {
    Paper, Table, TableBody, TableContainer,
    TableHead, TablePagination, Button, Box, IconButton, Typography,
} from '@mui/material';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { exportToExcel, getCurrentDateString } from '../../../utils/excelExport';

const ShowTeachers = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch, location.pathname]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        // Reset response state before delete to avoid showing "No records" message
        dispatch({ type: 'teacher/getDeleteSuccess', payload: null });
        
        dispatch(deleteUser(deleteID, address)).then(() => {
            // Clear the teachersList temporarily to force re-fetch
            dispatch({ type: 'teacher/getSuccess', payload: [] });
            // Then fetch fresh data
            dispatch(getAllTeachers(currentUser._id));
        });
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
action: () => navigate("/Admin/teachers/addteacher")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
            action: () => deleteHandler(currentUser._id, "Teachers")
        },
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    const isEmpty = response || !teachersList || teachersList.length === 0;

    if (isEmpty) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                    No Teachers Found
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                    Add teachers to get started
                </Typography>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/addteacher")}>
                    Add Teacher
                </GreenButton>
                <Box sx={{ mt: 2 }}>
                    <SpeedDialTemplate actions={actions} />
                </Box>
            </Box>
        );
    }

    const columns = [
        { id: 'photo', label: 'Photo', minWidth: 80 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 200 },
        { id: 'phone', label: 'Phone', minWidth: 150 },
        { id: 'address', label: 'Address', minWidth: 250 },
    ];


    const rows = teachersList.map((teacher) => {
        return {
            photo: teacher.photo,
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone || 'Not Provided',
            address: teacher.address || 'Not Provided',
             id: teacher._id,
        };
    });

    const PhotoCell = ({ photo }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {photo ? (
                <Avatar 
                    src={`http://localhost:5000/${photo}`} 
                    sx={{ width: 44, height: 44 }}
                />
            ) : (
                <Avatar sx={{ width: 44, height: 44, bgcolor: '#667eea' }}>
                    <PersonIcon />
                </Avatar>
            )}
        </Box>
    );


    // Export teachers to Excel
    const handleExportTeachers = () => {
        if (!teachersList || teachersList.length === 0) {
            alert('No teachers to export');
            return;
        }

        const exportData = teachersList.map((teacher) => ({
            'Photo URL': teacher.photo ? `http://localhost:5000/${teacher.photo}` : 'No Photo',
            'Name': teacher.name,
            'Email': teacher.email || '-',
            'Phone': teacher.phone || 'Not Provided',
            'Address': teacher.address || 'Not Provided',
            'Created At': teacher.createdAt ? new Date(teacher.createdAt).toLocaleDateString() : '-'
        }));

        const fileName = `Teachers_${getCurrentDateString()}`;
        exportToExcel(exportData, fileName, 'Teachers');
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <GreenButton 
                    variant="contained" 
                    startIcon={<FileDownloadIcon />}
                    onClick={handleExportTeachers}
                    disabled={!teachersList || teachersList.length === 0}
                >
                    Export Excel
                </GreenButton>
            </Box>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center">
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                                            const value = row[column.id];
                                            if (column.id === 'photo') {
                                                return <PhotoCell key={column.id} photo={value} />;
                                            }
                                            return (
                                                <StyledTableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </StyledTableCell>
                                            );
                                        })}
                                        <StyledTableCell align="center">
                                            <IconButton onClick={() => deleteHandler(row.id, "Teacher")}>
                                                <PersonRemoveIcon color="error" />
                                            </IconButton>
                                            <BlueButton variant="contained"
                                                onClick={() => navigate("/Admin/teachers/teacher/" + row.id)}>
                                                View
                                            </BlueButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 5));
                    setPage(0);
                }}
            />

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Paper >
    );
};

export default ShowTeachers