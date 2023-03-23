package handlers

import (
	"context"
	"net/http"
	"os"
	profiledto "waysgallery/dto/profile"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(
	ProfileRepository repositories.ProfileRepository,
) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func convertResponseProfile(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		Name:           u.Name,
		Greeting:       u.Greeting,
		ProfilePicture: u.ProfilePicture,
		BestArt:        u.BestArt,
		User:           u.User,
	}
}

func (h *handlerProfile) GetProfileByUserID(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	profile, err := h.ProfileRepository.GetProfileByUserID(int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertResponseProfile(profile),
	})
}

func (h *handlerProfile) UpdateProfile(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	userLogin := c.Get("userLogin")
	userID := userLogin.(jwt.MapClaims)["id"].(float64)
	var urlProfilePicture = ""
	var urlBestArt = ""
	var arrImage = [2]string{"profile_picture", "best_art"}
	for idx, data := range arrImage {
		image := c.Get(data).(string)
		var urlCloudinary string = ""
		if image != "" {
			resp, _ := cld.Upload.Upload(ctx, image, uploader.UploadParams{Folder: "waysgallery"})
			urlCloudinary = resp.SecureURL
		}
		switch idx {
		case 0:
			urlProfilePicture = urlCloudinary
		case 1:
			urlBestArt = urlCloudinary
		}
	}

	request := profiledto.UpdateProfileRequest{
		Name:           c.FormValue("name"),
		Greeting:       c.FormValue("greeting"),
		ProfilePicture: urlProfilePicture,
		BestArt:        urlBestArt,
	}

	profile, err := h.ProfileRepository.GetProfileByUserID(int(userID))

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	if request.Name != "" {
		profile.Name = request.Name
	}
	if request.Greeting != "" {
		profile.Greeting = request.Greeting
	}

	if request.ProfilePicture != "" {
		profile.ProfilePicture = request.ProfilePicture
	}
	if request.BestArt != "" {
		profile.BestArt = request.BestArt
	}

	data, err := h.ProfileRepository.UpdateProfile(profile)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertResponseProfile(data),
	})
}
