package photodto

type CreatePhotoRequest struct {
	PostID int    `json:"post_id" gorm:"type: integer"`
	LineNo int    `json:"line_no" gorm:"type: integer"`
	Photo  string `json:"photo" gorm:"type: varchar(255)"`
}

type UpdatePhotoRequest struct {
	Photo string `json:"photo" gorm:"type: varchar(255)"`
}
