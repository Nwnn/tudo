tudo
====

abstract

## Description
スマートスピーカ向けタスク管理アプリ

## Demo

## Usage
REST APIの一覧は server/test.restファイルか、 todo_api.md を参照してください  

## Install
本プログラムの導入方法を以下に示します

### Docker-compose
DockerとDocker-composeを導入している場合、以下のコマンドでアプリの実行が出来ます  
下記の導入手順の作業は不要です
```
$ git clone https://github.com/Nwnn/tudo.git && cd tudo && docker-compose up
```

導入後、 http://127.0.0.1 に接続可能か確認してください  
REST APIの一覧は todo_api.md を参照してください

### Dockerfile

### 必須環境
以下のプログラムを事前にインストールする必要があります

Node.js >= 11.13.0  
npm >= 6.9.0  
mongoDB >= 4.0

### 導入手順

任意のディレクトリにリポジトリをクローンし、そのディレクトリに移動します
```
$ git clone https://github.com/Nwnn/tudo.git
$ cd tudo
```

Node.jsの依存関係をインストールします
```
$ npm install
```

MongoDBのホストをserver/conf.tsに記述して設定します
```
$ export const MONGO_HOST = 'mongodb://tudo-mongo:27017/todoDatabase';
```

通常の実行時にはWebフロントエンドがサンプルとして同時に実行されます。  
スマートスピーカ用の開発時などで不要な場合は、バックエンドのみを実行して遅延を少なくすることができます  

フロントエンドのデバッグを含めてアプリケーションを実行する場合は
```
$ npm run dev
```

スマートスピーカ用の開発テスト等、バックエンドのみを実行する場合は
```
$ npm run api
```

REST APIの一覧は server/test.restファイルか、 todo_api.md を参照してください  

## Contribution & Notes

### Docker & VSCodeRemote 開発向けメモ
NodeJSのコンテナを作成、プロジェクトのコピー

```
$[Host] docker run -itd --name tudo --publish 80:80 node:latest

（　VSCodeから上のコンテナに入って　）

#[Guest] git clone https://github.com/Nwnn/tudo.git
```

mongoのコンテナ作成
```
$ docker run --restart='always' --name tudo-mongo -itd mongo:latest
```

ネットワーク作成
```
$ docker network create tudo
```

お互いをネットワークで接続
```
(docker network connect [network] [container] です)
$ docker network connect tudo tudo
$ docker network connect tudo tudo-mongo
```

コンテナネットワーク内では、tudo, tudo-mongoというホストネーム（ すなわち、http://tudo:8080 ）で他のコンテナにアクセスすることができます

このときのconf.tsの設定は以下のようになります

```
export const MONGO_HOST = 'mongodb://tudo-mongo:27017/todoDatabase';
```

```
$ cd tudo
$ npm i
$ npm run dev
```

