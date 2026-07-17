# 扫描 photos 图片文件名并写入 yaml 配置文件

import os
import re

# 基础路径、文件名、格式配置
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PHOTOS_DIR = os.path.join(BASE_DIR, "photos")
CONFIG_YML_PATH = os.path.join(BASE_DIR, "config.yml")
NAME_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}-\d+$")
ALLOW_EXT = {"jpg", "png", "gif", "mp4"}

def scan_local_photos():
    local_file_keys = set()
    if not os.path.exists(PHOTOS_DIR):
        print(f"❌ 错误：未找到 photos 文件夹，路径：{PHOTOS_DIR}")
        return local_file_keys

    for filename in os.listdir(PHOTOS_DIR):
        full_path = os.path.join(PHOTOS_DIR, filename)
        if os.path.isdir(full_path):
            continue
        file_id, ext = os.path.splitext(filename)
        ext = ext.lstrip(".").lower()
        if ext not in ALLOW_EXT:
            continue
        if not NAME_PATTERN.match(file_id):
            continue
        local_file_keys.add((file_id, ext))
    return local_file_keys

def build_media_yaml_text(item_list):
    lines = ["local_media_list:"]
    for item in item_list:
        fid = item["id"]
        fext = item["ext"]
        name = item["name"]
        desc = item["description"]
        lines.append(f"  - id: {fid}")
        lines.append(f"    ext: {fext}")
        lines.append(f"    name: '{name}'")
        lines.append(f"    description: '{desc}'")
    block_content = "\n".join(lines) + "\n"
    return block_content

def sync_media_config():
    local_keys = scan_local_photos()
    total_local_count = len(local_keys)
    if total_local_count == 0:
        print("⚠️ 警告：本地 photos 文件夹无符合格式的文件")

    with open(CONFIG_YML_PATH, "r", encoding="utf-8") as f:
        raw_content = f.read()

    item_pattern = re.compile(r"-\s+id:\s*(\S+)\s*\n\s+ext:\s*(\S+)\s*\n\s+name:\s*'?(.*?)'?\s*\n\s+description:\s*'?(.*?)'?", re.S)
    old_list_block_pattern = re.compile(r"local_media_list:(.*?)(?=\n#|\n\w+:|\Z)", re.S)
    block_match = old_list_block_pattern.search(raw_content)
    old_items = []
    full_item_list = []

    if not block_match:
        print("⚠️ 检测到配置文件不存在 local_media_list 节点，将自动创建并写入数据")
        old_keys = set()
        valid_old = []
    else:
        block_text = block_match.group(1)
        for m in item_pattern.finditer(block_text):
            old_items.append({
                "id": m.group(1),
                "ext": m.group(2),
                "name": m.group(3),
                "description": m.group(4)
            })
        local_key_set = local_keys
        old_keys = set((i["id"], i["ext"]) for i in old_items)
        valid_old = [i for i in old_items if (i["id"], i["ext"]) in local_key_set]

    add_count = 0
    new_items = []
    sorted_local = sorted(list(local_keys), key=lambda x: x[0])
    for fid, fext in sorted_local:
        if (fid, fext) not in old_keys:
            add_count += 1
            new_items.append({"id": fid, "ext": fext, "name": "", "description": ""})

    full_item_list = valid_old + new_items
    full_item_list.sort(key=lambda x: x["id"])
    new_block_text = build_media_yaml_text(full_item_list)

    if block_match:
        final_content = old_list_block_pattern.sub(new_block_text, raw_content)
    else:
        final_content = raw_content.rstrip() + "\n\n" + new_block_text

    with open(CONFIG_YML_PATH, "w", encoding="utf-8") as f:
        f.write(final_content)

    del_count = len(old_items) - len(valid_old)
    print("=" * 40)
    print(f"✅ 同步完成！")
    print(f"📁 本地 photos 文件夹识别总文件数：{total_local_count}")
    print(f"➕ 本次新增写入配置的文件数：{add_count}")
    print(f"➖ 本次删除配置中本地不存在的条目数：{del_count}")
    print(f"📋 配置文件中最终 local_media_list 条目数：{len(full_item_list)}")
    print("=" * 40)

if __name__ == "__main__":
    try:
        sync_media_config()
    except Exception as err:
        print(f"❌ 程序运行异常：{err}")
    input("\n按回车键关闭窗口...")