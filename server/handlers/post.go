package handlers

import (
	"context"
	"net/http"
	"os"
	photodto "waysgallery/dto/photo"
	postdto "waysgallery/dto/post"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerPost struct {
	PostRepository  repositories.PostRepository
	PhotoRepository repositories.PhotoRepository
}

func HandlerPost(
	PostRepository repositories.PostRepository,
	PhotoRepository repositories.PhotoRepository,
) *handlerPost {
	return &handlerPost{
		PostRepository,
		PhotoRepository,
	}
}

func (h *handlerPost) CreatePost(c echo.Context) error {
	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)

	request := postdto.CreatePostRequest{
		UserID:      int(UserID),
		Title:       c.FormValue("title"),
		Description: c.FormValue("description"),
	}
	post := models.Post{
		UserID:      request.UserID,
		Title:       request.Title,
		Description: request.Description,
	}
	postData, err := h.PostRepository.CreatePost(post)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Error Repository:" + err.Error(),
		})
	}

	var arrImage = [5]string{"main_image", "image_2", "image_3", "image_4", "image_5"}
	for idx, data := range arrImage {
		image := c.Get(data).(string)
		var urlCloudinary string = ""
		if image != "" {
			resp, _ := cld.Upload.Upload(ctx, image, uploader.UploadParams{Folder: "waysgallery"})
			if resp.SecureURL != "" {
				urlCloudinary = resp.SecureURL
			}
		}
		photoRequest := photodto.CreatePhotoRequest{
			PostID: postData.ID,
			LineNo: idx,
			Photo:  urlCloudinary,
		}
		photo := models.Photo{
			PostID: photoRequest.PostID,
			LineNo: photoRequest.LineNo,
			Photo:  photoRequest.Photo,
		}
		h.PhotoRepository.CreatePhoto(photo)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: postData,
	})
}
