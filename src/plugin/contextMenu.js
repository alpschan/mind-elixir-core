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
      const { nodeObj } = target
      const enterCategory = document.getElementById('enter-category')
      const addCategory = document.getElementById('add-category')
      const remove = document.getElementById('remove')
      const moveUp = document.getElementById('move-up')
      const moveDown = document.getElementById('move-down')
      if (nodeObj.type === 'root') {
        enterCategory.className = 'disabled'
        addCategory.className = ''
        remove.className = 'disabled'
        moveUp.className = 'disabled'
        moveDown.className = 'disabled'
      } else {
        enterCategory.className = ''
        addCategory.className = 'disabled'
        remove.className = ''
        moveUp.className = ''
        moveDown.className = ''
      }
    }
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
}
