import {Octokit} from "@octokit/rest";

const octokit = new Octokit();

const loadUser = async username => {
    const { data : user } = await octokit
        .rest
        .users
        .getByUsername({ username });

    return user;
}

const fetchUserRepos = async username => {
    const params = {
        username,
        sort: 'updated_at',
        direction: 'desc',
        per_page: 100
    };
    const { data : repos } = await octokit
        .rest
        .repos
        .listForUser(params)

    return repos;
}

export default { loadUser, fetchUserRepos };
