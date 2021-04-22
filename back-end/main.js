//LeMaitre4523#7534
var client,dataFolder,electron,prefix
const fs = require("fs")
module.exports = {
    start(){
        client = this.client
        dataFolder = this.dataFolder
        electron = this.electron
        prefix = this.prefix
        configData = JSON.parse(fs.readFileSync(dataFolder+"/webpage-data/config.json","utf-8"))
        
        client.on('message', message => {
        	if(message.author.bot) return;
            if(message.channel.type === 'dm') return;
            if(message.content.startsWith(prefix + "eval")) {
            	
            if(configData.mode === "admin") {
            	if(!message.member.hasPermission('ADMINISTRATOR')) {
   			   message.channel.send("**:x: Impossible d'exécuter la commande, vous n'avez pas les permissions suffisantes !!**")
   			   return;
  			  }
           } else if(configData.mode === "userid") {
           	if(message.author.id !== configData.userid) {
           		message.channel.send("**:x: Impossible d'exécuter la commande, seul <@" + configData.userid + "> a l'autorisation d'exécuter cette commande !!**")
           		return;
           	}
           }else{
           		message.channel.send("**:x: Impossible d'exécuter la commande, veuillez configurer l'extension d'abord**")
           		return;
           }
            const inspect = require('util')
			const arg = message.content.split(' ');
  		const clean = text => {
  		if(typeof(text) === "string")
    		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  	else
     		return text;
		}
    
    try {
      const code = message.content.replace(prefix+"eval","");
      let evaled = eval(code);
 
     		 if(typeof evaled !== "string")
        		evaled = require("util").inspect(evaled);
				message.channel.send(clean(evaled), {code:"xl"});
				console.log('Eval >> ' + clean(evaled));
				} catch (err) {
				message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    			console.log('Eval >> ' + clean(err));
				}
            }
        })
    }
}