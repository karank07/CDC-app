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

import Visibility from '@material-ui/icons/Visibility';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { getAssessmentData } from '../../api/Api';

import back from '../../assets/Images/Subtract.svg';
import pds1 from '../../assets/Images/pds1.png'

const PatientDS = ({ history }) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        firstName: history.location.state.detail.firstName,
        lastName: history.location.state.detail.lastName,
        dob: history.location.state.detail.dateOfBirth,
        assessmentData: []
    });
    const fetchMyAPI=async()=> {
        if(state.firstName){
            let response = await getAssessmentData(history.location.state.detail._id, history.location.state.detail.token);
        console.log("REs", response)
        setState({ ...state, assessmentData: response })
        }
        else{
            console.log("oops")
        }
        
    }
    useEffect(() => {
        fetchMyAPI()
    },[])
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
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Typography>
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
                    <Grid item sm={11} style={{ height: '40%' }}>
                        <Grid container justify="flex-start"
                            alignContent="center"
                            direction="row"
                            style={{ backgroundImage: `url(${pds1})`, backgroundRepeat: 'no-repeat', height: '100%', width: '100%' }}>
                            <Typography style={{
                                maxWidth: '60%',
                                fontFamily: 'ProductSans',
                                fontWeight: 'bold',
                                fontSize: 28,
                                // lineHeight: 46,
                                margin: 20,
                                marginLeft: '5%',
                                letterSpacing: "0.01em",
                                overflow: 'visible',
                                color: '#3C4161',
                            }}>Hey, You have got an appointment with Dr. Lorem Ipsum on  
                            {state.assessmentData.length>0 && moment(state.assessmentData[0].appointment[0].scheduledAt).format(' Do MMMM, YYYY')}
                            </Typography>
                            <Grid container>
                                <Button variant="outlined" size="large" className={clsx(classes.margin, classes.loginBtn)}
                                    style={{ boxShadow: 'none', marginLeft: '15%', width: '25%' }}
                                    color="primary"
                                >
                                    Cancel appointment
                             </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={10} style={{ height: '40%' }}>
                        <Grid container>

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
        fontFamily: 'ProductSans'
    },
    navText: {
        color: 'white',
        margin: '5%',
        marginLeft: '20%',
        fontWeight: 'black',
        fontFamily: 'ProductSans'

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
        fontFamily: 'ProductSans'

    },
    cardText: {
        color: '#3C4161',
        textAlign: 'center',
        marginTop: '2%',
        fontFamily: 'ProductSans'
    }
}));
