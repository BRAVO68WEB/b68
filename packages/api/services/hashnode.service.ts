import axiosInstance from '../helpers/axios_client'

export default class HashnodeService {
    public getHashnodeProfile = async () => {
        const query = `
            query {
                user(username: "bravo68web") {
                    name
                    username
                    tagline
                    dateJoined
                    socialMedia {
                        twitter
                        github
                        stackoverflow
                        linkedin
                        google
                        website
                        facebook
                    }
                    numFollowing
                    numFollowers
                    location
                    photo
                    coverImage
                    publicationDomain
                    numPosts
                    numReactions
                    publication {
                        author
                        domain
                        title
                        logo
                        metaHTML
                        description
                        links {
                            website
                            github
                            hashnode
                        }
                    }
                    blogHandle
                }
            }
        `

        const { data } = await axiosInstance.post(
            'https://api.hashnode.com/',
            {
                query,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${process.env.HASHNODE_API_KEY}`,
                },
            }
        )
        return data.data.user
    }
}
