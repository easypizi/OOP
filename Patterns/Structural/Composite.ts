/**
 * Composite pattern — tree structures of objects.
 *
 * Intent: Compose objects into tree structures to represent part-whole
 * hierarchies. Composite lets clients treat individual objects and compositions
 * uniformly.
 *
 * When to use:
 * - Work with recursive tree-like structures
 * - Treat leaves and composites uniformly
 */

class TreeNode {
  public readonly children: TreeNode[] = [];
  constructor(public readonly name: string) {}

  public add(child: TreeNode): void {
    this.children.push(child);
  }

  public remove(child: TreeNode): void {
    const index = this.children.indexOf(child);
    if (index >= 0) this.children.splice(index, 1);
  }

  public getChild(i: number): TreeNode {
    return this.children[i];
  }

  public hasChildren(): boolean {
    return this.children.length > 0;
  }
}

function traverse(indent: number, node: TreeNode): void {
  log.add(`${"--".repeat(indent - 1)}${node.name}`);
  for (let i = 0; i < node.children.length; i++) {
    traverse(indent + 1, node.getChild(i));
  }
}

const log = (() => {
  let buffer = "";
  return {
    add(msg: string) {
      buffer += msg + "\n";
    },
    show() {
      alert(buffer);
      buffer = "";
    },
  };
})();

const run = (): void => {
  const tree = new TreeNode("root");
  const left = new TreeNode("left");
  const right = new TreeNode("right");
  const leftleft = new TreeNode("leftleft");
  const leftright = new TreeNode("leftright");
  const rightleft = new TreeNode("rightleft");
  const rightright = new TreeNode("rightright");

  tree.add(left);
  tree.add(right);
  tree.remove(right);
  tree.add(right);
  left.add(leftleft);
  left.add(leftright);
  right.add(rightleft);
  right.add(rightright);

  traverse(1, tree);
  log.show();
};

run();


