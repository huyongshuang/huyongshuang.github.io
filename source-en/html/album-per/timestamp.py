# 把时间戳图片文件名转化为具体时间
# 支持固定路径和弹窗选择文件夹两种模式

import os
import shutil
from datetime import datetime
try:
    import tkinter as tk
    from tkinter import filedialog, messagebox
except ImportError:
    tk = None

# ======================== 配置区 ========================
USE_GUI = False  # False = 固定路径；True = 弹窗选择文件夹
SOURCE_FOLDER = r"input_dir"
DEST_FOLDER = r"photos"
IMAGE_SUFFIX = (".jpg", ".jpeg", ".png", ".gif", ".bmp", ".heic", ".webp")
# =======================================================

def timestamp_to_datetime(ts_str: str):
    try:
        ts = int(ts_str)
        if len(ts_str) == 13:
            dt = datetime.fromtimestamp(ts / 1000)
        elif len(ts_str) == 10:
            dt = datetime.fromtimestamp(ts)
        else:
            return None
        return dt
    except (ValueError, OSError):
        return None

def get_folder_path():
    global SOURCE_FOLDER, DEST_FOLDER
    if USE_GUI and tk:
        root = tk.Tk()
        root.withdraw()
        src = filedialog.askdirectory(title="选择源图片文件夹")
        if not src:
            messagebox.showinfo("提示", "未选择文件夹，退出")
            return None, None
        dst = filedialog.askdirectory(title="选择输出文件夹")
        if not dst:
            messagebox.showinfo("提示", "未选择文件夹，退出")
            return None, None
        return src, dst
    else:
        return SOURCE_FOLDER, DEST_FOLDER

def main():
    src_dir, dst_dir = get_folder_path()
    if not src_dir or not dst_dir:
        input("按回车退出")
        return

    try:
        os.makedirs(dst_dir, exist_ok=True)
        file_list = []
        for filename in os.listdir(src_dir):
            src_path = os.path.join(src_dir, filename)
            if not os.path.isfile(src_path):
                continue
            name_no_ext, ext = os.path.splitext(filename)
            if ext.lower() not in IMAGE_SUFFIX:
                continue
            dt_obj = timestamp_to_datetime(name_no_ext)
            if dt_obj is None:
                print(f"跳过无效文件：{filename}")
                continue
            file_list.append((dt_obj, src_path, ext))

        if not file_list:
            print("无合法时间戳图片")
            input("回车退出")
            return

        file_list.sort(key=lambda x: x[0])
        day_group = {}
        for dt, src, ext in file_list:
            day_key = dt.strftime("%Y-%m-%d")
            day_group.setdefault(day_key, []).append((dt, src, ext))

        total = 0
        for day, files in day_group.items():
            files.sort(key=lambda x: x[0])
            for idx, (dt, src_p, ext) in enumerate(files, 1):
                new_name = f"{day}-{idx:02d}{ext}"
                dst_p = os.path.join(dst_dir, new_name)
                shutil.copy2(src_p, dst_p)
                total += 1
                print(f"{os.path.basename(src_p)} → {new_name}")
        print(f"\n完成，共 {total} 张")
    except Exception as e:
        print(f"错误：{e}")
    input("\n按回车关闭")

if __name__ == "__main__":
    main()