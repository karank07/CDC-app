import React from 'react';
import { Link, Route } from 'react-router-dom';
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
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import back from '../assets/Images/Subtract.svg';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';


import Visibility from '@material-ui/icons/Visibility';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { loginPatient } from '../api/Api';

const Login = ({ history }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        userId: "",
        password: "",
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
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
                            <Typography className={classes.navTitle} variant="h3" gutterBottom> <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>CDC</Link></Typography>
                            <Typography className={classes.navTitle} style={{ marginTop: '50%' }} variant="h5" gutterBottom>Register as</Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/patient-register'} style={{ textDecoration: 'none', color: 'white' }}>Patient</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/nurse-register'} style={{ textDecoration: 'none', color: 'white' }}>Nurse</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/doctor-register'} style={{ textDecoration: 'none', color: 'white' }}>Doctor</Link></Typography>
                            <Grid container direction='row' className={classes.navBot}>
                                <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                                    <ArrowBackIosIcon fontSize="large"></ArrowBackIosIcon></Link>
                                <Typography variant="h5" className={classes.text}><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
                                </Typography>
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
                    <Typography variant="h3" gutterBottom className={classes.text}>
                        Login
                    </Typography>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password" className={classes.text}>Email ID</InputLabel>
                        <OutlinedInput
                            autoFocus
                            type='text'
                            value={state.userId}
                            onChange={handleChange('userId')}
                            labelWidth={65}
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
                    <Button variant="contained" size="large" className={clsx(classes.margin, classes.loginBtn)} color="primary"
                        onClick={() => loginPatient(state.userId, state.password).
                            then(async function (response) {
                                if (response.token && response.type == 'patient') {
                                    history.push({
                                        pathname: '/patient',
                                        state: { detail: response }
                                    })
                                } else if (response.token && response.type == 'nurse') {
                                    history.push({
                                        pathname: '/nurse',
                                        state: { detail: response }
                                    })
                                }
                            }

                            )}>
                        Login
                </Button>
                </Grid>
            </Grid>
        </Grid >
    );
}

export default Login;


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    text: {
        fontFamily: 'ProductSans'
    },
    navTitle: {
        color: 'white',
        margin: '10%',
        marginLeft: '15%',
        marginTop: '15%',
        fontFamily: 'ProductSans'
    },
    navText: {
        color: 'white',
        margin: '5%',
        marginLeft: '20%',
        fontFamily: 'ProductSans'
        // marginTop: '15%'
    },
    navBot: {
        color: 'white',
        margin: '5%',
        marginLeft: '12%',
        marginTop: '50%',
        fontFamily: 'ProductSans'

    },
    loginBtn: {
        // color:'#3C76EF'
        backgroundColor: '#3C76EF',
        color: 'white',
        boxShadow: 'none',
        fontFamily: 'ProductSans'
    },
    margin: {
        margin: theme.spacing(1)
    },
    textField: {
        width: "50ch"
    }
}));
