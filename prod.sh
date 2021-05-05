#!/bin/bash


check_aws_install() {
    if [ "$(which aws | cut -c 1)" != "/" ]; then
        echo "AWS not installed...installing"
        curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
        unzip awscliv2.zip
        rm -rf awscliv2.zip
        ./aws/install
    else
        echo "Good job! AWS installed!"
    fi 
}

check_curl_install() {
    if [ "$(which curl | cut -c 1)" != "/" ]; then
        echo "Curl not installed...installing"
        apt-get install curl -y
    else
        echo "Curl installed...skipping"
    fi
}

check_unzip_install() {
    if [ "$(which unzip | cut -c 1)" != "/" ]; then
        echo "Unzip not installed..installing"
        apt-get install unzip -y
    else
        echo "Unzip installed...skipping"
    fi
}

check_yarn_install(){
    
    if [ "$(which yarn | cut -c 1)" != "/" ]; then
        echo "yarn not installed..installing"
        npm install --global yarn
    else
        echo "Yarn installed...skipping"
    fi
}

check_node_install(){
   
    if [ "$(which node | cut -c 1)" != "/" ]; then
        echo "node not installed..installing"
        apt-get update
        apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
        apt-get install nodejs -y
        apt-get install npm -y
    else
        echo "Node installed...skipping"
    fi
}

configure_aws() {
    echo "Configuring AWS....."
    aws configure set aws_secret_access_key $1
    aws configure set aws_access_key_id $2
    aws configure set default.region us-west-2
    
}

deploy(){
    yarn build
    aws s3 sync ./dist s3://vue-algorithm
}
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -s|--secret) secret="$2"; shift ;;
        -a|--access) access="$2"; shift ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done


check_curl_install
check_unzip_install
check_node_install
check_yarn_install
check_aws_install
configure_aws $secret $access
deploy
