package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Todo struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
}

type Error struct {
	Msg string `json:"msg"`
}

var todos = make([]Todo, 0)

func getTodos(conext *gin.Context) {
	fmt.Println(todos)
	conext.JSON(http.StatusAccepted, todos)
}

func getTodo(context *gin.Context) {
	id := string(context.Param("id"))

	for _, todo := range todos {
		fmt.Println(todo)
		if todo.ID == id {
			context.JSON(http.StatusFound, todo)
			return
		}
	}
	err := Error{Msg: "Todo not found"}
	context.JSON(http.StatusNotFound, err)
}

func setTodo(context *gin.Context) {
	var body Todo
	if err := context.ShouldBindJSON(&body); err != nil {
		return
	}
	fmt.Println(body)
	todos = append(todos, body)
	context.String(http.StatusCreated, "Todo has been created")
}

func setTodos(context *gin.Context) {
	var body []Todo
	if err := context.ShouldBindJSON(&body); err != nil {
		return
	}
	todos = append(todos, body...)
	context.String(http.StatusCreated, "Todos has been created")
}

func main() {
	router := gin.Default()

	router.GET("/todo/all", getTodos)
	router.GET("/todo/:id", getTodo)

	router.POST("/todo", setTodo)
	router.POST("/todo/all", setTodos)

	router.Run("localhost:4000")
}
