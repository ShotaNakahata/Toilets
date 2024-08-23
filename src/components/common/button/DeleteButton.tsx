import React, { useState } from 'react';
import ConfirmDialog from '../ConfirmDialog';

interface DeleteButtonProps {
    onConfirm: () => void;
    itemName?: string;
    buttonText?: string;
    confirmText?: string;
    cancelText?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onConfirm,
    itemName = "this item",
    buttonText = "Delete",
    confirmText = "Yes",
    cancelText = "No",
}) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    const handleConfirm = () => {
        onConfirm();
        handleCloseDialog();
    };

    return (
        <>
            <button 
                onClick={handleOpenDialog}
            >
                {buttonText}
            </button>
            <ConfirmDialog
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onConfirm={handleConfirm}
                title='Confirm Delete'
                body={`Are you sure you want to delete ${itemName}?`}
                confirmText={confirmText}
                cancelText={cancelText}
            />
        </>
    );
};

export default DeleteButton;

