const Discord =  require('discord.js');


module.exports.chomp = {
    name: 'chomp',
    description: 'random burgur gifs',
    args: false,
execute(message, args){

    function doing (){

        var nickname = message.guild.member(message.author).nickname;
        var name = nickname ? nickname : message.author.username;
    
    const doembed = new Discord.MessageEmbed()
    .setTitle (`${name} is ${something}`)
    .setImage (gif)
    .setColor (config.color);
    
    message.channel.send(doembed);
    }

    let something = 'eating!';
    const booger = ['https://media1.tenor.com/images/da04ae0f64633db1ac16fc8820f2d3dc/tenor.gif',
                'https://tenor.com/bheW5.gif'];
                
    const gif = booger[Math.floor(Math.random()* booger.length )];
doing ();
}};

module.exports ={

    name: 'dance',
    description: 'dance lol',
    args: false,
execute(message, args){


    function doing (){

        var nickname = message.guild.member(message.author).nickname;
        var name = nickname ? nickname : message.author.username;
    
    const doembed = new Discord.MessageEmbed()
    .setTitle (`${name} is ${something}`)
    .setImage (gif)
    .setColor (config.color);
    
    message.channel.send(doembed);
    }


}};
