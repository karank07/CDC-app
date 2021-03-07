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

import Visibility from '@material-ui/icons/Visibility';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { postReviewAssessment, postScheduleAppointment, getListForReview } from '../../api/Api';

import back from '../../assets/Images/Subtract.svg';
import pds1 from '../../assets/Images/pds1.png'
import list from '../../assets/Images/list.png'

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237,),
    createData('Eclair', 262,),
    createData('Cupcake', 305,),
    createData('Gingerbread', 356),
];
function createData(name, createdAt) {
    return { name, createdAt };
}
const NurseDS = ({ history }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: history.location.state.detail.firstName,
        lastName: history.location.state.detail.lastName,
        patientData: history.location.state.patientData,
        index: 0
    });

    // const fetchMyAPI = async () => {
    //     if (state.firstName) {
    //         let response = await getAssessmentData(history.location.state.detail._id, history.location.state.detail.token);
    //         setState({ ...state, assessmentData: response })
    //     }
    //     else {
    //         console.log("oops")
    //     }

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
                            <Typography className={classes.navTitle} variant="h3" gutterBottom>CDC</Typography>
                            <Typography style={{ marginTop: '50%' }} className={classes.navText} variant="h6" gutterBottom><Link to={'/patient'} style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={{
                                pathname: '/Patient-list',
                                state: { detail: history.location.state.detail, patientData: history.location.state.patientData }
                            }} style={{ textDecoration: 'none', color: 'white' }}>List of patients</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/login'} style={{ textDecoration: 'none', color: '#C0C0C0' }}>Personal details</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/'} style={{ textDecoration: 'none', color: '#C0C0C0' }}>About Us</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Typography>
                        </div>
                    </Grid>
                </div>
            </Grid>

            <Grid item sm={9} style={{ marginLeft: '-3%', height: '100%' }}>
                <Grid
                    container
                    direction="row"
                    style={{ marginTop: '4%', height: '100%' }}>
                    <Grid item sm={7} style={{ height: '15%' }}>
                        <Grid
                            container
                            direction="row" style={{ height: '100%' }}>
                            <Typography variant="h3" gutterBottom className={classes.text}>
                                Hello, {state.firstName}
                            </Typography>
                            <Typography variant="h6" gutterBottom style={{ color: '#9296A6' }} className={classes.text}>
                                Welcome to your personal dashboard! Here, you can see the self-assessment reports of patients as well as schedule an appointment or reject the patient.
                        </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={7} style={{ marginTop: '-4%', height: '5%' }}>
                        <Typography variant="h4" gutterBottom className={classes.text}>
                            Self-assessment reports of patients
                        </Typography>
                    </Grid>
                    {/* <Grid item sm={11} style={{ height: '80%', marginTop: 20 }}> */}
                    <Grid container justify='center' alignItems='center' direction='column' style={{ marginBottom: 30, width: '100%', height: '60%', backgroundColor: '#F2F6F8', borderRadius: 30, marginTop: '-5%' }}>
                        <Grid container style={{ margin: 10, marginLeft: 20, width: '40%', height: '60%', }}>
                            <TableContainer component={Paper} elevation={0} style={{ borderRadius: 15, height: '100%' }}>
                                <Table className={classes.table} size="medium" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#F2F6F8', borderRadius: 10 }}>
                                            <TableCell className={classes.tableText}>Name</TableCell>
                                            <TableCell align="right" className={classes.tableText}>Assessment date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {state.patientData.map((row, index) => (
                                            < TableRow key={row.name} >
                                                <TableCell component="th" scope="row" className={classes.tableText}>
                                                    <Button className={classes.tableText} style={state.index == index ? { borderColor: '#3C4161' } : { borderColor: 'white' }} variant={'outlined'} fullWidth
                                                        onClick={() => setState({ ...state, index: index })}> {row.name}</Button>
                                                </TableCell>
                                                <TableCell align="right" className={classes.tableText}>{moment(row.assessment.createdAt).format('DD-MM-YYYY')}</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid container style={{ backgroundColor: '#FFFFFF', height: '90%', margin: 30, width: '50%', borderRadius: 15, }}>
                            <TableContainer component={Paper} elevation={0} style={{ borderRadius: 15, margin: 20, marginBottom: -10 }}>
                                <Table className={classes.table} size="medium" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow style={{ borderRadius: 10 }}>
                                            <TableCell className={classes.description} colSpan={2} style={{ textAlign: 'center' }} width='100%'>{state.patientData[state.index].name}</TableCell>
                                            {/* <TableCell className={classes.description} ></TableCell> */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TableRow >
                                            <TableCell component="th" scope="row" className={classes.description} style={{ borderBottom: 'none' }} width='70%'>
                                                Trouble in breathing
                                                </TableCell>
                                            <TableCell align="right" className={classes.description} style={{ borderBottom: 'none', textTransform: 'capitalize' }}>{state.patientData[state.index].assessment.difficultyBreathing}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" className={classes.description} style={{ borderBottom: 'none' }}>
                                                Age
                                                </TableCell>
                                            <TableCell align="right" className={classes.description} style={{ borderBottom: 'none' }}>{state.patientData[state.index].assessment.age}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" className={classes.description} style={{ borderBottom: 'none' }}>
                                                Symptoms like Fever, loss of smell, cough, shortness of breath, touble breathing, sore throat or runny nose
                                                </TableCell>
                                            <TableCell align="right" className={classes.description} style={{ borderBottom: 'none', textTransform: 'capitalize' }}>{state.patientData[state.index].assessment.symptomsSet1}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell component="th" scope="row" className={classes.description} style={{ borderBottom: 'none' }}>
                                                Symptoms like Stomach ache, Nausea or Vomiting, Diarrhea, fatigue, loss of appetite, muscle pain, Headaches
                                                </TableCell>
                                            <TableCell align="right" className={classes.description} style={{ borderBottom: 'none', textTransform: 'capitalize' }}>{state.patientData[state.index].assessment.symptomsSet2}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid container direction='row' justify='center' alignItems='center'>
                                <Button variant="outlined" size="large" className={clsx(classes.margin, classes.loginBtn)} disableElevation
                                    style={{
                                        textTransform: ' none', boxShadow: 'none', width: '40%', backgroundColor: '#3C4161', color: 'white', borderRadius: 10
                                    }}
                                    onClick={() => history.push({
                                        pathname: '/schedule-appointment',
                                        state: { detail: history.location.state.detail, patientData: state.patientData, name: state.patientData[state.index].name, id: state.patientData[state.index].assessment._id }
                                    })}
                                    color="primary">
                                    Schedule an appointment
                                        </Button>
                                <Button variant="outlined" size="large" className={clsx(classes.margin, classes.loginBtn)} disableElevation
                                    style={{ textTransform: ' none', boxShadow: 'none', width: '30%', backgroundColor: '#3C4161', color: 'white', borderRadius: 10 }}
                                    onClick={() => postReviewAssessment(true, false, true, state.patientData[state.index].assessment._id).
                                        then(async function (response) {
                                            if (response.assessment.isForwarded) {
                                                window.alert('Appointment has been successfully forwarded to a Doctor.')
                                                let patientData = await getListForReview();
                                                setState({ ...state, patientData: patientData })
                                            }
                                        }
                                        )}
                                    color="primary">
                                    Forwad to a Doctor
                                         </Button>
                                <Button variant="outlined" size="large" className={clsx(classes.margin, classes.loginBtn)} disableElevation
                                    style={{ textTransform: ' none', boxShadow: 'none', width: '20%', borderRadius: 10 }}
                                    onClick={() => postReviewAssessment(false, true, true, state.patientData[state.index].assessment._id).
                                        then(async function (response) {
                                            if (response.assessment.isRejected) {
                                                window.alert('Appointment has been successfully rejected and the patient will be notified.')
                                                let patientData = await getListForReview();
                                                setState({ ...state, patientData: patientData })
                                            }
                                        }
                                        )}
                                    color="primary">
                                    Reject
                                         </Button>

                            </Grid>
                        </Grid>
                    </Grid>
                    {/* </Grid> */}
                </Grid>
            </Grid>
        </Grid >

    );
}

export default NurseDS;


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
        textTransform:'capitalize',
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
