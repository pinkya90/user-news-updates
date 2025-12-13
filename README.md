# Requirements
Node.js (v16 or higher recommended)

MySQL

npm

### Check installation:
 in cmd 

`node -v`   

`npm -v`

`mysql --version`

#### Installation :

1. Clone the repository or copy files

Open gitbash in the project folder and write in cmd 

`git clone "URL link"` 

2. Install dependencies:

`npm init -y`

`npm install`

### Mysql installation process :

download [mysql](https://www.mysql.com/) then 
go to download tab and below click on **MySQL Community (GPL) Downloads »**

go down below and click on **MySQL Installer for Windows**

download **Windows (x86, 32-bit), MSI Installer**

once the installer has got downloaded into your system . Open it . It starts installing 

first choose the setup type - **custom type**

in custom type select the products **mysql servers** and in applications **mysql workbench** and **mysql shell** . click on **next** then clck 0n **execute** then **next** **next** here in this he will enter into a page where you need to give your **database password**and follow the default process to finish your setup . 

once the setup is completed you need to set the path in environmental variables to access the **mysql workbench**

###### to set the path :
open **programs file ->mysql->mysql server->bin** copy this path 

now open environmental variables in your system -> **system variables ->path->edit->** copy the path here **->ok ->0k->**

now your path has been set . Open **cmd** and check for mysql version by using cmd  `mysql --version`

Now you can open **mysqlworkbench** using your password and can execute the queries . 


### Environmental Variables :

Create a `.env` file in the root directory:

**DB_HOST=localhost**

**DB_USER=root**

**DB_PASS=yourpassword**

**DB_NAME=test_db**

### Database Migation :

The `migrate.js` file is used to create database tables.

#### Run Migration :

` npm run migrate`

This will:

1. Connect to MySQL

2. Create required tables (if not already created)

#### Scripts : ( pacakge.json)

"scripts": {

  "start": "node index.js",

  "migrate": "node migrate.js"

}

### Tables Created : 

1. userdata
2. news

#### Common Issues

**Error**: `npm run migrate` not working

Check JSON commas in `package.json`

Ensure `migrate.js` exists

**Node not recognized**

Restart terminal or reinstall Node.js


#### Start application

**Important Notes** : 

1. Do not commit `.env` file and `node_modules` to GitHub

2. `migrate.js` should be run once or when DB structure changes