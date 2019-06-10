const Discord = require('discord.js'); //Package to interact eith discord API
const Fs = require('fs');
const client = new Discord.Client();
const sets = JSON.parse(Fs.readFileSync('set.json')); //set.json stores the sets of questions, possible answers, and values for each choice


client.on(`ready`, () => {
    console.log(`bot is on :)`);
});

client.on(`message`, mensaje => {
    console.log(`${mensaje.author.tag} dice : ${mensaje.content}`);
    
//    if (mensaje.author.tag === "TeyNavi#1245"){
//       mensaje.channel.send(`${mensaje.author}, hoy estás radiante :)`)
//    }else{
        if(mensaje.content === "comenzar"){
            let i =  0
            let user = mensaje.author
            mensaje.channel.send(`${sets[0]["preguntas"][i]["pregunta"]}\n${sets[0]["preguntas"][i]["respuestas"]}`)    
            
        }
//    }
});

//add bot's token here. Remember to update everyday
client.login('');