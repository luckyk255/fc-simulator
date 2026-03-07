/**
 * 红白机主控制器 - 整个模拟器的"大脑"
 *
 * 作用: 协调管理所有硬件组件,确保它们像真正的红白机一样协同工作
 * 类比: 这就像一个乐队的指挥,让所有乐器在正确的时间演奏
 */
class Machine {
    constructor() {
        // ===== 初始化所有硬件组件 =====
        // 就像组装一台新的红白机,需要把各个部件插好

        this.cpu = new CPU()              // CPU: 中央处理器,游戏代码的执行者
        this.ppu = new PPU()              // PPU: 图像处理器,负责把画面画到屏幕上
        this.cpumem = new CPUMemory()     // CPU内存: 存储游戏运行时的临时数据
        this.ppumem = new PPUMemory()     // PPU内存: 存储图像相关的数据

        // 把这些组件互相连接起来
        // 就像插游戏机卡槽,让所有部件能互相通信
        this.cpu.machine = this
        this.ppu.machine = this
        this.cpumem.machine = this
        this.ppumem.machine = this

        // 建立组件之间的直接联系
        this.ppumem.ppu = this.ppu        // PPU内存要知道它的"主人"PPU是谁
        this.ppu.mem = this.ppumem        // PPU要知道去哪里读写图像数据
        this.cpu.mem = this.cpumem        // CPU要知道去哪里读写普通数据

        this.apu = new APU(this)          // APU: 音频处理器,负责播放声音
        this.joy1 = new Joystick()        // 手柄: 接收玩家的操作输入
        // 暂不使用2P手柄 (可以扩展但暂不实现)

        this.framecount = 1               // 帧计数器: 记录已经画了多少帧画面
    }

    /**
     * 执行一帧画面 - 模拟器的核心循环
     *
     * 一帧的定义: 从PPU的Vblank(垂直空白期)开始,到下一个Vblank之前结束
     * 红白机每秒运行60帧画面,就像翻书,快速翻动就能看到动画
     *
     * 工作流程:
     * 1. CPU一直执行游戏代码,直到画完这一帧所需的时间
     * 2. 在合适的时机,PPU开始渲染画面
     * 3. 一帧结束后,播放声音(APU),准备下一帧
     */
    runframe() {
        // 只要CPU的工作时间还没到这一帧的结束时间,就继续执行指令
        while (this.cpu.cycleCount < this.cpu.targetCount) {

            // 检查是否需要渲染画面
            // 条件1: PPU当前没有在渲染中
            // 条件2: CPU已经执行到该渲染的时间点了
            if ((!(this.ppu._inRenderingProcess)) && (this.cpu.cycleCount > this.ppu._NMI_CYCLE)) {
                this.ppu.render()  // 告诉PPU: "该你画图了!"
            }

            // CPU执行一条指令(可能是"马里奥向左走",也可能是"播放音效")
            this.cpu.runStep()
        }

        // ===== 这一帧结束了,准备下一帧 =====
        this.apu.play()                 // APU: 播放这一帧的声音
        this.ppu.startVblank()         // PPU: 开始垂直空白期(准备下一帧)
        this.framecount++              // 帧计数器加1
        this.cpu.cycleCount = 0        // CPU工作时间归零,准备计算下一帧
    }

    /**
     * 单步执行 - 主要用于调试
     *
     * 和runframe()类似,但只执行一条指令就停下来
     * 用于调试时逐条观察代码执行过程
     */
    runstep() {
        // 同样的,检查是否需要渲染
        if ((!(this.ppu._inRenderingProcess)) && (this.cpu.cycleCount > this.ppu._NMI_CYCLE)) {
            this.ppu.render()
        }

        // 只执行一条指令
        this.cpu.runStep()

        // 如果CPU执行时间已经达到一帧的长度
        if (this.cpu.cycleCount >= this.cpu.targetCount) {
            this.apu.play()             // 播放声音
            this.ppu.startVblank()     // 开始下一帧
            this.cpu.cycleCount = 0    // 重置CPU时间计数
            this.framecount++          // 帧数加1
        }
    }

    /**
     * 载入游戏ROM - 就像把游戏卡带插进游戏机
     *
     * @param {Array} rom - 游戏ROM文件的数据(从.nes文件读取的内容)
     */
    loadrom(rom) {
        // 解析ROM文件格式 (红白机ROM使用iNES标准格式)
        this.ines = new INES(rom)

        // 根据ROM的类型创建对应的Mapper (卡带类型不同,内存映射方式不同)
        this.mapper = Mapper.newMapper(this, this.ines.getMapperNo())

        // 初始化Mapper (就像给卡带通电)
        this.mapper.InitWithPowerOnOrReset()

        this.framecount = 1  // 重置帧计数器
        this.init()          // 初始化模拟器状态
    }

    /**
     * 初始化模拟器 - 就像给新游戏机通电
     *
     * 设置CPU的初始状态,初始化PPU的图像设置,重置APU音频
     */
    init() {
        this.cpu.setRESET()                   // CPU: 设置为开机/复位状态
        this.ppu.ppuInit(this.ines.getMirroring())  // PPU: 根据ROM设置屏幕翻转模式
        this.apu.resetPulseDuty()            // APU: 重置音频脉冲的占空比

        // 调试功能: 交替填充内存为0x00和0xFF
        // 这样做的好处: DEBUG时容易观察内存变化(像棋盘一样黑白分明)
        let mem = this.cpu.mem
        for (var i = 0; i < 0x800; i++) {
            mem._address[i] = ((i & 7) < 4) ? 0 : 0xFF
        }
    }
}