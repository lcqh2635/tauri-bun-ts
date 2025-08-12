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

            #[cfg(desktop)]
            // create_system_tray(app);

            // 钩子期望一个 Ok 结果
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
