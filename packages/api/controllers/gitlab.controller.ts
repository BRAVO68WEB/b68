import GitLabService from '../services/gitlab.service'
import { Request, Response } from 'express'
import { makeResponse } from '../libs'

export default class GitLabController extends GitLabService {
    public fetchSelfGitLabUser = async (_req: Request, res: Response) => {
        try {
            const user = await this.getGitLabUser()
            res.status(200).json(makeResponse(user))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGitLabUserRepos = async (_req: Request, res: Response) => {
        try {
            const username = 4419151
            const repos = await this.getGitLabUserRepos(username)
            res.status(200).json(makeResponse(repos))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGitLabUserGists = async (_req: Request, res: Response) => {
        try {
            const gists = await this.getGitlabUserSnippets()
            res.status(200).json(makeResponse(gists))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGitLabUserFollowers = async (
        _req: Request,
        res: Response
    ) => {
        try {
            const username = 4419151
            const followers = await this.getGitLabUserFollowers(username)
            res.status(200).json(makeResponse(followers))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGitLabUserFollowing = async (
        _req: Request,
        res: Response
    ) => {
        try {
            const username = 4419151
            const following = await this.getGitLabUserFollowing(username)
            res.status(200).json(makeResponse(following))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGitLabUserStarred = async (
        _req: Request,
        res: Response
    ) => {
        try {
            const username = 4419151
            const starred = await this.getGitLabUserStarred(username)
            res.status(200).json(makeResponse(starred))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGitLabUserEvents = async (_req: Request, res: Response) => {
        try {
            const events = await this.getGitLabUserEvents()
            res.status(200).json(makeResponse(events))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }
}
