package models

import "time"

type Photo struct {
	ID        int          `json:"id" gorm:"primary_key:auto_increment"`
	PostID    int          `json:"post_id" gorm:"type: integer"`
	LineNo    int          `json:"line_no" gorm:"type: integer"`
	Photo     string       `json:"photo" gorm:"type: varchar(255)"`
	Post      PostResponse `json:"-" gorm:"foreignKey:PostID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" `
	CreatedAt time.Time    `json:"-"`
	UpdatedAt time.Time    `json:"-"`
}

type PhotoResponse struct {
	ID     int    `json:"photo_id" gorm:"type: integer"`
	LineNo int    `json:"line_no" gorm:"type: integer"`
	Photo  string `json:"photo" gorm:"type: varchar(255)"`
	PostID int    `json:"post_id"`
}

func (PhotoResponse) TableName() string {
	return "photos"
}
