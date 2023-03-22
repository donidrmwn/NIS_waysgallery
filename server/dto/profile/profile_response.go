package profiledto

import "waysgallery/models"

type ProfileResponse struct {
	Name           string              `json:"name" gorm:"type: varchar(255)"`
	Greeting       string              `json:"greeting" gorm:"type: varchar(255)"`
	ProfilePicture string              `json:"profile_picture" gorm:"type: varchar(255)"`
	User           models.UserResponse `json:"user" gorm:"foreignKey:UserID"`
}
