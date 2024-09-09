import React, { useState } from 'react';
import ConfirmDialog from '../ConfirmDialog';

interface DeleteButtonProps {
    onConfirm: () => void;
    itemName?: string;
    buttonText?: string;
    confirmText?: string;
    cancelText?: string;
    className?: string;  // className を受け取るためのプロパティを追加
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onConfirm,
    itemName = "this item",
    buttonText = "Delete",
    confirmText = "Yes",
    cancelText = "No",
    className,  // 受け取った className を使えるようにする
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
                className={`w-full px-4 py-2 bg-background text-white rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300 ${className}`}  // className を適用
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



