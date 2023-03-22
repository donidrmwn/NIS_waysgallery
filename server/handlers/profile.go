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

func (h *handlerProfile) UpdateProfileBestArt(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	userLogin := c.Get("userLogin")
	userID := userLogin.(jwt.MapClaims)["id"].(float64)
	dataFile := c.Get("dataFile").(string)

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "waysgallery"})
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	request := profiledto.UpdateProfileRequest{
		BestArt: resp.SecureURL,
	}

	profile, err := h.ProfileRepository.GetProfileByUserID(int(userID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
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

func (h *handlerProfile) UpdateProfile(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	userLogin := c.Get("userLogin")
	userID := userLogin.(jwt.MapClaims)["id"].(float64)
	profile_picture := c.Get("profile_picture").(string)
	best_art := c.Get("best_art").(string)

	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	resp, err := cld.Upload.Upload(ctx, profile_picture, uploader.UploadParams{Folder: "waysgallery"})
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	resp2, err := cld.Upload.Upload(ctx, best_art, uploader.UploadParams{Folder: "waysgallery"})
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	request := profiledto.UpdateProfileRequest{
		Name:           c.FormValue("name"),
		Greeting:       c.FormValue("greeting"),
		ProfilePicture: resp.SecureURL,
		BestArt:        resp2.SecureURL,
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
