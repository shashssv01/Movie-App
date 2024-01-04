import { Snackbar, TextField } from 'components';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import styles from './register.module.scss';
import { AuthServices } from 'api';
import { GlobalContext, actions } from 'context';

const Register = () => {
    const { dispatch } = useContext(GlobalContext);

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackbarContent, setSnackBarContent] = useState({ message: 'This is an error', class: 'error' });

    const storeHandler = (type, payload) => dispatch({ type, payload });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [inValid, setInValid] = useState({});

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

    const getHelperText = (input) => {
        switch (input) {
            case 'Name':
                return 'Name is required'
            case 'Email':
                return 'Email Address is required'
            case 'Password':
                return 'Password is required'
            default: break;
        }
    }

    const validate = (event) => {
        try {
            event.preventDefault();
            if (!name) {
                setInValid(prev => ({ ...prev, name: true }))
            }
            if (!email) {
                setInValid(prev => ({ ...prev, email: true }))
            }
            if (!password) {
                setInValid(prev => ({ ...prev, password: true }))
            }
            let flag = true;
            Object.values(inValid)?.forEach((ele, _) => {
                flag = ele === false
            })
            if (flag) {
                handleSubmit()
            }
        } catch (error) {

        }
    }

    const handleSubmit = async () => {
        try {
            const data = {
                name,
                email,
                password
            }
            storeHandler(actions.SHOW_LOADER, true);
            const { tokens, message } = await AuthServices.register(data);
            snackbarNotification({
                message,
                class: 'success'
            })
            localStorage.setItem('authToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);
            setTimeout(storeHandler(actions.LOG_IN, true), 2000);
            storeHandler(actions.SHOW_LOADER, false);
        } catch ({ message }) {
            snackbarNotification({
                message,
                class: 'error'
            })
            storeHandler(actions.SHOW_LOADER, false);
        }
    }

    return (
        <div className={`${styles.register} d-flex align-items-center w-100 justify-content-center`}>
            <div></div>
            <div className={`${styles.registerContainer} d-flex align-items-center justify-content-center p-5`}>
                <div className={`${styles.registerForm} d-flex flex-column`}>
                    <p className={`${styles.registerHeading}`}>Register</p>
                    <div className='mb-3'>
                        <span className={`${styles.registerText}`}>Do you already have an account? </span>
                        <a href='/login'>Login</a>
                    </div>
                    <br />
                    <form onSubmit={validate}>
                        <div className={`d-flex flex-column`}>
                            <TextField
                                className={`${styles.textInput} mb-4`}
                                onChange={(event) => setName(event?.target?.value)}
                                value={name}
                                helperText={inValid?.name ? getHelperText('Name') : ''}
                                label='Name'
                                variant='filled'
                            />
                            <TextField
                                className={`${styles.textInput} mb-4`}
                                onChange={(event) => setEmail(event?.target?.value)}
                                value={email}
                                helperText={inValid?.email ? getHelperText('Email') : ''}
                                label='Email Address'
                                variant='filled'
                            />
                            <TextField
                                className={`${styles.textInput} mb-5`}
                                onChange={(event) => setPassword(event?.target?.value)}
                                value={password}
                                helperText={inValid?.password ? getHelperText('Password') : ''}
                                label='Password'
                                variant='filled'
                                type='password'
                                passwordfield
                            />
                        </div>
                        <Button type='submit' className={`${styles.btnRegister} p-3 mb-3`}>
                            Register
                        </Button>
                    </form>
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

export default Register