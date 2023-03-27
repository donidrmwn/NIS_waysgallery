package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"time"
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

func (h *handlerPost) UpdatePost(c echo.Context) error {

	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)

	post, err := h.PostRepository.GetPostAuth(ID, int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	request := postdto.UpdatePostRequest{
		Title:       c.FormValue("title"),
		Description: c.FormValue("description"),
	}

	if request.Title != "" {
		post.Title = request.Title
	}

	if request.Description != "" {
		post.Description = request.Description
	}

	postData, err := h.PostRepository.UpdatePost(post)
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
		photo, _ := h.PhotoRepository.GetPhoto(idx, ID)
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

		photoRequest := photodto.UpdatePhotoRequest{
			Photo: urlCloudinary,
		}

		photo.Photo = photoRequest.Photo

		h.PhotoRepository.UpdatePhoto(photo)
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: postData,
	})
}

func (h *handlerPost) SearchPost(c echo.Context) error {
	postName := c.QueryParam("post_name")
	posts, err := h.PostRepository.SearchPost(postName)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: posts,
	})
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
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Error Repository:" + err.Error(),
		})
	}

	var arrImage = [4]string{"main_image", "image_2", "image_3", "image_4"}
	for idx, data := range arrImage {
		image := c.Get(data).(string)

		if data == "main_image" && image == "" {
			h.PostRepository.DeletePost(postData, postData.ID)
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

func (h *handlerPost) FindAllPosts(c echo.Context) error {
	limit := c.QueryParam("limit")
	Limit, _ := strconv.Atoi(limit)
	posts, err := h.PostRepository.FindAllPosts(Limit)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: posts,
	})
}

func (h *handlerPost) FindUserPostsFollowed(c echo.Context) error {
	limit := c.QueryParam("limit")
	Limit, _ := strconv.Atoi(limit)
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	posts, err := h.PostRepository.FindUserPostsFollowed(int(UserID), Limit)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: posts,
	})
}

func (h *handlerPost) FindTodayPosts(c echo.Context) error {
	now := time.Now()
	limit := c.QueryParam("limit")
	Limit, _ := strconv.Atoi(limit)
	fmt.Println(now.Round(0))
	posts, err := h.PostRepository.FindTodayPosts(now.Round(0), Limit)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: posts,
	})
}
func (h *handlerPost) FindUserPosts(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	posts, err := h.PostRepository.FindUserPosts(ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: posts,
	})
}

func (h *handlerPost) GetPost(c echo.Context) error {
	id := c.Param("id")
	post_id, _ := strconv.Atoi(id)
	post, err := h.PostRepository.GetPost(post_id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: post,
	})
}

func (h *handlerPost) GetPostCount(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	postCount, err := h.PostRepository.GetPostCount(int(UserID))
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: postCount,
	})
}
