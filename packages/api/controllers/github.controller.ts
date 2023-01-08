import GithubService from '../services/github.service'
import { Request, Response } from 'express'
import { makeResponse } from '../libs'

export default class GithubController extends GithubService {
    public fetchSelfGithubUser = async (req: Request, res: Response) => {
        try {
            const user = await this.getGithubUser()
            res.status(200).json(makeResponse(user))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGithubUserRepos = async (req: Request, res: Response) => {
        try {
            const username = 'bravo68web'
            const repos = await this.getGithubUserRepos(username)
            res.status(200).json(makeResponse(repos))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGithubUserGists = async (req: Request, res: Response) => {
        try {
            const username = 'bravo68web'
            const gists = await this.getGithubUserGists(username)
            res.status(200).json(makeResponse(gists))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGithubUserFollowers = async (
        req: Request,
        res: Response
    ) => {
        try {
            const username = 'bravo68web'
            const followers = await this.getGithubUserFollowers(username)
            res.status(200).json(makeResponse(followers))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGithubUserFollowing = async (
        req: Request,
        res: Response
    ) => {
        try {
            const username = 'bravo68web'
            const following = await this.getGithubUserFollowing(username)
            res.status(200).json(makeResponse(following))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGithubUserStarred = async (req: Request, res: Response) => {
        try {
            const username = 'bravo68web'
            const starred = await this.getGithubUserStarred(username)
            res.status(200).json(makeResponse(starred))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }

    public fetchSelfGithubUserEvents = async (req: Request, res: Response) => {
        try {
            const username = 'bravo68web'
            const events = await this.getGithubUserEvents(username)
            res.status(200).json(makeResponse(events))
        } catch (error: any) {
            res.status(400).json(
                makeResponse(error.message, {}, 'Failed', true)
            )
        }
    }
}
