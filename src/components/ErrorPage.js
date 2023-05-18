import {useRouteError} from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import React, { Component } from "react";
import InjectHook from "./InjectHook";
import Container from "react-bootstrap/Container";

class ErrorPage extends Component {
    render() {
        const error = this.props.hook.useRouteError;

        return (
            <Container id="error-page" className="mt-3">
                <h1>Oops!</h1>
                <Alert key="danger" variant="danger">
                    Seems user {this.props.user} not available, {' '}
                    <Alert.Link href="/">Go Back</Alert.Link>{' '}
                    and try another.
                </Alert>
                <p>
                    <span>Response error message: </span>
                    <i>{error.statusText || error.message}</i>
                </p>
            </Container>
        );
    }
}

export default InjectHook(ErrorPage, useRouteError);
