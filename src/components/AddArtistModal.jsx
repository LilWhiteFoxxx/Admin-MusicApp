import {
    Box,
    Modal,
    Stack,
    TextField,
    Typography,
    Autocomplete,
    Button,
    colors,
    TextareaAutosize,
} from "@mui/material";
import { fileToBase64 } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createArtistAction } from "../redux/asyncAction/artistAction";
import { uploadImage } from "@utils/uploadImage";
import Loader from "./Loader";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const AddArtistModal = (props) => {
    const dispatch = useDispatch();
    const pending = useSelector((state) => state.artist.isPending);
    const [preview, setPreview] = useState({
        thumbnail: null,
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            thumbnail: "",
        },
    });

    const handlePreview = async (file) => {
        const toBase64 = await fileToBase64(file);
        const formData = new FormData();
        if (toBase64) formData.append("file", toBase64);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const urlImage = await uploadImage(formData);
        setPreview((prev) => ({ ...prev, thumbnail: urlImage }));
    };

    useEffect(() => {
        if (watch("thumbnail")) {
            console.log("check preview");
            handlePreview(watch("thumbnail")[0]);
        }
    }, [watch("thumbnail")]);

    const onSubmit = async (data) => {
        console.log(data);
        data.thumbnail = preview.thumbnail;
        console.log(data);
        const newSong = await dispatch(createArtistAction(data));
        console.log(newSong);

        if (newSong.meta.requestStatus === "fulfilled") {
            toast.success(newSong.payload.messgae, {
                data: {
                    title: "Success toast",
                    text: newSong.payload.message,
                },
                // onClose: () => window.location.reload(),
            });
            props.setClose();
            setPreview({ thumbnail: "" });
        }

        if (newSong.meta.requestStatus === "rejected") {
            toast.error(newSong.error.message, {
                data: {
                    title: "Error toast",
                    text: "Loi roi dcmm",
                },
            });
        }
    };

    return (
        <Modal
            open={props.modal}
            onClose={props.setClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {pending ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <Box
                    sx={style}
                    component={"form"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        fontWeight={600}
                        component="h2"
                    >
                        NEW ARTIST
                    </Typography>
                    <Box
                        sx={{
                            height: "400px",
                        }}
                    >
                        <Stack
                            height={"100%"}
                            flex={1}
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"start"}
                            marginTop={4}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <label htmlFor="thumbnail">
                                    <Stack
                                        spacing={2}
                                        sx={{
                                            cursor: "pointer",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "200px",
                                            width: "400px",
                                            border: "3px dashed",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {preview.thumbnail ? (
                                            <img
                                                src={preview.thumbnail}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                }}
                                            />
                                        ) : (
                                            <>
                                                <i
                                                    className="icon-circle-plus-regular"
                                                    style={{
                                                        fontSize: "40px",
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={"bold"}
                                                >
                                                    Thumbnail
                                                </Typography>
                                                <Typography variant="h7">
                                                    JPG, PNG (Max 5MB)
                                                </Typography>
                                            </>
                                        )}
                                    </Stack>
                                    {errors.thumbnail && (
                                        <p className="">
                                            {errors.thumbnail.message}
                                        </p>
                                    )}
                                </label>

                                <Box>
                                    <TextField
                                        name={`thumbnail`}
                                        id={`thumbnail`}
                                        {...register("thumbnail", {
                                            required:
                                                "Please enter a thumbnail artist",
                                        })}
                                        type="file"
                                        sx={{
                                            visibility: "hidden",
                                        }}
                                    />
                                </Box>

                                <Stack width={"100%"}>
                                    <TextField
                                        label="Name"
                                        name={`name`}
                                        id={`name`}
                                        {...register("name", {
                                            required:
                                                "Please enter a artist name",
                                        })}
                                    />
                                    {errors.name && (
                                        <p className="">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>

                    <Stack
                        width={"100%"}
                        direction={"row"}
                        spacing={2}
                        sx={{
                            justifyContent: "end",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            onClick={props.setClose}
                            sx={{
                                width: "100px",
                                height: "40px",
                                color: "white",
                                backgroundColor: colors.red[700],
                                ":hover": {
                                    color: "white",
                                    backgroundColor: colors.red[500],
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            sx={{
                                width: "100px",
                                height: "40px",
                                color: "white",
                                backgroundColor: colors.blue[700],
                                ":hover": {
                                    color: "white",
                                    backgroundColor: colors.blue[500],
                                },
                            }}
                        >
                            Save
                        </Button>
                    </Stack>
                </Box>
            )}
        </Modal>
    );
};

export default AddArtistModal;
