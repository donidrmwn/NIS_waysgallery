package postdto

type CreatePostRequest struct {
	UserID      int    `json:"user_id" gorm:"type: int" form:"user_id"`
	Title       string `json:"title" gorm:"type: varchar(255)"`
	Description string `json:"description" gorm:"type: varchar(255)"`
}

type UpdatePostRequest struct {
	Title       string `json:"title" gorm:"type: varchar(255)"`
	Description string `json:"description" gorm:"type: varchar(255)"`
}
