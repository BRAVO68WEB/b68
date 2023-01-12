import axios from '../helpers/axios_client'
import { configKeys } from '../'

const config = configKeys

export default class Github {
    public getGithubUser = async () => {
        const { data } = await axios.get(`https://api.github.com/user`, {
            headers: {
                Authorization: `token ${config.GH_TOKEN}`,
            },
        })
        return data
    }

    public getGithubUserRepos = async (username: string) => {
        const { data } = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            {
                headers: {
                    Authorization: `token ${process.env.GH_TOKEN}`,
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
                    Authorization: `token ${process.env.GH_TOKEN}`,
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
                    Authorization: `token ${process.env.GH_TOKEN}`,
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
                    Authorization: `token ${process.env.GH_TOKEN}`,
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
                    Authorization: `token ${process.env.GH_TOKEN}`,
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
                    Authorization: `token ${process.env.GH_TOKEN}`,
                },
            }
        )
        return data
    }
}
