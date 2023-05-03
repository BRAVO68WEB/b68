import fs from 'fs'
import mmdb, { CityResponse } from 'mmdb-lib'

const db = fs.readFileSync('GeoLite2-City.mmdb')

export default new mmdb.Reader<CityResponse>(db)
