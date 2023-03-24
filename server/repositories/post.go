package repositories

import (
	"time"
	"waysgallery/models"

	"gorm.io/gorm"
)

type PostRepository interface {
	CreatePost(post models.Post) (models.Post, error)
	UpdatePost(post models.Post) (models.Post, error)
	DeletePost(post models.Post, ID int) (models.Post, error)
	FindTodayPosts(todayDate time.Time) ([]models.Post, error)
	FindUserPosts(userID int) ([]models.Post, error)
	GetPost(postID int) (models.Post, error)
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
func (r *repository) FindTodayPosts(todayDate time.Time) ([]models.Post, error) {
	var posts []models.Post
	err := r.db.Select("id,title,description").Limit(10).Order("created_at desc").Where("cast( created_at AS DATE) = cast( ? AS DATE) ", todayDate).Preload("Photo", "line_no = 0").Find(&posts).Error
	return posts, err
}

func (r *repository) FindUserPosts(userID int) ([]models.Post, error) {
	var posts []models.Post
	err := r.db.Order("created_at desc").Where("user_id = ?", userID).Preload("Photo", "line_no = 0").Find(&posts).Error
	return posts, err
}

func (r *repository) GetPost(postID int) (models.Post, error) {
	var post models.Post
	err := r.db.Preload("Photo").Preload("User.Profile").First(&post, postID).Error
	return post, err
}
