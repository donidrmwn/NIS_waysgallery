package orderdto

import (
	"time"
	userdto "waysgallery/dto/user"
	"waysgallery/models"
)

type OrderResponse struct {
	ID                 int                         `json:"id"`
	VendorID           int                         `json:"vendor_id"`
	VendorUser         userdto.UserProfileResponse `json:"vendor_user"`
	Title              string                      `json:"title"`
	StartDate          time.Time                   `json:"start_date"`
	EndDate            time.Time                   `json:"end_date"`
	Description        string                      `json:"description"`
	Price              int                         `json:"price"`
	Status             string                      `json:"status"`
	DescriptionProject string                      `json:"description_project"`
	PhotoProject       []models.PhotoProject       `json:"photo_projects"`
}

type OfferResponse struct {
	ID                 int                         `json:"id"`
	ClientID           int                         `json:"vendor_id"`
	ClientUser         userdto.UserProfileResponse `json:"client_user"`
	Title              string                      `json:"title"`
	StartDate          time.Time                   `json:"start_date"`
	EndDate            time.Time                   `json:"end_date"`
	Description        string                      `json:"description"`
	Price              int                         `json:"price"`
	Status             string                      `json:"status"`
	DescriptionProject string                      `json:"description_project"`
	PhotoProject       []models.PhotoProject       `json:"photo_projects"`
}

type ProjectResponse struct {
	ID                 int                   `json:"id"`
	DescriptionProject string                `json:"description_project"`
	PhotoProject       []models.PhotoProject `json:"photo_projects"`
}
