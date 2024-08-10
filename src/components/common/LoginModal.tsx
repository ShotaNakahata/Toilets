import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
    onLogin: (email: string, password: string) => void;
    onCreateAccount: (username: string, email: string, password: string, confirmPassword: string) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onLogin, onCreateAccount }) => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [tabIndex, setTabIndex] = useState(0);

    const handleLogin = async () => {
        await onLogin(email, password);
        onClose();
    };

    const handleCreateAccount = async () => {
        await onCreateAccount(username, email, password, confirmPassword);
        onClose();
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Tabs value={tabIndex} onChange={handleChange}>
                    <Tab label="Sign In" />
                    <Tab label="Create Account" />
                </Tabs>
                {tabIndex === 0 ? (
                    <>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Login
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            You need to log in to use this feature.
                        </Typography>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button onClick={handleLogin} variant="contained" color="primary">
                            Login
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography id="modal-title" variant="h6" component="h2">
                            Create Account
                        </Typography>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button onClick={handleCreateAccount} variant="contained" color="primary">
                            Create Account
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default LoginModal;
