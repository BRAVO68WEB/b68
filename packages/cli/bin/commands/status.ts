import fetch from 'node-fetch'
import APIURL from '../../api.config.js'

export default () => {
    const url = APIURL + '/health'

    fetch(url).then(async (response) => {
        if (response.status === 200) {
            return console.log(`BRAVO68WEB API is up and running`)
        } else {
            return console.log(`BRAVO68WEB API might be running low`)
        }
    })
}
