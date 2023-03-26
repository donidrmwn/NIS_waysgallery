package models

import "time"

type PhotoProject struct {
	ID           int           `json:"id" gorm:"primary_key:auto_increment"`
	OrderID      int           `json:"order_id" gorm:"type: integer"`
	LineNo       int           `json:"line_no" gorm:"type: integer"`
	PhotoProject string        `json:"photo_project" gorm:"type: varchar(255)"`
	Order        OrderResponse `json:"-" gorm:"foreignKey:OrderID"`
	CreatedAt    time.Time     `json:"-"`
	UpdatedAt    time.Time     `json:"-"`
}

type PhotoProjectResponse struct {
	ID           int    `json:"photo_id" gorm:"type: integer"`
	LineNo       int    `json:"line_no" gorm:"type: integer"`
	PhotoProject string `json:"photo_project" gorm:"type: varchar(255)"`
	OrderID      int    `json:"order_id"`
}

func (PhotoProjectResponse) TableName() string {
	return "photo_projects"
}
