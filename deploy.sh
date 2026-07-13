#!/bin/bash

while [[ "$#" -gt 0 ]]; do
    case $1 in
        -h|--help)
            echo "Usage: deploy.sh [deploy <zh|en|all>|server <zh|en>|-h]"
            echo "选项："
            echo "  [deploy|d] zh   部署中文网站"
            echo "  [deploy|d] en   部署英文网站"
            echo "  [deploy|d] all  部署全部"
            echo "  [server|s] zh   启动本地中文服务器"
            echo "  [server|s] en   启动本地英文服务器"
            echo "  -h, --help      显示帮助页面"
            exit 0
            ;;
        d | deploy)
            lang=$2
            if [ "$lang" = "zh" ] || [ "$lang" = "en" ]; then
                cp "_config-$lang.yml" "_config.yml"
                cp "_config.butterfly-$lang.yml" "_config.butterfly.yml"
                npm run deploy && npm run rm
                echo "$1 部署成功！"
            elif [ "$lang" = "all" ]; then
                for lang_choice in "zh" "en"; do
                    cp "_config-$lang_choice.yml" "_config.yml"
                    cp "_config.butterfly-$lang_choice.yml" "_config.butterfly.yml"
                    npm run deploy && npm run rm
                    echo "$lang_choice 部署成功！"
                done
            else
                echo "输入错误！请输入'deploy <zh|en|all>'！"
            fi
            shift
            ;;
        s | server)
            lang=$2
            if [ "$lang" = "zh" ] || [ "$lang" = "en" ]; then
                clean_temp_conf() {
                    echo -e "\n[清理] 自动删除临时配置文件"
                    npm run rm
                }
                trap clean_temp_conf EXIT SIGINT SIGTERM SIGHUP
                cp "_config-$lang.yml" "_config.yml"
                cp "_config.butterfly-$lang.yml" "_config.butterfly.yml"
                npm run server
                echo "启动服务器！"
            else
                echo "输入错误！请输入'server <zh|en>'！"
            fi
            shift
            ;;
        *)
        echo "输入错误！请输入'deploy <zh|en|all>'或'server <zh|en>'或者'-h'获取帮助！"
            exit 1
            ;;
    esac
    shift
done