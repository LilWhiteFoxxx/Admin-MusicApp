// components
import FilterItem from "@ui/FilterItem";
import Select from "@ui/Select";
import StyledTable from "./styles";
import Empty from "@components/Empty";
import Pagination from "@ui/Pagination";
import ProductManagementCollapseItem from "@components/SongManagementCollapseItem";

// hooks
import { useState, useEffect } from "react";
import usePagination from "@hooks/usePagination";
import { useWindowSize } from "react-use";

// constants
import {
    PRODUCT_MANAGEMENT_OPTIONS,
    PRODUCT_CATEGORIES,
    STOCK_STATUS_OPTIONS,
    PRODUCT_TYPE_OPTIONS,
    PRODUCT_SELLER_OPTIONS,
    PRODUCT_ADDITIONAL_OPTIONS,
    PRODUCT_SELECT_OPTIONS,
} from "@constants/options";
import { SONGS_MANAGEMENT_COLUMN_DEFS } from "@constants/columnDefs";

// data placeholder
import songs_management from "@db/songs";
import { collapseClasses } from "@mui/material";
import DrawerBase from "@ui/DrawerBase";
import EditSong from "@components/EditSong";
import * as song_api from "../../api/song_api";
import { useSelector } from "react-redux";

const SongManagementTable = (props) => {
    const defaultFilters = {
        stockStatus: null,
        productCategory: null,
        productSeller: null,
        productType: null,
        additionalOptions: null,
    };

    const pending = useSelector((state) => state.song.isPending);
    const { width } = useWindowSize();
    const [category, setCategory] = useState("all");
    const [filters, setFilters] = useState(defaultFilters);
    const [selectedAction, setSelectedAction] = useState(null);
    const [activeCollapse, setActiveCollapse] = useState("");
    const [editSong, setEditSong] = useState(false);
    const [editSongData, setEditSongData] = useState(false);
    const [deleteSongs, setDeleteSongs] = useState([]);
    //song data
    const [songs, setSongs] = useState([]);

    //func get song data
    const getSongsData = async () => {
        const data = await song_api.getAllSong({ limit: 10, offset: 0 });

        return data;
    };

    useEffect(() => {
        const getData = async () => {
            const result = await getSongsData();

            setSongs(result.data);
        };
        getData();
    }, [pending]);

    const getQty = (category) => {
        if (category === "all") return songs_management.length;
        return songs_management.filter((product) => product.status === category)
            .length;
    };

    const handleFilterSelect = ({ value, label }, name) => {
        setFilters((prevState) => ({
            ...prevState,
            [name]: { label, value },
        }));
    };

    const handleApplyFilters = () => {};

    const handleClearFilters = () => {
        setFilters(defaultFilters);
    };

    const dataByStatus = () => {
        if (category === "all") return songs;
        // return songs_management.filter(
        //     (product) => product.status === category
        // );
    };

    const pagination = usePagination(dataByStatus(), 8);

    // reset active collapse when page or window width changes
    useEffect(() => {
        setActiveCollapse("");
    }, [pagination.currentPage, width]);

    const handleCollapse = (id) => {
        if (activeCollapse === id) {
            setActiveCollapse("");
        } else {
            setActiveCollapse(id);
        }
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows.map((select) => {
                    setDeleteSongs([...deleteSongs, select.id]);

                    // return `${select.id}`;
                }),
                console.log(selectedRowKeys),
                props.delSongs(selectedRowKeys)
            );
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === "Disabled User",
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    // useEffect(() => {
    //     props.delSongs(deleteSongs);
    // }, [deleteSongs]);

    const handleClickSongItem = (record) => {
        console.log("row", record.id);
        setEditSong(true);
        setEditSongData(record);
    };

    return (
        <div className="flex flex-col flex-1">
            <DrawerBase
                open={editSong}
                anchor="right"
                onClose={!editSong}
                width={500}
            >
                <EditSong
                    setESong={() => setEditSong(false)}
                    data={editSongData}
                />
            </DrawerBase>
            {/* <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-header">Songs:</span>
                <div>
                    {PRODUCT_MANAGEMENT_OPTIONS.map((option, index) => (
                        <FilterItem
                            key={`filter-${index}`}
                            text={option.label}
                            qty={getQty(option.value)}
                            value={option.value}
                            active={category}
                            onClick={setCategory}
                        />
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-x-6 xl:grid-cols-6">
                <Select
                    options={STOCK_STATUS_OPTIONS}
                    value={filters.stockStatus}
                    placeholder="Stock Status"
                    onChange={(e) => handleFilterSelect(e, "stockStatus")}
                />
                <Select
                    options={PRODUCT_CATEGORIES}
                    value={filters.productCategory}
                    placeholder="Product Category"
                    onChange={(e) => handleFilterSelect(e, "productCategory")}
                />
                <Select
                    options={PRODUCT_SELLER_OPTIONS}
                    value={filters.productSeller}
                    placeholder="Product Seller"
                    onChange={(e) => handleFilterSelect(e, "productSeller")}
                />
                <Select
                    options={PRODUCT_TYPE_OPTIONS}
                    value={filters.productType}
                    placeholder="Product Type"
                    onChange={(e) => handleFilterSelect(e, "productType")}
                />
                <Select
                    options={PRODUCT_ADDITIONAL_OPTIONS}
                    value={filters.additionalOptions}
                    placeholder="Additional Options"
                    onChange={(e) => handleFilterSelect(e, "additionalOptions")}
                />
                <div className="grid grid-cols-2 gap-3">
                    <button
                        className="btn btn--secondary !gap-[5px]"
                        onClick={handleApplyFilters}
                    >
                        Apply{" "}
                        <i className="icon-chevron-right-regular text-sm" />
                    </button>
                    <button
                        className="btn btn--outline blue !h-[44px]"
                        onClick={handleClearFilters}
                    >
                        Clear
                    </button>
                </div>
            </div> */}
            <div className="flex flex-col-reverse gap-4 mt-4 mb-5 md:flex-row md:justify-between md:items-end md:mt-5 md:mb-6">
                <p>View songs: {pagination.showingOf()}</p>
                <div className="md:min-w-[280px]">
                    <Select
                        options={PRODUCT_SELECT_OPTIONS}
                        value={selectedAction}
                        placeholder="Select Action"
                        onChange={(e) => setSelectedAction(e)}
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-[22px]">
                {width >= 768 ? (
                    <StyledTable
                        columns={SONGS_MANAGEMENT_COLUMN_DEFS}
                        dataSource={pagination.currentItems()}
                        rowKey={(record) => record.id}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => handleClickSongItem(record), // click row
                            };
                        }}
                        locale={{
                            emptyText: <Empty text="No products found" />,
                        }}
                        rowSelection={{
                            type: "checkbox",
                            ...rowSelection,
                        }}
                        pagination={false}
                    />
                ) : (
                    <div className="flex flex-col gap-5">
                        {pagination.currentItems().map((song, index) => (
                            <ProductManagementCollapseItem
                                key={`song-${index}`}
                                product={song}
                                handleCollapse={handleCollapse}
                                activeCollapse={activeCollapse}
                            />
                        ))}
                    </div>
                )}
                {pagination.maxPage > 1 && (
                    <Pagination pagination={pagination} />
                )}
            </div>
        </div>
    );
};

export default SongManagementTable;
