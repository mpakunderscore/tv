#!/usr/bin/env bash

# get rid of the cursor
setterm -cursor off

# set here the path to the directory containing your videos
VideoLocation="/home/pi/tv/videos$1"
echo $VideoLocation

# you can probably leave this alone
Process="omxplayer"

# our loop
while true; do

        if ps ax | grep -v grep | grep $Process > /dev/null
        then
        sleep 1;

else
        ls $VideoLocation | sort -R | tail -1 | while read file;
        do
                clear
                # -r for stretched over the entire location
                omxplayer -r $file > /dev/null
        done
fi
done