// components
import ArtistsGridItem from "@components/ArtistsGridItem";
import Select from "@ui/Select";
import Pagination from "@ui/Pagination";
import CategoryHeader from "@ui/CategoryHeader";

// hooks
import { useState, useEffect } from "react";
import usePagination from "@hooks/usePagination";

// constants
import { PRODUCT_CATEGORIES, PRODUCT_SORT_OPTIONS } from "@constants/options";

// utils
import { sortProducts } from "@utils/helpers";

// data placeholder
// import products from "@db/artists";
import AddArtistModal from "@components/AddArtistModal";
import { getAllAtrists } from "../api/artists_api";
import { useSelector } from "react-redux";

const ItemsGrid = () => {
    const options = PRODUCT_CATEGORIES.filter(
        (option) => option.value !== "all"
    );
    const pending = useSelector((state) => state.artist.isPending);
    const [category, setCategory] = useState(options[0]);
    const [sort, setSort] = useState(PRODUCT_SORT_OPTIONS[0]);
    const [modal, setModal] = useState(false);
    const [artists, setArtists] = useState([]);
    const [preview, setPreview] = useState({
        image: null,
    });

    useEffect(() => {
        const getArtists = async () => {
            const response = await getAllAtrists({ limit: 10, offset: 2 });
            console.log(response.data);
            setArtists(response.data);
        };
        getArtists();
    }, [pending]);
    const productsByCategory = artists.filter(
        (artist) => artist.category === category.value
    );
    console.log(productsByCategory);
    const sortedProducts = sortProducts(productsByCategory, sort.value);
    console.log(sortedProducts);
    const pagination = usePagination(sortedProducts, 12);

    const handleAddNewSong = () => {
        setModal(true);
    };

    console.log(pagination.currentItems());

    useEffect(() => {
        pagination.goToPage(0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, sort]);

    return (
        <>
            <AddArtistModal modal={modal} setClose={() => setModal(false)} />
            <div className="grid gap-[26px] lg:grid-cols-4 2xl:grid-cols-6">
                {/* <CategoryHeader category={category.value} /> */}
                <button className="btn btn--primary" onClick={handleAddNewSong}>
                    Add new artist <i className="icon-circle-plus-regular" />
                </button>
                <div
                    className="flex flex-col-reverse gap-4 lg:flex-col lg:gap-3 lg:col-start-3 lg:col-end-5
                     2xl:col-start-5 2xl:col-end-7"
                >
                    <span className="lg:text-right">
                        View artists: {pagination.showingOf()}
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
                {artists.map((product, index) => (
                    <ArtistsGridItem
                        key={index}
                        product={product}
                        index={index}
                        isSlide={"div"}
                    />
                ))}
            </div>
            {pagination.maxPage > 1 && <Pagination pagination={pagination} />}
        </>
    );
};

export default ItemsGrid;
