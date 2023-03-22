package profiledto

type UpdateProfileRequest struct {
	Name           string `json:"name" gorm:"type: varchar(255)"`
	Greeting       string `json:"greeting" gorm:"type: varchar(255)"`
	ProfilePicture string `json:"profile_picture" gorm:"type: varchar(255)"`
	BestArt        string `json:"best_art" gorm:"type: varchar(255)"`
}
