package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type FollowRepository interface {
	CreateFollow(follow models.Follow) (models.Follow, error)
	DeleteFollow(follow models.Follow, ID int) (models.Follow, error)
	GetFollow(followerID int, followedID int) (models.Follow, error)
}

func RepositoryFollow(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateFollow(follow models.Follow) (models.Follow, error) {
	err := r.db.Create(&follow).Error
	return follow, err
}

func (r *repository) DeleteFollow(follow models.Follow, ID int) (models.Follow, error) {
	err := r.db.Delete(&follow, ID).Error
	return follow, err
}

func (r *repository) GetFollow(followerID int, followedID int) (models.Follow, error) {
	var follow models.Follow
	err := r.db.Preload("FollowedUser").First(&follow, "follower_id = ? and followed_id = ?", followerID, followedID).Error
	return follow, err
}
