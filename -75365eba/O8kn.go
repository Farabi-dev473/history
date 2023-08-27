package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Todo struct {
	ID        string
	title     string
	completed bool
}

var todos = make([]Todo, 100, 100)

func getTodos(conext *gin.Context) {
	conext.JSON(http.StatusAccepted, todos)
}

func main() {
	router := gin.Default()

	router.GET("/todos", getTodos)
	router.GET("/todo:id")

	router.Run("localhost:4000")
}
