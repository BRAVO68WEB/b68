import axios from '../helpers/axios_client'

export default class Github {
    public getGithubUser = async () => {
        const { data } = await axios.get(`https://api.github.com/user`, {
            headers: {
                Autherization: `token ${process.env.GH_TOKEN}`,
            },
        })
        return data
    }

    public getGithubUserRepos = async (username: string) => {
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            {
                headers: {
                    Autherization: `token ${process.env.GH_TOKEN}`,
                },
            }
        )
        return data
    }

    public getGithubUserGists = async (username: string) => {
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/gists`,
            {
                headers: {
                    Autherization: `token ${process.env.GH_TOKEN}`,
                },
            }
        )
        return data
    }

    public getGithubUserFollowers = async (username: string) => {
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/followers`,
            {
                headers: {
                    Autherization: `token ${process.env.GH_TOKEN}`,
                },
            }
        )
        return data
    }

    public getGithubUserFollowing = async (username: string) => {
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/following`,
            {
                headers: {
                    Autherization: `token ${process.env.GH_TOKEN}`,
                },
            }
        )
        return data
    }

    public getGithubUserStarred = async (username: string) => {
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/starred`,
            {
                headers: {
                    Autherization: `token ${process.env.GH_TOKEN}`,
                },
            }
        )
        return data
    }

    public getGithubUserEvents = async (username: string) => {
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/events`,
            {
                headers: {
                    Autherization: `token ${process.env.GH_TOKEN}`,
                },
            }
        )
        return data
    }
}
