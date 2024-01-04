import movie from 'assets/img/movie.webp';
import styles from './movie-card.module.scss'
import { Button } from '@mui/material';
import moment from 'moment/moment';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MovieCard = ({ movie_name, theatre_name, theatre_location, release_date, ...props }) => {
    const history = useHistory();

    return (
        <div className={`${styles.movieContainer}`} {...props}>
            <img src={movie} alt='' className={`${styles.movie}`} />
            <div className={`${styles.movieCardDetail} d-flex flex-column p-3 mx-3`}>
                <p className={`${styles.movieName}`}>{movie_name}</p>
                <p className={`${styles.theatreName} mt-2 mb-0`}>{theatre_name}</p>
                <p className={`${styles.theatreLocation} mt-0 mb-2`}>{theatre_location}</p>
                <p className={`${styles.releaseDate}`}><span className={`${styles.releaseDateSpan}`}>Release Date:</span> {moment(release_date, 'YYYY-MM-DD').format('LL')}</p>
                <Button className={`${styles.btnBookNow} my-3`} onClick={() => history.push(`/movie/${movie_name}`)}>
                    BOOK NOW
                </Button>
            </div>
        </div>
    )
}

export default MovieCard