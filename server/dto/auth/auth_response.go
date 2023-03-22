package authdto

import (
	"waysgallery/models"
)

type LoginResponse struct {
	Email   string         `gorm:"type: varchar(255)" json:"email"`
	Token   string         `gorm:"type: varchar(255)" json:"token"`
	Profile models.Profile `json:"profile"`
}

type RegisterResponse struct {
	Email string `gorm:"type: varchar(255)" json:"email"`
}
