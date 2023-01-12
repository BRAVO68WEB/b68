FROM golang:alpine3.16

WORKDIR /app

COPY . .

RUN go get

RUN go build

CMD ["config-store"]

