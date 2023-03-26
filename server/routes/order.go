package routes

import (
	"waysgallery/handlers"
	"waysgallery/pkg/middleware"
	"waysgallery/pkg/postgres"
	"waysgallery/repositories"

	"github.com/labstack/echo/v4"
)

func OrderRoutes(e *echo.Group) {
	orderRepository := repositories.RepositoryOrder(postgres.DB)
	photoProjectRepository := repositories.RepositoryPhotoProject(postgres.DB)
	h := handlers.HandlerOrder(orderRepository, photoProjectRepository)

	e.POST("/order/:id", middleware.Auth(h.CreateOrder))
	e.GET("/order/my-order", middleware.Auth(h.FindOrder))
	e.GET("/order/my-offer", middleware.Auth(h.FindOffer))
	e.GET("/order/finished-project/:id", middleware.Auth(h.GetFinishedProject))
	e.PATCH("/order/my-offer/:id", middleware.Auth(h.UpdateOfferStatus))
	e.PATCH("/order/my-order/:id", middleware.Auth(h.UpdateOrderStatus))
	e.PATCH("/order/send-project/:id", middleware.Auth(
		middleware.UploadFile(
			middleware.UploadFile(
				middleware.UploadFile(
					middleware.UploadFile(
						h.SendProject, "image_4"), "image_3"), "image_2"), "main_image")))

}
