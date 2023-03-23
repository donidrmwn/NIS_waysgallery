package postdto

import "waysgallery/models"

type PostResponse struct {
	UserID      int                  `json:"user_id" gorm:"type: int" form:"user_id"`
	Title       string               `json:"title" gorm:"type: varchar(255)"`
	Photo       models.PhotoResponse `json:"photos"`
	Description string               `json:"description" gorm:"type: varchar(255)"`
}
