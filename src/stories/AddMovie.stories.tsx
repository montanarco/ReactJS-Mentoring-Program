import React from "react";
import { Meta } from "@storybook/react";
import FormModal from "../components/FormModal/FormModal";
import MovieForm, { Movie } from "../components/MovieForm/MovieForm";
import Dialog from "../components/Dialog/Dialog";
import { Button } from "./Button";

export default {
    title: "Components/Add Movie",
    component: FormModal,
} as Meta;

export const AddMovie = () => {

    const [formOpen, setFormOpen] = React.useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);

    const openForm = () => {
        setFormOpen(true);
    };

    /*const successOpen = () => {
        setSuccessDialogOpen(false);
    };*/

    const successClose = () => {
        setSuccessDialogOpen(false);
    };

    const handleFormSubmit = (movie: Movie) => {
        setFormOpen(false);
        setSuccessDialogOpen(true);
        console.log("Submitted movie:", movie);
    };

    const handleCancel = () => {
        setFormOpen(false);
        console.log("Modal closed");
    };

    return (
        <>
            <Button backgroundColor="tomato" label="Add Movie" onClick={openForm} />
            {formOpen && (
                <FormModal
                    title="Add Movie"
                    onClose={handleCancel}
                >
                    <MovieForm movie={null} onSubmit={handleFormSubmit} onCancel={handleCancel} />
                </FormModal>
            )}
            {successDialogOpen &&
                <Dialog title={"Movie Added"} onClose={successClose} >The movie was successfully added</Dialog>
            }
        </>
    );
};