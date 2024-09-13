import React, { useState } from 'react';
import axios from 'axios';
import { Box, FormControl, InputLabel, OutlinedInput, FormControlLabel, Checkbox, Select, MenuItem, Button, Typography } from '@mui/material';

const CarDetailForm = () => {
    const [carDetail, setCarDetail] = useState({
        Id: '',
        Name: '',
        Manufacturer: '',
        Type: '',
        Capacity: '',
        PerDay: '',
        IsPopular: false,
        IsRecommended: false,
        TravelType: [],
        VehicleType: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCarDetail((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleMultiChange = (e) => {
        const { name, value } = e.target;
        setCarDetail((prevState) => ({
            ...prevState,
            [name]: typeof value === 'string' ? value.split(',') : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://localhost:7009/api/CarDetail', carDetail);
            alert('Car detail saved successfully!');
        } catch (error) {
            console.error('There was an error saving the car detail!', error);
            alert('Error saving car detail!');
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 600,
                margin: 'auto',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'background.paper'
            }}
        >
            <Typography variant="h4" gutterBottom>
                Car Detail Form
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="Id">ID</InputLabel>
                    <OutlinedInput
                        id="Id"
                        name="Id"
                        value={carDetail.Id}
                        onChange={handleChange}
                        label="ID"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="Name">Name</InputLabel>
                    <OutlinedInput
                        id="Name"
                        name="Name"
                        value={carDetail.Name}
                        onChange={handleChange}
                        label="Name"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="Manufacturer">Manufacturer</InputLabel>
                    <OutlinedInput
                        id="Manufacturer"
                        name="Manufacturer"
                        value={carDetail.Manufacturer}
                        onChange={handleChange}
                        label="Manufacturer"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="Type">Type</InputLabel>
                    <OutlinedInput
                        id="Type"
                        name="Type"
                        value={carDetail.Type}
                        onChange={handleChange}
                        label="Type"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="Capacity">Capacity</InputLabel>
                    <OutlinedInput
                        id="Capacity"
                        name="Capacity"
                        value={carDetail.Capacity}
                        onChange={handleChange}
                        label="Capacity"
                    />
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="PerDay">Per Day</InputLabel>
                    <OutlinedInput
                        id="PerDay"
                        name="PerDay"
                        value={carDetail.PerDay}
                        onChange={handleChange}
                        label="Per Day"
                    />
                </FormControl>

                <FormControlLabel
                    control={
                        <Checkbox
                            name="IsPopular"
                            checked={carDetail.IsPopular}
                            onChange={handleChange}
                        />
                    }
                    label="Is Popular"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            name="IsRecommended"
                            checked={carDetail.IsRecommended}
                            onChange={handleChange}
                        />
                    }
                    label="Is Recommended"
                />

                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="TravelType">Travel Type</InputLabel>
                    <Select
                        id="TravelType"
                        name="TravelType"
                        multiple
                        value={carDetail.TravelType}
                        onChange={handleMultiChange}
                        renderValue={(selected) => selected.join(', ')}
                        input={<OutlinedInput label="Travel Type" />}
                    >
                        <MenuItem value="SelfDrive">Self Drive</MenuItem>
                        <MenuItem value="Wedding">Wedding</MenuItem>
                        <MenuItem value="Tour">Tour</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel htmlFor="VehicleType">Vehicle Type</InputLabel>
                    <Select
                        id="VehicleType"
                        name="VehicleType"
                        multiple
                        value={carDetail.VehicleType}
                        onChange={handleMultiChange}
                        renderValue={(selected) => selected.join(', ')}
                        input={<OutlinedInput label="Vehicle Type" />}
                    >
                        <MenuItem value="Car">Car</MenuItem>
                        <MenuItem value="Van">Van</MenuItem>
                        <MenuItem value="Bus">Bus</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" type="submit">
                    Save Car Detail
                </Button>
            </form>
        </Box>
    );
};

export default CarDetailForm;
