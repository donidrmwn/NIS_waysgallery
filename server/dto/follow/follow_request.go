package followdto

type CreateFollowRequest struct {
	FollowerID int `json:"follower_id" gorm:"type: int" form:"follower_id"`
	FollowedID int `json:"followed_id" gorm:"type: int" form:"followed_id"`
}
