import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormGroup,
    Checkbox,
    Box,
    Grid,
    Alert,
} from '@mui/material';

function RegistrationForm() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        rtpassword: '',
        gender: '',
        checknotification: [],
    });

    const [errors, setErrors] = useState({});
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e) => {

        if (e.target.name === 'checknotification') {
            let arr = [...data.checknotification];
            if (arr.includes(e.target.value)) {
                arr.splice(arr.indexOf(e.target.value), 1);
            } else {
                arr.push(e.target.value);
            }
            setData({ ...data, [e.target.name]: arr });
        } else {
            setData({ ...data, [e.target.name]: e.target.value });
        }

        // it will blank the error field when handlechange occures
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (!data.name.trim()) newErrors.name = 'Full Name is required.';
        if (!data.email.trim()) newErrors.email = 'Email is required.';
        if (!data.password) newErrors.password = 'Password is required.';
        if (!data.rtpassword) newErrors.rtpassword = 'Please confirm your password.';
        if (data.password && data.rtpassword && data.password !== data.rtpassword)
            newErrors.rtpassword = 'Passwords do not match.';
        if (!data.gender) newErrors.gender = 'Gender is required.';

        return newErrors;
    };

    const handleSubmit = () => {
        const isvalidationErrors = validate();
        if (Object.keys(isvalidationErrors).length > 0) {
            setErrors(isvalidationErrors);
            return;
        }

        localStorage.setItem('Data', JSON.stringify(data));
        setSuccessMsg('Registration successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh', py: 6 }}>
            <Box
                sx={{
                    maxWidth: '450px',
                    width: '100%',
                    padding: '30px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    borderRadius: '15px',
                    backgroundColor: '#ffffff',
                }}
            >
                <Typography variant="h4" fontWeight={700} gutterBottom align="center">
                    Sign Up
                </Typography>

                {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

                <TextField
                    label="Full Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="text"
                    value={data.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Re-Enter Password"
                    name="rtpassword"
                    type="password"
                    value={data.rtpassword}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={!!errors.rtpassword}
                    helperText={errors.rtpassword}
                    sx={{ mb: 2 }}
                />

                <Box sx={{ mb: 2 }}>
                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.gender}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                        </RadioGroup>
                        {errors.gender && <Typography color="error" fontSize="0.75rem">{errors.gender}</Typography>}
                    </FormControl>

                    <FormControl component="fieldset" fullWidth>
                        <FormLabel component="legend">Notification Preferences</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checknotification"
                                        value="Email"
                                        checked={data.checknotification.includes('Email')}
                                        onChange={handleChange}
                                    />
                                }
                                label="Email"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checknotification"
                                        value="SMS"
                                        checked={data.checknotification.includes('SMS')}
                                        onChange={handleChange}
                                    />
                                }
                                label="SMS"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="checknotification"
                                        value="AppNotification"
                                        checked={data.checknotification.includes('AppNotification')}
                                        onChange={handleChange}
                                    />
                                }
                                label="App Notification"
                            />
                        </FormGroup>
                    </FormControl>
                </Box>

                <Button
                    fullWidth
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        textTransform: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        padding: '10px',
                        mb: 2,
                        '&:hover': {
                            backgroundColor: '#1565c0',
                        },
                    }}
                >
                    Submit
                </Button>

                <Typography
                    onClick={() => navigate('/')}
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
                    Already have an account? Login
                </Typography>
            </Box>
        </Grid>
    );
}

export default RegistrationForm;
