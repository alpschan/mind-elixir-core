import MindElixir, { E } from './index'
import { exportSvg, exportPng } from '../painter/index'

let mind = new MindElixir({
  el: '#map',
  newTopicName: '子节点',
  direction: MindElixir.SIDE,
  // direction: MindElixir.RIGHT,
  //   data: MindElixir.new('new topic'),
  data: MindElixir.example2,
  draggable: true,
  editable: true,
  contextMenu: true,
  contextMenuOption: {
    type: 'category',
    extend: [
      {
        name: '进入标签类',
        type: 'enter-category',
        onclick: () => {},
      },
      {
        name: '创建标签类',
        type: 'add-category',
        onclick: () => {},
      },
      {
        name: '删除',
        type: 'remove',
        onclick: () => {},
      },
      {
        name: '上移',
        type: 'move-up',
        onclick: () => {},
      },
      {
        name: '下移',
        type: 'move-down',
        onclick: () => {},
      },
    ],
  },
  toolBar: true,
  nodeMenu: true,
  keypress: true,
  allowUndo: false,
  before: {
    moveDownNode() {
      return false
    },
    insertSibling(el, obj) {
      return true
    },
    async addChild(el, obj) {
      await sleep()
      return true
    },
  },
  primaryLinkStyle: 2,
  primaryNodeVerticalGap: 15, // 25
  primaryNodeHorizontalGap: 15, // 65
})
mind.init()
function sleep() {
  return new Promise((res, rej) => {
    setTimeout(() => res(), 100)
  })
}
console.log('test E function', E('bd4313fbac40284b'))
let mind2 = new MindElixir({
  el: '#map2',
  direction: 2,
  data: MindElixir.example2,
  draggable: false,
  // overflowHidden: true,
  nodeMenu: true,
})
mind2.init()
window.currentOperation = null
mind.bus.addListener('operation', operation => {
  console.log(operation)
  if (operation.name !== 'finishEdit') window.currentOperation = operation
  // return {
  //   name: action name,
  //   obj: target object
  // }

  // name: [insertSibling|addChild|removeNode|beginEdit|finishEdit]
  // obj: target

  // name: moveNode
  // obj: {from:target1,to:target2}
})
mind.bus.addListener('selectNode', node => {
  console.log(node)
})
window.m = mind
window.m2 = mind2
window.M = MindElixir
window.exportSvg = exportSvg
window.exportPng = exportPng
