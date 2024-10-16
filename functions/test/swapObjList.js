export default function swapObjList(obj, from, to) {
    to.push(obj)
    const index = from.indexOf(obj)
    from.splice(index, 1)
}