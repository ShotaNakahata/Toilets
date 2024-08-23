import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { ChakraProvider } from '@chakra-ui/react';
import ConfirmDialog from './ConfirmDialog';
import { Button, useDisclosure } from '@chakra-ui/react';

export default {
    title: 'Common/ConfirmDialog',
    component: ConfirmDialog,
    decorators: [
        (Story) => (
            <ChakraProvider>
                <Story />
            </ChakraProvider>
        ),
    ],
} as Meta<typeof ConfirmDialog>;

const Template: StoryFn<typeof ConfirmDialog> = (args) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen}>Open ConfirmDialog</Button>
            <ConfirmDialog {...args} isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: 'Delete Confirmation',
    body: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Yes, Delete',
    cancelText: 'Cancel',
    onConfirm: () => alert('Confirmed!'),
};
