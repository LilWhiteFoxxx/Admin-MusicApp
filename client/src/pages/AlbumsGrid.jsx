// components
import PageHeader from "@layout/PageHeader";
import AlbumItemsGrid from "@widgets/AlbumItemGrid";

const AlbumsGrid = () => {
    return (
        <>
            <PageHeader title="Albums Management" />
            <AlbumItemsGrid />
        </>
    );
};

export default AlbumsGrid;
