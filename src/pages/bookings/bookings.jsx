import { useContext, useEffect, useState } from 'react';
import styles from './bookings.module.scss';
import { GlobalContext, actions } from 'context';
import { AuthServices } from 'api';
import { BookingCard, Snackbar } from 'components';
import { Grid } from '@mui/material';

const Bookings = () => {
    const { dispatch } = useContext(GlobalContext);

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackbarContent, setSnackBarContent] = useState({ message: 'This is an error', class: 'error' });

    const storeHandler = (type, payload) => dispatch({ type, payload });

    const [bookings, setBookings] = useState([]);

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

    const getBookings = async () => {
        try {
            storeHandler(actions.SHOW_LOADER, true);
            const { bookings } = await AuthServices.getBookings();
            setBookings(bookings)
            storeHandler(actions.SHOW_LOADER, false);
        } catch ({ message }) {
            snackbarNotification({
                message,
                class: 'error'
            })
            storeHandler(actions.SHOW_LOADER, false);
        }
    }

    useEffect(() => {
        getBookings()
    }, [])

    return (
        <div className={`${styles.bookingsContainer} m-5 p-5`}>
            {bookings?.length && <p className={`${styles.title}`}>Bookings</p>}
            <div className={`${styles.bookings} my-5 d-flex flex-column`}>
                <Grid container spacing={4}>
                    {
                        bookings?.length ? bookings?.map(({ movie_id, date, time, seats, qr }, index) =>
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={3} className={`d-flex justify-content-center w-100`}>
                                <BookingCard
                                    key={index}
                                    movie_name={movie_id?.movie_name}
                                    theatre_name={movie_id?.theatre_name}
                                    theatre_location={movie_id?.theatre_location}
                                    date={date}
                                    time={time}
                                    seats={seats}
                                    qr={qr}
                                />
                            </Grid>) : <p className={`${styles.title} text-center`}>No bookings yet! Go <a href='/'>watch</a> a movie now!</p>
                    }
                </Grid>
            </div>
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

export default Bookings