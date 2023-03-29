package handlers

import (
	"context"
	"net/http"
	"os"
	"strconv"
	"time"
	orderdto "waysgallery/dto/order"
	photoprojectdto "waysgallery/dto/photo_project"
	profiledto "waysgallery/dto/profile"
	dto "waysgallery/dto/result"
	userdto "waysgallery/dto/user"
	"waysgallery/models"
	"waysgallery/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerOrder struct {
	OrderRepository        repositories.OrderRepository
	PhotoProjectRepository repositories.PhotoProjectRepository
}

func HandlerOrder(
	OrderRepository repositories.OrderRepository,
	PhotoProjectRepository repositories.PhotoProjectRepository,
) *handlerOrder {
	return &handlerOrder{
		OrderRepository,
		PhotoProjectRepository,
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
	price, _ := strconv.Atoi(c.FormValue("price"))
	request := orderdto.CreateOrderRequest{
		VendorID:    VendorID,
		ClientID:    int(UserID),
		Title:       c.FormValue("title"),
		Price:       price,
		StartDate:   startDateFormatted,
		EndDate:     endDateFormatted,
		Description: c.FormValue("description"),
		Status:      "waiting",
	}

	order := models.Order{
		VendorID:    VendorID,
		ClientID:    int(UserID),
		Title:       request.Title,
		Price:       request.Price,
		StartDate:   request.StartDate,
		EndDate:     request.EndDate,
		Description: request.Description,
		Status:      request.Status,
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

func (h *handlerOrder) FindOrder(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)

	orders, err := h.OrderRepository.FindOrder(int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertOrderResponse(orders),
	})
}

func (h *handlerOrder) FindOffer(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)

	offers, err := h.OrderRepository.FindOffer(int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertOfferResponse(offers),
	})
}

func (h *handlerOrder) UpdateOfferStatus(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	request := new(orderdto.UpdateOrderRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	order, err := h.OrderRepository.GetOffer(ID, int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	if request.Status != "" {
		order.Status = request.Status
	}

	data, err := h.OrderRepository.UpdateOrder(order)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: data,
	})

}

func (h *handlerOrder) UpdateOrderStatus(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	request := new(orderdto.UpdateOrderRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	order, err := h.OrderRepository.GetOrder(ID, int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	if request.Status != "" {
		order.Status = request.Status
	}

	data, err := h.OrderRepository.UpdateOrder(order)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: data,
	})

}

func (h *handlerOrder) SendProject(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)

	order, err := h.OrderRepository.GetOffer(ID, int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	request := orderdto.UpdateOrderRequest{
		DescriptionProject: c.FormValue("description_project"),
		Status:             "finished",
	}

	if request.DescriptionProject != "" {
		order.DescriptionProject = request.DescriptionProject
	}

	if request.Status != "" {
		order.Status = request.Status
	}
	orderData, err := h.OrderRepository.UpdateOrder(order)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	var arrImage = [4]string{"main_image", "image_2", "image_3", "image_4"}
	for idx, data := range arrImage {
		image := c.Get(data).(string)

		if data == "main_image" && image == "" {
			return c.JSON(http.StatusBadRequest, dto.ErrorResult{
				Code:    http.StatusBadRequest,
				Message: "Main image must be included",
			})
		}

		var urlCloudinary string = ""
		if image != "" {
			resp, _ := cld.Upload.Upload(ctx, image, uploader.UploadParams{Folder: "waysgallery"})
			urlCloudinary = resp.SecureURL
		}
		photoRequest := photoprojectdto.CreatePhotoProjectRequest{
			OrderID:      orderData.ID,
			LineNo:       idx,
			PhotoProject: urlCloudinary,
		}
		photo_project := models.PhotoProject{
			OrderID:      photoRequest.OrderID,
			LineNo:       photoRequest.LineNo,
			PhotoProject: photoRequest.PhotoProject,
		}
		h.PhotoProjectRepository.CreatePhotoProject(photo_project)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: orderData,
	})
}

func (h *handlerOrder) GetFinishedProject(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	order, err := h.OrderRepository.GetFinishedProject(ID, int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: order,
	})

}

func convertOrderResponse(o []models.Order) []orderdto.OrderResponse {
	var orderResponse []orderdto.OrderResponse
	for _, data := range o {
		orderResponse = append(orderResponse, orderdto.OrderResponse{
			ID:       data.ID,
			VendorID: data.VendorID,
			Title:    data.Title,
			VendorUser: userdto.UserProfileResponse{
				Email: data.VendorUser.Email,
				Profile: profiledto.ProfileResponsePost{
					Name:           data.VendorUser.Profile.Name,
					ProfilePicture: data.VendorUser.Profile.ProfilePicture,
				},
			},
			StartDate:    data.StartDate,
			EndDate:      data.EndDate,
			Price:        data.Price,
			Status:       data.Status,
			PhotoProject: data.PhotoProject,
		})
	}
	return orderResponse
}

func convertOfferResponse(o []models.Order) []orderdto.OfferResponse {
	var offerResponse []orderdto.OfferResponse
	for _, data := range o {
		offerResponse = append(offerResponse, orderdto.OfferResponse{
			ID:       data.ID,
			ClientID: data.ClientID,
			Title:    data.Title,
			ClientUser: userdto.UserProfileResponse{
				Email: data.ClientUser.Email,
				Profile: profiledto.ProfileResponsePost{
					Name:           data.ClientUser.Profile.Name,
					ProfilePicture: data.ClientUser.Profile.ProfilePicture,
				},
			},
			StartDate:    data.StartDate,
			EndDate:      data.EndDate,
			Price:        data.Price,
			Status:       data.Status,
			PhotoProject: data.PhotoProject,
		})
	}
	return offerResponse
}
