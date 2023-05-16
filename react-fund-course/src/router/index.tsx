import { RouteObject } from "react-router-dom";
import About from "../pages/About";
import PostPage from "../pages/PostPage";
import Posts from "../pages/Posts";

export const routesConfig : RouteObject[] = [
    {
        path: '/',
        element: <Posts />,
        children: [
            {path: '/about', element: <About />},
            {path: '/posts', element: <Posts />},
            {path: '/posts/:id', element: <PostPage />}
    ]}];