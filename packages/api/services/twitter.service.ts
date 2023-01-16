import axiosInstance from '../helpers/axios_client'

export default class TwitterService {
    public getSelfUserProfile = async () => {
        const { data } = await axiosInstance.get(
            'https://api.twitter.com/2/users/959990126687342595?user.fields=created_at,public_metrics,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld&expansions=pinned_tweet_id&tweet.fields=attachments,author_id,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld',
            {
                headers: {
                    Authorization: 'Bearer ' + process.env.TWITTER_BEARER_TOKEN,
                },
            }
        )
        return data.data
    }

    public getSelfUserTweets = async () => {
        const { data } = await axiosInstance.get(
            'https://api.twitter.com/2/users/959990126687342595/tweets?max_results=100&tweet.fields=attachments,author_id,conversation_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld',
            {
                headers: {
                    Authorization: 'Bearer ' + process.env.TWITTER_BEARER_TOKEN,
                },
            }
        )
        return data.data
    }
}
