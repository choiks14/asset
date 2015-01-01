# assets 예제 #


### 준비물 ###

1. node 설치 <http://nodejs.org/>
2. yeoman  설치 <http://yeoman.io/>
3. gulp generator 설치 <https://github.com/yeoman/generator-gulp-webapp>
4. bower 설치 <http://bower.io/>



### development 실행 ###
    bower install
    npm install
    gulp

#### 결과 ####
dist 폴더에  asset 파일이 생성된다. 

### production 실행 ###
    bower install
    npm install
    gulp build --gulpfile gulpfile_production.js

#### 결과 ####
dist 폴더에 minify 된 파일이 생성된다.

