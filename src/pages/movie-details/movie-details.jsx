import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext, actions } from 'context';
import { AuthServices } from 'api';
import { Snackbar } from 'components';
import movieImg from 'assets/img/movie.webp';
import moment from 'moment';
import styles from './movie-details.module.scss';
import { Button, Grid, Tabs } from '@mui/material';
import './movie-details.scss';

const timeMap = {
  1: '10:00 AM',
  2: '2:00 PM',
  3: '6:00 PM',
  4: '10:00 PM'
}

const MovieDetails = () => {
  const history = useHistory();
  const { movieName } = useParams();
  const { dispatch } = useContext(GlobalContext);

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarContent, setSnackBarContent] = useState({ message: 'This is an error', class: 'error' });

  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [movie, setMovie] = useState([]);
  const [dates, setDates] = useState([]);
  const [activeDate, setActiveDate] = useState(null);
  const [activeTime, setActiveTime] = useState(null);

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

  const getMovieData = async () => {
    try {
      storeHandler(actions.SHOW_LOADER, true);
      const { movie } = await AuthServices.getMovie(movieName);
      setMovie(movie)
      storeHandler(actions.SHOW_LOADER, false);
    } catch ({ message }) {
      snackbarNotification({
        message,
        class: 'error'
      })
      storeHandler(actions.SHOW_LOADER, false);
    }
  }

  const getCurrentWeekDates = () => {
    let obj = moment()
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = obj.date()
      const month = obj.format('MMMM').slice(0, 3)
      const year = obj.format('YYYY')
      const data = {
        date,
        month,
        year
      }
      dates.push(data)
      obj = obj.add(1, 'days')
    }
    setDates(dates)
  }

  const handleNextStep = () => {
    const dt = `${dates[activeDate]?.date} ${dates[activeDate]?.month} ${dates[activeDate]?.year}`
    const date = moment(dt, 'DD MMM YYYY').format('DD-MM-YYYY')
    const time = timeMap[activeTime]
    const details = {
      movieId: movie?._id,
      movieName,
      date,
      time,
      theatreName: movie?.theatre_name,
      theatreLocation: movie?.theatre_location,
      releaseYear: movie?.release_year
    }
    localStorage.setItem('details', JSON.stringify(details))
    history.push(`/movie/${movieName}/${date}/${time}/seats`)
  }

  useEffect(() => {
    getMovieData()
    getCurrentWeekDates()
  }, [])

  return (
    <div className={`${styles.movieDetails} p-5`}>
      <div className={`${styles.movieDetailsContainer} d-flex flex-column m-5 w-75 mx-auto`}>
        <img src={movieImg} alt='' className={`${styles.movie}`} />
        <div className={`${styles.movieDetailsContent} d-flex my-5`}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={`d-flex justify-content-center`}>
              <div className={`${styles.movieCardDetailFirst} d-flex flex-column p-3 mx-5`}>
                <p className={`${styles.movieName}`}>{movie?.movie_name}</p>
                <p className={`${styles.theatreName} mt-2 mb-0`}>{movie?.theatre_name}</p>
                <p className={`${styles.theatreLocation} mt-0 mb-2`}>{movie?.theatre_location}</p>
                <p className={`${styles.releaseDate}`}><span className={`${styles.releaseDateSpan}`}>Release Date:</span> {moment(movie?.release_date, 'YYYY-MM-DD').format('LL')}</p>
                <Button disabled={!activeDate || !activeTime} className={`${(activeDate && activeTime) ? styles.btnBookNow : styles.disabledBookNow} my-3`} onClick={handleNextStep}>
                  PROCEED TO NEXT STEP
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={`d-flex justify-content-center`}>
              <div className={`${styles.movieCardDetailSecond} d-flex flex-column align-items-center py-3 px-5 mx-5`}>
                <Tabs
                  value={activeDate}
                  indicatorColor="white"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                  className={`${styles.scrollableTabs} scroll-tabs d-flex justify-content-center w-100`}
                >
                  {/* {
                sports?.length > 0 && sports?.map(({ _id, name, logo }, index) => (
                  <SportElement key={index} id={_id} name={name} img={logo} isFirst={index === 0} isLast={index === sports?.length - 1} onClick={() => history.push(`/sport/${_id}`)} />
                ))
              } */}
                  {
                    dates?.length ? dates?.map(({ date, month }, index) => (
                      <div key={index} onClick={() => setActiveDate(index + 1)} className={`${styles.dateComponent} ${activeDate === index + 1 && styles.dateComponentActive} d-flex flex-column align-items-center px-3`}>
                        <p className={`${styles.date}`}>{date}</p>
                        <p className={`${styles.month}`}>{month}</p>
                      </div>
                    )) : null
                  }
                </Tabs>
                <div className={`${styles.showTimes} d-flex align-items-center my-5`}>
                  <Grid container spacing={4}>
                    {
                      Object.keys(timeMap)?.map((ele, index) => <Grid item xs={12} sm={12} md={6} lg={6} xl={6} className={`d-flex justify-content-center`}>
                        <div key={index} onClick={() => setActiveTime(ele)} className={`${styles.showTime} ${activeTime === ele && styles.activeTime} px-5 py-3`}>
                          {timeMap[ele]}
                        </div>
                      </Grid>)
                    }
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
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

export default MovieDetails