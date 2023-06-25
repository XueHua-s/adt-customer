// 手写双端循环链表
class Node {
  /**
   *
   * @param { any } element - 新建节点传入的值
   */
  constructor (element) {
    this.element = element
    this.prev = null
    this.next = null
  }
}
/**
 * @description 双端循环链表
 * @constructor
 */
export function EndedLinked () {
  let head = null
  let last = null
  let count = 0
  // 判断构造方法有没有传入参数，将参数中的数据按顺序构造成节点，组成链表
  if (arguments.length >= 1) {
    if (arguments.length === 1) {
      head = new Node(arguments[0])
      last = new Node(arguments[0])
      head.prev = last
      head.next = last
      last.prev = head
      last.next = head
      count++
    } else {
      let prevEle = null
      for (let i = 0;i < arguments.length;i++) {
        const node = new Node(arguments[i])
        // 创建链表的首尾
        if (i === 0) {
          head = node
        }
        if (i === arguments.length - 1) {
          last = node
          // 末尾元素的next重新指向第一个元素
          last.next = head
        }
        // 上一个元素的next指针，为当前元素
        if (prevEle !== null) {
          prevEle.next = node
        }
        // 当前元素的上一个指针，为上一个元素
        node.prev = prevEle
        prevEle = node
        count++
      }
      // 循环结束，头元素的prev指针指向尾部
      head.prev = last
    }
  }
  this.getHead = () => {
    return head
  }
  this.getLast = () => {
    return last
  }
  /**
   *
   * @param element - 往链表后追加的值
   */
  this.push = (element) => {
    const node = new Node(element)
    if (count === 0) {
      head = node
      last = node
      head.prev = last
      head.next = last
      last.prev = head
      last.next = head
    } else {
      const pre = last
      pre.next = node
      // 新元素的上指针为最后一个元素
      node.prev = pre
      // 新元素的next指向第一个元素
      node.next = head
      // 最后一个元素的下一个元素为新元素
      last = node
      head.prev = last
    }
    count++
  }
  /**
   *
   * @param element - 往链表前追加的值
   */
  this.unshift = (element) => {
    const node = new Node(element)
    if (count === 0) {
      head = node
      last = node
      head.prev = last
      head.next = last
      last.prev = head
      last.next = head
    } else {
      const pre = head
      pre.prev = node
      // 往头部添加,当前节点的下一个就是之前的头部
      node.next = pre
      // 当前节点的上一个指针，指向最后一个元素
      node.prev = last
      // 当前节点成为新的head
      head = node
      last.next = head
    }
    count++
  }
  /**
   *
   * @return {number}
   * @description 获取链表的长度
   */
  this.size = () => {
    return count
  }
  /**
   * @param { number } index - 链表的下标
   * @description 获取链表指定的元素
   */
  this.at = (index) => {
    if (typeof index !== 'number') {
      throw 'index参数不能为number以外的类型'
    }
    if (index >= count) {
      throw 'index不能超出链表的长度'
    }
    if (index < 0) {
      throw 'index不能为负数'
    }
    let searchOrder = null
    if ((count / 2) > index) {
      searchOrder = 'head'
    } else {
      searchOrder = 'last'
    }
    let ele = null
    if (searchOrder === 'head') {
      // console.log('head')
      ele = head
      for (let i = 0;i < index;i++) {
        // console.log('进入循环', ele.next)
        // 从头开始查询
        ele = ele.next
      }
    }
    if (searchOrder === 'last') {
      ele = last
      for (let i = (count - 1);i > index;i--) {
        // 从尾开始查询
        ele = ele.prev
      }
    }
    return ele
  }
  /**
   * @param { number } index - 链表的下标
   * @description 删除指定下标的节点
   */
  this.deleteIndex = (index) => {
    if (typeof index !== 'number') {
      throw 'index参数不能为number以外的类型'
    }
    if (index >= count) {
      throw 'index不能超出链表的长度'
    }
    if (index < 0) {
      throw 'index不能为负数'
    }
    if (index === 0) {
      head = head.next
      head.prev = last
      last.next = head
    } else if (index === (count - 1)) {
      last = last.prev
      last.next = head
      head.prev = last
    } else {
      const getNode = this.at(index)
      const prev = getNode.prev
      const next = getNode.next
      prev.next = next
      next.prev = prev
    }
    count--
    // getNode.next = null
    // getNode
  }
  // 迭代器
  this[Symbol.iterator] = () => {
    let index = 0
    let prev = head
    return {
      next: () => {
        if (index < count) {
          const result = {
            index,
            value: prev.element
          }
          index++
          prev = prev.next
          return {
            value: result,
            done: false
          }
        } else {
          return {
            value: null,
            done: true
          }
        }
      }
    }
  }
  /**
   *
   * @param { Function } callBack
   */
  this.forEach = (callBack) => {
    let prev = head
    for (let i = 0;i < count;i++) {
      callBack(prev.element, i)
      prev = prev.next
    }
  }
}
