package orderdto

import "time"

type CreateOrderRequest struct {
	VendorID    int       `json:"vendor_id" gorm:"type: int" form:"vendor_id"`
	ClientID    int       `json:"client_id" gorm:"type: int" form:"client_id"`
	Title       string    `json:"title" gorm:"type: varchar(255)" form:"title"`
	StartDate   time.Time `json:"start_date" form:"start_date"`
	EndDate     time.Time `json:"end_date" form:"end_date"`
	Description string    `json:"description" gorm:"type: varchar(255)" form:"title"`
	Price       int       `json:"price" gorm:"type: int" form:"price"`
	Status      string    `json:"status" gorm:"type: varchar(255)" form:"status"`
}

type UpdateOrderRequest struct {
	Title              string    `json:"title" gorm:"type: varchar(255)" form:"title"`
	StartDate          time.Time `json:"start_date" gorm:"type: date" form:"start_date"`
	EndDate            time.Time `json:"end_date" gorm:"type: date" form:"end_date"`
	Description        string    `json:"description" gorm:"type: varchar(255)" form:"description_project"`
	DescriptionProject string    `json:"description_project" gorm:"type: varchar(255)" form:"description_project"`
	Price              int       `json:"price" gorm:"type: int" form:"price"`
	Status             string    `json:"status" gorm:"type: varchar(255)" form:"status"`
}
