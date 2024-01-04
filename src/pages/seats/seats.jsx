import { useContext, useEffect, useState } from 'react';
import styles from './seats.module.scss';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Button, Dialog, Grid } from '@mui/material';
import { GlobalContext, actions } from 'context';
import { AuthServices } from 'api';
import { Snackbar } from 'components';
import moment from 'moment';

const rows = Array.from({ length: 10 }, (_, index) => String.fromCharCode(65 + index));

const Seats = () => {
    const history = useHistory();
    const { movieName, date, time } = useParams();
    const { dispatch } = useContext(GlobalContext);

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackbarContent, setSnackBarContent] = useState({ message: 'This is an error', class: 'error' });

    const storeHandler = (type, payload) => dispatch({ type, payload });

    const [unavailableSeats, setUnavailableSeats] = useState([]);
    const [seats, setSeats] = useState([]);
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(false);

    const snackbarNotification = (data) => {
        if (data?.message === '' || !data?.message) {
            setSnackBarContent({
                message: 'An unknown error occurred',
                class: 'error'
            })
        } else {
            setSnackBarContent(data)
        }
        setShowSnackBar(true)
    }

    const getUnavailableSeats = async (details) => {
        try {
            storeHandler(actions.SHOW_LOADER, true);
            console.log(details)
            const data = {
                movie_id: details?.movieId,
                date,
                time
            }
            const { unavailableSeats } = await AuthServices.getUnavailableSeats(data);
            setUnavailableSeats(unavailableSeats)
            storeHandler(actions.SHOW_LOADER, false);
        } catch ({ message }) {
            snackbarNotification({
                message,
                class: 'error'
            })
            storeHandler(actions.SHOW_LOADER, false);
        }
    }

    const toggleSeat = (seat) => {
        if (seats?.includes(seat)) {
            let arr = seats?.filter(ele => ele !== seat)
            setSeats(arr)
        } else {
            let arr = [...seats, seat]
            if (arr?.length > 10) {
                arr.shift()
            }
            setSeats(arr)
        }
    }

    const generateSeats = (sectionName, rowNumber) => {
        const generatedSeats = [];
        let n = sectionName === 'Left' ? 1 : sectionName === 'Center' ? 7 : 13;

        for (let i = n; i <= n + 5; i++) {
            generatedSeats.push(
                <Grid item key={`${sectionName}-seat-${i}`}>
                    <button disabled={unavailableSeats?.includes(`${rows[rowNumber]}${i}`)} onClick={() => toggleSeat(`${rows[rowNumber]}${i}`)} className={`${!seats?.includes(`${rows[rowNumber]}${i}`) ? styles.seatButton : styles.activeSeatButton} ${unavailableSeats?.includes(`${rows[rowNumber]}${i}`) && styles.disabled} m-1`}>
                        {`${rows[rowNumber]}${i}`}
                    </button>
                </Grid>
            );
        }

        return generatedSeats;
    };

    const generateRows = () => {
        const rows = [];

        for (let i = 1; i <= 10; i++) {
            rows.push(
                <Grid container item xs={12} key={`row-${i}`}>
                    {/* Section 1 */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                        <Grid container spacing={1} className='mx-5'>
                            {generateSeats('Left', i - 1)}
                        </Grid>
                    </Grid>

                    {/* Section 2 */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                        <Grid container spacing={1} className='mx-5'>
                            {generateSeats('Center', i - 1)}
                        </Grid>
                    </Grid>

                    {/* Section 3 */}
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                        <Grid container spacing={1} className='mx-5'>
                            {generateSeats('Right', i - 1)}
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

        return rows;
    };

    const booking = async () => {
        try {
            storeHandler(actions.SHOW_LOADER, true);
            setOpen(false);
            const url = new URL(`http://api.qrserver.com/v1/create-qr-code/?data=MovieTicket, ${details?.movieName}, ${details?.theatreName}, ${details?.theatreLocation}, ${date}, ${time}"`)
            const data = {
                movie_id: details?.movieId,
                date,
                time,
                seats,
                qr: url.href
            }
            const { message } = await AuthServices.book(data);
            snackbarNotification({
                message,
                class: 'success'
            })
            history.push('/bookings')
            storeHandler(actions.SHOW_LOADER, false);
        } catch ({ message }) {
            snackbarNotification({
                message,
                class: 'error'
            })
            storeHandler(actions.SHOW_LOADER, false);
        }
    }

    const checkout = () => {
        const details = JSON.parse(localStorage.getItem('details'))
        setDetails(details)
        setOpen(true)
    }

    useEffect(() => {
        const details = JSON.parse(localStorage.getItem('details'))
        setDetails(details)
        getUnavailableSeats(details)
    }, [])

    return (
        <div className={`${styles.seats} mx-5 p-5`}>
            <div className={`${styles.seatsContainer} d-flex flex-column m-5 mx-auto`}>
                <p className={`${styles.title} m-5`}>Please select the seats</p>
                <div className={`${styles.seatsGrid} m-5`}>
                    <Grid container spacing={2}>
                        {generateRows()}
                    </Grid>
                </div>
                <div className={`${styles.checkout} d-flex justify-content-center py-5`}>
                    <Button disabled={!seats?.length} className={`${(seats?.length) ? styles.btnCheckout : styles.disabledCheckout} my-3`} onClick={checkout}>
                        CHECKOUT
                    </Button>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                BackdropProps={{ style: { backgroundColor: 'black', opacity: "0.9" } }}
                className="dialog"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box
                    sx={{
                        color: '#D8D8D8',
                        margin: '0 2rem',
                        marginTop: '0.5rem',
                        minWidth: '20rem',
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div className={`d-flex flex-column align-items-center`}>
                        <div className={`d-flex flex-column`}>
                            <p className={`${styles.movieName}`}>{details?.movieName}</p>
                            <p className={`${styles.theatreName} mt-2 mb-0`}>{details?.theatreName}</p>
                            <p className={`${styles.theatreLocation} mt-0 mb-2`}>{details?.theatreLocation}</p>
                            <p className={`${styles.date} mb-0`}><span className={`${styles.dateSpan}`}>Date:</span> {moment(details?.date, 'DD-MM-YYYY').format('LL')}</p>
                            <p className={`${styles.date} my-0`}><span className={`${styles.dateSpan}`}>Time:</span> {details?.time}</p>
                            <p className={`${styles.date} mt-0 mb-3`}><span className={`${styles.dateSpan}`}>Seats:</span> {seats?.join(', ')}</p>
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                color: '#FFFFFF',
                                margin: '1rem 0 0 0',
                                width: '100%',
                                whiteSpace: 'noWrap',
                                fontWeight: '300',
                                fontSize: '1.1rem',
                            }}
                            className={`mt-3 mb-5`}
                            // endIcon={<NextIcon />}
                            onClick={booking}
                        >
                            Confirm Booking
                        </Button>
                    </div>
                </Box>
            </Dialog>
            <Snackbar
                open={showSnackBar}
                message={snackbarContent?.message || ''}
                className={snackbarContent?.class || ''}
                autoHideDuration={4000}
                onClose={setShowSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            />
        </div>
    )
}

export default Seats