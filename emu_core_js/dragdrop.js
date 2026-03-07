// *******************************************
//
// 处理拖放ROM文件到窗口中的事件
//
// 工作流:
// 1. 用户拖拽.nes文件到浏览器窗口
// 2. 阻止默认行为(避免浏览器直接打开文件)
// 3. 使用FileReader读取文件内容
// 4. 将文件数据转换为Uint8Array格式
// 5. 调用machine.loadrom(rom)加载游戏
// 6. 执行回调函数callback(),重新启动模拟器
//
// 重要: 由于浏览器安全策略,音频必须在用户交互后启动,
//       所以callback()中需要调用machine.apu.start()
// *******************************************

class DragDrop {
    constructor(machine, el, callback) {
        this.machine = machine
        this.el = el
        this.init()
        this.callback = callback
    }

    init(){
        var self = this
        self.el.ondragover = function (e) {
            e.preventDefault()  // 阻止默认事件
        }

        self.el.ondrop = function (e) {
            e.preventDefault()                  // 阻止默认事件
            var f = e.dataTransfer.files[0]     // 获取file
            var file = new FileReader()         //新建FileReader  用来读取文件

            //文件读取完成后
            file.onload = function (e) {
                var rom =  new Uint8Array(file.result)
                self.machine.loadrom(rom)
                self.callback()
            }
            file.readAsArrayBuffer(f);          // 将f当做数组buffer处理
        }
    }
}