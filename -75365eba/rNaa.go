package main

import "fmt"

type ListNode struct {
	Val  int
	Next *ListNode
}

func reverseList(head, tail *ListNode) {
	stack := []*ListNode{}

	for head != tail.Next {

		stack = append(stack, head)
		head = head.Next
	}
	fmt.Println(stack)
	head = stack[len(stack)-1]

	for i := len(stack) - 2; i >= 0; i-- {
		head.Next = stack[i]
		head = head.Next
	}
	head.Next = nil

	fmt.Println(tail)
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

	reverseList(leftNode, rightNode)
	fmt.Println(rightNode)
	fmt.Println(rightNode.Next)
	fmt.Println(rightNode.Next)
	// fmt.Println(rightNode)
}
