package models

// "go.mongodb.org/mongo-driver/bson/primitive"

type Post struct {
	// ID    primitive.ObjectID `json:"id"`
	Title string `json:"title"`
	Body  string `json:"body"`
}
