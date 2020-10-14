const Discord = require('discord.js');
const cron = require('node-cron');
var seedrandom = require('seedrandom');
const { prefix, token, channelId, guildId } = require('./config.json');
const client = new Discord.Client();
const starteddate = new Date();
const startedTime =(starteddate.getMonth()+1) + "/"
                + ("0" + starteddate.getDate()).toString().slice(-2) + "/" 
                + starteddate.getFullYear() + " @ "  
                + ("0" + starteddate.getHours()).toString().slice(-2) + ":"  
                + ("0" + starteddate.getMinutes()).toString().slice(-2) + ":" 
                + ("0" + starteddate.getSeconds()).toString().slice(-2);

const msgList = [
    " definitely broke the lamp.",
    " absolutely was guilty in breaking the lamp.",
    " was wholly responsible for breaking Mark's lamp.",
    " may lie about it, but he broke the lamp."
]
// ====== Embeds ======
const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Supported Commands')
                .setDescription("Here are the available commands. If you'd like to see some new functionality, just let Shane know.")
                .addFields(
                    { name: '!help', value: 'Prints the help - but you already knew that' },
                    { name: '!uptime', value: "Display how long I've been online" },
                    { name: '!randomConan', value: "Receive words of inspiration" }
                    //{ name: '\u200B', value: '\u200B' }
                );
const uptimeEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Uptime')
                .setDescription("I've been online since " + startedTime);

const gamenightEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("It's Game Night!")
                .setDescription("Who's in and what are we playing?")
                .setImage("https://i.imgur.com/yeb1kVr.gif");
                
 const halloweenEmbed = new Discord.MessageEmbed()
                .setColor('#D2691E')
                .setTitle("Happy Halloween!")
                .setImage("https://i.imgur.com/vu4NZiB.jpg");

const christmasEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle("Merry Christmas!")
                .setImage("https://i.imgur.com/Ew8JiEJ.gif");

const newyearsEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle("Happy New Year!")
                .setImage("https://i.imgur.com/VdP6Brw.gif");

const fourthofjulyEmbed = new Discord.MessageEmbed()
                .setColor('#FF00FF')
                .setTitle("Happy 4th of July!")
                .setImage("https://i.imgur.com/UyzKzEy.gif");

const alEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Happy Birthday Al!")
                .setDescription("Happy birthday Al!")
                .setImage("https://i.imgur.com/8UjopnD.gif");
                
const markEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Happy Birthday Mark!")
                .setDescription("Happy birthday Mark!")
                .setImage("https://i.imgur.com/8UjopnD.gif");

const nateEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Happy Birthday Nate!")
                .setDescription("Happy birthday Nate!")
                .setImage("https://i.imgur.com/8UjopnD.gif");

const shaneEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Happy Birthday Shane!")
                .setDescription("Happy birthday Shane! Without you, I wouldn't exist.")
                .setImage("https://i.imgur.com/8UjopnD.gif");

//===== Schedule =======
cron.schedule('0 0 10 * * *', () => dailyMessage()); // fire every day at 10am
//cron.schedule('10 * * * * *', () => dailyMessage());                    

client.once('ready', () => {
    console.log('Shaz-bot startup complete. Started on: ' + startedTime.toString());
});

//use the token stored in config.json to login
client.login(token);

client.on('message', message => {
    //if asking for help, list commands
    if (message.content === `${prefix}help`) {
        //console.log(message.content);
        // send back a list of commands.
        message.channel.send(helpEmbed);
    }

  //test function to try out embeds
    if (message.content === `${prefix}test`) {
        //console.log(message.content);
         // send back a list of commands.
         message.channel.send(shaneEmbed);
      }

    //List the uptime
    else if (message.content === `${prefix}uptime`) {
        // send back the value stored at bot start time
        message.channel.send(uptimeEmbed);
    }

    else if (message.content === `${prefix}randomConan`) {
        // send back a random quote from Conan
        message.channel.send(randomConan());
    }
    //react with a smiley if praised
    else if (message.content.toLowerCase().includes('good bot')) {
             message.react('😍');
    }

    //If someone mentions the lamp, make sure to assign blame randomly.
    else if (message.content.toLowerCase().includes('lamp')) {
        //console.log(message.content);
        //don't reply to yourself stupid bot!
        if (message.author.bot){
            return;
        }

        var result = getRandomInt(2);
        //console.log(result);
        // send back a random assignment of blame.
        var msg = msgList[getRandomInt(msgList.length)]; 
        var guilty = "No One";
        if ( result === 0){
            guilty = "Al";
        }
        else
        {
            guilty = "Shane";
        }
        message.channel.send( guilty + msg);
    }

    function getRandomInt(max) {
        var rng = seedrandom();
        return Math.floor(rng() * Math.floor(max));
      }

    function randomConan(){
        var quotes =[
            "What is best in life? To crush your enemies, see them driven before you, and to hear the lamenation of their women",
            "Crom, I have never prayed to you before. I have no tongue for it. No one, not even you, will remember if we were good men or bad. Why we fought, or why we died. All that matters is that two stood against many. That's what's important! Valor pleases you, Crom... so grant me one request. Grant me revenge! And if you do not listen, then to HELL with you!",
            "Crom laughs at your four winds. He laughs from his mountain.",
            "[About Crom] He is strong! If I die, I have to go before him, and he will ask me, What is the riddle of steel? If I don't know it, he will cast me out of Valhalla and laugh at me. That's Crom, strong on his mountain!"
        ]
        var index = getRandomInt(quotes.length);
        return quotes[index];
    }
});

function dailyMessage(){
    //console.log("Fired daily message");
    var currentDate = new Date();
    var channel = client.channels.cache.get(`${channelId}`);

    //check if Wednesday (day 3)
    //console.log(currentDate.getDay());
    if(currentDate.getDay() === 3){
        channel.send(gamenightEmbed);
    }

    //Birthdays
    if(currentDate.getMonth()+1 === 12 & currentDate.getDate() === 31){
        channel.send(alEmbed);
    }

    if(currentDate.getMonth()+1 === 4 & currentDate.getDate() === 16){
        channel.send(nateEmbed);
    }

    if(currentDate.getMonth()+1 === 9 & currentDate.getDate() === 17){
        channel.send(markEmbed);
    }

    if(currentDate.getMonth()+1 === 11 & currentDate.getDate() === 22){
        channel.send(shaneEmbed);
    }

    // Holidays
    // New Years
    if(currentDate.getMonth()+1 === 1 & currentDate.getDate() === 1){
        channel.send(newyearsEmbed);
    }
    // Memorial Day
    // 4th of July
    if(currentDate.getMonth()+1 === 7 & currentDate.getDate() === 4){
        channel.send(fourthofjulyEmbed);
    }

    // Labor Day

    //Halloween
    if(currentDate.getMonth()+1 === 10 & currentDate.getDate() === 31){
        channel.send(halloweenEmbed);
    }

    //Thanksgiving

    //Christmas
    if(currentDate.getMonth()+1 === 12 & currentDate.getDate() === 25){
        channel.send(christmasEmbed);
    }
}