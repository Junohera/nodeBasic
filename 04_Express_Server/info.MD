# Express setting

## package.json
- java진영의 pom.xml이나 build.gradle처럼 javascript진영의 프로젝트 빌드 및 모듈 의존성 관련파일.
```bash
# main은 index.js가 아닌 app.js로
npm init

# install 후 package.json에 dependency 생성되었는지 확인 필요
npm i express

npm i -D nodemon
```
> 위의 명령어를 통해 자동생성
>> 간혹 install시 오류가 발생하는데, package.json의 script를 제거하고 받으면 해결되는 경우 있음.

## dependencies
- package.json의 의존관리 키값
- __^__ : 항상 이 버전을 의미하는 의미
- package-lock.json: 고정된 모듈을 바라보는 나머지 의존된 모듈들의 모든 정보를 기록하기위한 json파일
- 이유 : 불특정 모듈의 업데이트로부터 영향을 받지않기 위하여 현재 시점의 버전으로만 유지하기위함.
```json
"dependencies": {
    "express": "^4.17.1"
  }
```

## 개발을 위한 start script 수정
```json
{
  "name": "npm01",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "${command}"
  },
  "author": "juno",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```
> ${command} = node app || nodemon app
>
> scripts.start의 값 node app으로 변경

## launch.json
- vscode의 기능을 이용하기위한 설정
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}\\04_Express_Server\\npm01\\app.js"
        }
    ]
}
```

## modules
1. morgan : 각각의 요청과 응답에 대한 필요정보를 보기위한 모듈
1. cookie-parser : 쿠키 사용을 간결히 사용하기위함
1. express-session : 세션 사용을 간결히 사용하기위함
```bash
npm i express
npm i express-session
npm i cookie-parser
npm i morgan
npm i multer
npm i -D nodemon
```
```js
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
```

## sequelize (ORM)

### package.json
```json
{
  "dependencies": {
    "express": "^4.17.1",
    "mysql2": "^2.2.5",
    "nunjucks": "^3.2.3",
    "sequelize": "^6.6.2",
    "sequelize-cli": "^6.2.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.7"
  }
}
```

### dbinfo
```json
{
  "development": {
    "username": "root",
    "password": "adminuser",
    "database": "nodejs",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3307
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### relation
- 1 : N
  - 1 -> N : hasMany
  - N -> 1 : belongsTo
- 1 : 1
  - 1 -> 1 : hasOne
- N : M
   - N -> M : belongsToMany

```js
// ex) user와 comment

// user : 1 -> hasMany
const Sequelize = require('sequelize');
module.exports = class User extends Sequelize.Model {
    static associate(db){
        db.User.hasMany( db.Comment, { foreignKey: 'commenter', sourceKey: 'id' } );
    }
};

// comment : N -> belongsTo
const Sequelize = require('sequelize');
module.exports = class Comment extends Sequelize.Model {
    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
    }
};
```