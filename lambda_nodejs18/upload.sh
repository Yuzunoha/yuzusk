#!/bin/bash

function main() {
  # ライブラリをインストールする
  npm install
  wait

  # zipに固める
  zip -r lambda.zip . &
  wait

  # cloudに上げる
  aws lambda update-function-code --function-name yuzusk --zip-file fileb://lambda.zip &
  wait

  # cloudに上げたものをlocalから消す
  rm lambda.zip
}

# 実行する。全てのログを記録する
main > upload.log
