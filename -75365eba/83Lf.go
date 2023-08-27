package main

import "fmt"

type ListNode struct {
	Val  int
	Next *ListNode
}

func main() {
	list := ListNode{
		Val: 5,
		Next: &ListNode{
			Val: 10,
			Next: &ListNode{
				Val: 15,
				Next: &ListNode{
					Val: 20,
					Next: &ListNode{
						Val:  25,
						Next: nil,
					},
				},
			},
		},
	}

	left := 2
	right := 4
	var leftNode, rightNode *ListNode
	temp := &list
	for leftNode == nil || rightNode == nil {

		if left == 1 {
			leftNode = temp
		}

		if right == 1 {
			rightNode = temp
		}

		left--
		right--
		temp = temp.Next
	}

	fmt.Println(leftNode, rightNode)
}
