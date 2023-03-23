package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type PostRepository interface {
	CreatePost(post models.Post) (models.Post, error)
	UpdatePost(post models.Post) (models.Post, error)
	DeletePost(post models.Post, ID int) (models.Post, error)
}

func RepositoryPost(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreatePost(post models.Post) (models.Post, error) {
	err := r.db.Create(&post).Error
	return post, err
}

func (r *repository) UpdatePost(post models.Post) (models.Post, error) {
	err := r.db.Save(&post).Error
	return post, err
}

func (r *repository) DeletePost(post models.Post, ID int) (models.Post, error) {
	err := r.db.Delete(&post, ID).Error
	return post, err
}

func (r *repository) GetLatestPostIDByUserID(userID int) (models.Post, error) {
	var post models.Post
	err := r.db.Raw("SELECT MAX(id) FROM posts WHERE user_id = ?", userID).Scan(&post).Error
	return post, err
}
