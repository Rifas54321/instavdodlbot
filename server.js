const igdl = require("@sasmeee/igdl");
let url = "https://www.instagram.com/tamannaahspeaks/reel/Cz6A3u9P2l0/?hl=en"
const exif = require("exiftool");
require("dotenv").config()
const {parser} = require("html-metadata-parser");
const telegram = require("node-telegram-bot-api");
const token = process.env.bot
const bot = new telegram(token,{polling:true});
const fs = require("fs");
const path = require("path")
const https = require("https");
let date = new Date();
const images = ["png","jpg","webp"]
const videos = ["mp4","mov"]
async function ig(chatId,url){
  let thumb,video,vdo_tilte
   try{
   vdo_tilte = await parser(url)
   }catch(err){
     console.log(err)
     bot.sendMessage(chatId,"invalid url or please try again few  minutes later")
   }
   try{
let title = vdo_tilte.meta.title.replace("\n","")
  var res = await igdl(url)
  bot.sendMessage(chatId,"𝙏𝙝𝙞𝙨 𝙢𝙖𝙮 𝙩𝙖𝙠𝙚 𝙛𝙚𝙬 𝙢𝙤𝙢𝙚𝙣𝙩𝙨")

  let video_path =
`tmp/${title.slice(0,20)}${chatId}.mp4`
bot.sendMessage(chatId,`𝘿𝙤𝙬𝙣𝙡𝙤𝙖𝙙𝙞𝙣𝙜 : [
${title.slice(0,title.indexOf("\n"))}..]`)
   ncap = `${title.slice(0,title.indexOf("\n"))}....`
   thumb = res[0].thumbnail_link;
   video = res[0].download_link;
  https.get(video,(data)=>{
let file = fs.createWriteStream(video_path)
    data.pipe(file)
    file.on("finish",async()=>{
let fl = fs.readFileSync(video_path)
await exif.metadata(fl,(err,data)=>{
const ext=  data.fileTypeExtension;
  if(videos.includes(ext)==true){
    
    bot.sendVideo(chatId,video_path,{caption:ncap,thumb:thumb}).then(()=>{
        fs.unlink(video_path,(err,data)=>{
          if(!err){
            console.log("temp cleaned")
          }
        })
      })
    }else if(images.includes(ext)==true){
      
bot.sendPhoto(chatId,video_path,{caption:ncap,thumb:thumb}).then(()=>{
        fs.unlink(video_path,(err,data)=>{
          if(!err){
            console.log("temp cleaned")
          }
        })
      })
      
      
      
      
      
      
      
      
    }
  
  
})

      console.log("file downloaded")
     // file.close();
    })
  })
   }catch(err){
     console.log(err)
     bot.sendMessage(chatId,"𝙄𝙣𝙫𝙖𝙡𝙞𝙙 𝙪𝙧𝙡 𝙤𝙧 𝙥𝙡𝙚𝙖𝙨𝙚 𝙩𝙧𝙮 𝙖𝙜𝙖𝙞𝙣 𝙛𝙚𝙬  𝙢𝙞𝙣𝙪𝙩𝙚𝙨 𝙡𝙖𝙩𝙚𝙧")
   }
}
bot.on("message",async(msg)=>{
  let text = msg.text;
  let chatId = msg.chat.id;
  if(msg.text == "/start"){
    let m = {
      reply_markup:{
        resize_keyboard:true,
        keyboard:[[{text:"𝘼𝙗𝙤𝙪𝙩"}]]
      }
    }
  let greet = 
  `𝙃𝙞! ${msg.chat.username}𝙏𝙝𝙞𝙨 𝙗𝙤𝙩 𝙞𝙨 𝙪𝙨𝙚 𝙩𝙤 𝙨𝙖𝙫𝙚
𝙞𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢 𝙥𝙤𝙨𝙩 𝙖𝙣𝙙 𝙫𝙞𝙙𝙚𝙤𝙨`
    bot.sendMessage(chatId,greet,m)
  }else if(text=="𝘼𝙗𝙤𝙪𝙩"){
    bot.sendMessage(chatId,"  𝘾𝙧𝙚𝙖𝙩𝙚𝙙 𝙗𝙮 @rifas11")
  }else if(text.startsWith("https://www.instagram.com")){
    ig(chatId,text)
  }else if(text.startsWith("www.instagram")){
    text = "https://"+text
    ig(chatId,text)
   // bot.sendMessage(chatId,text)
  }else if(text.startsWith("instagram.com")){
    text = "https://www."+text;
    ig(chatId,text);
    //bot.sendMessage(chatId,text)
  }else{
    bot.sendMessage(chatId,"invalid url")
  }
})
