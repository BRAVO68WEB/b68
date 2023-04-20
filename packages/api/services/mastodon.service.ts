import axiosInstance from '../helpers/axios_client'

export default class MastodonService {
    public getMastodonProfile = async () => {
        const { data } = await axiosInstance.get(
            'https://fosstodon.org/api/v1/accounts/109612266657666903'
        )
        return data
    }

    public getMastodonStatuses = async () => {
        const { data } = await axiosInstance.get(
            'https://fosstodon.org/api/v1/accounts/109612266657666903/statuses',
            {
                timeout: 10000,
            }
        )
        return data
    }
}
