const Discord = require('discord.js'); //Package to interact eith discord API
const Fs = require('fs');
const client = new Discord.Client();
const preguntas = JSON.parse(Fs.readFileSync('set.json')); //set.json stores the sets of questions, possible answers, and values for each choice
let testers = []

client.on(`ready`, () => {
	console.log(`bot is on :)`);
});

client.on(`message`, mensaje => {
    console.log(`${mensaje.author.tag} dice: ${mensaje.content}`);
    
    let found = true;
    for (let j = 0; j < testers.length; j++) {

        if (mensaje.author === testers[j].user){
            found = false
            if (preguntas[testers[j].count]["pesos"][mensaje.content] != null) {
                testers[j].count++
                testers[j].respuestas.push(mensaje.content)
                              


                if(testers[j].count < preguntas.length){               
                    mensaje.channel.send(`${mensaje.author}, ${preguntas[testers[j].count]["pregunta"]}\n${preguntas[testers[j].count]["respuestas"]}`)             
                }else{
                    let naturalezas = JSON.parse(Fs.readFileSync('naturalezas.json'));
                    for (let i = 0; i < testers[j].respuestas.length; i++) {
                        naturalezas["count"][preguntas[i]["caracteristicas"][testers[j].respuestas[i]]] += [preguntas[i]["pesos"][testers[j].respuestas[i]]]                        
                    }
                    let max = 0
                    let ind
                    for (let i = 0; i < naturalezas["nombres"].length; i++) {
                        if (naturalezas["count"][naturalezas["nombres"][i]] > max){
                            max = naturalezas["count"][naturalezas["nombres"][i]]
                            ind = i
                        }
                    }
                    mensaje.channel.send(`${mensaje.author}, Tu perfil es ${naturalezas["nombres"][ind]}`)
                    mensaje.channel.send(`${naturalezas["descripciones"][naturalezas["nombres"][ind]]}`)

                    let ds = JSON.parse(Fs.readFileSync('dataset.json'));
                    testers[j].respuestas.push(naturalezas["nombres"][ind])
                    ds.push(testers[j].respuestas)
                    Fs.writeFile('dataset.json', JSON.stringify(ds), function(err){
                        if(err) throw err
                        console.log("Registrado")
                    })
                    testers.splice(j, 1)
                }
            }else{
                if(mensaje.content === "salir"){
                    mensaje.channel.send(`Hasta luego, ${mensaje.author} :c`)
                    testers.splice(j, 1)
                }else{
                    mensaje.channel.send(`${mensaje.author}, ingresa una opción de la lista :)`)   
                }
            }
            break
        }
    
    }
        if (found) {
            if(mensaje.content === "comenzar"){
                let temp = {}            
                temp.user = mensaje.author
                temp.count = 0
                temp.respuestas = []
                testers.push(temp)
                mensaje.channel.send(`${mensaje.author}, ${preguntas[0]["pregunta"]}\n${preguntas[0]["respuestas"]}`)             
            }
            if (mensaje.content === "dataset"){
                mensaje.channel.send({
                    files: [{
                      attachment: '',
                      name: 'dataset.json'
                    }]
                  })
                    .then(console.log("sent"))
                    .catch(console.error("dataset not found"));
            }
        }
});

//add bot's token here. Remember to update everyday
client.login('');