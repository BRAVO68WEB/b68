import mmdb_client from '../helpers/mmdb_client'

export default class IPInfo {
    public getIPInfo = async (ip: string) => {
        const data = await mmdb_client.get(ip)
        return data
    }
}
