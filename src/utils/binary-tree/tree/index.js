const TreeNode = require('../node')

class Tree {
  constructor(data=null) {
    if(data) data = new TreeNode(data)
    this.root = data;
  }

  insert(data) {
    let parent = null
    let x = this.root
    while(x) {
      parent = x
      if (data < x.data) x = x.left
      else x = x.right
    }
    if(!parent) self.root = new TreeNode(data)
    else if (data < parent.data) parent.left = new TreeNode(data)
    else parent.right = new TreeNode(data)
  }

  getValue(doc, data, node=this.root, parent = null){
    
    if(!data || (data < 20 && data != 10)) return

    if (data > 100) return doc["100"] += data / 100

    if(!node) {
      doc[parent.data] += 1
      return this.getValue(doc, data-parent.data)
    }

    if(data > node.data && data < node.right.data && data % node.data != 0) {
      doc[node.data] += 1
      return this.getValue(doc, data-node.data)
    }

    if(data > node.data && data < node.right.data && data % node.data == 0) {
      doc[parent.data] += (data / node.data)
      return
    }

    if(node.data == data) return doc[node.data] += 1

    if(node.data < data) return this.getValue(doc, data, node.right, node)
    if(node.data > data) return this.getValue(doc, data, node.left, node)
  }
}

module.exports = Tree