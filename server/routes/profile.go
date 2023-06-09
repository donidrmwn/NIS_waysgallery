package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/postgres"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func ProfileRoutes(e *echo.Group) {
	profileRepository := repositories.RepositoryProfile(postgres.DB)
	h := handlers.HandlerProfile(profileRepository)

	e.GET("/profile/user/:id", h.GetProfileByUserID)
	e.GET("/profile/search", h.SearchProfile)
	e.PATCH("/profile", middleware.Auth(middleware.UploadFile(middleware.UploadFile(h.UpdateProfile, "profile_picture"), "best_art")))
	e.PATCH("/profile/best-art", middleware.Auth(middleware.UploadFile(h.UpdateProfile, "best_art")))
}
