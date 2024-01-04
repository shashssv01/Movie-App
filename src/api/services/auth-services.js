import httpClient from 'api/http-client';
import {
  LOGIN,
  REFRESH,
  LOGOUT,
  USER_REGISTRATION,
  GET_MOVIES,
  BOOK,
  GET_BOOKING,
  GET_BOOKINGS,
  GET_UNAVAILABLE_SEATS,
} from '../config';

const AuthServices = {
  login: (data) =>
    httpClient
      .post(LOGIN, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data),

  logout: (data) =>
    httpClient
      .post(`${LOGOUT}`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data),

  getRefreshToken: () =>
    httpClient
      .get(REFRESH)
      .then((response) => response.data),

  register: (data) =>
    httpClient
      .post(`${USER_REGISTRATION}`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data),

  getMovies: () =>
    httpClient
      .get(`${GET_MOVIES}`)
      .then((response) => response.data),

  getMovie: (movieName) =>
    httpClient
      .get(`${GET_MOVIES}/${movieName}`)
      .then((response) => response.data),

  book: (data) =>
    httpClient
      .post(`${BOOK}`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data),

  getBookings: () =>
    httpClient
      .get(`${GET_BOOKINGS}`)
      .then((response) => response.data),

  getBooking: (id) =>
    httpClient
      .get(`${GET_BOOKING}/${id}`)
      .then((response) => response.data),

  getUnavailableSeats: (data) =>
    httpClient
      .post(`${GET_UNAVAILABLE_SEATS}`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data),

};

export default AuthServices;
