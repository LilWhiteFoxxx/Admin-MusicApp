// components
import Spring from "@components/Spring";
import SubmenuTrigger from "@ui/SubmenuTrigger";
import RatingStars from "@ui/RatingStars";
import { NavLink } from "react-router-dom";
import DrawerBase from "@ui/DrawerBase";
import { useState } from "react";
import EditArtist from "./EditArtist";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteArtistAction } from "../redux/asyncAction/artistAction";
import { toast } from "react-toastify";
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
import Loader from "./Loader";

const ArtistsGridItem = ({ product, index, isSlide }) => {
    const Wrapper = isSlide ? "div" : Spring;
    const wrapperProps = isSlide ? {} : { type: "slideUp", index };
    const [editArtist, setEditArtist] = useState(false);
    const [editArtistItem, setEditArtistItem] = useState(false);
    const dispatch = useDispatch();
    const pending = useSelector((state) => state.artist.isPending);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleEditArtist = (e) => {
        console.log(product);
        setEditArtist(true);
        setEditArtistItem(product);
    };

    const handleDelete = async () => {
        setOpenDialog(false);

        const deteleArtist = await dispatch(deleteArtistAction(product.id));
        if (deteleArtist.meta.requestStatus === "fulfilled") {
            setEditArtist(false);
            toast.success(deteleArtist.payload.messgae, {
                data: {
                    title: "Success toast",
                    text: deteleArtist.payload.messgae,
                },
                // onClose: () => window.location.reload(),
            });
        }

        if (deteleArtist.meta.requestStatus === "rejected") {
            toast.error(deteleArtist.error.messgae, {
                data: {
                    title: "Error toast",
                    text: "Loi roi dcmm",
                },
            });
        }
        console.log(deteleArtist);
    };

    return (
        <>
            <Modal open={pending} onClose={!pending}>
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            </Modal>
            <Wrapper className="card flex flex-col h-[400px]" {...wrapperProps}>
                <DrawerBase
                    open={editArtist}
                    anchor="right"
                    onClose={!editArtist}
                    width={500}
                >
                    <EditArtist
                        setESong={() => setEditArtist(false)}
                        data={product}
                    />
                </DrawerBase>
                <div className="flex items-start gap-[14px] mb-2.5 h-[200px]">
                    <div className="h-[200px] w-[200px] img-wrapper flex flex-1 items-center justify-center">
                        <img src={product.avatar_url} alt={product.name} />
                    </div>
                </div>
                <NavLink
                    className={`h6 !leading-[1.4] block max-w-[180px] transition hover:text-accent h-[50px] ${
                        isSlide ? "mb-3" : ""
                    }`}
                    to="/product-editor"
                >
                    {product.name}
                </NavLink>
                {isSlide && <RatingStars rating={product.rating} />}
                <div
                    className={`flex flex-col flex-1 ${
                        isSlide ? "gap-1 mt-1.5" : "gap-2.5 mt-2.5"
                    }`}
                >
                    {/* <p className="font-heading font-bold text-sm leading-[1.4] text-green">
                    Available : {product.in_stock || 0}
                </p>
                <p className="font-heading font-bold text-sm leading-[1.4] text-accent">
                    Already sold : {product.sold || 0}
                </p> */}
                    {!isSlide && (
                        <>
                            <p className="font-heading font-bold text-sm leading-[1.4]">
                                Regular price : ${product.regular_price || 0}
                            </p>
                            <p className="font-heading font-bold text-sm leading-[1.4]">
                                Sale price : ${product.sale_price || 0}
                            </p>
                        </>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-4">
                    <div
                        className="btn btn--outline blue !text-sm"
                        onClick={handleEditArtist}
                    >
                        <i className="icon icon-pen-solid text-xs" /> Edit
                    </div>
                    <>
                        <button
                            className="btn btn--outline red !text-sm"
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
                                        onClick={handleDelete}
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
                    </>
                </div>
            </Wrapper>
        </>
    );
};

export default ArtistsGridItem;
