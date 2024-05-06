import request from "@utils/request";

export const createNewSong = async ({
    name,
    thumbnail,
    path,
    lyrics,
    duration,
    release_date,
    artist_id,
}) => {
    const newSong = await request.post("/admin/song", {
        name,
        thumbnail: thumbnail,
        path,
        lyrics,
        duration: Number(duration),
        release_date: release_date,
        artist_id: Number(artist_id),
    });

    return newSong;
};

export const deleteSongById = async (song_id) => {
    const deleteSong = await request.delete(`/admin/song/${song_id}`);
    return deleteSong;
};

export const updateSongById = async ({
    song_id,
    name,
    thumbnail,
    path,
    lyrics,
    duration,
    release_date,
}) => {
    const updateSong = await request.put(`/admin/song/${Number(song_id)}`, {
        name,
        thumbnail,
        path,
        lyrics,
        duration: Number(duration),
        release_date: "2023-08-01T00:00:00Z",
        created_at: "2024-04-02T14:28:49.267458Z",
        updated_at: null,
    });
    return updateSong;
};

export const getAllSong = async ({ limit, offset }) => {
    try {
        console.log(limit, offset);
        const songs = await request.get("/admin/song");

        return songs.data;
    } catch (error) {
        return error;
    }
};
