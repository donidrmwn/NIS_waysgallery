package postdto

import "waysgallery/models"

type PostResponse struct {
	ID          int                  `gorm:"type: integer" json:"id"`
	Title       string               `gorm:"type: varchar(255)" json:"title"`
	Description string               `gorm:"type: varchar(255)" json:"desrciption"`
	Photo       models.PhotoResponse `json:"photos"`
}
