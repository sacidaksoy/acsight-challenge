import { NotFound, Login, Providers } from "../pages";

const routes = [
    {
        title: "Login",
        path: "/",
        exact: true,
        element: <Login />,
        children: []
    },
    {
        title: "Providers",
        path: "/providers",
        exact: true,
        element: <Providers />,
        children: []
    },
    {
        title: "Not Found",
        path: "*",
        exact: true,
        element: <NotFound />,
        children: []
    }
];

export default routes;