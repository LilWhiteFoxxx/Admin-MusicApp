// components
import Spring from "@components/Spring";
import DrawerBase from "@ui/DrawerBase";
import { useState } from "react";
import EditAlbum from "./EditAlbum";
import { deleteAlbumAction } from "../redux/asyncAction/albumAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Modal,
} from "@mui/material";

const AlbumGridItem = ({ album, index, isSlide }) => {
    const dispatch = useDispatch();
    const Wrapper = isSlide ? "div" : Spring;
    const wrapperProps = isSlide ? {} : { type: "slideUp", index };
    const [editAlbum, setEditAlbum] = useState(false);
    const pending = useSelector((state) => state.album.isPending);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };
    console.log(album);

    const handleEditArtist = () => {
        setEditAlbum(true);
    };

    const hanldeDelete = async () => {
        const deteleAlbum = await dispatch(deleteAlbumAction(album.id));
        if (deteleAlbum.meta.requestStatus === "fulfilled") {
            toast.success(deteleAlbum.payload.messgae, {
                data: {
                    title: "Success toast",
                    text: deteleAlbum.payload.messgae,
                },
                // onClose: () => window.location.reload(),
            });
        }

        if (deteleAlbum.meta.requestStatus === "rejected") {
            toast.error(deteleAlbum.error.messgae, {
                data: {
                    title: "Error toast",
                    text: "Loi roi dcmm",
                },
            });
        }
        console.log(deteleAlbum);
    };

    return (
        <>
            <Modal open={pending} onClose={!pending}>
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            </Modal>
            <Wrapper
                className={`bg-zinc-200 flex flex-col h-auto p-2`}
                {...wrapperProps}
            >
                <DrawerBase
                    open={editAlbum}
                    anchor="right"
                    onClose={!editAlbum}
                    width={500}
                >
                    <EditAlbum
                        setEAlbum={() => setEditAlbum(false)}
                        data={album}
                    />
                </DrawerBase>
                <div className="cursor-pointer" onClick={handleEditArtist}>
                    <div className="flex items-start gap-[14px] mb-2.5">
                        <div className="img-wrapper flex flex-1 items-center justify-center h-[200px]">
                            <img src={album.thumbnail} alt={album.name} />
                        </div>
                    </div>
                    {/* <SubmenuTrigger/> */}
                    <div
                        className={`h6 !leading-[1.4] max-w-[180px] transition hover:text-accent flex item-center]${
                            isSlide ? "mb-3" : ""
                        }`}
                    >
                        {album.name}
                    </div>
                </div>
                {/* {isSlide && <RatingStars rating={album.rating} />}
            <div
                className={`flex flex-col flex-1 ${
                    isSlide ? "gap-1 mt-1.5" : "gap-2.5 mt-2.5"
                }`}
            > */}
                {/* <p className="font-heading font-bold text-sm leading-[1.4] text-green">
                    Available : {album.in_stock || 0}
                </p>
                <p className="font-heading font-bold text-sm leading-[1.4] text-accent">
                    Already sold : {album.sold || 0}
                </p> */}
                {/* {!isSlide && (
                    <>
                        <p className="font-heading font-bold text-sm leading-[1.4]">
                            Regular price : ${album.regular_price || 0}
                        </p>
                        <p className="font-heading font-bold text-sm leading-[1.4]">
                            Sale price : ${album.sale_price || 0}
                        </p>
                    </>
                )}
            </div> */}
                <div className="grid gap-1.5 mt-4">
                    {/* <div
                    className="btn btn--outline blue !text-sm"
                    onClick={handleEditArtist}
                >
                    <i className="icon icon-pen-solid text-xs" /> Edit
                </div> */}
                    <button
                        className="btn btn--outline red !text-sm w-full"
                        onClick={() => setOpenDialog(true)}
                    >
                        Delete
                    </button>
                    <Dialog open={openDialog} onClose={handleClose}>
                        <Box width={400}>
                            <DialogTitle className="text-rose-800 text-3xl">
                                Delete
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete it?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    onClick={hanldeDelete}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    autoFocus
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Box>
                    </Dialog>
                </div>
            </Wrapper>
        </>
    );
};

export default AlbumGridItem;
