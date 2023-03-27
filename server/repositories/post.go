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
	FindAllPosts(limit int) ([]models.Post, error)
	FindTodayPosts(todayDate time.Time, limit int) ([]models.Post, error)
	FindUserPosts(userID int) ([]models.Post, error)
	GetPost(postID int) (models.Post, error)
	GetPostAuth(postID int, userID int) (models.Post, error)
	FindUserPostsFollowed(userID int, limit int) ([]models.Post, error)
	SearchPost(postName string) ([]models.Post, error)
	GetPostCount(userID int) (int64, error)
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

func (r *repository) FindTodayPosts(todayDate time.Time, limit int) ([]models.Post, error) {
	var posts []models.Post
	err := r.db.Select("id,title,description").Order("created_at desc").Limit(limit).Where("cast( created_at AS DATE) = cast( ? AS DATE) ", todayDate).Preload("Photo", "line_no = 0").Find(&posts).Error
	return posts, err
}

func (r *repository) FindAllPosts(limit int) ([]models.Post, error) {
	var posts []models.Post
	err := r.db.Order("created_at desc").Limit(limit).Preload("Photo", "line_no = 0").Find(&posts).Error
	return posts, err
}

func (r *repository) FindUserPosts(userID int) ([]models.Post, error) {
	var posts []models.Post
	err := r.db.Order("created_at desc").Where("user_id = ?", userID).Preload("Photo", "line_no = 0").Find(&posts).Error
	return posts, err
}

func (r *repository) SearchPost(postName string) ([]models.Post, error) {
	var posts []models.Post
	searchPostName := postName + "%"
	err := r.db.Order("created_at desc").Where("title ilike ?", searchPostName).Preload("Photo", "line_no = 0").Find(&posts).Error
	return posts, err
}

func (r *repository) FindUserPostsFollowed(userID int, limit int) ([]models.Post, error) {
	var posts []models.Post
	followedId := r.db.Select("followed_id").Where("follower_id = ? AND deleted_at IS NULL", userID).Table("follows")

	err := r.db.Order("created_at desc").Limit(limit).Where("user_id in (?)", followedId).Preload("Photo", "line_no = 0").Find(&posts).Error
	return posts, err
}

func (r *repository) GetPost(postID int) (models.Post, error) {
	var post models.Post
	err := r.db.Preload("Photo").Preload("User.Profile").First(&post, postID).Error
	return post, err
}

func (r *repository) GetPostAuth(postID int, userID int) (models.Post, error) {
	var post models.Post
	err := r.db.Preload("Photo").First(&post, "id = ? and user_id = ?", postID, userID).Error
	return post, err
}

func (r *repository) GetPostCount(userID int) (int64, error) {
	var countPost int64
	var post models.Post
	err := r.db.Model(&post).Where("user_id = ? and deleted_at is null", userID).Count(&countPost).Error
	return countPost, err
}
