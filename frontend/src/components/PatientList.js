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

import { getAssessmentData } from '../api/Api';

import back from '../assets/Images/Subtract.svg';
import pds1 from '../assets/Images/pds1.png'

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237,),
    createData('Eclair', 262,),
    createData('Cupcake', 305,),
    createData('Gingerbread', 356),
];
function createData(name, date) {
    return { name, date };
}
const PatientList = ({ history }) => {
    const classes = useStyles();
    // const [state, setState] = React.useState({
    //     firstName: history.location.state.detail.firstName,
    //     lastName: history.location.state.detail.lastName,
    //     dob: history.location.state.detail.dateOfBirth,
    //     assessmentData: []
    // });
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
                            <Typography className={classes.navTitle} variant="h3" gutterBottom><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>CDC</Link></Typography>
                            <Typography style={{ marginTop: '50%' }} className={classes.navText} variant="h6" gutterBottom><Link to={'/nurse'} style={{ textDecoration: 'none', color: 'white' }}>Dashboard</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/Patient-list'} style={{ textDecoration: 'none', color: 'white' }}>List of patients</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/nurse'} style={{ textDecoration: 'none', color: '#C0C0C0' }}>Personal details</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/nurse'} style={{ textDecoration: 'none', color: '#C0C0C0' }}>About Us</Link></Typography>
                            <Typography className={classes.navText} variant="h6" gutterBottom><Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Logout</Link></Typography>
                        </div>
                    </Grid>
                </div>
            </Grid>

            <Grid item sm={9} style={{ marginLeft: '-3%', width: '100%' }}>
                <Grid
                    container
                    direction="row"
                    style={{ marginTop: '4%', height: '80%' }}>
                    <Grid item sm={7} style={{ height: '10%' }}>
                        <Typography variant="h3" gutterBottom className={classes.text}>
                            List of patients
                            </Typography>
                    </Grid>
                    {/* <Grid item sm={7} style={{ marginTop: 10, height: '10%' }}>
                        <Typography variant="h4" gutterBottom className={classes.text}>
                            search bar
                        </Typography>
                    </Grid> */}
                    <Grid item sm={11} style={{ height: '100%' }}>
                        <Grid container justify='center' alignItems='center' style={{ backgroundColor: '#F2F6F8', borderRadius: 30 }}>

                            <TableContainer component={Paper} elevation='none' style={{ borderRadius: 15, margin: 20 }}>
                                <Table className={classes.table} size="medium" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow style={{ backgroundColor: '#F2F6F8', borderRadius: 10 }}>
                                            <TableCell className={classes.tableText}>Name</TableCell>
                                            <TableCell align="right" className={classes.tableText}>Date of Birth</TableCell>
                                            <TableCell align="right" className={classes.tableText}>Email ID</TableCell>
                                            <TableCell align="right" className={classes.tableText}>Phone number</TableCell>
                                            <TableCell align="right" className={classes.tableText}>Address</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <TableRow key={row.name} >
                                                <TableCell component="th" scope="row" className={classes.tableText}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right" className={classes.tableText}>{row.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>


                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PatientList;


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
