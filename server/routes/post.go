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

	e.GET("/post/user/:id", h.FindUserPosts)
	e.GET("/post/today", h.FindTodayPosts)
	e.GET("/post/all", h.FindAllPosts)
	e.GET("/post/followed", middleware.Auth(h.FindUserPostsFollowed))
	e.GET("/post/:id", h.GetPost)
	e.GET("/post/test/:id", h.GetPosttest)
	e.GET("/post/search", h.SearchPost)
	e.GET("/post/count/:id", h.GetPostCount)
	e.POST("/post/user", middleware.Auth(
		middleware.UploadFile(
			middleware.UploadFile(
				middleware.UploadFile(
					middleware.UploadFile(
						h.CreatePost, "image_4"), "image_3"), "image_2"), "main_image")))

	e.PATCH("/post/user/:id", middleware.Auth(
		middleware.UploadFile(
			middleware.UploadFile(
				middleware.UploadFile(
					middleware.UploadFile(
						h.UpdatePost, "image_4"), "image_3"), "image_2"), "main_image")))
}
