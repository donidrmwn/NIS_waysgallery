package userdto

import profiledto "waysgallery/dto/profile"

type UserPostResponse struct {
	ID      int                            `json:"id"`
	Email   string                         `json:"email"`
	Profile profiledto.ProfileResponsePost `json:"profile"`
}
