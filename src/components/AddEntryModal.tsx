import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

type AddEntryModalProps = {
    setModalOpen: (modalOpen: boolean) => void;
    setEntries: (entries: []) => void;
};

type AddEntryFormData = {
    title: string;
    body: string;
};

const AddEntryModal: React.FC<AddEntryModalProps> = ({
    setModalOpen,
    setEntries,
}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<AddEntryFormData>({ mode: "onChange" });
    const { auth } = useAuth();
    const axiosInstance = useAxios();

    const handleAddEntry: SubmitHandler<AddEntryFormData> = (data) => {
        const entry = {
            title: data.title,
            body: data.body,
            author: auth.userId,
        };

        axiosInstance
            .post(`/entries/`, entry)
            .then(() => {
                axiosInstance
                    .get(`/entries/?author=${auth.userId}`)
                    .then((response) => {
                        setEntries(response.data);
                    })
                    .catch((error) => {
                        console.error(
                            "Error while fetching entries: ",
                            error.response
                        );
                    });
            })
            .then(() => {
                setModalOpen(false);
            })
            .catch((error) => {
                console.error(error.response);
            });
    };

    return (
        <div className="dark-background">
            <div className="modal-wrapper">
                <h1>Add Diary Entry</h1>
                <form
                    className="form-flex"
                    onSubmit={handleSubmit(handleAddEntry)}
                >
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            {...register("title", {
                                required: "Please choose a title",
                            })}
                        />
                        {errors.title && (
                            <p className="error-message">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="body">Body</label>
                        <textarea
                            id="body"
                            rows={4}
                            {...register("body", {
                                required:
                                    "Please write something for the body.",
                            })}
                        />
                        {errors.body && (
                            <p className="error-message">
                                {errors.body.message}
                            </p>
                        )}
                    </div>

                    <div className="buttons">
                        <button
                            type="button"
                            onClick={() => setModalOpen(false)}
                            className="pink-button"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="green-button">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEntryModal;
