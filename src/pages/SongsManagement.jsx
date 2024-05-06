// components
import AddSongModal from "@components/AddSongModal";
import PageHeader from "@layout/PageHeader";
import Search from "@ui/Search";
import { useState } from "react";
import useDebounce from "@hooks/useDebound";

// import { CSVLink } from "react-csv";
import SongManagementTable from "@widgets/SongManagementTabel";
import { useDispatch, useSelector } from "react-redux";
import { deleteSongByIdAction } from "../redux/asyncAction/songAction";
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
    colors,
} from "@mui/material";
import Loader from "@components/Loader";

const SongsManagement = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [delSongs, setDelSongs] = useState([]);
    const pending = useSelector((state) => state.song.isPending);
    const [openDialog, setOpenDialog] = useState(false);
    // const [search, setSearch] = useState();
    // const devounceValue = useDebounce(search, 800);

    // console.log(devounceValue);
    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleAddNewSong = () => {
        setModal(true);
    };

    const handleDelSongs = async () => {
        // delSongs.map(async (delSong) => {
        setOpenDialog(false);
        const deleteSong = await dispatch(deleteSongByIdAction(delSongs));
        console.log(deleteSong);

        if (deleteSong.meta.requestStatus === "fulfilled") {
            toast.success(deleteSong.payload.data.messgae, {
                data: {
                    title: "Success toast",
                    text: deleteSong.payload.data.message,
                },
                // onClose: () => window.location.reload(),
            });
        }

        if (deleteSong.meta.requestStatus === "rejected") {
            toast.error(deleteSong.error.message, {
                data: {
                    title: "Error toast",
                    text: "Loi roi dcmm",
                },
            });
        }
        // });
    };
    return (
        <>
            <Modal open={pending} onClose={!pending}>
                <div className="w-full h-full flex justify-center items-center">
                    <Loader />
                </div>
            </Modal>
            <AddSongModal modal={modal} setClose={() => setModal(false)} />
            <PageHeader title="Songs Management" />
            <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
                <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
                    <button
                        className="btn btn--primary"
                        onClick={handleAddNewSong}
                    >
                        Add new song <i className="icon-circle-plus-regular" />
                    </button>
                    <>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenDialog(true)}
                            sx={{
                                color: colors.red[700],
                                borderRadius: "50px",
                                border: `1px solid ${colors.red[700]}`,
                                "&:hover": {
                                    border: `1px solid ${colors.red[700]}`,
                                    backgroundColor: colors.red[100],
                                },
                            }}
                            disabled={delSongs.length < 1 ? true : false}
                        >
                            Delete song
                            {/* <i className="icon-circle-plus-regular" /> */}
                        </Button>
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
                                        onClick={handleDelSongs}
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
                    {/* <button className="btn btn--outline size-xl blue !h-[44px]">
            Edit song <i className="icon-circle-plus-regular" />
          </button> */}
                </div>
                <Search
                    wrapperClass="lg:w-[326px]"
                    placeholder="Search Product"
                    // setQuery={(e) => setSearch(e)}
                />
            </div>
            <SongManagementTable delSongs={(data) => setDelSongs(data)} />
        </>
    );
};
// delSongs={(id) => setDelSongs([...delSongs, id])}
export default SongsManagement;
