import { colors } from "@mui/material";

const ROUTES = [
    {
        name: "Dashboard",
        icon: "rectangle-history-circle-user-regular",
        path: "/",
    },
    {
        name: "Song &  Related",
        icon: "boxes-stacked-regular",
        links: [
            { name: "Songs", path: "/songs-management" },
            { name: "Artists", path: "/artists-grid" },
            { name: "Categories", path: "/categories-management" },
            { name: "Album", path: "/albums-grid" },
            { name: "Playlists", path: "/banners" },
        ],
    },
    // {
    //     name: "Accounts",
    //     icon: "cart-shopping-regular",
    //     path: "/orders",
    // },
    {
        name: "Employees",
        icon: "chart-simple-regular",
        path: "/statistics",
    },
    {
        name: "Roles",
        icon: "star-half-stroke-solid",
        path: "/reviews",
    },
    {
        name: "Analytics",
        icon: "chart-user-regular",
        path: "/customers",
    },
    {
        name: "Create Account",
        icon: "chart-user-regular",
        path: "/customers",
    },
    {
        name: "Settings",
        icon: "gear-regular",
        path: "/settings",
        // links: [
        //   { name: "General Settings", path: "/general-settings" },
        //   { name: "Connected Apps", path: "/connected-apps" },
        // ],
    },
    {
        name: "Logout",
        icon: "chart-user-regular",
        path: "/customers",
        color: colors.red[500],
    },
];

export default ROUTES;
