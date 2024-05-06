// components
import AlbumsGridItem from "@components/AlbumsGridItem";
import AddAlbumModal from "@components/AddAlbumModal";
import Pagination from "@ui/Pagination";

// hooks
import { useState, useEffect } from "react";
import usePagination from "@hooks/usePagination";

// constants
import { PRODUCT_CATEGORIES, PRODUCT_SORT_OPTIONS } from "@constants/options";

// utils
import { sortProducts } from "@utils/helpers";

// data placeholder
// import albums from "@db/albums";
import { getAllAlbum } from "../api/album_api";
import { useSelector } from "react-redux";

const AlbumItemsGrid = () => {
    const options = PRODUCT_CATEGORIES.filter(
        (option) => option.value !== "all"
    );
    const [category, setCategory] = useState(options[0]);
    const [sort, setSort] = useState(PRODUCT_SORT_OPTIONS[0]);
    const [modal, setModal] = useState(false);
    const [albums, setAlbums] = useState([]);
    const pending = useSelector((state) => state.album.isPending);

    useEffect(() => {
        (async function () {
            const getAlbums = await getAllAlbum({ limit: 10, offset: 0 });
            console.log(getAlbums.data.data);
            setAlbums(getAlbums.data.data);
        })();
    }, [pending]);

    const productsByCategory = albums.filter(
        (product) => product.category === category.value
    );
    const sortedProducts = sortProducts(productsByCategory, sort.value);
    const pagination = usePagination(sortedProducts, 12);
    const handleAddNewSong = () => {
        setModal(true);
    };

    useEffect(() => {
        pagination.goToPage(0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, sort]);

    return (
        <>
            <AddAlbumModal modal={modal} setClose={() => setModal(false)} />
            <div className="grid gap-[26px] lg:grid-cols-4 2xl:grid-cols-6">
                {/* <CategoryHeader category={category.value} /> */}
                <button className="btn btn--primary" onClick={handleAddNewSong}>
                    Add new album <i className="icon-circle-plus-regular" />
                </button>
                <div
                    className="flex flex-col-reverse gap-4 lg:flex-col lg:gap-3 lg:col-start-3 lg:col-end-5
                     2xl:col-start-5 2xl:col-end-7"
                >
                    <span className="lg:text-right">
                        View albums: {pagination.showingOf()}
                    </span>
                    {/* <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-[26px]">
                        <Select
                            value={category}
                            onChange={setCategory}
                            options={options}
                        />
                        <Select
                            value={sort}
                            onChange={setSort}
                            options={PRODUCT_SORT_OPTIONS}
                        />
                    </div> */}
                </div>
            </div>
            <div
                className="grid flex-1 items-start gap-[26px] mt-5 mb-[30px] sm:grid-cols-2 md:grid-cols-3 md:mt-7
                 lg:grid-cols-4 2xl:grid-cols-6"
            >
                {albums.map((album, index) => (
                    <AlbumsGridItem
                        key={index}
                        album={album}
                        index={index}
                        isSlide={"div"}
                    />
                ))}
            </div>
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </>
    );
};

export default AlbumItemsGrid;
