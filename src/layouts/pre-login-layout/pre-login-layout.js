import { Box } from "@mui/material";
// import LoginBg from 'assets/background/login-background.jpg';
// import logo from 'assets/img/logo.png';
import styles from './pre-login-layout.module.scss';

const PreLoginLayout = ({ children }) => {
  return (
    <Box direction="row" className="h-100">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: { xs: '1 1 0', sm: '1 1 600px' },
          minHeight: '100vh',
          // background: `url(${LoginBg})`,
          // backgroundRepeat: 'no-repeat',
          // backgroundPosition: 'center',
          // backgroundSize: 'cover',
          width: '100%'
        }}
        className={`${styles.plainSection} h-100`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PreLoginLayout;
