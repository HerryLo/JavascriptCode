/**
 * 二叉树
 * @param {Array} arr 
 * 特征
(1) 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值
(2) 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值
(3) 它的左、右子树也分别为二叉查找树
 */
function tree(arr) {
    let root = null;

    function Node(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    };

    function insertNode(newNode, node) {
        if (newNode.value < node.value) {
            if(node.left == null){
                node.left = newNode;
            }else{
                insertNode(newNode, node.left)
            }
        } else {
            if(node.right == null){
                node.right = newNode;
            }else{
                insertNode(newNode, node.right)
            }
        }
    };

    function insert(item) {
        let newNode = new Node(item)
        if(root == null){
            root = newNode
        }else{
            insertNode(newNode, root)
        }
    }

    arr.forEach(item => {
        insert(item)
    });
    return root;
}

const arr = [8,3,10,1,6,14,4,7,13]

console.log(tree(arr));
