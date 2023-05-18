import React, { Component } from "react";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class UserInfo extends Component {
    constructor(props) {
        super(props);

        const { user } = props;
        this.user = {
            name: user.name,
            from: user.location,
            login: user.login,
            profileUrl: user.html_url,
            publicRepos: user.public_repos,
            createdAt: user.created_at,
            avatarUrl: user.avatar_url,
            gists: user.public_gists,
            followers: user.followers,
            gistsUrl: `https://gist.github.com/${user.login}`,
            reposUrl: `${user.html_url}?tab=repositories`
        };
    }

    render() {
        let gists = <span>Gists: 0</span>;
        if (this.user.gists) {
            gists =
                <a href={this.user.gistsUrl} target="_blank" rel="noopener noreferrer">
                    Gists: { this.user.gists }
                </a>
        }

        return (
            <Container fluid="sm" >
                <Row className={"row-cols-auto"}>
                    <Col className={"mx-auto mb-1"}>
                        <Image
                            width={260}
                            height={260}
                            src={this.user.avatarUrl}
                            roundedCircle
                            alt="260x260"
                            fluid
                        />
                    </Col>
                    <Col>
                        <Card.Title>{this.user.name}</Card.Title>
                        <a href={this.user.profileUrl} target={"_blank"} rel="noopener noreferrer">{this.user.login}</a>
                        <Card.Text>
                            <span>From {this.user.from}</span>
                            <br/>
                            <i>Since {this.user.createdAt}</i>
                            <br/>
                            {gists}
                            <br/>
                            <span>Followers: {this.user.followers}</span>
                            <br/>
                            <a href={this.user.reposUrl} target="_blank" rel="noopener noreferrer">
                                Public Repos: {this.user.publicRepos}
                            </a>
                        </Card.Text>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default UserInfo;
