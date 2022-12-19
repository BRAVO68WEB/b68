import axios from '../helpers/axios_client'

export const getGithubUser = async (username: string) => {
    const { data } = await axios.get(`https://api.github.com/users/${username}`)
    return data
}

export const getGithubUserRepos = async (username: string) => {
    const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos`
    )
    return data
}

export const getGithubUserGists = async (username: string) => {
    const { data } = await axios.get(
        `https://api.github.com/users/${username}/gists`
    )
    return data
}

export const getGithubUserFollowers = async (username: string) => {
    const { data } = await axios.get(
        `https://api.github.com/users/${username}/followers`
    )
    return data
}

export const getGithubUserFollowing = async (username: string) => {
    const { data } = await axios.get(
        `https://api.github.com/users/${username}/following`
    )
    return data
}

export const getGithubUserStarred = async (username: string) => {
    const { data } = await axios.get(
        `https://api.github.com/users/${username}/starred`
    )
    return data
}

export const getGithubUserEvents = async (username: string) => {
    const { data } = await axios.get(
        `https://api.github.com/users/${username}/events`
    )
    return data
}
