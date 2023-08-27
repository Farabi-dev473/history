package main

import (
	"fmt"
)

func isSortedInDecOrder(nums []int) bool {
	for i := 1; i < len(nums); i++ {
		if nums[i-1] > nums[i] {
			return false
		}
	}
	return true
}

func makeArrayNonDec(nums []int) int {
	steps := 0
	for !isSortedInDecOrder(nums) || len(nums) == 2 {
		for i := 1; i < len(nums); i++ {
			if nums[i-1] > nums[i] {
				nums = append(nums[:i], nums[i+1:]...)
			}
		}
		steps++
	}
	return steps
}
func totalSteps(nums []int) int {
	return makeArrayNonDec(nums)
}

func main() {
	slice := []int{3, 4, 4, 7, 3, 6, 11, 8, 5, 11}
	fmt.Println(totalSteps(slice))
}
