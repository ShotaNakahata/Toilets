// src/components/common/SnackbarActionText.tsx
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

interface SnackbarActionTextProps {
    open: boolean;
    handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
    message: string;
}

const SnackbarActionText: React.FC<SnackbarActionTextProps> = ({ open, handleClose, message }) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarActionText;
