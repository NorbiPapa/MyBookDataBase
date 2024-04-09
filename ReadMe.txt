A futtatáshoz szükséges telepítések:
npx prisma -->Prismával való adatbázis kezeléshez
npm i -g @nestjs/cli -->Nestjs működjön
nest g module auth 
nest g service auth
nest g controller auth -->Az elmúlt három a belépéshez és hitelesítéshez kell
npm install argon2 -->Password autentikáció
npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local
npm i passport-http-bearer
npm install --save @nestjs/swagger -->Dokumentációhoz szükséges


Adatmodell leírása:

User table:
id
username
email
password
userbook (Az adott usernek a könyvtára, össze van joinolva a UserBook table-el)

