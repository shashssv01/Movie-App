import { Box, Stack } from '@mui/material';
import styles from "./post-login-layout.module.scss";
import { NavBar } from 'components';

const PostLoginLayout = ({ children }) => {
  return (
    <Stack className={`d-flex flex-column ${styles.postLoginStack}`}>
      <NavBar />
      <Box className={`${styles.content} flex-grow-1 w-100`}>
        {children}
      </Box>
    </Stack>
  );
};

export default PostLoginLayout;
