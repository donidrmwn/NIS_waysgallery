package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order models.Order) (models.Order, error)
	FindOrder(userID int) ([]models.Order, error)
	FindOffer(userID int) ([]models.Order, error)
	GetOrder(ID int, userID int) (models.Order, error)
	GetOffer(ID int, userID int) (models.Order, error)
	UpdateOrder(order models.Order) (models.Order, error)
	GetFinishedProject(ID int, userID int) (models.Order, error)
}

func RepositoryOrder(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) CreateOrder(order models.Order) (models.Order, error) {
	err := r.db.Create(&order).Error
	return order, err
}

func (r *repository) FindOrder(userID int) ([]models.Order, error) {
	var order []models.Order
	err := r.db.Order("id desc").Where("client_id = ?", userID).Preload("VendorUser.Profile").Find(&order).Error
	return order, err
}

func (r *repository) FindOffer(userID int) ([]models.Order, error) {
	var order []models.Order
	err := r.db.Order("id desc").Where("vendor_id = ?", userID).Preload("ClientUser.Profile").Find(&order).Error
	return order, err
}

func (r *repository) GetFinishedProject(ID int, userID int) (models.Order, error) {
	var order models.Order
	err := r.db.Where("client_id = ?", userID).Preload("PhotoProject").First(&order, ID).Error
	return order, err
}

func (r *repository) GetOrder(ID int, userID int) (models.Order, error) {
	var order models.Order
	err := r.db.Order("id desc").Where("client_id = ?", userID).First(&order, ID).Error
	return order, err
}

func (r *repository) GetOffer(ID int, userID int) (models.Order, error) {
	var order models.Order
	err := r.db.Order("id desc").Where("vendor_id = ?", userID).First(&order, ID).Error
	return order, err
}

func (r *repository) UpdateOrder(order models.Order) (models.Order, error) {
	err := r.db.Save(&order).Error
	return order, err
}
