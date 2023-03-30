package authdto

type LoginResponse struct {
	ID    int    `gorm:"type: integer" json:"id"`
	Email string `gorm:"type: varchar(255)" json:"email"`
	Token string `gorm:"type: varchar(255)" json:"token"`
}

type RegisterResponse struct {
	Email string `gorm:"type: varchar(255)" json:"email"`
}
