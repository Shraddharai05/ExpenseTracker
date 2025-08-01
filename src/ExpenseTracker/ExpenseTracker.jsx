import React, { useState } from 'react';
import { Typography, Button, TextField, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import './ExpenseTracker.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function ExpenseTracker() {
    let navigate = useNavigate();
    const [data, setData] = useState({ description: '', cost: '', select: '' })
    const [trans, setTrans] = useState([]);
    const [updateid, setUpdateId] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        setData({ ...data, id: trans.length + 1, [e.target.name]: e.target.value })
    }

    // Add transaction
    const handleClick = (e) => {
        setTrans([...trans, { id: Date.now(), ...data }])
        setData({ description: '', cost: '', select: '' })
    }

    // Update transaction
    const handleUpdate = (id) => {
        const selectedTransaction = trans.find((val) => val.id === id);
        if (selectedTransaction) {
            setData(selectedTransaction);
            setUpdateId(id);
        }
    };

    const handleDelete = (id) => {
        let idx = trans.filter((val) => (val.id !== id));
        setTrans(idx)
        console.log(idx)
    }

    const finalUpdate = () => {

        if (updateid === null) return;

        const updatedTransactions = trans.map((val) =>
            val.id === updateid ? { ...val, ...data } : val
        );
        setTrans(updatedTransactions);
        setUpdateId(null);
        setData({ description: '', cost: '', select: '' });
    };

    // Handle Logout Confirmation Dialog
    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    // Logic of Logout Button
    const handleLogout = () => {
        setOpenDialog(false);
        localStorage.setItem("Isvalid", false);
        setOpenSnackbar(true);
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    };

    return (
        <>
            <Grid container margin={2} justifyContent='space-between' textAlign='center'>
                <Grid size={10}>
                    <Typography variant='h4' fontWeight={700}>
                        Expense Tracker
                    </Typography>
                </Grid>
                <Grid size={2}>
                    <Button variant="outlined" startIcon={<LogoutIcon />}
                        onClick={handleOpenDialog}
                        sx={{ backgroundColor: '#f5ba1a', color: 'white', border: 'none' }}>
                        Logout
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2} className="form-container" >
                <Grid size={{ xs: 12, md: 6 }}>

                    <TextField
                        required
                        label="Description"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        name='description'
                        value={data.description}
                        sx={{ mb: '10px' }}
                    />

                    <TextField
                        required
                        label="Cost"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        name='cost'
                        value={data.cost}
                        sx={{ mb: '10px' }}
                    />

                    <Select
                        value={data.select}
                        name="select"
                        fullWidth
                        displayEmpty
                        onChange={handleChange}
                        sx={{ mb: '10px' }}
                    >
                        <MenuItem value="" disabled>Select</MenuItem>
                        <MenuItem value="Debit">Debit</MenuItem>
                        <MenuItem value="Credit">Credit</MenuItem>
                    </Select>

                    <Button fullWidth onClick={handleClick} disabled={updateid !== null}
                        sx={{ backgroundColor: '#4CAF50', color: 'white', mb: 2, fontWeight: 'bold' }}>
                        Add
                    </Button>

                    <Button fullWidth onClick={finalUpdate} disabled={updateid === null}
                        sx={{ backgroundColor: updateid ? '#2196F3' : '#ddd', color: 'white', fontWeight: 'bold' }}
                    >
                        Update
                    </Button>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }} className="table-container">
                    {trans.length === 0 ? (
                        <Typography variant="h6" textAlign="center" color="gray">
                            No transactions recorded.
                        </Typography>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Cost</th>
                                    <th>Dr./Cr.</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trans.map((value) => (
                                    <tr key={value.id}>
                                        <td>{value.description}</td>
                                        <td>{value.cost}</td>
                                        <td>{value.select}</td>
                                        <td>
                                            <Button startIcon={<EditIcon />} onClick={() => handleUpdate(value.id)}
                                                sx={{ backgroundColor: '#FF9800', color: 'white' }}>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button onClick={() => handleDelete(value.id)}
                                                sx={{ backgroundColor: '#F44336', color: 'white', border: 'none' }}>
                                                <DeleteIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Grid>
            </Grid >
            {/* Logout Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Logout</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to log out?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleLogout} color="error" variant="contained">Logout</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Logged out successfully!
                </Alert>
            </Snackbar>
        </>
    )
}
export default ExpenseTracker