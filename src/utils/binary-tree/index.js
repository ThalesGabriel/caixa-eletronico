const Tree = require('./tree')

// This is an AVL looked like
//      20       
//    /   \        
//   10    50      
//        /  \   
//      null  100  

function initAVLTree() {
  const tree = new Tree(20)
  tree.insert(10)
  tree.insert(50)
  tree.insert(100)
  return tree
}

module.exports = initAVLTree