#!/usr/bin/env bash
# 把视频压成适合网页的 GIF（两遍调色板，画质比直接转好很多）
# 用法：scripts/make-gif.sh 输入视频 输出.gif [开始秒数=0] [时长秒数=8] [宽度=720] [帧率=12]
# 例子：scripts/make-gif.sh ~/Videos/demo.mp4 public/images/x2/demo.gif 3 6 640 12
set -euo pipefail

in=${1:?请给出输入视频路径}
out=${2:?请给出输出 GIF 路径}
start=${3:-0}
dur=${4:-8}
width=${5:-720}
fps=${6:-12}

palette=$(mktemp --suffix=.png)
trap 'rm -f "$palette"' EXIT

filters="fps=${fps},scale=${width}:-2:flags=lanczos"
ffmpeg -loglevel error -y -ss "$start" -t "$dur" -i "$in" -vf "${filters},palettegen=stats_mode=diff" "$palette"
ffmpeg -loglevel error -y -ss "$start" -t "$dur" -i "$in" -i "$palette" \
  -lavfi "${filters} [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" "$out"

echo "已生成 $out（$(du -h "$out" | cut -f1)）"
