# Vue-algorithms
A Simple UI to show how algorithms work

For CI
Install concourse CI: https://concourse-ci.org/quick-start.html

First create a new pipeline 

`fly -t tutorial set-pipeline --pipeline vue-algos --config build.yaml`

Run a build

`fly -t tutorial trigger-job --job vue-algos/Graph --watch`

Look up localhost:8080 for the web UI.
