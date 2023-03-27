package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID        int             `json:"id" gorm:"primary_key:auto_increment"`
	Email     string          `json:"email" gorm:"type: varchar(255)"`
	Password  string          `json:"password" gorm:"type: varchar(255)"`
	Profile   ProfileResponse `json:"profile"`
	CreatedAt time.Time       `json:"-"`
	UpdatedAt time.Time       `json:"-"`
}

type UserResponse struct {
	ID    int    `json:"-"`
	Email string `json:"email"`
}

type UserProfile struct {
	ID      int             `json:"-"`
	Profile ProfileResponse `json:"profile"`
}

func (UserResponse) TableName() string {
	return "users"
}
