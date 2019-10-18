class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null && this.right === null) {
			this.left = node;
			node.parent = this;
			return this;
		}
		else if (this.right === null) {
			this.right = node;
			node.parent = this;
			return this;
		}
		return this;
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
			return this;
		}
		else if (this.right === node) {
			this.right = null;
			node.parent = null;
			return this;
		}
		else {
			throw (Error);
		}
	}

	remove() {
		if (this.parent === null) {
			return this;
		}
		else {
			this.parent.removeChild(this);
			return this;
		}
	}

	swapWithParent() {
		if (this.parent != null) {
			if (this.parent.parent != null) {
				if (this.parent.parent.left === this.parent) this.parent.parent.left = this;
				if (this.parent.parent.right === this.parent) this.parent.parent.right = this;
			}
			if (this.left != null) this.left.parent = this.parent;
			if (this.right != null) this.right.parent = this.parent;

			if (this.parent.left === this) {
				if (this.parent.right != null) this.parent.right.parent = this;
				let parR = this.parent.right;
				let parG = this.parent.parent;

				this.parent.left = this.left;
				this.parent.right = this.right;
				this.left = this.parent;
				this.right = parR;
				this.parent.parent = this;
				this.parent = parG;
			}
			else if (this.parent.right === this) {
				if (this.parent.left != null) this.parent.left.parent = this;
				let parL = this.parent.left;
				let parG = this.parent.parent;

				this.parent.left = this.left;
				this.parent.right = this.right;
				this.right = this.parent;
				this.left = parL;
				this.parent.parent = this;
				this.parent = parG;
			}
		}
	}
}

module.exports = Node;
