package followdto

import (
	userdto "waysgallery/dto/user"
	"waysgallery/models"
)

type FollowResponse struct {
	ID           int         `gorm:"type: integer" json:"id"`
	FollowedUser models.User `json:"followed_user" gorm:"foreignKey:FollowedID"`
}

type FollowerResponse struct {
	FollowerID   int                         `json:"follower_id"`
	FollowerUser userdto.UserProfileResponse `json:"follower_user"`
}

type FollowedResponse struct {
	FollowedID   int                         `json:"followed_id"`
	FollowedUser userdto.UserProfileResponse `json:"followed_user"`
}
