#!/bin/bash
for var in $(docker images | grep none)
do
  if [ ${#var} == 12 ];
  then
    echo "Deleting Docker Image tagged as 'none'"
    echo ${var}
    docker rmi -f ${var}
  fi;
  done
