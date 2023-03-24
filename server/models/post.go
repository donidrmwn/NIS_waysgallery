package models

import (
	"time"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	ID          int             `json:"id" gorm:"primary_key:auto_incremenet"`
	UserID      int             `json:"user_id" gorm:"type: int" form:"user_id"`
	User        User            `json:"user" gorm:"foreignKey:UserID"`
	Title       string          `json:"title" gorm:"type: varchar(255)"`
	Photo       []PhotoResponse `json:"photos"`
	Description string          `json:"description" gorm:"type: varchar(255)"`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

type PostResponse struct {
	ID int `json:"-"`
}

func (PostResponse) TableName() string {
	return "posts"
}
