import React from 'react';
import { Link } from 'react-router-dom';

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

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import back from '../../assets/Images/Subtract.svg';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { registerNurse, getListForReview } from '../../api/Api';

const PatientReg = ({ history }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        regNum: "",
        emailId: "",
        password: "",
        phoneNum: "",
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
        <Grid
            container
            className={classes.root}
        >
            <Grid item xs={false} sm={3} >
                <div style={{ height: '100%' }}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"

                        style={{ backgroundImage: `url(${back})`, backgroundRepeat: 'no-repeat', height: '100%', margin: 0 }}
                    >
                        <div >
                            <Link to={'/'} style={{ textDecoration: 'none' }}>  <Typography className={classes.navTitle} variant="h3" gutterBottom>CDC</Typography></Link>
                            <Typography className={classes.navTitle} style={{ marginTop: '50%' }} variant="h5" gutterBottom>Register as</Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/patient-register'} className={classes.link}>Patient</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/nurse-register'} className={classes.link} style={{ borderBottom: 'solid 3px', paddingBottom: 7, borderRadius: 2 }}> Nurse</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/doctor-register'} className={classes.link}>Doctor</Link></Typography>
                            <Grid container direction='row' className={classes.navBot}>
                                <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon>
                                <Typography variant="h5" className={classes.text}><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Home</Link></Typography>
                            </Grid>

                        </div>
                    </Grid>
                </div>
            </Grid>

            <Grid item sm={6}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    style={{ height: '100%' }}
                >
                    <Typography variant="h2" className={classes.title} gutterBottom style={{ marginBottom: '5%' }}>
                        Register
                    </Typography>

                    <Grid container direction="row" justify="center" alignItems="center">
                        <FormControl className={clsx(classes.margin, classes.textFieldTwo)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>First Name</InputLabel>
                            <OutlinedInput
                                autoFocus
                                id="outlined-adornment-password"
                                type='text'
                                value={state.firstName}
                                onChange={handleChange('firstName')}
                                labelWidth={80}
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textFieldTwo)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Last Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                value={state.lastName}
                                onChange={handleChange('lastName')}
                                labelWidth={80}
                            />
                        </FormControl>
                    </Grid>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Nurse Registration Number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='text'
                            value={state.regNum}
                            onChange={handleChange('regNum')}
                            labelWidth={200}
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Email Address</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='text'
                            value={state.emailId}
                            onChange={handleChange('emailId')}
                            labelWidth={145}
                        />
                    </FormControl>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Password</InputLabel>
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
                    <Grid container direction="row" justify="center" alignItems="center">
                        <FormControl className={clsx(classes.margin, classes.textFieldTwo)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Phone Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'

                                value={state.phoneNum}
                                onChange={handleChange('phoneNum')}
                                labelWidth={110}

                            />
                        </FormControl>
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
                    </Grid>
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

                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Address</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type='text'
                            value={state.address}
                            onChange={handleChange('address')}
                            labelWidth={60}
                        />
                    </FormControl>
                    <Grid container direction="row" justify="center" alignItems="center" style={{marginTop:'5%'}}>
                        <Link to={'/login'} style={{ textDecoration: 'none' }}>
                            <Button variant="text" size="large" className={clsx(classes.margin, classes.signInBtn)} color="primary">
                                Sign in instead
                            </Button>
                        </Link>
                        <Button variant="contained" size="large" className={clsx(classes.margin, classes.registerBtn)} color="primary"
                            onClick={() => registerNurse(state.emailId, state.firstName, state.lastName, state.password, state.dob, state.phoneNum, state.address, state.regNum).
                                then(async function (response) {
                                    if (response.token) {
                                        window.alert('Resgisteration successful');
                                        let patientData = await getListForReview();
                                        history.push({
                                            pathname: '/nurse',
                                            state: { detail: response, patientData }
                                        })
                                    } else window.alert(response.message)

                                })}>
                            Register
                    </Button>
                    </Grid>
                </Grid >
            </Grid>
        </Grid>

    );
}


export default PatientReg;


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    text: {
        fontFamily: 'product_sansregular'
    },
    title: {
        fontFamily: 'product_sans_blackregular',
        color: '#3c4161',
        letterSpacing: 0.4
    },
    link: {
        textDecoration: 'none', color: 'white', fontFamily: 'product_sansregular'
    },
    navTitle: {
        color: 'white',
        margin: '10%',
        marginLeft: '15%',
        marginTop: '15%',
        fontFamily: 'product_sans_blackregular'

    },
    navText: {
        color: 'white',
        margin: '5%',
        marginLeft: '20%',
        fontFamily: 'product_sans_blackregular'
        // marginTop: '15%'
    },
    navBot: {
        color: 'white',
        margin: '5%',
        marginLeft: '12%',
        marginTop: '50%',
        fontFamily: 'product_sans_blackregular'

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
        color: 'white',
        boxShadow: 'none',
        fontFamily: 'product_sans_lightregular',
        textTransform: 'capitalize',
        paddingHorizontal: '5%',
        width: '20%',
        fontSize: 19

    },
    signInBtn: {
        color: '#3C76EF',
        boxShadow: 'none',
        fontFamily: 'product_sans_lightregular',
        textTransform: 'capitalize',
        fontSize: 19
    },
    textFieldTwo: {
        width: "30ch"
    }
}));