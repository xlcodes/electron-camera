class Drag {
  private point: { x: number; y: number } = { x: 0, y: 0 }
  private body?: HTMLBodyElement

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  private mouseDownEvent(e: MouseEvent) {
    this.point = {
      x: e.pageX,
      y: e.pageY
    }

    const mouseMoveCallback = this.mouseMoveEvent.bind(this)

    // 绑定鼠标移动事件
    this.body?.addEventListener('mousemove', mouseMoveCallback)

    this.body?.addEventListener('mouseup', () =>
      this.body?.removeEventListener('mousemove', mouseMoveCallback)
    )
    this.body?.addEventListener('mouseout', () =>
      this.body?.removeEventListener('mousemove', mouseMoveCallback)
    )
  }

  private mouseMoveEvent(e: MouseEvent) {
    const x = e.pageX - this.point.x
    const y = e.pageY - this.point.y
    window.api.drag({ x, y })
  }

  public run() {
    window.addEventListener('DOMContentLoaded', () => {
      this.body = document.querySelector('body')!
      this.body.addEventListener('mousedown', this.mouseDownEvent.bind(this))
    })
  }
}

export default () => {
  const drag = new Drag()
  return { drag }
}
