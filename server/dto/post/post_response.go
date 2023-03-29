package postdto

import (
	"time"
	userdto "waysgallery/dto/user"
	"waysgallery/models"
)

type PostResponse struct {
	ID          int                  `gorm:"type: integer" json:"id"`
	Title       string               `gorm:"type: varchar(255)" json:"title"`
	Description string               `gorm:"type: varchar(255)" json:"description"`
	Photo       models.PhotoResponse `json:"photos"`
}

type PostResponseByID struct {
	ID          int                      `gorm:"type: integer" json:"id"`
	Title       string                   `gorm:"type: varchar(255)" json:"title"`
	Description string                   `gorm:"type: varchar(255)" json:"description"`
	Photo       []models.PhotoResponse   `json:"photos"`
	User        userdto.UserPostResponse `json:"user"`
	CreatedAt   time.Time                `json:"created_at"`
}

type PostResponseAll struct {
	ID          int                    `json:"id"`
	Title       string                 `json:"title"`
	Description string                 `json:"description"`
	Photo       []models.PhotoResponse `json:"photos"`
	UserID      int                    `json:"user_id"`
}
