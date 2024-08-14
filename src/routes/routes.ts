import React from "react";
import config from "../config";
import Favourite from "../pages/Favourite/Favourite";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Search from "../pages/Search/Search";
import Detail from "../pages/Detail/Detail";
import Oops from "../pages/Oops/Oops";

interface PublicRouter {
    path: string
    component: React.FC
}

const PublicRoutes: PublicRouter[] = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.favourite, component: Favourite},
    { path: config.routes.profile, component: Profile},
    { path: config.routes.oops, component: Oops},
]

const PrivateRoutes: PublicRouter[] = []

export { PublicRoutes, PrivateRoutes }