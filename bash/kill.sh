
name=$1
kill $(ps ax | grep "$name" | awk '{print $1}')
