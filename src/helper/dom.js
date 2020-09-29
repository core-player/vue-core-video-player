
import { isMobile } from './util'

export function removeAllChildrenNodes (el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
};

export function toggle (el, className) {
  if (this.hasClass(el, className)) {
    this.removeClass(el, className)
  } else {
    this.addClass(el, className)
  }
};

export function swichChildClass (el, childSelector, className, tellFunc) {
  const children = el.querySelectorAll(childSelector)
  for (let i = 0; i < children.length; i++) {
    const item = children[i]
    if (tellFunc(item)) {
      this.addClass(item, className)
    } else {
      this.removeClass(item, className)
    }
  }
};

export function hasClass (el, className) {
  return el.className.indexOf(className) > -1
};

export function addClass (dom, className) {
  if (!className || !dom) {
    return
  }
  const classGroup = className.split(' ')
  if (dom.classList && classGroup.length === 1) {
    dom.classList.add(className)
  } else {
    const _classNameList = dom.className.split(' ')
    _classNameList.push(className)
    dom.className = _classNameList.join(' ')
  }
};

export function removeClass (dom, className) {
  if (dom.classList) {
    dom.classList.remove(className)
  } else {
    const _classNameList = dom.className.split(' ')
    let _index = -1
    for (let i = 0, _len = _classNameList.length; i < _len; i++) {
      if (_classNameList[i] === className) {
        _index = i
      }
    }
    if (_index > -1) {
      _classNameList.splice(_index, 1)
    }
    dom.className = _classNameList.join(' ')
  }
};

export function getAttr (el, key) {
  return el.getAttribute(key)
};

export function isDescendant (parent, child) {
  let node = child.parentNode
  while (node != null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }
  return false
};

export function drag (e, el, coor) {
  if (!el) {
    return
  }
  const currentX = isMobile ? e.changedTouches[0]['clientX'] : e.clientX
  const currentY = isMobile ? e.changedTouches[0]['clientY'] : e.clientY

  let left = currentX - coor.x
  let top = currentY - coor.y
  if (left <= coor.minLeft) {
    left = coor.minLeft
  }
  if (left >= coor.maxLeft) {
    left = coor.maxLeft
  }
  if (top <= coor.minTop) {
    top = coor.minTop
  }
  if (top >= coor.maxTop) {
    top = coor.maxTop
  }
  return {
    left,
    top
  }
};

export function registerFullScreenChangeListener (listener) {
  document.addEventListener('fullscreenchange', () => {
    listener(document.webkitIsFullScreen)
  }, false)
  document.addEventListener('mozfullscreenchange', () => {
    listener(document.mozFullScreen)
  }, false)
  document.addEventListener('msFullscreenElement', () => {
    listener(document.mozFullScreen)
  }, false)
  document.addEventListener('webkitfullscreenchange', () => {
    listener(document.webkitIsFullScreen)
  }, false)
}
