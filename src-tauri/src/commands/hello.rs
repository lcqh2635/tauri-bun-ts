// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
pub fn hello(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
