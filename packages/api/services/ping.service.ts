import ping from 'ping'

export default class PingService {
    public async pingHost(host: string) {
        try {
            const response = await ping.promise.probe(host)
            return response
        } catch (error) {
            return error
        }
    }

    public async pingHosts(hosts: string[]) {
        try {
            const response = await Promise.all(
                hosts.map((host) => ping.promise.probe(host))
            )
            return response
        } catch (error) {
            return error
        }
    }

    public async pingHostsParallel(hosts: string[]) {
        try {
            const response = await Promise.all(
                hosts.map((host) =>
                    ping.promise.probe(host, { parallel: true })
                )
            )
            return response
        } catch (error) {
            return error
        }
    }
}
