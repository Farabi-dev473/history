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

type Error struct {
	msg string
}

var todos = make([]Todo, 100, 100)

func getTodos(conext *gin.Context) {
	conext.JSON(http.StatusAccepted, todos)
}

func getTodo(context *gin.Context) {
	id := context.Param("id")

	for _, todo := range todos {
		if todo.ID == id {
			context.JSON(http.StatusFound, todo)
			return
		}
	}
	context.JSON(http.StatusNotFound, Error{msg: "Todo not found"})
}

func setTodo(context *gin.Context) {
	var body Todo
	if err := context.BindJSON(&body); err != nil {
		return
	}

	todos = append(todos, body)
	context.String(http.StatusCreated, "Todo has been created")
}

func main() {
	router := gin.Default()

	router.GET("/todo/all", getTodos)
	router.GET("/todo:id", getTodo)

	router.POST("/todo", setTodo)
	// router.POST("/todo/all", setTodos)

	router.Run("localhost:4000")
}
