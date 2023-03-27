package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/postgres"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func FollowRoutes(e *echo.Group) {
	followRepository := repositories.RepositoryFollow(postgres.DB)
	h := handlers.HandlerFollow(followRepository)

	e.POST("/follow/:id", middleware.Auth(h.CreateFollow))
	e.DELETE("/follow/:id", middleware.Auth(h.DeleteFollow))
	e.GET("/follow/:id", middleware.Auth(h.GetFollow))
	e.GET("/follow/count-follower", h.GetCountFollower)
	e.GET("/follow/count-following", h.GetCountFollowing)
}
