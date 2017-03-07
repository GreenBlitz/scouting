#!/bin/bash
external_host=$1
./snapshot.sh $external_host events
./snapshot.sh $external_host games
./snapshot.sh $external_host team-game-data
./snapshot.sh $external_host .kibana
