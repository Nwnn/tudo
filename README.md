tudo
====

abstract

## Description

## Demo

## VS. 

## Requirement

## Usage
mongodbのホストを conf.tsに追加  

ex.
```
export const MONGO_HOST = 'mongodb://tudo-mongo:27017/todoDatabase';
```

デバッグ
```
npm run dev
```

## Install


## Contribution
### Docker & VSCodeRemote 開発向けメモ
NodeJSのコンテナを作成、プロジェクトのコピー

```
docker run -itd --name tudo --publish 80:80 node:latest
git clone git@github.com:Nwnn/tudo.git
```

mongoのコンテナ作成
```
docker run --restart='always' --name tudo-mongo -itd mongo:latest
```

ネットワーク作成
```
docker network create tudo
```

お互いをネットワークで接続
```
(docker network connect [network] [container] です)
docker network connect tudo tudo
docker network connect tudo tudo-mongo
```

コンテナネットワーク内では、tudo, tudo-mongoというホストネーム（ すなわち、http://tudo:8080 のような感じ ）で他のコンテナにアクセスすることができます、素晴らしい！

このときのconf.tsの設定は以下のようになるでしょう

```
export const MONGO_HOST = 'mongodb://tudo-mongo:27017/todoDatabase';
```

```
npm i
npm run dev
```



## Licence

## Author
