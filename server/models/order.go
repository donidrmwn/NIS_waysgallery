package models

import (
	"time"

	"gorm.io/gorm"
)

type Order struct {
	gorm.Model
	ID          int       `json:"id" gorm:"primary_key:auto_increment"`
	VendorID    int       `json:"vendor_id" gorm:"type: int" form:"vendor_id"`
	VendorUser  User      `json:"vendor_user" gorm:"foreignKey:VendorID"`
	ClientID    int       `json:"client_id" gorm:"type: int" form:"client_id"`
	ClientUser  User      `json:"client_user" gorm:"foreignKey:ClientID"`
	Title       string    `json:"title" gorm:"type: varchar(255)" form:"title"`
	StartDate   time.Time `json:"start_date" form:"start_date"`
	EndDate     time.Time `json:"end_date"  form:"end_date"`
	Description string    `json:"description" gorm:"type: varchar(255)" form:"title"`
	Price       int       `json:"price" gorm:"type: int" form:"price"`
	Status      string    `json:"status" gorm:"type: varchar(255)" form:"status"`
	CreatedAt   time.Time `json:"-"`
	UpdatedAt   time.Time `json:"-"`
}
