# NES/FC 红白机模拟器

一个使用纯 JavaScript 编写的 NES/FC（红白机）游戏模拟器，无需任何额外依赖，可直接在现代浏览器中运行。

## 项目简介

这是一个功能完整的 NES/FC 游戏模拟器实现，基于 HTML5、Canvas 和 WebAudio API 构建。模拟器内置了基 ♂ 的演示游戏 **Nova The Squirrel**，同时也支持加载外部 `.nes` 格式的游戏 ROM 文件。

### 核心技术特点

- **纯 JavaScript 实现**：无第三方依赖，仅使用原生 Web API
- **高性能模拟**：在老旧设备（如 ThinkPad T14）上也能流畅运行
- **完整硬件模拟**：实现了 CPU、PPU、APU 等核心组件
- **WebAudio 音频**：使用现代 WebAudio API 实现游戏音效
- **Canvas 渲染**：基于 Canvas 的高性能图形渲染

## 快速开始

### 1. 直接运行

打开 `main.html` 文件即可开始游戏：
- **Windows**：双击 `main.html` 文件
- **macOS**：右键选择用浏览器打开 `main.html`
- **Linux**：使用浏览器打开 `main.html`

项目内置了开源游戏 **Super Mario Bros.**，打开即可直接游玩。

### 2. 加载外部游戏

支持拖拽 `.nes` 格式 ROM 文件到页面中加载：

1. 打开 `main.html` 文件
2. 从文件管理器中拖拽 `.nes` 文件到浏览器页面
3. 松开鼠标开始加载并运行游戏

**支持的 Mapper 类型**：
- Mapper 0
- Mapper 1（支持部分变体）
- Mapper 2
- Mapper 3

## 功能特色

### 游戏控制

提供两种控制方案，可按需切换：

| 功能 | 方案 1 | 方案 2 |
|------|--------|--------|
| 上 | ↑ 方向键 | W |
| 下 | ↓ 方向键 | S |
| 左 | ← 方向键 | A |
| 右 | → 方向键 | D |
| A 键 | Z | K |
| B 键 | X | J |
| SELECT | 2 | G |
| START | 1 | H |

### 调试功能

内置强大的调试系统：

- **CPU 状态监控**：实时显示寄存器状态
- **断点调试**：支持在指定地址设置断点
- **内存监视**：实时查看内存区域内容
- **单步执行**：逐条指令执行
- **多步执行**：一次执行 100 条指令
- **帧调试**：执行到下一帧前暂停
- **背景查看器**：查看背景图块和临时缓冲区

### 显示选项

- **1x / 2x 渲染**：可切换原始分辨率（256x240）和双倍分辨率（512x480）
- **像素完美渲染**：禁用图像平滑，保留经典像素风格

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