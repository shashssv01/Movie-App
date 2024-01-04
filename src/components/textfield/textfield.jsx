import { TextField as MuiTextField, IconButton, InputAdornment } from "@mui/material";
import { ReactComponent as ShowIcon } from 'assets/icons/eye-open.svg';
import { ReactComponent as HideIcon } from 'assets/icons/eye-closed.svg';
import { useState } from 'react';
import styles from './textfield.module.scss';

const TextField = (props) => {
    const { passwordfield, type, withoutAdornment, alphanumeric, max } = props;
    const [showPassword, setshowPassword] = useState(false);
    const showHidePassword = () => {
        setshowPassword(!showPassword);
    };
    const onKeyPress = (e) => {
        if (type === 'number') {
            var charCode = typeof e.which == 'undefined' ? e.keyCode : e.which;
            var charStr = String.fromCharCode(charCode);
            if (!charStr.match(/^[0-9.]+$/)) e.preventDefault();
        }

    };
    const onKeyDown = (event) => {
        if (event.target.type === 'number' && event.which === 69) {
            event.preventDefault();
        }
        if (alphanumeric) {
            const regex = /^[a-zA-Z ]+$/;
            // const regex = /^[a-zA-Z0-9 .-]+$/;

            if (regex.test(event.key)) {
                return
            }
            event.preventDefault()
        }
        if (max && Number(event.target.value) > Number(max)) {
            event.target.value = event.target.value.split('')[0]
            event.preventDefault()
        }

    };
    if (passwordfield && !withoutAdornment) {
        let passwordFieldProps = { ...props };
        delete passwordFieldProps.passwordfield;
        return (
            <MuiTextField
                {...passwordFieldProps}
                inputProps={{
                    type: showPassword ? 'text' : 'password',
                    autoComplete: 'new-password',
                }}
                InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton disableRipple={true} onClick={showHidePassword}>
                                {/* <img src={!showPassword ? showIcon : hideIcon} alt="show" /> */}
                                {!showPassword ? <ShowIcon className={styles.adornIcon} /> : <HideIcon className={styles.adornIcon} />}
                                {/* <img src={!showPassword ? showIcon : hideIcon} alt={!showPassword ? 'show' : 'hide'} /> */}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        );
    }

    if (passwordfield && withoutAdornment) {

        let passwordFieldProps = { ...props };
        delete passwordFieldProps.passwordfield;
        delete passwordFieldProps.withoutAdornment
        return (
            <MuiTextField
                {...passwordFieldProps}
                inputProps={{
                    type: 'password',
                    autoComplete: 'new-password',
                }}
                InputProps={{
                    disableUnderline: true,
                }}
            />
        );
    }

    return (
        <MuiTextField
            {...props}
            onKeyDown={onKeyDown}
            onKeyPress={onKeyPress}
            InputProps={{ disableUnderline: true }}
        />
    );
};

export default TextField;
