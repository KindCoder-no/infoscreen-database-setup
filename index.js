const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var mongoose = require('mongoose');
const fs = require("fs");

const art = fs.readFileSync("art.txt");

console.log('\x1b[32m%s\x1b[0m', art.toString())



rl.question('[Input] Database ip: ', function (database_ip) {
  rl.question('[Input] Database Username: ', function (database_username) {
    rl.question('[Input] Database Password: ', function (database_password) {
        rl.question('[Input] Database Name: ', function (database_name) {
            console.log('\x1b[33m%s\x1b[0m', "[Database] Connecting to database...")

            if(database_ip === "localhost" && database_password === ""){
                console.log('\x1b[32m%s\x1b[0m', `[Database] Using local Database`)
                mongoose.connect(`mongodb://localhost/${database_name}`);
            }else{
                console.log('\x1b[32m%s\x1b[0m', `[Database] Using remote Database`)
                mongoose.connect(`mongodb+srv://${database_username}:${database_password}@${database_ip}/${database_name}?retryWrites=true&w=majority`);
            }


            const db = mongoose.connection


            db.on('error', (error) => console.error(error))
            db.once('open', () => {
                console.log('\x1b[32m%s\x1b[0m', `[Database] Connected to Database`)

                console.log('\x1b[33m%s\x1b[0m', `[Database] Setting up collections`)
                mongoose.model('news', {});
                mongoose.model('screen', {});
                mongoose.model('image-database', {});

                console.log('\x1b[32m%s\x1b[0m', '[Database] Setup Complete!');
                rl.close();
            })
           
        });
    });
  });
});

rl.on('close', function () {
  process.exit(0);
});