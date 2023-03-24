package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/postgres"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func PostRoutes(e *echo.Group) {
	postRepository := repositories.RepositoryPost(postgres.DB)
	photoRepository := repositories.RepositoryPhoto(postgres.DB)
	h := handlers.HandlerPost(postRepository, photoRepository)

	e.GET("/post/user/:id", middleware.Auth(h.FindUserPosts))
	e.GET("/post/today", h.FindTodayPosts)
	e.GET("/post/:id", h.GetPost)
	e.POST("/post/user", middleware.Auth(
		middleware.UploadFile(
			middleware.UploadFile(
				middleware.UploadFile(
					middleware.UploadFile(
						h.CreatePost, "image_4"), "image_3"), "image_2"), "main_image")))
}
