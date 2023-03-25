package followdto

import "waysgallery/models"

type FollowResponse struct {
	ID           int         `gorm:"type: integer" json:"id"`
	FollowedUser models.User `json:"followed_user" gorm:"foreignKey:FollowedID"`
}
