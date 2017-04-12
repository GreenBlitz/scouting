# Welcome to GreenBlitz's Scouting System

## Installation Instructions
### Prerequisites
#### Docker
>Follow the appropriate [installation instructions](https://docs.docker.com/engine/getstarted/step_one/) for your operating system
#### Docker-Compose
>Follow the appropriate [installation instructions](https://docs.docker.com/compose/install/) for your operating system

### Install
That is it. Now you are ready to deploy your first scouting system ! :D
It's as easy as:
1. `cd <ROOT_REPOSITORY_CLONE_DIRECTORY>`
2. If this is your first time installing the system run: `sudo sysctl -w vm.max_map_count=262144`
3. `sudo docker-compose up`

* Your webapp will be found under the `port 3000`
* Your elastic search cluster will be found under the `port 9200`
* Your kibana instance will be found under the `port 5601`

Enjoy!

### DB Dumps
#### Dump Data
Dumps the current elastic search and kibana data to a dump file. The default file path is in db_dumps and the name of the dump file will contain thee timestamp from the time it was created.
```
usage: dumpAllData.py [-h] [--host HOST] [--port PORT] [--filepath FILEPATH]

Reads all data from a scouting database and dumps it into a pickle file

optional arguments:
  -h, --help           show this help message and exit
  --host HOST
  --port PORT
  --filepath FILEPATH
```
#### Insert Data
Inserts the data stored in the specified dump file to an elastic search cluster and a kibana instance.
```
usage: insertData.py [-h] [--host HOST] [--port PORT] filepath

Reads a database dump file and inserts it into a current live database

positional arguments:
  filepath

optional arguments:
  -h, --help   show this help message and exit
  --host HOST
  --port PORT
```
e.g. `python insertData.py db_dumps/currentDump.p`

## Youtube Record Stream Script Instructions
### Prerequisites
1. To download the youtube-dl tool run `sudo ./get-youtube-dl.sh` 
2. [Compile ffmpeg from source](https://trac.ffmpeg.org/wiki/CompilationGuide) - Use the apropriate guide for your operating system.
* When running the final ./configure command e.g. in this [Ubuntu Guide](https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu#ffmpeg) add `--with-openssl` to the list of flags
### Usage
To Download a video, pleasee configure the recordGame.sh script correctly and run it like so: `./recordGame.sh <GAME_ID>.mp4` where <GAME_ID> is a number that represents the gamee's ID in the system.
To configure the script correctly set 2 environment variables:
1. `export YOUTUBE_STREAM_URL=<YOUTUBE_STREAM_URL>` where <YOUTUBE_STREAM_URL> is the url you get from right clicking the video in youtube and copying the video url
2. `export YOUTUBE_STREAM_FORMAT=<YOUTUBE_STREAM_FORMAT>` where <YOUTUBE_STREAM_FORMAT> is the integer value for the format you choose following the command `./youtube-dl-script <YOUTUBE_STREAM_URL>` e.g. 95

Now run `./recordGame.sh 1.mp4` for example.
To cut off the live recording press Ctrl^C.
Remember to use only one  Ctrl^C when closing the ffmpeg stream recording.

