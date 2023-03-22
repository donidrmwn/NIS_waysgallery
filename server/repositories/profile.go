package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	CreateProfile(Profile models.Profile) (models.Profile, error)
	GetProfileByUserID(UserID int) (models.Profile, error)
}

func RepositoryProfile(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateProfile(profile models.Profile) (models.Profile, error) {
	err := r.db.Create(&profile).Error
	return profile, err
}

func (r *repository) GetProfileByUserID(userID int) (models.Profile, error) {
	var profile models.Profile
	err := r.db.Preload("User").First(&profile, "user_id = ?", userID).Error
	return profile, err
}
