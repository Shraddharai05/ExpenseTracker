import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Snackbar,
    Alert,
    Grid,
} from '@mui/material';

function LoginForm() {
    const navigate = useNavigate();
    const [data, setData] = useState({ email: '', password: '' });
    const [open, setOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleClick = () => {
        const RgsData = JSON.parse(localStorage.getItem('Data'));

        if (
            RgsData &&
            RgsData.email === data.email &&
            RgsData.password === data.password
        ) {
            localStorage.setItem('Isvalid', true);
            setSnackbar({
                open: true,
                message: 'Login successful!',
                severity: 'success',
            });
            setTimeout(() => navigate('/expenseTracker'), 1000);
        } else {
            localStorage.setItem('Isvalid', false);
            setSnackbar({
                open: true,
                message: 'Invalid email or password!',
                severity: 'error',
            });
            setData({ email: '', password: '' });
        }
    };

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const openDialogbox = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ open: false, message: '', severity: 'success' });
    };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh" >
                <Box
                    sx={{
                        maxWidth: '400px',
                        width: '100%',
                        padding: '30px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        borderRadius: '15px',
                        backgroundColor: '#ffffff',
                    }}
                >
                    <Typography variant="h4" fontWeight={700} gutterBottom align="center">
                        Login
                    </Typography>

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                        sx={{ mb: 3 }}
                    />

                    <Button
                        fullWidth
                        onClick={handleClick}
                        disabled={!data.email || !data.password}
                        sx={{
                            backgroundColor: '#1976d2',
                            color: '#fff',
                            textTransform: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            padding: '10px',
                            marginBottom: 2,
                            '&:hover': {
                                backgroundColor: '#1565c0',
                            },
                        }}
                    >
                        Sign In
                    </Button>

                    <Typography
                        onClick={openDialogbox}
                        sx={{
                            fontSize: '14px',
                            color: '#1976d2',
                            cursor: 'pointer',
                            textAlign: 'center',
                            mb: 1,
                            '&:hover': {
                                color: '#0d47a1',
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Forgot your password?
                    </Typography>

                    <Typography
                        onClick={() => navigate('/registrationform')}
                        sx={{
                            fontSize: '14px',
                            color: '#1976d2',
                            textAlign: 'center',
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }}
                    >
                        Don’t have an account? Sign up
                    </Typography>
                </Box>
            </Grid>

            {/* Reset Password Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"Reset password"}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Enter your account's email address, and we'll send you a link to reset your password.
                    </DialogContentText>
                    <TextField fullWidth label="Email Address" variant="outlined" />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                        Submit
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default LoginForm;

