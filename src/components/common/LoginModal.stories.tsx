// src/components/common/LoginModal.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import LoginModal from './LoginModal';

export default {
    title: 'Common/LoginModal',
    component: LoginModal,
} as Meta;

const Template: StoryFn = (args:any) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogin = (email: string, password: string) => {
        alert(`Email: ${email}, Password: ${password}`);
    };

    return (
        <div>
            <button onClick={handleOpen}>Open Login Modal</button>
            <LoginModal {...args} open={open} onClose={handleClose} onLogin={handleLogin} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {};
