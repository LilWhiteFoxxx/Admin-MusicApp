import { Box, Stack, TextField } from "@mui/material";
import { fileToBase64 } from "@utils/helpers";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateArtistAction } from "../redux/asyncAction/artistAction";
import Loader from "./Loader";
import { uploadImage } from "@utils/uploadImage";

const EditArtist = (props) => {
    console.log(props.data);
    const dispatch = useDispatch();
    const item = props.data;
    const pending = useSelector((state) => state.artist.isPending);
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
            name: "",
            avatar_url: "",
        },
    });

    useEffect(() => {
        reset({
            name: item.name,
            avatar_url: item.avatar_url,
        });
    }, [item]);

    const handlePreview = async (file) => {
        const toBase64 = await fileToBase64(file);
        const formData = new FormData();
        if (toBase64) formData.append("file", toBase64);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const urlImage = await uploadImage(formData);
        setPreview((prev) => ({ ...prev, avatar_url: urlImage }));
        console.log(
            `id: ${item.id}: preview: ${preview.avatar_url}: name: ${item.name}`
        );
    };

    useEffect(() => {
        if (watch("avatar_url")) {
            console.log("check preview", item.name);
            handlePreview(watch("avatar_url")[0]);
        }
    }, [watch("avatar_url")]);

    const onSubmit = async (data) => {
        props.setESong();
        console.log("dataaa", data);
        data.avatar_url = preview.avatar_url
            ? preview.avatar_url
            : data.avatar_url;
        data.artist_id = item.id;
        const updateData = await dispatch(updateArtistAction(data));
        console.log(updateData);
        if (updateData.meta.requestStatus === "fulfilled") {
            toast.success(updateData.payload.messgae, {
                data: {
                    title: "Success toast",
                    text: updateData.payload.message,
                },
                // onClose: () => window.location.reload(),
            });
            reset();
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
                        <h5>Edit Artist</h5>
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
                        <label
                            htmlFor="avatar_url"
                            onClick={() => console.log(item.id)}
                        >
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
                                {preview.avatar_url ? (
                                    <img
                                        src={preview.avatar_url}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                ) : (
                                    <>
                                        <div className="h-[240px] w-[240px] border-dashed border-2 border-gray rounded-[50%] flex justify-center items-center">
                                            <img
                                                src={item.avatar_url}
                                                className=" rounded-[50%] p-2 h-[240px] w-[240px]"
                                            />
                                        </div>
                                    </>
                                )}
                            </Stack>
                        </label>

                        <TextField
                            name={`avatar_url`}
                            id={`avatar_url`}
                            {...register("avatar_url")}
                            type="file"
                            sx={{
                                visibility: "hidden",
                            }}
                        />

                        <Stack className="mt-10 w-full pl-[40px] pr-[40px]">
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

export default EditArtist;
