import i18n from '../i18n'

export default function (mind, option) {
  let createLi = (id, name, keyname) => {
    let li = document.createElement('li')
    li.id = id
    li.innerHTML = `<span>${name}</span><span>${keyname}</span>`
    return li
  }
  let locale = i18n[mind.locale] ? mind.locale : 'zh_CN'

  let menuUl = document.createElement('ul')
  menuUl.className = 'menu-list'
  if (option && option.extend) {
    for (let i = 0; i < option.extend.length; i++) {
      let item = option.extend[i]
      console.log('item', item)
      let dom = createLi(item.type, item.name, item.key || '')
      menuUl.appendChild(dom)
      dom.onclick = e => {
        item.onclick(e)
      }
    }
  }
  let menuContainer = document.createElement('cmenu')
  menuContainer.appendChild(menuUl)
  menuContainer.hidden = true

  mind.container.append(menuContainer)
  let isTag = option.type === 'tag'
  mind.container.oncontextmenu = function (e) {
    e.preventDefault()

    // console.log(e.pageY, e.screenY, e.clientY)
    let target = e.target
    if (isTag) {
      console.dir(target)
      const { nodeObj } = target
      const addFolder = document.getElementById('add-folder')
      const addChildrenFolder = document.getElementById('add-children-folder')
      const addChildrenEntity = document.getElementById('add-children-entity')
      const enterNode = document.getElementById('enter-node')
      const exitNode = document.getElementById('exit-node')
      const editEntity = document.getElementById('edit-entity')
      const addEntity = document.getElementById('add-entity')
      const remove = document.getElementById('remove')
      const moveUp = document.getElementById('move-up')
      const moveDown = document.getElementById('move-down')
      if (nodeObj.type === 'root') {
        addFolder.className = 'disabled'
        addChildrenFolder.className = 'disabled'
        addChildrenEntity.className = 'disabled'
        enterNode.className = 'disabled'
        exitNode.className = 'disabled'
        editEntity.className = 'disabled'
        addEntity.className = 'disabled'
        remove.className = 'disabled'
        moveUp.className = 'disabled'
        moveDown.className = 'disabled'
      } else if (nodeObj.type === 'category') {
        addFolder.className = 'disabled'
        addChildrenFolder.className = ''
        addChildrenEntity.className = ''
        enterNode.className = ''
        exitNode.className = ''
        editEntity.className = 'disabled'
        addEntity.className = 'disabled'
        remove.className = 'disabled'
        moveUp.className = ''
        moveDown.className = ''
      } else if (nodeObj.type === 'folder') {
        addFolder.className = ''
        addChildrenFolder.className = ''
        addChildrenEntity.className = ''
        enterNode.className = ''
        exitNode.className = ''
        editEntity.className = 'disabled'
        addEntity.className = ''
        remove.className = ''
        moveUp.className = ''
        moveDown.className = ''
      } else {
        addFolder.className = 'disabled'
        addChildrenFolder.className = 'disabled'
        addChildrenEntity.className = 'disabled'
        enterNode.className = 'disabled'
        exitNode.className = 'disabled'
        editEntity.className = ''
        addEntity.className = ''
        remove.className = ''
        moveUp.className = ''
        moveDown.className = ''
      }
    } else {
    }
    // if (target.tagName === 'TPC') {
    //   if (target.parentElement.tagName === 'ROOT') {
    //     isRoot = true
    //   } else {
    //     isRoot = false
    //   }
    //   if (isRoot) {
    //     focus.className = 'disabled'
    //     up.className = 'disabled'
    //     down.className = 'disabled'
    //     add_sibling.className = 'disabled'
    //     remove_child.className = 'disabled'
    //   } else {
    //     focus.className = ''
    //     up.className = ''
    //     down.className = ''
    //     add_sibling.className = ''
    //     remove_child.className = ''
    //   }
    mind.selectNode(target)
    menuContainer.hidden = false
    let height = menuUl.offsetHeight
    let width = menuUl.offsetWidth
    if (height + e.clientY > window.innerHeight) {
      menuUl.style.top = ''
      menuUl.style.bottom = '0px'
    } else {
      menuUl.style.bottom = ''
      menuUl.style.top = e.clientY + 15 + 'px'
    }
    if (width + e.clientX > window.innerWidth) {
      menuUl.style.left = ''
      menuUl.style.right = '0px'
    } else {
      menuUl.style.right = ''
      menuUl.style.left = e.clientX + 10 + 'px'
    }
    // }
  }

  menuContainer.onclick = e => {
    if (e.target === menuContainer) menuContainer.hidden = true
  }

  //   add_child.onclick = e => {
  //     mind.addChild()
  //     menuContainer.hidden = true
  //   }
  //   add_sibling.onclick = e => {
  //     if (isRoot) return
  //     mind.insertSibling()
  //     menuContainer.hidden = true
  //   }
  //   remove_child.onclick = e => {
  //     if (isRoot) return
  //     mind.removeNode()
  //     menuContainer.hidden = true
  //   }
  //   focus.onclick = e => {
  //     if (isRoot) return
  //     mind.focusNode(mind.currentNode)
  //     menuContainer.hidden = true
  //   }
  //   unfocus.onclick = e => {
  //     mind.cancelFocus()
  //     menuContainer.hidden = true
  //   }
  //   up.onclick = e => {
  //     if (isRoot) return
  //     mind.moveUpNode()
  //     menuContainer.hidden = true
  //   }
  //   down.onclick = e => {
  //     if (isRoot) return
  //     mind.moveDownNode()
  //     menuContainer.hidden = true
  //   }
  //   link.onclick = e => {
  //     menuContainer.hidden = true
  //     let from = mind.currentNode
  //     let tips = createTips(i18n[locale].clickTips)
  //     m.container.appendChild(tips)
  //     mind.map.addEventListener(
  //       'click',
  //       e => {
  //         e.preventDefault()
  //         tips.remove()
  //         if (
  //           e.target.parentElement.nodeName === 'T' ||
  //           e.target.parentElement.nodeName === 'ROOT'
  //         ) {
  //           mind.createLink(from, mind.currentNode)
  //         } else {
  //           console.log('取消连接')
  //         }
  //       },
  //       {
  //         once: true,
  //       }
  //     )
  //   }
}
