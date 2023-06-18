import { Router } from 'express'
import GitlabController from '../../controllers/gitlab.controller'

const router = Router()
const {
    fetchSelfGitLabUser,
    fetchSelfGitLabUserEvents,
    fetchSelfGitLabUserFollowers,
    fetchSelfGitLabUserFollowing,
    fetchSelfGitLabUserGists,
    fetchSelfGitLabUserRepos,
    fetchSelfGitLabUserStarred,
} = new GitlabController()

router.get('/user', fetchSelfGitLabUser)
router.get('/events', fetchSelfGitLabUserEvents)
router.get('/followers', fetchSelfGitLabUserFollowers)
router.get('/following', fetchSelfGitLabUserFollowing)
router.get('/gists', fetchSelfGitLabUserGists)
router.get('/repos', fetchSelfGitLabUserRepos)
router.get('/starred', fetchSelfGitLabUserStarred)

export default router
