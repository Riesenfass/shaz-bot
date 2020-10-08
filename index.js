const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const currentdate = new Date();
const startedTime =(currentdate.getMonth()+1) + "/"
                + currentdate.getDate()  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

client.once('ready', () => {
	console.log('Ready! Started on: ' + startedTime.toString());
});

//use the token stored in config.json to login
client.login(config.token);

client.on('message', message => {
    //if asking for help, list commands
    if (message.content === '!help') {
        console.log(message.content);
        // send back a list of commands.
        message.channel.send('Thanks for asking for help! Right now, there are no other commands, but who knows what will come in the future.');
    }

    //List the uptime
    if (message.content === '!uptime') {
        console.log(message.content);
        // send back the value stored at bot start time
        message.channel.send("I've been online since " + startedTime);
    }

    //If someone mentions the lamp, make sure to assign blame randomly.
    if (message.content === 'lamp') {
        console.log(message.content);
        // send back a random assignment of blame.
        message.channel.send('Al broke the lamp for sure.');
    }
});