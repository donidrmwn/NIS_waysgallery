package profiledto

import "waysgallery/models"

type ProfileResponse struct {
	Name           string              `json:"name" gorm:"type: varchar(255)"`
	Greeting       string              `json:"greeting" gorm:"type: varchar(255)"`
	ProfilePicture string              `json:"profile_picture" gorm:"type: varchar(255)"`
	BestArt        string              `json:"best_art" gorm:"type: varchar(255)"`
	User           models.UserResponse `json:"user" gorm:"foreignKey:UserID"`
	UserID         int                 `json:"user_id" gorm:"type: integer"`
}

type ProfileResponsePost struct {
	Name           string `json:"name"`
	ProfilePicture string `json:"profile_picture"`
}
