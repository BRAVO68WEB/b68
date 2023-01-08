import axiosInstance from '../helpers/axios_client'

export default class WakatimeService {
    public getWakatimeStats = async () => {
        const { data } = await axiosInstance.get(
            'https://wakatime.com/api/v1/users/current?api_key=' +
                process.env.WAKATIME_API_KEY
        )
        return data
    }

    public getWakatimeCodeStatesAllTime = async () => {
        const { data } = await axiosInstance.get(
            'https://wakatime.com/api/v1/users/current/all_time_since_today?api_key=' +
                process.env.WAKATIME_API_KEY
        )
        return data
    }

    public getWakatimeCodeStatsLast7Days = async () => {
        let { data } = await axiosInstance.get(
            'https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=' +
                process.env.WAKATIME_API_KEY
        )
        return {
            main: data.categories[0].text,
            avg: data.human_readable_daily_average_including_other_language,
        }
    }

    public getWakatimeLanguageUsageInLast7Days = async () => {
        let { data } = await axiosInstance.get(
            'https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=' +
                process.env.WAKATIME_API_KEY
        )
        return data.languages
    }
}
