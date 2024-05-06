import {
    Box,
    Modal,
    Stack,
    TextField,
    Typography,
    // Autocomplete,
    Button,
    colors,
    TextareaAutosize,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { getAllAtrists } from "../api/artists_api";
import { createNewSong } from "../api/song_api";
import { fileToBase64 } from "@utils/helpers";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSongAction } from "../redux/asyncAction/songAction";
import Loader from "./Loader";
import { uploadImage } from "@utils/uploadImage";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const AddSongModal = (props) => {
    const dispatch = useDispatch();
    const [artists, setArtists] = useState([]);
    const [preview, setPreview] = useState({
        image: null,
    });

    const pending = useSelector((state) => state.song.isPending);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        // formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            artist_id: 0,
            path: "",
            duration: 0,
            lyrics: "",
            image: "",
            release_date: "",
        },
    });

    const handlePreview = async (file) => {
        const toBase64 = await fileToBase64(file);
        const formData = new FormData();
        if (toBase64) formData.append("file", toBase64);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const urlImage = await uploadImage(formData);
        setPreview((prev) => ({ ...prev, image: urlImage }));
    };

    useEffect(() => {
        if (watch("image")) {
            handlePreview(watch("image")[0]);
        }
    }, [watch("image")]);

    const setReleaseDate = (date) => {
        const dateData = dayjs(date);
        const indochinaDate = dateData.utcOffset("+0700");
        setValue("release_date", indochinaDate.format());
    };

    const onSubmit = async (data) => {
        console.log(data);

        delete data.thumbnail;
        data.thumbnail = preview.image;
        console.log(data);
        const newSong = await dispatch(createSongAction(data));
        console.log(newSong);

        if (newSong.meta.requestStatus === "fulfilled") {
            toast.success(newSong.payload.data.messgae, {
                data: {
                    title: "Success toast",
                    text: newSong.payload.data.message,
                },
                // onClose: () => window.location.reload(),
            });
            props.setClose();
            setPreview({ image: "" });
            reset();
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

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllAtrists({ limit: 10, offset: 0 });
            console.log(result.data);
            setArtists(result.data);
        };
        fetchData();
    }, []);

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
                        NEW SONG
                    </Typography>
                    <Box
                        sx={{
                            height: "600px",
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
                            <Stack spacing={4} width={"100%"} paddingRight={4}>
                                <TextField
                                    name={`name`}
                                    id={`name`}
                                    {...register("name")}
                                    label="Song name"
                                />
                                <TextField
                                    label="Song path"
                                    name={`path`}
                                    id={`path`}
                                    {...register("path")}
                                />

                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Artists
                                        </InputLabel>
                                        <Select
                                            placeholder="Artists"
                                            label="Artists"
                                            name={`artist_id`}
                                            id={`artist_id`}
                                            {...register("artist_id")}
                                        >
                                            {artists.map((artist) => (
                                                <MenuItem value={artist.id}>
                                                    {artist.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker
                                            label="Release date"
                                            sx={{
                                                width: "100%",
                                            }}
                                            onChange={setReleaseDate}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>

                                <TextField
                                    label="Duration"
                                    name={`duration`}
                                    id={`duration`}
                                    {...register("duration")}
                                />
                                <TextareaAutosize
                                    label="Lyrics"
                                    name={`lyrics`}
                                    id={`lyrics`}
                                    {...register("lyrics")}
                                    placeholder="Min rows 4"
                                    style={{
                                        outline: "none",
                                        border: "1px solid",
                                        borderRadius: "5px",
                                        padding: "10px 20px",
                                        height: "150px",
                                    }}
                                />
                            </Stack>
                            <Box
                                sx={{
                                    width: "400px",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "start",
                                    alignItems: "start",
                                }}
                            >
                                <label htmlFor="image">
                                    <Stack
                                        spacing={2}
                                        sx={{
                                            cursor: "pointer",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "300px",
                                            width: "400px",
                                            border: "3px dashed",
                                            borderRadius: "10px",
                                        }}
                                    >
                                        {preview.image ? (
                                            <img
                                                src={preview.image}
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
                                                    image
                                                </Typography>
                                                <Typography variant="h7">
                                                    JPG, PNG (Max 5MB)
                                                </Typography>
                                            </>
                                        )}
                                    </Stack>
                                </label>

                                <TextField
                                    name={`image`}
                                    id={`image`}
                                    {...register("image")}
                                    type="file"
                                    sx={{
                                        visibility: "hidden",
                                    }}
                                />
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

export default AddSongModal;
