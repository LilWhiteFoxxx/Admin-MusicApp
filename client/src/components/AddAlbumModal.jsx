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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { fileToBase64 } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createArtistAction } from "../redux/asyncAction/artistAction";
import { getAllAtrists } from "../api/artists_api";
import { createAlbumAction } from "../redux/asyncAction/albumAction";
import { uploadImage } from "@utils/uploadImage";
import Loader from "./Loader";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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

const AddAlbumModal = (props) => {
    const dispatch = useDispatch();
    const [artists, setArtists] = useState([]);
    const pending = useSelector((state) => state.album.isPending);

    const setReleaseDate = (date) => {
        const dateData = dayjs(date);
        const indochinaDate = dateData.utcOffset("+0700");
        setValue("release_date", indochinaDate.format());
    };

    const [preview, setPreview] = useState({
        thumbAlnum: null,
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            thumbAlnum: "",
            release_date: "",
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllAtrists({ limit: 10, offset: 0 });
            console.log(result.data);
            console.log("jcaiujwod");
            setArtists(result.data);
        };
        fetchData();
    }, []);

    console.log(preview.thumbAlnum);

    const handlePreview = async (file) => {
        const toBase64 = await fileToBase64(file);
        const formData = new FormData();
        if (toBase64) formData.append("file", toBase64);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const urlImage = await uploadImage(formData);
        setPreview((prev) => ({ ...prev, thumbAlnum: urlImage }));
    };

    useEffect(() => {
        if (watch("thumbAlnum")) {
            handlePreview(watch("thumbAlnum")[0]);
        }
    }, [watch("thumbAlnum")]);

    const onSubmit = async (data) => {
        data.thumbnail = preview.thumbAlnum
            ? preview.thumbAlnum
            : data.thumbAlnum;
        console.log(data);
        const newAlbum = await dispatch(createAlbumAction(data));

        // if(newAlbum.meta)
        console.log(newAlbum);

        if (newAlbum.meta.requestStatus === "fulfilled") {
            props.setClose();
            toast.success(newAlbum.payload.messgae, {
                data: {
                    title: "Success toast",
                    text: newAlbum.payload.message,
                },
                // onClose: () => window.location.reload(),
            });
            reset();
            setPreview({ thumbAlnum: "" });
        }

        if (newAlbum.meta.requestStatus === "rejected") {
            toast.error(newAlbum.error.message, {
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
                        NEW ALBUM
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
                                <label htmlFor="thumbAlnum">
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
                                        {preview.thumbAlnum ? (
                                            <img
                                                src={preview.thumbAlnum}
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
                                                    ThumbAlnum
                                                </Typography>
                                                <Typography variant="h7">
                                                    JPG, PNG (Max 5MB)
                                                </Typography>
                                            </>
                                        )}
                                    </Stack>
                                    {errors.thumbAlnum && (
                                        <p className="">
                                            {errors.thumbAlnum.message}
                                        </p>
                                    )}
                                </label>

                                <Box>
                                    <TextField
                                        name={`thumbAlnum`}
                                        id={`thumbAlnum`}
                                        {...register("thumbAlnum", {
                                            required:
                                                "Please enter a thumbnail artist",
                                        })}
                                        type="file"
                                        sx={{
                                            visibility: "hidden",
                                        }}
                                    />
                                </Box>

                                <Stack spacing={2} width={"100%"}>
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
                                        <DemoContainer
                                            components={["DatePicker"]}
                                        >
                                            <DatePicker
                                                label="Release date"
                                                sx={{
                                                    width: "100%",
                                                }}
                                                onChange={setReleaseDate}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
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

export default AddAlbumModal;
