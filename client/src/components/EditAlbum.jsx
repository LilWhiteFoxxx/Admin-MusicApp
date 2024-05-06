import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { fileToBase64 } from "@utils/helpers";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateAlbumAction } from "../redux/asyncAction/albumAction";
import { getAllAtrists } from "../api/artists_api";
import { uploadImage } from "@utils/uploadImage";

const EditAlbum = (props) => {
    console.log(props.data);
    const dispatch = useDispatch();
    const item = props.data;
    const [artists, setArtists] = useState([]);
    const [preview, setPreview] = useState({
        image: null,
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "a",
            artist_id: 0,
            thumbnail: "a",
        },
    });

    useEffect(() => {
        console.log(item.artist_id);
        reset({
            name: item.name,
            artist_id: Number(item.artist_id),
            thumbnail: item.thumbnail,
        });
    }, [item]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllAtrists({ limit: 10, offset: 0 });
            console.log(result.data[0]);
            console.log("jcaiujwod");
            setArtists(result.data);
            const artistOjb = result.data.find(
                (el) => el.id === item.artist_id
            );
            setValue("artist_id", artistOjb.id);
        };
        fetchData();
    }, []);

    const handlePreview = async (file) => {
        const toBase64 = await fileToBase64(file);
        const formData = new FormData();
        if (toBase64) formData.append("file", toBase64);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const urlImage = await uploadImage(formData);
        console.log(urlImage);
        setPreview((prev) => ({ ...prev, thumbnail: urlImage }));
    };

    console.log(preview);

    useEffect(() => {
        if (watch("thumbnail")) {
            console.log("check preview");
            handlePreview(watch("thumbnail")[0]);
        }
    }, [watch("thumbnail")]);

    const onSubmit = async (data) => {
        props.setEAlbum();
        console.log("dataaa", data);
        data.thumbnail = preview.thumbnail ? preview.thumbnail : data.thumbnail;
        data.album_id = item.id;
        const updateData = await dispatch(updateAlbumAction(data));
        console.log(updateData);
        if (updateData.meta.requestStatus === "fulfilled") {
            console.log("check");
            toast.success(updateData.payload.messgae, {
                data: {
                    title: "Success toast",
                    text: updateData.payload.message,
                },
                // onClose: () => window.location.reload(),
            });
        }

        if (updateData.meta.requestStatus === "rejected") {
            toast.error(updateData.error.message, {
                data: {
                    title: "Error toast",
                    text: "Loi roi dcmm",
                },
            });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mt-3 p-2">
                <h5>Edit Album</h5>
                <button
                    className="text-accent text-lg transition hover:text-red"
                    onClick={() => props.setESong()}
                    aria-label="Close messages panel"
                >
                    <i className="icon-circle-xmark-regular" />
                </button>
            </div>
            <Box
                className="flex flex-col justify-center items-center mt-4"
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <label htmlFor="thumbnail">
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
                                <div className="h-[240px] w-[240px] border-dashed border-2 border-gray rounded-[50%] flex justify-center items-center">
                                    <img
                                        src={item.thumbnail}
                                        className=" rounded-[50%] p-2 h-[240px] w-[240px]"
                                    />
                                </div>
                            </>
                        )}
                    </Stack>
                </label>

                <TextField
                    name={`thumbnail`}
                    id={`thumbnail`}
                    {...register("thumbnail")}
                    type="file"
                    sx={{
                        visibility: "hidden",
                    }}
                />

                <Stack spacing={4} className="mt-10 w-full pl-[40px] pr-[40px]">
                    <Box>
                        <TextField
                            label={"Name"}
                            className="w-full"
                            id="name"
                            name="name"
                            {...register("name")}
                        />
                        {errors.name && (
                            <p className="">{errors.name.message}</p>
                        )}
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Artists
                            </InputLabel>
                            <Controller
                                name="artist_id"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        placeholder="Artists"
                                        label="Artists"
                                        name={`artist_id`}
                                        id={`artist_id`}
                                        {...register("artist_id")}
                                    >
                                        {artists.map((artist) => (
                                            <MenuItem
                                                key={artist.id}
                                                value={artist.id}
                                            >
                                                {artist.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    </Box>
                </Stack>
                <button
                    className="btn btn--primary w-full mt-5 md:w-fit md:px-[70px]"
                    type="submit"
                >
                    Update information
                </button>
            </Box>
        </div>
    );
};

export default EditAlbum;
