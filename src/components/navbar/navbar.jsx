import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Snackbar } from 'components';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import { ReactComponent as Profile } from 'assets/icons/avatar.svg';
import { GlobalContext, actions } from 'context';
import { AuthServices } from 'api';
import styles from './navbar.module.scss';
import './navbar.scss';
import { IconButton, Menu, MenuItem } from '@mui/material';

const NavBar = () => {
    const history = useHistory();

    const { dispatch } = useContext(GlobalContext)

    const [showSnackBar, setShowSnackBar] = useState(false);
    const [snackbarContent, setSnackBarContent] = useState({ message: 'This is an error', class: 'error' });

    const storeHandler = (type, payload) => dispatch({ type, payload });

    const [searchValue, setSearchValue] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickProfile = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseProfile = () => {
        setAnchorElProfile(null);
    };

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

    const logout = async () => {
        storeHandler(actions.SHOW_LOADER, true);
        try {
            const { message } = await AuthServices.logout({
                authToken: localStorage.getItem('authToken'),
                refreshToken: localStorage.getItem('refreshToken')
            })
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            snackbarNotification({
                message,
                class: 'success'
            })
            window.location.reload();
            storeHandler(actions.SHOW_LOADER, false);
        } catch (error) {
            const { data } = error || {}
            const { message } = data || {}
            snackbarNotification({
                message,
                class: 'error'
            })
            storeHandler(actions.SHOW_LOADER, false);
        }
    }

    return (
        <nav className={`${styles.navbar} d-flex align-items-center justify-content-between p-3 px-5 w-100`}>
            <div onClick={() => history.push('/')} className={`${styles.container} d-flex align-items-center`}>
                <IconButton className={`${styles.logoContainer} p-0`}>
                    <Logo className={`${styles.logo} m-3`} />
                </IconButton>
                <span className={`ml-3 ${styles.title}`}>Movies</span>
            </div>
            <div className='d-flex align-items-center'>
                <p onClick={() => history.push('/bookings')} className={`${styles.navLink} mx-4`}>Bookings</p>
                <Profile alt='' onClick={handleClickProfile} className={`${styles.profile} mx-3`} />
                <Menu
                    id="customized-menu"
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorEl={anchorElProfile}
                    keepMounted
                    open={Boolean(anchorElProfile)}
                    onClose={handleCloseProfile}
                >
                    <MenuItem onClick={() => logout()} className={`${styles.lastItem}`}>
                        <p className={`${styles.dropDownLink} mx-4 my-2`}>
                            Logout
                        </p>
                    </MenuItem>
                </Menu>
            </div>
            <Snackbar
                open={showSnackBar}
                message={snackbarContent?.message || ''}
                className={snackbarContent?.class || ''}
                autoHideDuration={4000}
                onClose={setShowSnackBar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            />
        </nav>
    )
}

export default NavBar