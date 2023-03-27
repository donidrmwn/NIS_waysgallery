package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type FollowRepository interface {
	CreateFollow(follow models.Follow) (models.Follow, error)
	DeleteFollow(follow models.Follow, ID int) (models.Follow, error)
	GetFollow(followerID int, followedID int) (models.Follow, error)
	GetCountFollower(userID int) (int64, error)
	GetCountFollowing(userID int) (int64, error)
	FindFollower(userID int) ([]models.Follow, error)
	FindFollowing(userID int) ([]models.Follow, error)
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

func (r *repository) FindFollower(userID int) ([]models.Follow, error) {
	var follow []models.Follow
	err := r.db.Preload("FollowedUser.Profile").Find(&follow, "followed_id = ?", userID).Error
	return follow, err
}

func (r *repository) FindFollowing(userID int) ([]models.Follow, error) {
	var follow []models.Follow
	//dapetin follower
	err := r.db.Preload("FollowingUser.Profile").Find(&follow, "follower_id = ?", userID).Error
	return follow, err
}

func (r *repository) GetCountFollower(userID int) (int64, error) {
	var countFollower int64
	var follow models.Follow
	err := r.db.Model(&follow).Where("followed_id = ? and deleted_at is null", userID).Count(&countFollower).Error
	return countFollower, err
}

func (r *repository) GetCountFollowing(userID int) (int64, error) {
	var countFollowing int64
	var follow models.Follow
	err := r.db.Model(&follow).Where("follower_id = ? and deleted_at is null", userID).Count(&countFollowing).Error
	return countFollowing, err
}
