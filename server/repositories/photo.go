package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type PhotoRepository interface {
	CreatePhoto(photo models.Photo) (models.Photo, error)
	UpdatePhoto(photo models.Photo) (models.Photo, error)
	GetPhoto(LineNo int, PostID int) (models.Photo, error)
}

func RepositoryPhoto(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreatePhoto(photo models.Photo) (models.Photo, error) {
	err := r.db.Create(&photo).Error
	return photo, err
}

func (r *repository) UpdatePhoto(photo models.Photo) (models.Photo, error) {
	err := r.db.Save(&photo).Error
	return photo, err
}

func (r *repository) GetPhoto(LineNo int, PostID int) (models.Photo, error) {
	var photo models.Photo
	err := r.db.First(&photo, "line_no = ? and post_id = ?", LineNo, PostID).Error
	return photo, err
}
