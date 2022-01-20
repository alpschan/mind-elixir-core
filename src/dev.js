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
    type: 'tag',
    extend: [
      //   {
      //     name: '创建同级分组',
      //     type: 'add-folder',
      //     onclick: () => {
      //       const { id } = mind.currentNode.nodeObj
      //       groupRef.current.create('folder', id, '新的分组', 'sameLevel')
      //     },
      //     disabled: true,
      //   },
      //   {
      //     name: '创建子分组',
      //     type: 'add-children-folder',
      //     onclick: () => {
      //       const { id } = mind.currentNode.nodeObj
      //       groupRef.current.create('folder', id, '新的分组', 'nextLevel')
      //     },
      //   },
      {
        name: '创建子实体',
        type: 'add-children-entity',
        onclick: () => {
          const { id } = mind.currentNode.nodeObj
          groupRef.current.create('entity', id, '新的实体', 'nextLevel')
        },
      },
      {
        name: '进入当前节点',
        type: 'enter-node',
        onclick: () => mind.focusNode(mind.currentNode),
      },
      {
        name: '退出当前节点',
        type: 'exit-node',
        onclick: () => mind.cancelFocus(),
      },
      {
        name: '编辑实体',
        type: 'edit-entity',
        onclick: () =>
          navigate(`entity?categoryType=${mind.currentNode.nodeObj.id}`),
      },
      {
        name: '创建同级实体',
        type: 'add-entity',
        onclick: () => {
          const { id } = mind.currentNode.nodeObj
          groupRef.current.create('entity', id, '新的实体', 'sameLevel')
        },
      },
      {
        name: '删除',
        type: 'remove',
        onclick: () => {
          groupRef.current.remove(mind.currentNode.nodeObj.id)
        },
      },
      {
        name: '上移',
        type: 'move-up',
        onclick: () => {
          const { id, parent } = mind.currentNode.nodeObj
          const idx = findIndex(x => x.id === id, parent.children)
          if (idx === 0) {
            message.warn('无法上移在最顶部的节点')
            return
          }
          groupRef.current.moveUp(id, parent.children[idx - 1].id)
        },
      },
      {
        name: '下移',
        type: 'move-down',
        onclick: () => {
          const { id, parent } = mind.currentNode.nodeObj
          const idx = findIndex(x => x.id === id, parent.children)
          if (idx === parent.children.length - 1) {
            message.warn('无法下移在最底部的节点')
            return
          }
          groupRef.current.moveDown(id, parent.children[idx + 1].id)
        },
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
