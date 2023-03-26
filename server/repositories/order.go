package repositories

import (
	"waysgallery/models"

	"gorm.io/gorm"
)

type OrderRepository interface {
	CreateOrder(order models.Order) (models.Order, error)
	FindOrder(userID int) ([]models.Order, error)
	FindOffer(userID int) ([]models.Order, error)
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
