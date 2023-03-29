package userdto

import profiledto "waysgallery/dto/profile"

type UserProfileResponse struct {
	ID      int                            `json:"id"`
	Email   string                         `json:"email"`
	Profile profiledto.ProfileResponsePost `json:"profile"`
}
