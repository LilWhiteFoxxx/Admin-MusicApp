import request from "../utils/request";

const createNewAlbum = async ({ artist_id, name, release_date, thumbnail }) => {
    console.log("chceks", artist_id, name, release_date, thumbnail);
    const newAlbum = await request.post("/admin/album", {
        name,
        artist_id: Number(artist_id),
        thumbnail,
        release_date: release_date,
    });

    return newAlbum.data;
};

const getAllAlbum = async ({ limit, offset }) => {
    const albums = await request.get("/admin/album");
    return albums.data;
};

const updatedAlbumById = async ({
    album_id,
    artist_id,
    thumbnail,
    name,
    release_date,
    create_at,
}) => {
    const updateAlbum = await request.put(`/admin/album/${Number(album_id)}`, {
        artist_id: Number(artist_id),
        thumbnail,
        name,
        release_date: "2023-08-01T00:00:00Z",
        create_at: "2023-08-01T00:00:00Z",
    });

    return updateAlbum.data;
};

const deleteAlbumById = async (album_id) => {
    const deleteAlbum = await request.delete(`/admin/album/${album_id}`);
    return deleteAlbum.data;
};

export { createNewAlbum, getAllAlbum, updatedAlbumById, deleteAlbumById };
