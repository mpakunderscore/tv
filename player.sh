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

        file=$(ls $VideoLocation | sort -R | tail -1);
        clear
        omxplayer -r "$VideoLocation/$file" > /dev/null

fi
done