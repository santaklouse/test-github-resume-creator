import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import { sum, values, round, take } from 'lodash';
import { useLoaderData } from 'react-router-dom';
import PieChart from "./PieChart";
import ReposList from "./ReposList";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './Resume.css';
import Rest from "./Rest";
import UserInfo from "./UserInfo";
import InjectHook from "./InjectHook";

class Resume extends Component {

    async loadRepos (username) {
        let repos = [];
        this.setState({
            isLoaded: false,
            error: false
        });
        try {
            repos = await Rest.fetchUserRepos(username);
        } catch (e) {
            this.setState({
                isLoaded: true,
                error: true
            });
        }
        this.setState({
            isLoaded: false
        });
        return repos;
    }

    calculateLanguagesByPercentage(repos) {
        const languages = {};
        repos.forEach(repo => {
            if (!repo.language)
                return;

            languages[repo.language]
                ? languages[repo.language]++
                : languages[repo.language] = 1
        })

        const totalLanguages = sum(values(languages));
        for (const language in languages) {
            const amount = languages[language];
            languages[language] = round(amount / totalLanguages * 100, 1);
        }
        return languages
    }

    async componentDidMount() {
        const repos = await this.loadRepos(this.user.login)

        const top10Repos = take(repos, 10);
        const languagesByPercentage = this.calculateLanguagesByPercentage(repos);

        this.setState({
            isLoaded: true,
            error: false,
            data: {
                repos: top10Repos,
                languagesByPercentage
            }
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: true,
            error: false,
            data: {}
        };

        this.user = this.props.hook.useLoaderData;
    }

    _buildContainers() {
        const { error, isLoaded, data } = this.state;

        let reposContent, pieChartContent = '';

        let response = {
            reposContent,
            pieChartContent
        };

        // render error if unable to fetch repos
        if (error) {
            response.reposContent =
                <Alert key="danger" variant="danger">
                    Something went wrong =(
                </Alert>
            ;
            return response;
        }

        // render data if it already loaded
        if (isLoaded) {
            response.reposContent =
                <ReposList repos={data.repos} user={this.user} />
            ;
            response.pieChartContent =
                <PieChart data={data.languagesByPercentage} width={400}></PieChart>
            ;
            return response;
        }

        // ... else show loading spinner
        response.reposContent =
            <Container className="my-1 mx-auto loading-container">
                <Spinner animation="grow">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        ;
        response.pieChartContent =
            <Container className="my-1 mx-auto loading-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        ;
        return response;
    }

    render() {
        const {reposContent, pieChartContent} = this._buildContainers();

        return (
            <Container className={"mt-5"}>
                <h1>GitHub User Resume</h1>
                <Card className={"mt-3"}>
                    <Card.Header as="h5">User Information</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col className={"mb-3"}>
                                <UserInfo user={this.user}></UserInfo>
                            </Col>
                            <Col>
                                <Card>
                                    <Card.Header>Most used languages (for last 100 repos)</Card.Header>
                                    <Card.Body>
                                        {pieChartContent}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                <Card className={"mt-3"}>
                    <Card.Header as="h5">Last 10 updated user repositories</Card.Header>
                    <Card.Body>{reposContent}</Card.Body>
                </Card>
            </Container>
        );
    }
}

export default InjectHook(Resume, useLoaderData);
