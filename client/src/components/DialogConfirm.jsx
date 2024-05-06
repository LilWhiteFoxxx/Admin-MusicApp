const DialogConfirm = (props) => {
    const handleClose = () => {
        setOpenDialog(false);
    };

    return (
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
                    <Button variant="contained" onClick={handleDelSongs}>
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
    );
};

export default DialogConfirm;
