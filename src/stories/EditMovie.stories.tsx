import React from "react";
import { Meta } from "@storybook/react";
import FormModal from "../components/FormModal/FormModal";
import MovieForm, { Movie } from "../components/MovieForm/MovieForm";
import { Button } from "./Button";

export default {
    title: "Components/Edit Movie",
    component: FormModal,
} as Meta;

const mockMovie: Movie = {
    title: "Inception",
    releaseYear: 2010,
    imageUrl: "https://via.placeholder.com/150",
    rating: 8.8,
    genres: ["sci-fi", "thriller"],
    duration: "148 minutes",
    director: "Christopher Nolan",
    description: "A skilled thief is offered a chance to redeem himself.",
};

export const EditMovie = () => {
    const [formOpen, setFormOpen] = React.useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);

    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        console.log("Form closed");
    };

    const successClose = () => {
        setSuccessDialogOpen(false);
    };

    const handleFormSubmit = (movie: any) => {
        setFormOpen(false);
        setSuccessDialogOpen(true);
        console.log("Edited movie:", movie);
    };

    return (
        <>
            <Button backgroundColor="tomato" label="Edit Movie" onClick={openForm} />
            {formOpen && (
                <FormModal
                    title="Edit Movie"
                    onClose={closeForm}
                >
                    <MovieForm movie={mockMovie} onSubmit={handleFormSubmit} onCancel={closeForm} />
                </FormModal>
            )}
            {successDialogOpen && (
                <FormModal
                    title={"Success"}
                    onClose={successClose}
                >
                    <p>The movie was successfully edited</p>
                </FormModal>
            )}
        </>
    );
};