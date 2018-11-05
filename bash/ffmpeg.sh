

# trim a 20 second piece beginning at 25 sec

ffmpeg -ss 00:00:25.0 -i josef.wav -c copy -t 00:00:20.0 josef-short.wav