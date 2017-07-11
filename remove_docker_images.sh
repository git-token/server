#!/bin/bash
for var in $(docker images | grep none)
do
  if [ ${#var} == 12 ];
  then
    echo "Deleting Docker Image tagged as 'none'"\n
    echo ${var}
    docker rmi ${var}
  # else
  #   echo ${#x}
  #   echo "false"
  fi;
  done
