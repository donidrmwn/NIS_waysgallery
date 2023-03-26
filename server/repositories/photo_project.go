package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type PhotoProjectRepository interface {
	CreatePhotoProject(photoProject models.PhotoProject) (models.PhotoProject, error)
}

func RepositoryPhotoProject(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreatePhotoProject(photoProject models.PhotoProject) (models.PhotoProject, error) {
	err := r.db.Create(&photoProject).Error
	return photoProject, err
}
