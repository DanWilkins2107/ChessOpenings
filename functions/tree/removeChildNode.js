export default function removeChildNode(parent, childToRemove) {
    const index = parent.children.indexOf(childToRemove);
    parent.children.splice(index, 1);
}