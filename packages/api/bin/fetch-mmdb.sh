#!/bin/bash

# API_KEY="PIiA7448yJCk23aO"
# URL="https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=$API_KEY&suffix=tar.gz"
URL="https://download.db-ip.com/free/dbip-city-lite-2023-05.mmdb.gz"
wget -O "GeoLite2-City.gz" "$URL"

# unzip gz file
gzip -d GeoLite2-City.gz


mv GeoLite2-City "GeoLite2-City.mmdb"

rm -rf GeoLite2-City.gz
echo "Done!!"