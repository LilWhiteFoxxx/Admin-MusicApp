import { Box, Stack, TextField, Typography } from "@mui/material";
import { fileToBase64 } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateSongByIdAction } from "../redux/asyncAction/songAction";
import { uploadImage } from "@utils/uploadImage";
import Loader from "./Loader";

const EditSong = (props) => {
    const item = props.data;
    const dispatch = useDispatch();
    const pending = useSelector((state) => state.song.isPending);
    const [preview, setPreview] = useState({
        image: null,
    });
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "a",
            duration: "a",
            path: "a",
            lyrics: "a",
            thumbnail: "a",
        },
    });

    useEffect(() => {
        reset({
            name: item.name,
            duration: item.duration,
            path: item.path,
            lyrics: item.lyrics,
            thumbnail: item.thumbnail,
        });
    }, [item]);

    // console.log(item);
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
        data.thumbnail = preview.image ? preview.image : data.thumbnail;
        data.song_id = item.id;
        console.log(data);
        const updateData = await dispatch(updateSongByIdAction(data));
        // console.log(updateData);
        if (updateData.meta.requestStatus === "fulfilled") {
            props.setESong(false);
            toast.success(updateData.payload.data.messgae, {
                data: {
                    title: "Success toast",
                    text: updateData.payload.data.message,
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
        <>
            {pending ? (
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mt-3 p-2">
                        <h5>Edit Song</h5>
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
                        </Box>

                        {/* <div className="h-[240px] w-[240px] border-dashed border-2 border-gray rounded-[50%] flex justify-center items-center">
                    <img
                        src={item.thumbnail}
                        className=" rounded-[50%] p-2 h-[240px] w-[240px]"
                    />
                </div> */}

                        <Stack
                            spacing={3}
                            className="mt-10 w-full pl-[40px] pr-[40px]"
                        >
                            <Box>
                                <TextField
                                    label={"Name"}
                                    className="w-full"
                                    id="name"
                                    name="name"
                                    {...register("name", {
                                        required: "Please enter song name",
                                    })}
                                />
                                {errors.name && (
                                    <p className="">{errors.name.message}</p>
                                )}
                            </Box>

                            <Box>
                                <TextField
                                    label={"duration"}
                                    className="w-full"
                                    id="duration"
                                    name="duration"
                                    {...register("duration", {
                                        required: "Please enter artist name",
                                    })}
                                />
                                {errors.duration && (
                                    <p className="">
                                        {errors.duration.message}
                                    </p>
                                )}
                            </Box>
                            <Box>
                                <TextField
                                    label={"path"}
                                    className="w-full"
                                    id="path"
                                    name="path"
                                    {...register("path", {
                                        required: "Please enter path song",
                                    })}
                                />
                                {errors.path && (
                                    <p className="">{errors.path.message}</p>
                                )}
                            </Box>
                            <Box>
                                <TextField
                                    label={"Lyrics"}
                                    className="w-full"
                                    id="lyrics"
                                    name="lyrics"
                                    {...register("lyrics", {
                                        required: "Please enter lyric song",
                                    })}
                                />
                                {errors.lyrics && (
                                    <p className="text-red-600">
                                        {errors.lyrics.message}
                                    </p>
                                )}
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
            )}
        </>
    );
};

export default EditSong;
