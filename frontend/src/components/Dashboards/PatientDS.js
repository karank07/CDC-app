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

import moment from 'moment';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Visibility from '@material-ui/icons/Visibility';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { getPreviousAssessmentData, logout, cancelAppointment } from '../../api/Api';

import back from '../../assets/Images/Subtract.svg';
import pds1 from '../../assets/Images/pds1.png'
import pds2 from '../../assets/Images/pds2.png'

const PatientDS = ({ history }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: history.location.state.detail.firstName,
        lastName: history.location.state.detail.lastName,
        dob: history.location.state.detail.dateOfBirth,
        assessmentData: history.location.state.assesmentData,
        index: 1
    });
    //  {/* {!state.assessmentData.length > 0 && ('appointment' in state.assessmentData[0]) && state.assessmentData[0].appointment.length == 0 && */ }
    // const fetchMyAPI = async () => {
    //     let response = await getPreviousAssessmentData();
    //     await setState({ ...state, assessmentData: response })
    // }
    // useEffect(() => {
    //     fetchMyAPI()
    // }, [])
    // useEffect(() => {
    //     console.log("test")
    //     // let response = getAssessmentData(history.location.state.detail._id, history.location.state.detail.token);
    //     // console.log("res", response)
    //     // setState({ ...state, assessmentData: response })
    // }, []);
    console.log("My", state.assessmentData)
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
                            <Typography className={classes.navTitle} variant="h3" gutterBottom>CDC</Typography>
                            <Typography style={{ marginTop: '50%' }} className={classes.navText} variant="h6" gutterBottom><Link to={'/patient'} style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/Self-assessment'} style={{ textDecoration: 'none', color: 'white' }}>Take self assessment</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/patient'} style={{ textDecoration: 'none', color: '#C0C0C0' }}>Personal details</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/patient'} style={{ textDecoration: 'none', color: '#C0C0C0' }}>About Us</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/'} onClick={() => logout()} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Typography>
                        </div>
                    </Grid>
                </div>
            </Grid>

            <Grid item sm={9} style={{ marginLeft: '-3%', width: '100%' }}>
                <Grid
                    container
                    direction="row"
                    style={{ marginTop: '4%', height: '100%' }}>
                    <Grid item sm={7} style={{ height: '10%' }}>
                        <Grid
                            container
                            direction="row">
                            <Typography variant="h3" gutterBottom className={classes.text}>
                                Hello, {state.firstName}
                            </Typography>
                            <Typography variant="h6" gutterBottom style={{ color: '#9296A6' }} className={classes.text}>
                                Welcome to your personal dashboard! Here, you can see your scheduled appointmet, cancel that appointment and take self assesment for covid-19 symptoms.
                        </Typography>
                        </Grid>
                    </Grid>


                    {state.assessmentData.length > 0 && 'appointment' in state.assessmentData[0] && state.assessmentData[0].appointment.length > 0 ?
                        (
                            <Grid item sm={11} style={{ height: '40%' }}>
                                <Grid container justify="flex-start"
                                    alignContent="center"
                                    direction="row"
                                    style={{ backgroundImage: `url(${pds1})`, backgroundRepeat: 'no-repeat', height: '100%', width: '100%' }}>
                                    <Typography style={{
                                        maxWidth: '60%',
                                        fontWeight: 'bold',
                                        fontSize: 28,
                                        // lineHeight: 46,
                                        margin: 20,
                                        marginLeft: '5%',
                                        letterSpacing: "0.01em",
                                        overflow: 'visible',
                                        color: '#3C4161',
                                    }}>Hey, You have got an appointment with {(state.assessmentData[0].appointment[0].doctorName || state.assessmentData[0].appointment[0].nurseName)} on
                            {moment(state.assessmentData[0].appointment[0].scheduledAt).format(' Do MMMM, YYYY')}
                                    </Typography>
                                    <Grid container>
                                        <Button variant="outlined" size="large" className={clsx(classes.margin, classes.loginBtn)}
                                            style={{ borderRadius: 10, boxShadow: 'none', marginLeft: '15%', width: '25%' }}
                                            color="primary"
                                            onClick={() => cancelAppointment(state.assessmentData[0].appointment[0]._id).
                                                then(async function (response) {
                                                    let assesmentData = await getPreviousAssessmentData();
                                                    setState({ ...state, assessmentData: assesmentData });
                                                })}
                                        >
                                            Cancel appointment
                             </Button>
                                    </Grid>
                                </Grid>
                            </Grid>) :


                        (
                            <Grid item sm={11} style={{ height: '40%', marginTop: '-10%' }}>
                                <Grid container justify="flex-start"
                                    alignContent="center"
                                    direction="row"
                                    style={{ backgroundImage: `url(${pds2})`, backgroundRepeat: 'no-repeat', height: '100%', width: '100%' }}>
                                    <Typography style={{
                                        maxWidth: '60%',
                                        fontWeight: 'bold',
                                        fontSize: 28,
                                        // lineHeight: 46,
                                        margin: 20,
                                        marginLeft: '5%',
                                        marginTop: '10%',
                                        letterSpacing: "0.01em",
                                        overflow: 'visible',
                                        color: '#3C4161',
                                    }}>
                                        Take COVID-19 symptoms self assessment
                            </Typography>
                                    <Grid container>
                                        <Button variant="contained" size="large" className={clsx(classes.margin, classes.loginBtn)}
                                            style={{ borderRadius: 10, boxShadow: 'none', marginLeft: '15%', width: '25%', backgroundColor: '#3C4161', color: 'white' }}
                                            // color="primary"
                                            onClick={() => history.push('/Self-assessment')}
                                        >
                                            Take Self Assessment
                             </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    <Grid item sm={10} style={{ height: '40%', marginTop: '-4%' }}>
                        <Typography variant="h4" gutterBottom className={classes.text}>
                            Previous Assessments
                        </Typography>
                        <Grid container justify="space-evenly" alignItems='center'>
                            {state.assessmentData.length > 0 &&
                                <ArrowLeftIcon fontSize='large' />}
                            {state.assessmentData.length > 0 ? state.assessmentData.map((data) => (
                                <Card className={classes.paper}>
                                    <CardContent style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="body2" style={{ marginTop: '5%' }} className={classes.cardText}>
                                            Assessment taken on
                                    </Typography>
                                        <Typography variant="body1" className={classes.cardTitle}>
                                            {moment(data.createdAt).format('DD-MMMM-YYYY')}
                                        </Typography>
                                        <Typography variant="body2" className={classes.cardText}>
                                            Result
                                    </Typography>
                                        <Typography variant="body1" className={classes.cardTitle}>
                                            {data.isReviewed ==false ? 'Pending' : data.isForwarded ? 'Pending' : data.isRejected ? 'Safe' : data.appointment.length == 0 ? 'Appointment Cancelled' : 'Got an appointment'}
                                        </Typography>

                                    </CardContent>
                                </Card>
                            ))
                                : <Typography variant="h6" gutterBottom style={{ color: '#9296A6', marginTop:'5%' }} className={classes.text}>
                                    You do not have any previous assessments, start by  clicking on 'Take self assessment'.
                               </Typography>
                            } {state.assessmentData.length > 0 &&
                                <ArrowRightIcon fontSize='large' />
                            }
                            {/* <Card className={classes.paper}>
                                <CardContent style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Typography variant="body1" className={classes.cardTitle}>
                                        Genral symptoms
                                    </Typography>
                                    <Typography variant="body2" className={classes.cardText}>
                                        loss of smell or appetite, fatigue or muscle pain
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={classes.paper}>
                                <CardContent style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>

                                    <Typography variant="body1" className={classes.cardTitle}>
                                        Respiratory symptoms
                                    </Typography>
                                    <Typography variant="body2" className={classes.cardText}>
                                        Cough, difficulty in breathing, Sore throat, Runny nose
                                    </Typography>
                                </CardContent>
                            </Card> */}
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Grid >

    );
}

export default PatientDS;


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh'
    },
    text: {
        fontFamily: 'DotGothic16'
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

    },
    paper: {
        height: 200,
        width: 200,
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
        marginLeft: '13%',
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
