package handlers

import (
	"log"
	"net/http"
	"time"
	authdto "waysgallery/dto/auth"
	dto "waysgallery/dto/result"
	"waysgallery/models"
	"waysgallery/pkg/bcrypt"
	jwtToken "waysgallery/pkg/jwt"
	"waysgallery/repositories"

	"github.com/go-playground/validator"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository    repositories.AuthRepository
	ProfileRepository repositories.ProfileRepository
}

func HandlerAuth(AuthRepository repositories.AuthRepository, ProfileRepository repositories.ProfileRepository) *handlerAuth {
	return &handlerAuth{
		AuthRepository,
		ProfileRepository,
	}
}

func convertRegisterResponse(u models.User) authdto.RegisterResponse {
	return authdto.RegisterResponse{
		Email: u.Email,
	}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(authdto.AuthRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	user := models.User{
		Email:    request.Email,
		Password: password,
	}

	data, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		})
	}

	profile := models.Profile{
		UserID:         data.ID,
		Name:           request.Name,
		ProfilePicture: "https://res.cloudinary.com/dumbwaysb44/image/upload/v1679579483/waysgallery/profile_izywsv.png",
	}
	h.ProfileRepository.CreateProfile(profile)

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: convertRegisterResponse(data),
	})
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(authdto.LoginRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	user := models.User{
		Email:    request.Email,
		Password: request.Password,
	}

	user, err := h.AuthRepository.Login(user.Email)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: err.Error(),
		})
	}

	isValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !isValid {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{
			Code:    http.StatusBadRequest,
			Message: "Wrong email or password",
		})
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	token, errGenerateToken := jwtToken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := authdto.LoginResponse{
		ID:    user.ID,
		Email: user.Email,
		Token: token,
	}

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: loginResponse,
	})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)

	user, _ := h.AuthRepository.CheckAuth(int(userId))

	return c.JSON(http.StatusOK, dto.SuccessResult{
		Code: http.StatusOK,
		Data: user,
	})
}
