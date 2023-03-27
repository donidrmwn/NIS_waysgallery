package models

import (
	"time"

	"gorm.io/gorm"
)

type Follow struct {
	gorm.Model
	ID           int         `json:"id" gorm:"primary_key:auto_increment"`
	FollowerID   int         `json:"follower_id" gorm:"type: int" form:"follower_id"`
	FollowerUser UserProfile `json:"follower_user"  gorm:"foreignKey:FollowerID"`
	FollowedID   int         `json:"followed_id" gorm:"type: int" form:"followed_id"`
	FollowedUser UserProfile `json:"followed_user" gorm:"foreignKey:FollowedID"`
	CreatedAt    time.Time   `json:"-"`
	UpdatedAt    time.Time   `json:"-"`
}

type FollowResponse struct {
	FollowerID int `json:"follower_id"`
	FollowedID int `json:"followed_id"`
}
