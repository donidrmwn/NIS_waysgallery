package handlers

import (
	"net/http"
	"strconv"
	followdto "waysgallery/dto/follow"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/repositories"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerFollow struct {
	FollowRepository repositories.FollowRepository
}

func HandlerFollow(
	FollowRepository repositories.FollowRepository,
) *handlerFollow {
	return &handlerFollow{
		FollowRepository,
	}
}

func (h *handlerFollow) CreateFollow(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	followedId := c.Param("id")
	FollowedID, _ := strconv.Atoi(followedId)
	request := followdto.CreateFollowRequest{
		FollowerID: int(UserID),
		FollowedID: FollowedID,
	}

	follow := models.Follow{
		FollowerID: request.FollowerID,
		FollowedID: request.FollowedID,
	}
	data, err := h.FollowRepository.CreateFollow(follow)
	if err != nil {
		return c.JSON(http.StatusOK, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: data,
	})
}

func (h *handlerFollow) GetFollow(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	followedId := c.Param("id")
	FollowedID, _ := strconv.Atoi(followedId)
	follow, _ := h.FollowRepository.GetFollow(int(UserID), FollowedID)

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: follow,
	})

}

func (h *handlerFollow) DeleteFollow(c echo.Context) error {
	userLogin := c.Get("userLogin")
	UserID := userLogin.(jwt.MapClaims)["id"].(float64)
	followedId := c.Param("id")
	FollowedID, _ := strconv.Atoi(followedId)

	follow, err := h.FollowRepository.GetFollow(int(UserID), FollowedID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	data, err := h.FollowRepository.DeleteFollow(follow, follow.ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertResponseFollow(data),
	})

}

func convertResponseFollow(u models.Follow) followdto.FollowResponse {
	return followdto.FollowResponse{
		ID:           u.ID,
		FollowedUser: u.FollowerUser,
	}
}

func (h *handlerFollow) GetCountFollower(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	followerCount, err := h.FollowRepository.GetCountFollower(ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: followerCount,
	})
}

func (h *handlerFollow) GetCountFollowing(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)
	followingCount, err := h.FollowRepository.GetCountFollowing(ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: followingCount,
	})
}

func (h *handlerFollow) FindFollower(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)

	follow, err := h.FollowRepository.FindFollower(ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: follow,
	})
}

func (h *handlerFollow) FindFollowing(c echo.Context) error {
	id := c.Param("id")
	ID, _ := strconv.Atoi(id)

	follow, err := h.FollowRepository.FindFollowing(ID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}
	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: follow,
	})
}
