# NES/FC 红白机模拟器

- **在线试玩**：<https://luckyk255.github.io/fc-simulator/main.html>

1. **推荐（最简单）**：打开 [Pages 设置](https://github.com/luckyk255/fc-simulator/settings/pages) → **Build and deployment** → **Source** 选 **Deploy from a branch** → Branch 选 **`main`**，文件夹选 **`/(root)`** → Save。成功后访问：<https://luckyk255.github.io/fc-simulator/main.html>
2. **或用 Actions**：同一页面把 **Source** 改为 **GitHub Actions**，再到 [Actions](https://github.com/luckyk255/fc-simulator/actions) 里手动运行 **Deploy GitHub Pages**，等该 workflow 成功（绿勾）。**注意**：Source 必须和实际使用的方式一致，否则不会出站。

若仓库是 **Private** 且账户为免费版，GitHub 可能不提供公开 Pages，需将仓库改为 **Public** 或升级付费方案（以 [GitHub 文档](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) 为准）。

**可玩性**：已在本地用 `python3 -m http.server` 校验 `main.html`、`demoGame.min.js`、`emu_core_js/cpu.js` 等请求均为 HTTP 200，资源路径与项目站点子路径 `/fc-simulator/` 兼容。

**一句话概括**: 这是一个用纯 JavaScript 编写的"任天堂红白机"模拟器,它能在电脑浏览器里模拟运行当年的小霸王游戏卡带。

## 🎯 核心思想(五分钟看懂)

红白机游戏卡带本质上是一个"微型程序"。这个模拟器的工作就是：

1. **假扮成硬件**: 假装自己就是红白机的 CPU、显卡、声卡
2. **读取游戏数据**: 从 `.nes` 文件(游戏卡带的数字版)读取程序代码
3. **逐条执行**: 像翻译官一样,把游戏的每一条指令翻译成电脑能懂的指令
4. **画面输出**: 把游戏画面画到网页的 Canvas 上(就像连环画,每秒画60张)
5. **声音播放**: 用浏览器的音频 API 模拟游戏音效
6. **接收操作**: 把你在键盘上的按键,转换成游戏手柄的信号

**简单说: 模拟器 = 虚拟的红白机硬件 + 游戏翻译官 + 画面声音播放器**

## 项目简介

这是一个功能完整的 NES/FC 游戏模拟器实现,基于 HTML5、Canvas 和 WebAudio API 构建,无需任何额外依赖。模拟器内置了演示游戏,同时也支持加载外部 `.nes` 格式的游戏 ROM 文件。

### 核心技术特点

- **纯 JavaScript 实现**: 无第三方依赖,仅使用浏览器原生功能
- **高性能模拟**: 在老旧设备上也能流畅运行
- **完整硬件模拟**: 实现了 CPU(大脑)、PPU(显卡)、APU(声卡)等核心组件
- **现代 Web 技术**: 使用 WebAudio API 和 Canvas 渲染

## 🎮 快速开始

### 方法1: 直接运行(最简单)

打开 `main.html` 文件,就像打开普通网页一样:
- **Windows**: 双击 `main.html` 文件
- **macOS**: 右键选择用浏览器打开 `main.html`
- **Linux**: 使用浏览器打开 `main.html`

项目内置了经典游戏 **Super Mario Bros. (超级马里奥兄弟)**,打开就能玩!

### 方法2: 加载你自己的游戏

支持拖拽加载 `.nes` 格式游戏文件:

1. 打开 `main.html` 文件 (先运行模拟器)
2. 从电脑里找到 `.nes` 游戏文件
3. 拖拽游戏文件到浏览器页面
4. 松开鼠标,游戏自动加载运行

**支持的游戏类型 (Mapper)**:
- ✅ Mapper 0 (最简单的游戏卡带)
- ✅ Mapper 1 (大部分游戏,部分支持)
- ✅ Mapper 2 (经典游戏如马里奥)
- ✅ Mapper 3 (部分游戏)

## ⚙️ 功能特色

### 游戏控制(两套操作方案)

就像拥有两个不同按键布局的手柄:

| 游戏功能 | 方案1: 方向键布局 | 方案2: WASD布局 |
|---------|------------------|----------------|
| 向上走 | ↑ 方向键 | **W** |
| 向下走 | ↓ 方向键 | **S** |
| 向左走 | ← 方向键 | **A** |
| 向右走 | → 方向键 | **D** |
| A键(跳/攻击) | **Z** | **K** |
| B键(跑/取消) | **X** | **J** |
| SELECT(选择) | **2** | **G** |
| START(开始) | **1** | **H** |

💡 **小提示**: 可根据自己的习惯随时切换

### 开发者调试工具(高级功能)

如果你是开发者或想深入了解游戏运行原理,这些工具会很有用:

- **CPU监控**: 像心电图一样实时显示CPU寄存器状态
- **断点调试**: 让游戏在特定代码位置停下来(类似暂停键的超精准版本)
- **内存监视**: 偷看游戏内部的临时数据存储
- **单步执行**: 一次只执行一条CPU指令,观察每一步的变化
- **多步执行**: 一次执行100条指令,快速推进
- **帧调试**: 执行到下一帧画面之前暂停(研究画面渲染)
- **背景查看器**: 查看游戏背景图块的原始数据

### 显示选项

- **原始画质(1x) vs 高清画质(2x)**: 256×240 或 512×480 分辨率
- **像素完美**: 关闭平滑处理,保留经典像素风格(更像原版红白机)

## 浏览器兼容性

推荐使用 Chrome 系浏览器（Chrome、Edge、Opera）以获得最佳性能和兼容性。

已知问题：
- APU 尚未实现噪声通道和 DMC 通道
- DMC 对应的 IRQ 功能不支持
- Mapper 1 的部分变体未支持

## 技术实现

### 架构概览

```
src/
├── app.js              # Electron 应用入口（Node-Webkit 构建）
├── style.css           # 应用样式
└── vconsole.min.js     # 移动调试工具

emu_core_js/            # 模拟器核心实现
├── utils.js            # 工具函数
├── cpu.js              # 6502 CPU 模拟
├── ppu.js              # PPU 图像处理器模拟
├── apu.js              # APU 音频处理器模拟
├── cpumemory.js        # CPU 内存管理
├── ppumemory.js        # PPU 内存管理
├── machine.js          # 核心机器状态管理
├── mapper.js           # Mapper 实现
├── joystick.js         # 控制器输入处理
├── ines.js             # iNES ROM 格式解析
├── debugger.js         # 调试功能实现
└── dragdrop.js         # 拖拽加载功能
```

### 核心组件

- **CPU**：基于 6502 架构的 CPU 模拟器，支持所有标准指令集
- **PPU**：图像处理器，负责图像渲染和精灵管理
- **APU**：音频处理器，使用 WebAudio API 生成游戏音效
- **Memory**：内存管理器，处理 CPU 和 PPU 的内存访问
- **Mapper**：卡带映射器，支持多种游戏卡带类型

## 开发信息

### 项目结构

```
fc-simulator/
├── emu_core_js/        # 模拟器核心代码
├── src/               # 应用代码
├── demoGame.min.js    # 内置游戏（NovaTheSquirrel）
├── main.html          # 主页面
├── main.js            # 页面逻辑
├── main.css           # 页面样式
├── index.html         # 备用入口
└── package.json       # 项目配置
```
