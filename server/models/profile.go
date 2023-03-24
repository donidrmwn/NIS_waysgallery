package models

import (
	"time"

	"gorm.io/gorm"
)

type Profile struct {
	gorm.Model
	ID             int          `json:"id" gorm:"primary_key:auto_increment"`
	Name           string       `json:"name" gorm:"type: varchar(255)"`
	Greeting       string       `json:"greeting" gorm:"type: varchar(255)"`
	ProfilePicture string       `json:"profile_picture" gorm:"type: varchar(255)"`
	BestArt        string       `json:"best_art" gorm:"type: varchar(255)"`
	User           UserResponse `json:"-" gorm:"foreignKey:UserID"`
	UserID         int          `json:"user_id" gorm:"type: int" form:"user_id"`
	CreatedAt      time.Time    `json:"-"`
	UpdatedAt      time.Time    `json:"-"`
}

type ProfileResponse struct {
	Name           string       `json:"name" gorm:"type: varchar(255)"`
	Greeting       string       `json:"greeting" gorm:"type: varchar(255)"`
	ProfilePicture string       `json:"profile_picture" gorm:"type: varchar(255)"`
	BestArt        string       `json:"best_art" gorm:"type:varcbar(255)"`
	UserID         string       `json:"-" `
	User           UserResponse `json:"-" gorm:"foreignKey:UserID"`
}

func (ProfileResponse) TableName() string {
	return "profiles"
}
