package database

import (
	"fmt"
	"waysgallery/models"
	"waysgallery/pkg/postgres"
)

func RunMigration() {
	err := postgres.DB.AutoMigrate(
		&models.User{},
		&models.Profile{},
		&models.Photo{},
		&models.PhotoProject{},
		&models.Post{},
		&models.Follow{},
		&models.Order{},
	)

	if err != nil {
		fmt.Println(err)
		panic("Migration failed")
	}

	fmt.Println("Migration success")
}
