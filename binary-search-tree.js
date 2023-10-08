class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (val === current.val) return undefined; // No duplicates
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  insertRecursively(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    const insertHelper = (node) => {
      if (val === node.val) return;
      if (val < node.val) {
        if (!node.left) {
          node.left = newNode;
          return;
        }
        insertHelper(node.left);
      } else {
        if (!node.right) {
          node.right = newNode;
          return;
        }
        insertHelper(node.right);
      }
    }
    insertHelper(this.root);
    return this;
  }

  find(val) {
    if (!this.root) return undefined;
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  findRecursively(val) {
    if (!this.root) return undefined;
    const findHelper = (node) => {
      if (!node) return undefined;
      if (val === node.val) return node;
      if (val < node.val) {
        return findHelper(node.left);
      } else {
        return findHelper(node.right);
      }
    }
    return findHelper(this.root);
  }

  dfsPreOrder() {
    const result = [];
    const traverse = (node) => {
      result.push(node.val);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  dfsInOrder() {
    const result = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      result.push(node.val);
      if (node.right) traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  dfsPostOrder() {
    const result = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  bfs() {
    const result = [];
    const queue = [this.root];
    while (queue.length) {
      const currentNode = queue.shift();
      result.push(currentNode.val);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return result;
  }

  remove(val) {
    const findMin = (node) => {
      while (node.left) {
        node = node.left;
      }
      return node;
    };

    const removeNode = (node, key) => {
      if (!node) return null;
      if (key < node.val) {
        node.left = removeNode(node.left, key);
        return node;
      } else if (key > node.val) {
        node.right = removeNode(node.right, key);
        return node;
      } else {
        if (!node.left && !node.right) {
          node = null;
          return node;
        }
        if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        }
        const temp = findMin(node.right);
        node.val = temp.val;
        node.right = removeNode(node.right, temp.val);
        return node;
      }
    };

    this.root = removeNode(this.root, val);
  }

  isBalanced() {
    const checkBalance = (node) => {
      if (!node) return { isBalanced: true, depth: -1 };

      const left = checkBalance(node.left);
      const right = checkBalance(node.right);

      const isBalanced = left.isBalanced && right.isBalanced && Math.abs(left.depth - right.depth) <= 1;
      const depth = Math.max(left.depth, right.depth) + 1;

      return { isBalanced, depth };
    };

    return checkBalance(this.root).isBalanced;
  }

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    let prev = null;

    while (current.right) {
      prev = current;
      current = current.right;
    }

    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }

    return prev.val;
  }

  dfsInOrderIteratively() {
    const result = [];
    const stack = [];
    let current = this.root;

    while (current || stack.length) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      result.push(current.val);
      current = current.right;
    }

    return result;
  }
}

module.exports = BinarySearchTree;
