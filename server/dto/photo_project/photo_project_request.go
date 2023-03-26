package photoprojectdto

type CreatePhotoProjectRequest struct {
	OrderID      int    `json:"order_id" gorm:"type: integer"`
	LineNo       int    `json:"line_no" gorm:"type: integer"`
	PhotoProject string `json:"photo_project" gorm:"type: varchar(255)"`
}
