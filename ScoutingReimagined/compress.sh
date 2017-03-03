#/bin/bash
#keep in mind that rules.d should be configured to call this

#ffmpeg should be installed :D
function getlast()
{
	cd dev/sdb #assuming the sdcard mounts @ sdb
	lastfile = ls -v | tail -n 1
}
getlast()
echo "DEBUG: The highest-numbered file is $lastfile"

output = "dev/sdc/output.mp4" #assuming the sdcard mounts @ sdc
echo "DEBUG: output dir set to $output"

ffmpeg -i input -c:v libx264 -crf 23 -preset medium -c:a libfdk_aac -vbr 4 \
-movflags +faststart -vf scale=-2:720,format=yuv420p $output
echo "procces succeded. check $output for your file"