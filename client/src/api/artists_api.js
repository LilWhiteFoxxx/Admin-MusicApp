import request from "@utils/request";

export const getAllAtrists = async ({ limit, offset }) => {
    console.log(limit, offset);
    const artists = await request.get("/admin/artists?search=");
    console.log(artists.data.data.data);
    return artists.data.data;
};

export const createAtrists = async ({ name, thumbnail }) => {
    console.log(name, thumbnail);
    const newArtist = await request.post("/admin/artists", {
        name: name,
        avatar_url: thumbnail,
    });

    return newArtist.data;
};

export const updateArtistById = async ({ name, avatar_url, artist_id }) => {
    const updateArtist = await request.put(`/admin/artists/${artist_id}`, {
        name: name,
        avatar_url: avatar_url,
    });

    return updateArtist.data;
};

export const deleteArtistById = async (artist_id) => {
    const deleteArtist = await request.delete(`/admin/artists/${artist_id}`);

    return deleteArtist.data;
};
