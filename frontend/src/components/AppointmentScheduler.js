import React, { useEffect } from 'react';
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
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Visibility from '@material-ui/icons/Visibility';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { postScheduleAppointment, getListForReview, postReviewAssessment } from '../api/Api';

import back from '../assets/Images/Subtract.svg';
import pds1 from '../assets/Images/pds1.png'


const AppointmentScheduler = ({ history }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        // firstName: history.location.state.detail.firstName,
        // lastName: history.location.state.detail.lastName,
        date: '2021-03-11T10:30',
        patientList: []
    });
    const handleChange = (prop) => (event) => {
        setState({ ...state, [prop]: event.target.value });
    };

    // const fetchMyAPI = async () => {
    //     let response = await getPatientList();
    //     await setState({ ...state, patientList: response })
    // }
    // useEffect(() => {
    //     fetchMyAPI()
    // }, [])
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Grid
            container
            className={classes.root}>
            <Grid item xs={false} sm={3} >
                <div style={{ height: '100%' }}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        style={{ backgroundImage: `url(${back})`, backgroundRepeat: 'no-repeat', height: '100%', margin: 0 }}
                    >
                        <div >
                            <Typography className={classes.navTitle} variant="h3" gutterBottom><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>CDC</Link></Typography>
                            <Typography style={{ marginTop: '50%' }} className={classes.navText} variant="h6" gutterBottom><Link to={{
                                pathname: '/nurse',
                                state: { detail: history.location.state.detail, patientData: history.location.state.patientData }
                            }} style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={{
                                pathname: '/Patient-list',
                                state: { detail: history.location.state.detail, patientData: history.location.state.patientData }
                            }} style={{ textDecoration: 'none', color: 'white' }}>List of patients</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/nurse'} style={{ textDecoration: 'none', color: '#C0C0C0' }}>About Us</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Typography>
                        </div>
                    </Grid>
                </div>
            </Grid>

            <Grid item sm={9} style={{ marginLeft: '-3%', width: '100%', height: '95%' }}>
                <Grid
                    container
                    direction="row"
                    style={{ marginTop: '4%', height: '80%' }}>
                    <Grid item sm={7} style={{ height: '10%' }}>
                        <Typography gutterBottom style={{ fontSize: 54 }} className={classes.text}>
                            Schedule An Appointment for
                            </Typography>
                    </Grid>
                    <Grid item sm={7} style={{ marginTop: 30, height: '10%' }}>
                        <Typography variant="h4" gutterBottom className={classes.text}>
                            {history.location.state.name}
                        </Typography>
                    </Grid>
                    <Grid item sm={11} style={{ height: '100%' }}>
                        <Grid container justify='space-evenly' alignItems='center' direction='column' style={{ height: '70%', backgroundColor: '#F2F6F8', borderRadius: 30, padding: 40 }}>
                            <Typography variant="h5" gutterBottom className={classes.text}>
                                Here, You can schedule an appointment of patient with you on the specific and date and time. Patient will be notified once the appointment is scheduled.
                            </Typography>

                            <TextField
                                id="date"
                                label="Next appointment"
                                type="datetime-local"
                                variant='outlined'
                                // defaultValue={state.date}
                                value={state.date}
                                className={classes.textField}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button variant="outlined" size="large" className={clsx(classes.margin, classes.loginBtn)} disableElevation
                                style={{ textTransform: ' none', boxShadow: 'none', width: '30%', backgroundColor: '#3C4161', color: 'white', borderRadius: 10 }}
                                onClick={() => postScheduleAppointment(state.date, history.location.state.id).
                                    then(async function (response) {
                                        window.alert('Appointment has been successfully scheduled')
                                        if (response.appointment.scheduledAt) {
                                            let isReviewed = await postReviewAssessment(false, false, true, history.location.state.id)
                                            let patientData = await getListForReview();
                                            history.push({
                                                pathname: '/nurse',
                                                state: { detail: history.location.state.detail, patientData }
                                            })

                                        }
                                    }
                                    )}
                                color="primary">
                                Schedule an appointment
                                         </Button>


                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default AppointmentScheduler;


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    text: {

    },
    description: {
        color: '#000000',
        fontSize: 18,
        marginHorizontal: 20
    },
    tableText: {
        color: '#3C4161',
        fontSize: 20,
        textAlign: 'center'
    },
    table: {

        mixWidth: 450,
    },
    paper: {
        height: 230,
        width: 230,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F2F6F8',
        boxShadow: 'none'
    },
    navTitle: {
        color: 'white',
        margin: '10%',
        marginLeft: '15%',
        marginTop: '15%',
         
    },
    navText: {
        color: 'white',
        margin: '5%',
        marginLeft: '20%',
        fontWeight: 'black',
         

        // marginTop: '15%'
    },
    navBot: {
        position: 'absolute',
        bottom: 10,
        color: 'white',
        margin: '5%',
        marginLeft: '12%',
        marginTop: '50%'

    },
    loginBtn: {
        // color:'#3C76EF'
        // backgroundColor: '#3C76EF',
        color: '#3C4161',
        border: '2px solid',
    },
    margin: {
        margin: theme.spacing(1)
    },
    textField: {
        width: "50ch"
    },
    cardTitle: {
        marginTop: '8%',
        color: '#3C4161',
        textAlign: 'center',
        fontWeight: 'bold',
         

    },
    cardText: {
        color: '#3C4161',
        textAlign: 'center',
        marginTop: '2%',
         
    }
}));
