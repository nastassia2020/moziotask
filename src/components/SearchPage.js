// https://moziotask.herokuapp.com/ | https://git.heroku.com/moziotask.git
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios'


export default function SearchPage(){
  const [cityOfOrigin, setCityOfOrigin] = React.useState('');
  const [intermediateCity, setIntermediateCity] = React.useState('');
  const [cityOfDestination, setCityOfDestination] = React.useState('');
  const [numberOfGuests, setNumberOfGuests] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [dateValue, setDateValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  function getDistanceBetweenPoints(latitude1, longitude1, latitude2, longitude2, unit = 'miles') {
    let theta = longitude1 - longitude2;
    let distance = 60 * 1.1515 * (180/Math.PI) * Math.acos(
        Math.sin(latitude1 * (Math.PI/180)) * Math.sin(latitude2 * (Math.PI/180)) + 
        Math.cos(latitude1 * (Math.PI/180)) * Math.cos(latitude2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
    );
    if (unit == 'miles') {
        return Math.round(distance, 2);
    } else if (unit == 'kilometers') {
        return Math.round(distance * 1.609344, 2);
    }
}

  React.useEffect(() => {
    const fetchData = async () => {
        const result = await axios(
            'http://localhost:3000/cities',
        );
        setData(result.data);
    };
    fetchData();
  }, []);

  const handleChangeCityOfOrigin = (event) => {
    setCityOfOrigin(event.target.value);
  };
  const handleChangeIntermediateCity = (event) => {
    setIntermediateCity(event.target.value);
  };
  const handleChangeCityOfDestination = (event) => {
    setCityOfDestination(event.target.value);
  };

  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
  };

  const handleChangeGuestsNumber = (event) => {
    setNumberOfGuests(event.target.value);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            select
            value={cityOfOrigin}
            onChange={handleChangeCityOfOrigin}
            helperText="Please select your city"
          >
            {data.map((item) => (
              <MenuItem key={item.data} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            value={intermediateCity}
            onChange={handleChangeIntermediateCity}
            helperText="Please select your city"
          >
            {data.map((item) => (
              <MenuItem key={item.data} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            select
            value={cityOfDestination}
            onChange={handleChangeCityOfDestination}
            helperText="Please select your city"
          >
            {data.map((item) => (
              <MenuItem key={item.data} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={numberOfGuests}
            onChange={handleChangeGuestsNumber}
            helperText="Please select number of passengers"
          >{numberOfGuests}</TextField>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputFormat="MM/DD/YYYY"
            value={dateValue}
            onChange={handleChangeDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Button variant="contained">GO!</Button>
    </>
  );
}