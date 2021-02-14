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

import back from '../assets/Images/Subtract.svg';

const Login = () => {
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
        <React.Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ backgroundImage: `url(${back})`, backgroundRepeat: 'no-repeat', height: '100%', margin: 0 }}
            >

                <Typography variant="h3" gutterBottom>
                    Login
                </Typography>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email ID/ Phone no.</InputLabel>
                    <OutlinedInput
                        autoFocus
                        id="outlined-adornment-password"
                        type='text'
                        value={state.userId}
                        onChange={handleChange('userId')}
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
                <Button variant="contained" size="large" className={clsx(classes.margin, classes.loginBtn)} color="primary">
                    Login
                </Button>
            </Grid>

        </React.Fragment>
    );
}

export default Login;


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },

    loginBtn: {
        // color:'#3C76EF'
        backgroundColor: '#3C76EF',
        color: 'white'
    },
    margin: {
        margin: theme.spacing(1)
    },
    textField: {
        width: "50ch"
    }
}));
