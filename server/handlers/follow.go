package handlers

import (
	"net/http"
	"strconv"
	followdto "waysgallery/dto/follow"
	profiledto "waysgallery/dto/profile"
	dto "waysgallery/dto/result"
	userdto "waysgallery/dto/user"
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
		Data: data,
	})

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
		Data: convertFindFollowerResponse(follow),
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
		Data: convertFindFollowedResponse(follow),
	})
}

func convertFindFollowerResponse(f []models.Follow) []followdto.FollowerResponse {
	var followerResponses []followdto.FollowerResponse
	for _, data := range f {
		followerResponses = append(followerResponses, followdto.FollowerResponse{
			FollowerID: data.FollowerID,
			FollowerUser: userdto.UserProfileResponse{
				Email: data.FollowerUser.Email,
				Profile: profiledto.ProfileResponsePost{
					Name:           data.FollowerUser.Profile.Name,
					ProfilePicture: data.FollowerUser.Profile.ProfilePicture,
				},
			},
		})
	}
	return followerResponses
}

func convertFindFollowedResponse(f []models.Follow) []followdto.FollowedResponse {
	var followedResponses []followdto.FollowedResponse
	for _, data := range f {
		followedResponses = append(followedResponses, followdto.FollowedResponse{
			FollowedID: data.FollowedID,
			FollowedUser: userdto.UserProfileResponse{
				Email: data.FollowedUser.Email,
				Profile: profiledto.ProfileResponsePost{
					Name:           data.FollowedUser.Profile.Name,
					ProfilePicture: data.FollowedUser.Profile.ProfilePicture,
				},
			},
		})
	}
	return followedResponses
}
