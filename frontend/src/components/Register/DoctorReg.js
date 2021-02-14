import React from 'react';

import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const DoctorReg = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        phoneNum: "(+1) -",
        dob: new Date('2000-08-18T21:11:54'),
        address: "",
        
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };
    const handleDateChange = (date) => {
        setState({ ...state, dob: date });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <React.Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Typography variant="h3" gutterBottom>
                    Register
                </Typography>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item >
                        <FormControl className={clsx(classes.margin, classes.textFieldTwo)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">First Name</InputLabel>
                            <OutlinedInput
                                autoFocus
                                id="outlined-adornment-password"
                                type='text'
                                value={state.firstName}
                                onChange={handleChange('fristName')}
                                labelWidth={80}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <FormControl className={clsx(classes.margin, classes.textFieldTwo)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Last Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                value={state.lastName}
                                onChange={handleChange('lastName')}
                                labelWidth={80}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Doctor Registration Number</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type='text'
                        value={state.regNum}
                        onChange={handleChange('regNum')}
                        labelWidth={200}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type='text'
                        value={state.emailId}
                        onChange={handleChange('emailId')}
                        labelWidth={145}
                    />
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={state.showPassword ? 'text' : 'password'}
                        value={state.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item >
                        <FormControl className={clsx(classes.margin, classes.textFieldTwo)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Phone Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                
                                value={state.phoneNum}
                                onChange={handleChange('phoneNum')}
                                labelWidth={110}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                className={clsx(classes.margin, classes.textFieldTwo)}
                                disableToolbar
                                inputVariant='outlined'
                                variant="inline"
                                format="MM/dd/yyyy"
                                // margin="normal"
                                id="date-picker-inline"
                                label="Date of Birth"
                                value={state.dob}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        {/* <form className={classes.container} noValidate>
                            <TextField
                                id="date"
                                label="Birthday"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form> */}
                    </Grid>
                </Grid>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Address</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type='text'
                        value={state.address}
                        onChange={handleChange('address')}
                        labelWidth={60}
                    />
                </FormControl>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Button variant="text" size="large" className={clsx(classes.margin, classes.signInBtn)} color="primary">
                        Sign in instead
                    </Button>
                    <Button variant="contained" size="large" className={clsx(classes.margin, classes.registerBtn)} color="primary">
                        Register
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}


export default DoctorReg;


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    container: {

    },
    margin: {
        margin: theme.spacing(1)
    },
    withoutLabel: {
        marginTop: theme.spacing(3)
    },
    textField: {
        width: "62ch"
    },
    registerBtn: {
        // color:'#3C76EF'
        backgroundColor: '#3C76EF',
        color: 'white'
    },
    signInBtn: {
        color: '#3C76EF',
    },
    textFieldTwo: {
        width: "30ch"
    }
}));