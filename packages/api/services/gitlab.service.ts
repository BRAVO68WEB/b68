import axios from '../helpers/axios_client'
import { configKeys } from '../'

export default class GitLab {
    public getGitLabUser = async () => {
        const { data } = await axios.get(`https://gitlab.com/api/v4/user`, {
            headers: {
                'PRIVATE-TOKEN': `${configKeys.GITLAB_PAT}`,
            },
        })
        return data
    }

    public getGitLabUserRepos = async (user_id: number) => {
        const { data } = await axios.get(
            `https://gitlab.com/api/v4/users/${user_id}/projects`,
            {
                headers: {
                    'PRIVATE-TOKEN': `${configKeys.GITLAB_PAT}`,
                },
            }
        )
        return data
    }

    public getGitlabUserSnippets = async () => {
        const { data } = await axios.get(`https://gitlab.com/api/v4/snippets`, {
            headers: {
                'PRIVATE-TOKEN': `${configKeys.GITLAB_PAT}`,
            },
        })
        return data
    }

    public getGitLabUserFollowers = async (user_id: number) => {
        const { data } = await axios.get(
            `https://gitlab.com/api/v4/users/${user_id}/followers`,
            {
                headers: {
                    'PRIVATE-TOKEN': `${configKeys.GITLAB_PAT}`,
                },
            }
        )
        return data
    }

    public getGitLabUserFollowing = async (user_id: number) => {
        const { data } = await axios.get(
            `https://gitlab.com/api/v4/users/${user_id}/following`,
            {
                headers: {
                    'PRIVATE-TOKEN': `${configKeys.GITLAB_PAT}`,
                },
            }
        )
        return data
    }

    public getGitLabUserStarred = async (user_id: number) => {
        const { data } = await axios.get(
            `https://gitlab.com/api/v4/users/${user_id}/starred_projects`,
            {
                headers: {
                    'PRIVATE-TOKEN': `${configKeys.GITLAB_PAT}`,
                },
            }
        )
        return data
    }

    public getGitLabUserEvents = async () => {
        const { data } = await axios.get(`https://gitlab.com/api/v4/events`, {
            headers: {
                'PRIVATE-TOKEN': `${configKeys.GITLAB_PAT}`,
            },
        })
        return data
    }
}
