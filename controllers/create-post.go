package controllers

import (
	"blog-app/configs"
	"blog-app/models"
	"blog-app/responses"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

var PostsCollection *mongo.Collection = configs.GetCollection(configs.DB, "Posts")

type NewPostRequestBody struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

func CreatePost() http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		fmt.Println("25")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var newPostRequestBody NewPostRequestBody
		err := json.NewDecoder(r.Body).Decode(&newPostRequestBody)
		if err != nil {
			rw.WriteHeader(http.StatusBadRequest)
			response := responses.UserResponse{Status: http.StatusBadRequest, Message: "unable to decode request body", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(rw).Encode(response)
			return
		}
		fmt.Println("36")
		var newPost models.Post
		newPost.Title = newPostRequestBody.Title
		newPost.Body = newPostRequestBody.Body
		result, err := PostsCollection.InsertOne(ctx, newPost)
		if err != nil {
			rw.WriteHeader(http.StatusInternalServerError)
			response := responses.UserResponse{Status: http.StatusInternalServerError, Message: "can't add post to the database", Data: map[string]interface{}{"data": err.Error()}}
			json.NewEncoder(rw).Encode(response)
			return
		}
		fmt.Println("47")
		rw.WriteHeader(http.StatusCreated)
		response := responses.UserResponse{Status: http.StatusCreated, Message: "succesfully added a new post", Data: map[string]interface{}{"data": result}}
		json.NewEncoder(rw).Encode(response)

	}
}
