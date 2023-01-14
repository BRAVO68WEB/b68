package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/basicauth"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"

	"github.com/joho/godotenv"
)

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func main() {

	godotenv.Load()

	app := fiber.New(
		fiber.Config{
			ServerHeader: "Fiber",
			ProxyHeader:  "X-Real-IP",
			AppName:      "B68 Config Store",
		},
	)

	app.Use(logger.New())

	app.Use("/public", filesystem.New(filesystem.Config{
		Root:   http.Dir("./public"),
		Browse: true,
		MaxAge: 3600,
	}))

	app.Get("/metrics", monitor.New(monitor.Config{
		Title:      "Config Store Metrics",
		Refresh:    3 * time.Second,
		APIOnly:    false,
		Next:       nil,
		CustomHead: "Config Store Metrics",
	}))

	envUsername := goDotEnvVariable("BASIC_USERNAME")
	envPassword := goDotEnvVariable("BASIC_PASSWORD")

	app.Use("/private", basicauth.New(basicauth.Config{
		Authorizer: func(username, password string) bool {
			if username == envUsername && password == envPassword {
				return true
			}
			return false
		},
	}))

	app.Static("/private", "private")

	port := goDotEnvVariable("CS_PORT")
	if port == "" {
		port = "3000"
	}

	log.Printf("Listening on port %s", port)
	log.Fatal(app.Listen(fmt.Sprintf(":%s", port)))
}
