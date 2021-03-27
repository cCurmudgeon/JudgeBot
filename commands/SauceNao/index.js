const dotenv = require("dotenv");
const { argsToArgsConfig } = require("graphql/type/definition");
const sagiri = require("sagiri");
const client = sagiri(process.env.NAO_SECRET);

const search = async (Arg) => {
const results = await client(Arg);
console.log(results);
console.log(results.raw);
}
module.exports = {
name: 'sauce',
execute(message, args){
    console.log(args[0]);
    search(args[0]);
}};