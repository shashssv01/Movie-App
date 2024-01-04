import moment from 'moment'
import styles from './booking-card.module.scss'

const BookingCard = ({ movie_name, theatre_name, theatre_location, date, time, seats, qr, ...props }) => {
    return (
        <div className={`${styles.bookingCard} p-5 w-100`} {...props}>
            <p className={`${styles.movieName}`}>{movie_name}</p>
            <p className={`${styles.theatreName} mt-2 mb-0`}>{theatre_name}<span className={`${styles.theatreLocation} mt-0 mb-2`}> ( {theatre_location} )</span></p>
            <p className={`${styles.date} mb-0`}><span className={`${styles.dateSpan}`}>Date:</span> {moment(date, 'DD-MM-YYYY').format('LL')}</p>
            <p className={`${styles.date} my-0`}><span className={`${styles.dateSpan}`}>Time:</span> {time}</p>
            <p className={`${styles.date} mt-0 mb-3`}><span className={`${styles.dateSpan}`}>Seats:</span> {seats?.join(', ')}</p>
            <img src={qr} alt='' className={`${styles.img}`}/>
        </div>
    )
}

export default BookingCard