import React, { Component } from "react";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

class ReposList extends Component {
    constructor(props) {
        super(props);
        const repos = props.repos || [];
        this.listItems = repos.map((item) =>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={item.id.toString()}
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">
                        <a
                            href={item.html_url}
                            target={"_blank"}
                            rel="noopener noreferrer"
                        >{item.full_name}</a>
                    </div>

                    <Badge className="me-1" bg="primary">
                        {item.language}
                    </Badge>
                    {item.fork && <i>Fork</i>}
                    <div className="description-text text-truncate">
                        {item.description}
                    </div>
                    <Badge className="me-1" pill bg="success">
                        Stars {item.stargazers_count}
                    </Badge>
                    <Badge className="" pill bg="success">
                        Forks {item.forks_count}
                    </Badge>
                </div>
            </ListGroup.Item>
        );
    }

    render() {
        return (
            <ListGroup as="ol">
                {this.listItems}
            </ListGroup>
        );
    }
}

export default ReposList;
