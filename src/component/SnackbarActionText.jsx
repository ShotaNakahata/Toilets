import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import PropTypes from 'prop-types';

const SnackbarActionText = ({ open, handleClose, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

SnackbarActionText.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired, 
};

export default SnackbarActionText;
