class TreeNode {
    left: TreeNode | null;
    right: TreeNode | null;
    value: number;
  
    constructor(value: number) {
      this.left = null;
      this.right = null;
      this.value = value;
    }
  }
  
  class BinaryTree {
    root: TreeNode | null;
  
    constructor() {
      this.root = null;
    }
  
    insert(value: number) {
      const newNode = new TreeNode(value);
  
      if (this.root === null) {
        this.root = newNode;
      } else {
        let currentNode = this.root;
  
        while (true) {
          if (value < currentNode.value) {
            if (currentNode.left === null) {
              currentNode.left = newNode;
              break;
            } else {
              currentNode = currentNode.left;
            }
          } else {
            if (currentNode.right === null) {
              currentNode.right = newNode;
              break;
            } else {
              currentNode = currentNode.right;
            }
          }
        }
      }
    }
  
    generateRandomTree(nodeCount: number) {
      const values: number[] = [];
  
      for (let i = 0; i < nodeCount; i++) {
        let value = Math.floor(Math.random() * 10) + 1;
  
        while (values.includes(value)) {
          value = Math.floor(Math.random() * 10) + 1;
        }
  
        values.push(value);
        this.insert(value);
      }
    }
  }
  
export default BinaryTree;