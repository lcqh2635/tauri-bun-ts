
   ```bash
   # 本机系统对话框，用于打开和保存文件，以及消息对话框
   # https://tauri.app/zh-cn/plugin/dialog/
   bun tauri add dialog
   # 使用剪贴板插件读取和写入系统剪贴板
   # https://tauri.app/zh-cn/plugin/clipboard/
   bun tauri add clipboard-manager
   # 访问文件系统
   # https://tauri.app/zh-cn/plugin/file-system/
   bun tauri add fs
   # 使用 HTTP 插件发起 HTTP 请求
   # https://tauri.app/zh-cn/plugin/http-client/
   bun tauri add http
   # 为你的 Tauri 应用程序配置日志记录
   # https://tauri.app/zh-cn/plugin/logging/
   bun tauri add log
   # 使用通知提示插件以向你的用户发送原生通知
   # https://tauri.app/zh-cn/plugin/notification/
   bun tauri add notification
   # 此插件允许你在指定的或默认的应用程序中打开文件和 URL。它还支持在系统的文件资源管理器中“显示”文件。
   # 默认已安装，https://v2.tauri.org.cn/plugin/opener/
   bun tauri add opener
   # 使用操作系统信息插件读取操作系统信息
   # https://tauri.app/zh-cn/plugin/os-info/
   bun tauri add os
   # 保存文件系统和资源作用域，并在重新打开应用程序时恢复它们。
   # https://v2.tauri.org.cn/plugin/persisted-scope/
   bun tauri add persisted-scope
   # 这个插件提供了一个接口，让前端可以通过 sqlx 与 SQL 数据库进行通信。 它支持 SQLite、MySQL 和 PostgreSQL 驱动程序，通过 Cargo 特性来启用。
   # https://tauri.app/zh-cn/plugin/sql/
   bun add @tauri-apps/plugin-sql
   # 简单、持久的键值存储
   # https://tauri.app/zh-cn/plugin/store/
   bun tauri add store
   # https://v2.tauri.org.cn/plugin/stronghold/
   # 使用 IOTA Stronghold 密钥管理引擎存储密钥和秘密。
   bun tauri add stronghold
   # 过 HTTP 从磁盘上传文件到远程服务器。从远程 HTTP 服务器下载文件到磁盘
   # https://tauri.app/zh-cn/plugin/upload/
   bun tauri add upload
   # 在 JavaScript 中使用 Rust 客户端打开 WebSocket 连接
   # https://tauri.app/zh-cn/plugin/websocket/
   bun tauri add websocket
   
   
   # 桌面端有效
   # 在系统启动时自动启动应用程序
   # https://tauri.app/zh-cn/plugin/autostart/
   bun tauri add autostart
   # 注册全局快捷方式
   # https://tauri.app/zh-cn/plugin/global-shortcut/
   bun tauri add global-shortcut
   # 将窗口定位在众所周知的位置。
   # https://v2.tauri.org.cn/plugin/positioner/
   bun tauri add positioner
   # 使用单实例插件确保 Tauri 应用程序在同一时间只运行单个实例
   # https://tauri.app/zh-cn/plugin/single-instance/
   bun tauri add single-instance
   # 自动使用更新服务器或静态 JSON 更新你的 Tauri 应用程序
   # https://tauri.app/zh-cn/plugin/updater/
   bun tauri add updater
   # 保存窗口位置和大小，并在应用程序重新打开时恢复它们
   # https://tauri.app/zh-cn/plugin/window-state/
   bun tauri add window-state
   
   
   # 移动端有效
   # 允许您的移动应用程序使用相机扫描 QR 码、EAN-13 和其他类型的条形码
   # https://tauri.app/zh-cn/plugin/barcode-scanner/
   bun tauri add barcode-scanner
   # 提示用户在 Android 和 iOS 上进行生物识别身份验证。
   # https://v2.tauri.org.cn/plugin/biometric/
   bun tauri add biometric
   # 在 Android 和 iOS 上读取和写入 NFC 标签
   # https://tauri.app/zh-cn/plugin/nfc/
   bun tauri add nfc
   ```