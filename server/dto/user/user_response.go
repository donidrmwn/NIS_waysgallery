package userdto

import profiledto "waysgallery/dto/profile"

type UserPostResponse struct {
	Email   string                         `json:"email"`
	Profile profiledto.ProfileResponsePost `json:"profile"`
}
