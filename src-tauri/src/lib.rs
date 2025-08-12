mod commands;
mod core;
mod models;
mod plugins;
mod utils;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // 使用设置挂钩执行与设置相关的任务
        // 在主循环之前运行，因此尚未创建任何窗口
        .setup(|app| {

            // 创建一个自动启动插件，在系统启动时自动启动您的应用程序
            // 具体使用请参考 https://v2.tauri.org.cn/plugin/autostart/
            #[cfg(desktop)]
            app.handle()
                .plugin(tauri_plugin_autostart::init(
                    /* 要传递给应用的任意数量的参数 */
                    tauri_plugin_autostart::MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"])
                ))
                .expect("TODO: panic message");

            // 添加二维码扫描插件，允许您的移动应用程序使用相机扫描二维码、EAN-13 和其他类型的条形码。
            // 具体使用请参考 https://v2.tauri.org.cn/plugin/barcode-scanner/
            #[cfg(mobile)]
            app.handle()
                .plugin(tauri_plugin_barcode_scanner::init())
                .expect("TODO: panic message");


            // 钩子期望一个 Ok 结果
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_os::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
