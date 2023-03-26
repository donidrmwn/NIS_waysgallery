package handlers

import (
	"net/http"
	"strconv"
	"time"
	orderdto "waysgallery/dto/order"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/repositories"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerOrder struct {
	OrderRepository repositories.OrderRepository
}

func HandlerOrder(
	OrderRepository repositories.OrderRepository,
) *handlerOrder {
	return &handlerOrder{
		OrderRepository,
	}
}

func (h *handlerOrder) CreateOrder(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	vendorID := c.Param("id")
	VendorID, _ := strconv.Atoi(vendorID)
	startDate := c.FormValue("start_date")
	endDate := c.FormValue("end_date")

	dateFormat := "2006-01-02"
	startDateFormatted, _ := time.Parse(dateFormat, startDate)
	endDateFormatted, _ := time.Parse(dateFormat, endDate)

	request := orderdto.CreateOrderRequest{
		VendorID:    VendorID,
		ClientID:    int(UserID),
		Title:       c.FormValue("title"),
		StartDate:   startDateFormatted,
		EndDate:     endDateFormatted,
		Description: c.FormValue("description"),
	}

	order := models.Order{
		VendorID:    VendorID,
		ClientID:    int(UserID),
		Title:       request.Title,
		StartDate:   request.StartDate,
		EndDate:     request.EndDate,
		Description: request.Description,
	}
	data, err := h.OrderRepository.CreateOrder(order)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: data,
	})
}
