const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.len = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.len += 1;
	}

	pop() {
		if (this.isEmpty() != true) {
			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
			this.len -= 1;
			return (detached.data);
		}
	}

	detachRoot() {
		if (this.parentNodes[0] === this.root) this.parentNodes.shift();
		let rt = this.root;
		this.root = null;
		return rt;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.isEmpty() != true) {
			let last = this.parentNodes.pop();

			if (last.parent === null) {
				this.root = last;
				return;
			}
			if (last.parent.right === last && last.parent != detached) {
				this.parentNodes.unshift(last.parent);
			}

			last.remove();

			if (detached != last.parent) {
				if (detached.left != null) last.appendChild(detached.left);
				if (detached.right != null) last.appendChild(detached.right);
			}
			if (last.right === null) this.parentNodes.unshift(last);

			this.root = last;
		}
	}

	size() {
		return this.len;
	}

	isEmpty() {
		if (this.root === null && this.parentNodes.length === 0) {
			return true;
		}
		else {
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.len = 0;
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].right != null) {
				this.parentNodes.shift()
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null) this.root = node;
		if (node.parent != null && node.priority > node.parent.priority) {

			let nodeI = this.parentNodes.indexOf(node);
			let parentI = this.parentNodes.indexOf(node.parent);
	  
			if (nodeI > -1) {
			  if (parentI > -1) this.parentNodes[parentI] = node;
	  
			  this.parentNodes[nodeI] = node.parent;
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (this.isEmpty() != true) {
			let child;
	  
			if (node.left != null && node.right != null) {
				if (node.left.priority > node.right.priority) {
					child = node.left;
				}
				else {
					child = node.right;
				}
			} 
			else {
				child = node.left;
			}
	  
			if (child != null && node.priority < child.priority) {

			  	let nodeI = this.parentNodes.indexOf(node);
			  	let childI = this.parentNodes.indexOf(child);
	  
			if (childI > -1) {
				if (nodeI > -1) this.parentNodes[nodeI] = child;
	  
				this.parentNodes[childI] = node;
			}
	  
			if (this.root === node) {
				this.root = child;
			}
	  
			child.swapWithParent();
			this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
