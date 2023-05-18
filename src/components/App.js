import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import './App.css';

import { useNavigate } from 'react-router-dom';

import React, { Component } from "react";
import InjectHook from "./InjectHook";

class App extends Component {

    constructor(props) {
        super(props);
        this.navigate = this.props.hook.useNavigate;
    }

    handleSubmit (event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const username = data.get('githubUsername').trim();

        if (!username)
            return;

        this.navigate(`/${username}`);
    }

    render() {
        return (
            <Container className="main-container">
                <Container className="mt-5">
                    <Container className="form-container p-5 mb-4 bg-light rounded-3">
                        <span>Enter GitHub username</span>
                        <div className="content">
                            <Form autoComplete="off" onSubmit={(event) => this.handleSubmit(event)}>
                                <Row className="justify-content-md-center mb-3">
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            name={'githubUsername'}
                                            type="text"
                                            placeholder={'Please enter GitHub username'}
                                            aria-label={'Please enter GitHub username'}
                                        />
                                        <Button type={"submit"} variant="outline-secondary">Submit</Button>
                                    </InputGroup>
                                </Row>
                            </Form>
                        </div>
                    </Container>
                </Container>
            </Container>
        );
    }
}

export default InjectHook(App, useNavigate);
