package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	CreateProfile(Profile models.Profile) (models.Profile, error)
	GetProfileByUserID(UserID int) (models.Profile, error)
	UpdateProfile(Profile models.Profile) (models.Profile, error)
	SearchProfile(profileName string) ([]models.Profile, error)
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
	err := r.db.Preload("User").Preload("User.").First(&profile, "user_id = ?", userID).Error
	return profile, err
}

func (r *repository) UpdateProfile(profile models.Profile) (models.Profile, error) {
	err := r.db.Save(&profile).Error
	return profile, err
}

func (r *repository) SearchProfile(profileName string) ([]models.Profile, error) {
	var profiles []models.Profile
	searchProfileName := "%" + profileName
	err := r.db.Where("name ilike ?", searchProfileName, searchProfileName).Preload("User").Find(&profiles).Error
	return profiles, err
}
