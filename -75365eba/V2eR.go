package main

import "fmt"

type ListNode struct {
	Val  int
	Next *ListNode
}

func reverseList(head, tail *ListNode) {
	stack := []*ListNode{}

	for head != tail.Next {
		fmt.Println("1st")
		stack = append(stack, head)
		head = head.Next
	}

	head = stack[len(stack)-1]

	for len(stack) != 0 {
		fmt.Println("2nd")
		head.Next = stack[len(stack)-1]
		head = head.Next
	}
	head.Next = nil
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

}
