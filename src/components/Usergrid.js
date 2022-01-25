import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { userDataLayerValue } from './DataLayer'
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function UserGrid() {


    const [UserData, setUserData] = useState([])
    const [Page, setPage] = useState("1")
    const [open, setOpen] = useState(false);
    const [UserId, setUserId] = useState([]);
    const [Loading, setLoading] = useState(true);


    const classes = useStyles();
    const [Search, setSearch] = useState("")
    const HandelChange = (e) => {
        setSearch(e.target.value)
    }
    const HandeSearch = () => {
        let filterData = UserData.filter(item => item.name.first.toUpperCase() == Search.toUpperCase() || item.email.toUpperCase() == Search.toUpperCase())
        setUserData(filterData)
    }

    // Api call On page load
    useEffect(() => {
        setSearch("")
        axios.get(`https://randomuser.me/api/?page=1&results=12`)
            .then((res) => {
                setUserData(res.data.results)
                setLoading(false)

            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    //  pagination api call
    useEffect(() => {
        setLoading(true)
        axios.get(`https://randomuser.me/api/?page=${Page}&results=12`)
            .then((res) => {
                setUserData(res.data.results)
                setLoading(false)
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [Page])

    //  Handel Model Action open/close
    const handleOpen = (data) => {
        setOpen(true);

        setUserId([data])
        console.log("data display", data)
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div style={{ width: "80%", marginTop: "20px", marginBottom: "25px", marginLeft: "auto", marginRight: "auto" }}>
            <InputBase
                placeholder="Search…"
                value={Search}
                onChange={HandelChange}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <Button variant="outlined" color="primary" onClick={HandeSearch}>
                Search
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>

                        {UserId.map((data) => (
                            <div>
                                <h2 id="transition-modal-title">
                                    Name:- {data.name.title} {data.name.first} {data.name.last}

                                </h2>
                                <p id="transition-modal-description">

                                    Email:{data.email}

                                </p>
                                <p id="transition-modal-description">

                                    Dob:- {data.dob.date}  ,
                                    age:- {data.dob.age}

                                </p>
                                <p id="transition-modal-description">

                                    Gender:- {data.gender}

                                </p>
                                <p id="transition-modal-description">

                                    Cell:- {data.cell}

                                </p>
                                <p id="transition-modal-description">

                                    Phone:- {data.phone}

                                </p>
                                <p id="transition-modal-description">

                                    City:- {data.location.city} ,   Country:- {data.location.country} ,State:- {data.location.state}

                                </p>
                            </div>
                        ))}

                    </div>
                </Fade>
            </Modal>
            {/* <button type="button" onClick={handleOpen}>
                react-transition-group
            </button> */}
            {Loading ? <div style={{ alignContent: "center" }}><CircularProgress disableShrink /></div> :
                <>

                    <div style={{ width: "80%", height: "450px", overflowY: "scroll", marginLeft: "auto", marginRight: "auto" }}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Profile Image</TableCell>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right"> Email</TableCell>
                                        <TableCell align="right">City</TableCell>
                                        <TableCell align="right">State</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {UserData.map((data) => (
                                        <TableRow key={data.login.uuid} onClick={() => handleOpen(data)}>
                                            <TableCell component="th" scope="row">
                                                <img src={data.picture.medium} alt={data.name.first} />
                                            </TableCell>
                                            <TableCell align="right"> {data.name.first}</TableCell>
                                            <TableCell align="right">{data.email}</TableCell>
                                            <TableCell align="right">{data.location.city}</TableCell>
                                            <TableCell align="right">{data.location.state}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
                        <Button variant="outlined" color="primary" onClick={() => setPage(1)}>
                            1
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => setPage(2)}>
                            2
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => setPage(3)}>
                            3
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => setPage(4)}>
                            4
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => setPage(5)}>
                            5
                        </Button>
                    </div>
                </>
            }
        </div>
    );
}
