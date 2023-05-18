import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import ErrorPage from "./components/ErrorPage";
import App from './components/App';
import Resume from './components/Resume';
import Rest from "./components/Rest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,

    },
    {
        path: "/:username",
        element: <Resume />,
        errorElement: <ErrorPage className={"w-75"}/>,
        loader: async ({ request, params }) => await Rest.loadUser(params.username)
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Navbar variant="dark" bg="dark" expand="lg">
            <Container fluid className={"w-75"}>
                <Navbar.Brand href="/">Main page</Navbar.Brand>
            </Container>
        </Navbar>
        <Container fluid>
            <RouterProvider router={router} />
        </Container>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
