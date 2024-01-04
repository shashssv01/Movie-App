import axios from 'axios';
import AuthServices from './services/auth-services';

const httpClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

const getAuthToken = async () => {
  const { accessToken } = await AuthServices.getRefreshToken();
  localStorage.setItem('authToken', accessToken);
  window.location.reload()
}

const onSuccess = (response) => Promise.resolve(response);
const onError = ({response}) => {
  if (response?.status === 401) {
      localStorage.removeItem('authToken');
      if( localStorage.getItem('refreshToken') ) {
        getAuthToken()
      }
      else {
        localStorage.clear()
      }
  }
  if( response?.status === 422 ) {
    localStorage.clear();
  }
  return Promise.reject(response);
};

httpClient.interceptors.request.use(
  (req) => {
    if (req.url === '/refresh') {
      req.headers['Authorization'] = `Bearer ${localStorage.getItem('refreshToken')}`
    } else {
      req.headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`
    }
    return req
  } 
);
 
httpClient.interceptors.response.use(onSuccess, onError);

export default httpClient;