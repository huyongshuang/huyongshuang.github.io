import os
import shutil
import tkinter as tk
from tkinter import filedialog

# ==================== 配置 ====================
USE_PADDED_NUMBERING = True  # True: -01, -02, -03 (超过99个时自动扩展为3位); False: -1, -2, -3
# ============================================

# 全局变量
last_directory = None
overwrite_mode = None  # None: 未设置, True: 覆盖原图, False: 不覆盖原图

def get_numbering_format(num_files, index):
    """
    根据配置和文件数量生成编号
    """
    if USE_PADDED_NUMBERING:
        # 自动扩展位数
        if num_files > 99:
            digits = max(3, len(str(num_files)))
        else:
            digits = 2
        return f"-{index:0{digits}d}"
    else:
        return f"-{index}"

def select_files(title="选择文件"):
    """
    打开文件选择对话框，支持多选，记住上次路径
    """
    global last_directory
    
    root = tk.Tk()
    root.withdraw()  # 隐藏主窗口
    
    # 如果之前有路径，使用它；否则使用默认路径
    initial_dir = last_directory if last_directory else os.getcwd()
    
    files = filedialog.askopenfilenames(
        title=title,
        initialdir=initial_dir,
        multiple=True
    )
    
    if files:
        # 记住最后选择的文件所在目录
        last_directory = os.path.dirname(files[0])
    
    root.destroy()
    return list(files)

def select_folder(title="选择输出文件夹"):
    """
    打开文件夹选择对话框，记住上次路径
    """
    global last_directory
    
    root = tk.Tk()
    root.withdraw()
    
    initial_dir = last_directory if last_directory else os.getcwd()
    
    folder = filedialog.askdirectory(
        title=title,
        initialdir=initial_dir
    )
    
    if folder:
        last_directory = folder
    
    root.destroy()
    return folder

def rename_files(files, base_name, output_dir=None):
    """
    重命名文件
    如果output_dir为None，则覆盖原文件（在原位置重命名）
    否则将重命名后的文件复制/移动到output_dir
    """
    if not files:
        print("未选择任何文件")
        return
    
    num_files = len(files)
    renamed_files = []
    
    for idx, file_path in enumerate(files, start=1):
        # 获取原文件扩展名
        _, ext = os.path.splitext(file_path)
        
        # 生成编号
        numbering = get_numbering_format(num_files, idx)
        
        # 新文件名
        new_name = f"{base_name}{numbering}{ext}"
        
        if output_dir:
            # 复制到新路径
            new_path = os.path.join(output_dir, new_name)
            shutil.copy2(file_path, new_path)
        else:
            # 在原地重命名
            new_path = os.path.join(os.path.dirname(file_path), new_name)
            os.rename(file_path, new_path)
        
        renamed_files.append((os.path.basename(file_path), new_name))
        print(f"  {os.path.basename(file_path)} -> {new_name}")
    
    return renamed_files

def process_rename():
    """
    执行一次重命名流程
    """
    global overwrite_mode, last_directory
    
    # 第一步：根据设置选择文件（和输出文件夹）
    if overwrite_mode:
        # 覆盖原图模式：直接选择文件
        print("\n当前模式：覆盖原图")
        print("请选择要重命名的文件...")
        files = select_files("选择要重命名的文件（覆盖原图）")
        output_dir = None
    else:
        # 不覆盖原图模式：先选择输出文件夹，再选择文件
        print("\n当前模式：不覆盖原图")
        print("请选择输出文件夹...")
        output_dir = select_folder("选择重命名后文件的存放位置")
        
        if not output_dir:
            print("未选择输出文件夹，操作取消")
            return False
        
        print("请选择要重命名的文件...")
        files = select_files("选择要重命名的文件")
    
    if not files:
        print("未选择任何文件，操作取消")
        return False
    
    # 第二步：输入重命名的基准名称
    print(f"\n已选择 {len(files)} 个文件：")
    for i, f in enumerate(files, 1):
        print(f"  {i}. {os.path.basename(f)}")
    
    base_name = input("重命名为：").strip()
    
    if not base_name:
        print("文件名不能为空，操作取消")
        return False
    
    # 第三步：执行重命名
    print(f"\n正在重命名 {len(files)} 个文件...")
    renamed = rename_files(files, base_name, output_dir)
    
    if renamed:
        print(f"\n重命名完成！共处理 {len(renamed)} 个文件")
        if not overwrite_mode and output_dir:
            print(f"文件已保存至：{output_dir}")
    
    return True

def main():
    global overwrite_mode, last_directory
    
    print("=" * 50)
    print("       文件批量重命名工具")
    print("=" * 50)
    
    # 首次运行时询问是否覆盖原图
    while overwrite_mode is None:
        choice = input("\n是否覆盖原图？（Y/N，默认N）: ").strip().upper()
        
        if choice == 'Y':
            overwrite_mode = True
            print("已选择：覆盖原图模式（在原位置直接重命名）")
        elif choice == 'N' or choice == '':
            overwrite_mode = False
            print("已选择：不覆盖原图模式（文件将复制到新位置）")
        else:
            print("输入无效，请输入Y或N")
    
    # 进入重命名循环
    while True:
        # 执行一次重命名
        success = process_rename()
        
        # 询问是否继续
        print("\n" + "-" * 50)
        choice = input("继续重命名？（按回车继续，输入其他任意字符退出）: ")
        
        if choice.strip() == '':
            # 继续，保持当前的overwrite_mode设置
            continue
        else:
            print("\n程序退出。")
            break

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n程序被中断，退出")
    except Exception as e:
        print(f"\n发生错误: {e}")