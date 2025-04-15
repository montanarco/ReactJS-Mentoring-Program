import React from "react";
import { Meta } from "@storybook/react";
import Dialog from "../components/Dialog/Dialog";
import { Button } from "./Button";

export default {
    title: "Components/Delete Movie",
    component: Dialog,
} as Meta;

export const EditMovieDialog = () => {
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleConfirmEdit = () => {
        console.log("Confirmed movie Deletion");
        closeDialog();
    };

    return (
        <>
            <Button backgroundColor="tomato" label="Delete Movie" onClick={openDialog} />
            {dialogOpen && (
                <Dialog
                    title="Delete Movie Confirmation"
                    onClose={closeDialog}
                >
                    <p>Are you sure you want to Delete this movie?</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button className="button-primary" onClick={handleConfirmEdit}>
                            Confirm
                        </button>
                        <button className="button-secondary" onClick={closeDialog}>
                            Cancel
                        </button>
                    </div>
                </Dialog>
            )}
        </>
    );
};