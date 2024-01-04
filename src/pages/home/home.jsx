import { MovieCard, Snackbar } from 'components';
import styles from './home.module.scss';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext, actions } from 'context';
import { AuthServices } from 'api';
import { Grid } from '@mui/material';
import moment from 'moment';

const Home = () => {
    const { dispatch } = useContext(GlobalContext);

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackbarContent, setSnackBarContent] = useState({ message: 'This is an error', class: 'error' });

    const storeHandler = (type, payload) => dispatch({ type, payload });

    const [movies, setMovies] = useState([]);

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

    const getMovies = async () => {
        try {
            storeHandler(actions.SHOW_LOADER, true);
            const { movies } = await AuthServices.getMovies();
            const sortedMovies = movies?.sort((a, b) => moment(b?.release_date, 'YYYY-MM-DD').diff(moment(a?.release_date, 'YYYY-MM-DD'), 'days'))
            setMovies(sortedMovies)
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
        getMovies()
    }, [])

    return (
        <div className={`${styles.movies} p-5 m-5`}>
            <Grid container spacing={4}>
                {
                    movies?.length ? movies?.map(({ movie_name, theatre_name, theatre_location, release_date }, index) => (
                        <Grid item xs={12} sm={12} md={6} lg={4} xl={3} className={`d-flex justify-content-center`}>
                            <MovieCard
                                key={index}
                                movie_name={movie_name}
                                theatre_name={theatre_name}
                                theatre_location={theatre_location}
                                release_date={release_date}
                            />
                        </Grid>
                    )
                    ) : null
                }
            </Grid>
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

export default Home