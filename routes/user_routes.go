package routes

import (
	"blog-app/controllers"

	"github.com/gorilla/mux"
)

func UserRoute(router *mux.Router) {
	router.HandleFunc("/create-post", controllers.CreatePost()).Methods("POST")
	router.HandleFunc("/posts", controllers.GetAllPosts()).Methods("GET")
}
