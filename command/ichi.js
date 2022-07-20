require('../settings')
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const axios = require('axios')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI()
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const { fromBuffer } = require('file-type')
const fs = require('fs')
const moment = require('moment-timezone')
const util = require('util')
const path = require('path')
const os = require('os')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const qrcode = require('qrcode')
const similarity = require('similarity')
const yts = require('yt-search');

//Waktu
const time = moment().tz('America/easterntime').format("HH:mm:ss")
const wib = moment.tz('America/easterntime').format('HH:mm:ss')
const wita = moment.tz('America/easterntime').format("HH:mm:ss")
const wit = moment.tz('America/easterntime').format("HH:mm:ss")
const hour_now = moment().format('HH:mm:ss') 

//Lib
const { pinterest, wallpaper, wikimedia, quotesAnime } = require('../lib/scraper')
const { bytesToSize, TelegraPh, UploadFileUgu, webp2mp4File} = require('../lib/uploader')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, await, sleep, clockString, msToDate, sort, toNumber, enumGetKey, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom, pickRandom} = require('../lib/myfunc')

//database
global.db = JSON.parse(fs.readFileSync('./storage/db.json'))
if (global.db) global.db = {
chats: {},
...(global.db || {})
}

//Module Exports
module.exports = ichi = async(ichi, m, chatUpdate, store) => {
try {
  //console.log(m)
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
var budy = (typeof m.text == 'string' ? m.text : '')
var prefix = prefa ? /^[.]/gi.test(body) ? body.match(/^[.]/gi)[0] : "" : prefa ?? global.prefix
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = ichi.user.id ? ichi.user.id.split(":")[0]+"@s.whatsapp.net" : ichi.user.id
const isOwner = [ichi.user.id, ...global.ownerNumber].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == ichi.user.id ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const from = m.key.remoteJid
const { type, quotedMsg, mentioned, now, fromMe } = m
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

const isGroup = m.key.remoteJid.endsWith('@g.us')
const groupMetadata = m.isGroup ? await ichi.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
const isNumber = x => typeof x === 'number' && !isNaN(x)


const reply = (texto) => {
			ichi.sendMessage(m.chat, { text: texto, mentions: [m.sender] }, {	quoted: m })
		}

try {
let chats = global.db.chats[m.chat]
if (typeof chats !== 'object') global.db.chats[m.chat] = {}
if (chats) {
if (!('antilink' in chats)) chats.antilink = false
} else global.db.chats[m.chat] = {
antilink: false
}
} catch (err) {
console.error(err)
}

// Antilink
if (db.chats[m.chat].antilink) {
if (budy.match(`chat.whatsapp.com`)) {
m.reply(`Another Group Link Detected \nSorry You Will Be Kicked !`)
if (!isBotAdmins) return //  buat ngediem in daripada nyepam m.reply(mess.botAdmin)
var gclink = (`https://chat.whatsapp.com/`+await ichi.groupInviteCode(m.chat))
var isLinkThisGc = new RegExp(gclink, 'i')
var isgclink = isLinkThisGc.test(m.text)
if (isgclink) return m.reply(` sorry it didn't work, this group link turns out `)
if (isAdmins) return m.reply(` Sorry Turns Out You're Admin `)
if (isOwner) return m.reply(` Sorry You're My Owner Turns Out `)
ichi.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}







if (!ichi.public) {
if (!m.key.fromMe && !isOwner) return
}

//Push Message To Console
if (m.message) {
console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m ICHI \x1b[1;37m]', time, chalk.green(budy || m.mtype), 'Dari', chalk.blue(pushname), 'Di', chalk.yellow(groupName ? groupName : 'Private Chat' ), 'args :', chalk.white(args.length))
}

switch(command) {

case 'help': {
  let menu = `
🌀 *BotsApp Menu* 🌀
Use ${prefix}help command for detailed info on a module.


🤖 *Command* - ${prefix}add
💡 *Info* - Module to add a person to a group.

🤖 *Command* - ${prefix}alive
💡 *Info* - Check if bot is online.

🤖 *Command* - ${prefix}antilink
💡 *Info* - When enables will remove naughty link posters.

🤖 *Command* - ${prefix}block
💡 *Info* - Block contact.

🤖 *Command* - ${prefix}broadcast
💡 *Info* - broadcast to all groups.

🤖 *Command* - ${prefix}delete
💡 *Info* - Reply message that bot sent to delete.

🤖 *Command* - ${prefix}demote
💡 *Info* - Demote a person from admin.

🤖 *Command* - ${prefix}ephemeral
💡 *Info* - enable and diasable comands for group designated.

🤖 *Command* - ${prefix}group on/off
💡 *Info* - on or off the bot for the group or to admins only.

🤖 *Command* - ${prefix}help
💡 *Info* - Get the command list and info on modules.

🤖 *Command* - ${prefix}hidetag
💡 *Info* - Magically tagall.

🤖 *Command* - ${prefix}kick
💡 *Info* - Module to remove a person from a group.

🤖 *Command* - ${prefix}linkgroup
💡 *Info* - Module to create group invite link.

🤖 *Command* - ${prefix}self
💡 *Info* - privet bot enable.

🤖 *Command* - ${prefix}tomp3
💡 *Info* - convert to mp3.

🤖 *Command* - ${prefix}togif
💡 *Info* - convert to Gify.

🤖 *Command* - ${prefix}eval
💡 *Info* - CMD.

🤖 *Command* - ${prefix}promote
💡 *Info* - Promote a member to admin.

🤖 *Command* - ${prefix}play
💡 *Info* - Download songs from YT.

🤖 *Command* - ${prefix}public
💡 *Info* - public bot enable.

🤖 *Command* - ${prefix}pinterest
💡 *Info* - Grab random image from pintrest.

🤖 *Command* - ${prefix}quotesanime
💡 *Info* - search random anime quotes of your favorite anime.

🤖 *Command* - ${prefix}revoke
💡 *Info* - Module to reset groupchat link.

🤖 *Command* - ${prefix}sticker
💡 *Info* - Module to convert image to sticker.

🤖 *Command* - ${prefix}setname
💡 *Info* - Module to rename a pdf or text document.

🤖 *Command* - ${prefix}setppgrup
💡 *Info* - Change the group icon.

🤖 *Command* - ${prefix}setdesk
💡 *Info* - Set the group discription.

🤖 *Command* - ${prefix}tagall
💡 *Info* - Module to tag evryone in a group.

🤖 *Command* - ${prefix}toaudio
💡 *Info* - Convert any media with audio to mp3 audio.

🤖 *Command* -  ${prefix}toimg
💡 *Info* - Module to convert sticker to image.

🤖 *Command* - ${prefix}tovideo
💡 *Info* - Module to convert animated sticker to video.

🤖 *Command* - ${prefix}unblock
💡 *Info* - Unblock contact.

🤖 *Command* - ${prefix}wallpaper
💡 *Info* - Search wallpaper of anything.

🤖 *Command* - ${prefix}wikimedia
💡 *Info* - Search randommedia of any subject. Example: .wikimedia robots

🤖 *Command* - ${prefix}ytmp3
💡 *Info* - Convert a YT video to mp3.

🤖 *Command* - ${prefix}ytmp4
💡 *Info* - download any YT video.

🤖 *Command* - ${prefix}yts
💡 *Info* - Get recommendations and links from Youtube.
  `
  let but = []
  ichi.sendButtonImg(m.chat, menu, global.ownerName, global.thumb, but)
  }
  break
case 'alive': {
const used = process.memoryUsage()
  const cpus = os.cpus().map(cpu => {
  cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
  return cpu
  })
  const cpu = cpus.reduce((last, cpu, _, { length }) => {
  last.total += cpu.total
  last.speed += cpu.speed / length
  last.times.user += cpu.times.user
  last.times.nice += cpu.times.nice
  last.times.sys += cpu.times.sys
  last.times.idle += cpu.times.idle
  last.times.irq += cpu.times.irq
  return last
  }, {
  speed: 0,
  total: 0,
  times: {
  user: 0,
  nice: 0,
  sys: 0,
  idle: 0,
  irq: 0
  }
  })
  let timestamp = speed()
  let latensi = speed() - timestamp
  neww = performance.now()
  oldd = performance.now()
respon = `
 💠 BotsApp has been integrated successfully. 💠\n\nUse the   *.help*   command to get a list of plugins that will make your WhatsApp experience much easier.\n\nIf you are impressed with my service, consider supporting the Bot on GitHub-\n https://github.com/BotsAppOfficial/BASexy-MD\n\nCheck out our official website for any new updates.
\n\n💠 Runtime : ${runtime(process.uptime())} 💠
`
  m.reply(respon)
  }
  break

//Owner Menu
case 'bcgc': case 'bcgroup': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) throw `Text mana?\n\nExample : ${prefix + command} ${global.ownerName}`
  let getGroups = await ichi.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anu = groups.map(v => v.id)
  m.reply(mess.wait + '\nMohon Untuk Menunggu Sejenak')
  for (let i of anu) {
  await sleep(1500)
  let txt = `*Broadcast ${ichi.user.name}*\n\n${text}\n`
  ichi.sendButtonText(i, txt, m)
  }
  m.reply('Sukses Broadcast')
  }
  break
case 'bc': case 'broadcast': case 'bcall': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  if (!text) throw `Text mana?\n\nExample : ${prefix + command} ${global.ownerName}`
  let anu = await store.chats.all().map(v => v.id)
  let getGroups = await ichi.groupFetchAllParticipating()
  let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
  let anuan = groups.map(v => v.id)
  m.reply(mess.wait + '\nPlease Wait A Moment')
  for (let yoi of anu && anuan) {
  await sleep(1500)
  let txt = `*Broadcast ${ichi.user.name}*\n\n${text}`
  ichi.sendText(yoi, txt, m)
  }
  m.reply('Sukses Broadcast')
  }
  break
case 'join': {
  if (!isOwner) return m.reply(mess.botOwner)
  if (!text) return m.reply('Enter Link Group!')
  if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
  m.reply(mess.wait)
  let result = args[0].split('https://chat.whatsapp.com/')[1]
  await ichi.groupAcceptInvite(result).then((res) => m.reply(mess.done)).catch((err) => m.reply('Fatal Error ❎'))
  }
  break
case 'leave': {
  if (!isOwner) return m.reply(mess.botOwner)
  await ichi.groupLeave(m.chat).then((res) => m.reply('Sayonara ‘‹\nDifficult to Control Have a Controlling Day')).catch((err) => m.reply('Fatal Error ❎'))
  }
  break
case 'block': {
  if (!isOwner) return m.reply(mess.botOwner)
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await ichi.updateBlockStatus(users, 'block').then((res) => m.reply(mess.done)).catch((err) => m.reply('Fatal Error ❎'))
  }
  break
case 'unblock': {
  if (!isOwner) return m.reply(mess.botOwner)
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await ichi.updateBlockStatus(users, 'unblock').then((res) => m.reply(mess.done)).catch((err) => m.reply('Fatal Error ❎'))
  }
  break
case 'setppbot': {
  if (!isOwner) return m.reply(mess.botOwner)
  if (!quoted) throw `Send/m.reply Image With Caption ${prefix + command}`
  if (!/image/.test(mime)) throw `Send/m.reply Image With Caption ${prefix + command}`
  if (/webp/.test(mime)) throw `Send/m.reply Image With Caption ${prefix + command}`
  let media = await ichi.downloadAndSaveMediaMessage(quoted)
  await ichi.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
  m.reply(mess.done)
  }
  break
case 'public': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  ichi.public = true
  m.reply('Successfully Changing Bot Mode To Public')
  }
  break
case 'self': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  ichi.self = false
  m.reply('Success in Changing Bot Mode to Self')
  }
  break
case 'eval': {
  if (!isOwner && !m.key.fromMe) return m.reply(mess.botOwner)
  function Return(sul) {
  sat = JSON.stringify(sul, null, 2)
  bang = util.format(sat)
  if (sat == undefined) {
  bang = util.format(sul)
  }
  return m.reply(bang)
  }
  try {
  m.reply(util.format(eval(`(async() => { return ${budy.slice(3)} })()`)))
  } catch(e) {
  m.reply(String(e))
  }
  }
  break

//Group Menu
case 'antilink':
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (args[0] === "on") {
  if (db.chats[m.chat].antilink) return m.reply(`Previously Active`)
  db.chats[m.chat].antilink = true
  m.reply(`Antilink Successfully Activated !`)
  } else if (args[0] === "off") {
  if (!db.chats[m.chat].antilink) return m.reply(`Previously Disabled`)
  db.chats[m.chat].antilink = false
  m.reply(`Antilink Successfully Disabled !`)
  } else {
  let buttonsantilink = [
  { buttonId: `${command} on`, buttonText: { displayText: 'Enable' }, type: 1 },
  { buttonId: `${command} off`, buttonText: { displayText: 'Disable' }, type: 1 }
  ]
 await ichi.sendButtonText(m.chat, buttonsantilink, `Mode ${command} ️`, `Please click the button below, if the button doesn't appear, type ${command} on/off`, m)
  }
  break
case 'linkgc': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  let response = await ichi.groupInviteCode(m.chat)
  ichi.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
  }
  break
case 'revoke': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  await ichi.groupRevokeInvite(from)
  m.reply(mess.done)
  }
  break
case 'kick': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Who do you want to kick?')
  if (args[0].startsWith('08')) return m.reply('Use country code bro')
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await ichi.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err) ))
  }
  break
case 'add': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Who do you want to add??')
  if (args[0].startsWith('08')) return m.reply('Use country code bro')
  let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await ichi.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err) ))
  }
 break
case 'promote': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Who do you want to promote??')
  if (args[0].startsWith('08')) return m.reply('Use country code bro')
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await ichi.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err) ))
  }
  break
case 'demote': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!m.quoted && !text) return m.reply('Who do you want to demote??')
  if (args[0].startsWith('08')) return m.reply('Use country code bro')
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await ichi.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err) ))
  }
  break
case 'setname': case 'setsubject': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) throw 'Text ?'
  await ichi.groupUpdateSubject(m.chat, text).then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'setdesc': case 'setdesk': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) throw 'Text ?'
  await ichi.groupUpdateDescription(m.chat, text).then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err)))
  }
  break
case 'setppgroup': case 'setppgroup': case 'setppgc': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isAdmins) return m.reply(mess.admin)
  if (!quoted) return m.reply(`Send/Reply Image With Caption ${prefix + command}`)
  if (!/image/.test(mime)) return m.reply(`Send/Reply Image With Caption ${prefix + command}`)
  if (/webp/.test(mime)) return m.reply(`Send/Reply Image With Caption ${prefix + command}`)
  let media = await ichi.downloadAndSaveMediaMessage(quoted)
  await ichi.updateProfilePicture(m.chat, { url: media }).catch((err) => fs.unlinkSync(media))
  m.reply(mess.done)
  }
  break
case 'tagall': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
let teks = `*👥 Tag All By Admin*
 
🗞️ *Pesan : ${q ? q : 'kosong'}*\n\n`
  for (let mem of participants) {
  teks += `>> @${mem.id.split('@')[0]}\n`
  }
  ichi.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
  }
  break
case 'hidetag': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  ichi.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
  }
  break
case 'ephemeral': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (!text) return m.reply('Enter the enable/disable values')
  if (args[0] === 'enable') {
  await ichi.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'disable') {
  await ichi.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => m.reply(mess.done)).catch((err) => m.reply(jsonformat(err)))
  }
  }
  break
case 'group': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (args[0] === 'close'){
  await ichi.groupSettingUpdate(m.chat, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => m.reply(jsonformat(err)))
  } else if (args[0] === 'open'){
  await ichi.groupSettingUpdate(m.chat, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => m.reply(jsonformat(err)))
  } else {
  let buttonsgroup = [
  { buttonId: `${command} open`, buttonText: { displayText: 'Open' }, type: 1 },
  { buttonId: `${command} close`, buttonText: { displayText: 'Close' }, type: 1 }
  ]
  await ichi.sendButtonText(m.chat, buttonsgroup, `Mode ${command} 🕊️`, `Please click the button below, if the button doesn't appear, type ${command} open/close`, m)
  }
  }
  break
case 'editinfo': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotAdmins) return m.reply(mess.botAdmin)
  if (!isAdmins) return m.reply(mess.admin)
  if (args[0] === 'open'){
  await ichi.groupSettingUpdate(m.chat, 'unlocked').then((res) => m.reply(`Successfully Opening Edit Group Info`)).catch((err) => m.reply(jsonformat(err) ))
  } else if (args[0] === 'close'){
  await ichi.groupSettingUpdate(m.chat, 'locked').then((res) => m.reply(`Successfully Closing Edit Group Info`)).catch((err) => m.reply(jsonformat(err) ))
  } else {
  let buttonsinfo = [
  { buttonId: `${command} open`, buttonText: { displayText: 'Open' }, type: 1 },
  { buttonId: `${command} close`, buttonText: { displayText: 'Close' }, type: 1 }
  ]
  await ichi.sendButtonText(m.chat, buttons, `Mode Edit Info `, `Please click the button below, if the button doesn't appear, type ${command} open/close`, m)
  }
  }
  break

//Maker Menu
case 'sticker': case 's': case 'stickergif': case 'sgif': {
  if (!quoted) return m.reply(`Reply Video/Image With Caption ${prefix + command}`)
  m.reply(mess.wait)
  if (/image/.test(mime)) {
  let media = await quoted.download()
  let encmedia = await ichi.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  } else if (/video/.test(mime)) {
  if ((quoted.msg || quoted).seconds > 11) return m.reply('Maximum 10 seconds!')
  let media = await quoted.download()
  let encmedia = await ichi.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
  await fs.unlinkSync(encmedia)
  } else {
  throw `Send Image/Video With Caption ${prefix + command}\nVideo Duration 1-9 Seconds`
  }
  }
  break


//removebg
case 'imagenobg': case 'removebg': case 'remove-bg': {
	if (!quoted) throw m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (!/image/.test(mime)) throw m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	if (/webp/.test(mime)) throw m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
	let remobg = require('remove.bg')
	let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU', 'S258diZhcuFJooAtHTaPEn4T', '5LjfCVAp4vVNYiTjq9mXJWHF', 'aT7ibfUsGSwFyjaPZ9eoJc61', 'BY63t7Vx2tS68YZFY6AJ4HHF', '5Gdq1sSWSeyZzPMHqz7ENfi8', '86h6d6u4AXrst4BVMD9dzdGZ', 'xp8pSDavAgfE5XScqXo9UKHF', 'dWbCoCb3TacCP93imNEcPxcL']
	let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]
	hmm = await './src/remobg-' + getRandom('')
	localFile = await ichi.downloadAndSaveMediaMessage(quoted, hmm)
	console.log(localFile)
	outputFile = await './src/hremo-' + getRandom('.png')
	m.reply(mess.wait)
	try {
		remobg.removeBackgroundFromImageFile({
			path: localFile,
			apiKey: apinobg,
			size: "regular",
			type: "auto",
			scale: "100%",
			outputFile
		}).then(async (result) => {
			//    console.log(result)
			console.log(`File saved to ${outputFile}`);
			await ichi.sendMessage(m.chat, {
				image: fs.readFileSync(outputFile),
				caption: "success"
			}, {
				quoted: m
			})
			const base64img = result.base64img;
			await sleep(7000)
			await fs.unlinkSync(localFile)
			await fs.unlinkSync(outputFile)
		}).catch((errors) => {
			console.log(JSON.stringify(errors));
		});
	} catch (err) {
		m.reply(util.format(err))
		await fs.unlinkSync(localFile)
	}
}
break

		            case 'estetik': {
		            	if (!quoted) throw reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
		            	if (!/image/.test(mime)) throw reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
		            	if (/webp/.test(mime)) throw reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
		            	let remobg = require('remove.bg')
		            	let apirnobg = ['q61faXzzR5zNU6cvcrwtUkRU', 'S258diZhcuFJooAtHTaPEn4T', '5LjfCVAp4vVNYiTjq9mXJWHF', 'aT7ibfUsGSwFyjaPZ9eoJc61', 'BY63t7Vx2tS68YZFY6AJ4HHF', '5Gdq1sSWSeyZzPMHqz7ENfi8', '86h6d6u4AXrst4BVMD9dzdGZ', 'xp8pSDavAgfE5XScqXo9UKHF', 'dWbCoCb3TacCP93imNEcPxcL']
		            	let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)]

		            	hmm = await './src/remobg-' + getRandom('')
		            	localFile = await ichi.downloadAndSaveMediaMessage(quoted, hmm)
		            	outputFile = './src/hremo-' + getRandom('.png')
		            	m.reply(mess.wait)
		            	try {
		            		remobg.removeBackgroundFromImageFile({
		            			path: localFile,
		            			apiKey: apinobg,
		            			size: "regular",
		            			type: "auto",
		            			scale: "100%",
		            			outputFile
		            		}).then(async result => {
		            			console.log(outputFile)
		            			let tes = await fs.readFileSync(outputFile)
		            			let anu = await TelegraPh(outputFile)
		            			console.log(anu)
		            			let hsil = await getBuffer(`https://oni-chan.my.id/api/Fmake/estetik?picturl=${anu}`)
		            			await sleep(9000)
		            			await ichi.sendMessage(m.chat, {
		            				image: hsil,
		            				caption: "success"
		            			}, {
		            				quoted: m
		            			})
		            			await sleep(15000)
		            			await fs.unlinkSync(localFile)
		            			await fs.unlinkSync(outputFile)
		            		})
		            	} catch (err) {
		            		m.reply(util.format(err))
		            		await fs.unlinkSync(localFile)
		            	}
		            }
		            break

		case 'ktpmaker': {
if (args.length == 0) return m.reply(`*Usage :*\n${prefix+command} Nik|Province|Regency|Name|Birthdate|Type of Class|Address|RtRw|KelVillage|Kecamatan|Religion|Statu |Job|Region|Applicable|blood type|Image Link\n\n${prefix+command} 35567778995|West Java Province|Bekasi Regency|jebeh Store|Bekasi |Men|Bintara Jaya|02/05|Karang Indah|Bekasi Barat|Islam|Singles|anakjebeh|Indonesia|2021-2080|abc|https://i.ibb.co/qrQX5DC/IMG-20220401-WA0084.jpg\n\n\n*[warning]*\n every input query after the midline | space is prohibited\n*「 INFO IMAGE *\nFor ID card profile picture\nUpload from the following web\n\nhttps://i.waifu.pics\nhttps://c.top4top.io\ n\nSAMPLE OF HIS RESULT\nhttps://i.ibb.co/qrQX5DC/IMG-20220401-WA0084.jpg\nhttps://k.top4top.io/p_2208264hn0.jpg`)
			get_args = args.join(" ").split("|")
			nik = get_args[0]
			if (!nik) return m.reply('Your family identification number, make sure it doesn,t look like the original NIK, okay?')
			prov = get_args[1]
			if (!prov) return m.reply('which province are you?')
			kabu = get_args[2]
			if (!kabu) return m.reply('which district are you?')
			name = get_args[3]
			if (!name) return m.reply('what,s your name')
			ttl = get_args[4]
			if (!ttl) return m.reply('place of birth date')
			jk = get_args[5]
			if (!jk) return m.reply('gender male or female')
			jl = get_args[6]
			if (!jl) return m.reply('what,s your home address?')
			rtrw = get_args[7]
			if (!rtrw) return m.reply('How many RT / RW sis')
			lurah = get_args[8]
			if (!lurah) return m.reply('which village are you?')
			camat = get_args[9]
			if (!camat) return m.reply('which district are you?')
			agama = get_args[10]
			if (!agama) return m.reply('what,s your religion')
			nikah = get_args[11]
			if (!nikah) return m.reply('no status yet')
			kerja = get_args[12]
			if (!kerja) return m.reply('no job yet')
			warga = get_args[13]
			if (!warga) return m.reply('no regions yet')
			until = get_args[14]
			if (!until) return m.reply('Expiration time does not exist yet')
			gd = get_args[15]
			if (!gd) return m.reply('no blood group')
			img = get_args[16]
			if (!img) return m.reply('Image url doesn,t exist yet')
      m.reply(mess.wait)
			bikin = (`https://oni-chan.my.id/api/Fmake/ktpmaker?nik=${nik}&nama=${name}&ttl=${ttl}&jk=${jk}&gd=${gd}&almt=${jl}&rtw=${rtrw}&kel=${lurah}&kc=${camat}&agm=${agama}&st=${nikah}&krj=${kerja}&ngr=${warga}&blk=${until}&prv=${prov}&kab=${kabu}&picturl=${img}`)
			console.log(bikin)
			ardaktp = await getBuffer(bikin)
		  await sleep(8000)
			await ichi.sendMessage(from, { image: ardaktp, caption: `done kak` }, { quoted: m })
		//	await sleep(5000)
		}
			break;

case 'toimage': case 'toimg': {
  if (!quoted) throw 'Reply Image'
  if (!/webp/.test(mime)) return m.reply(`Reply sticker with caption *${prefix + command}*`)
  m.reply(mess.wait)
  let media = await ichi.downloadAndSaveMediaMessage(quoted)
  let ran = await getRandom('.png')
  exec(`ffmpeg -i ${media} ${ran}`, (err) => {
  fs.unlinkSync(media)
  if (err) throw err
  let buffer = fs.readFileSync(ran)
  ichi.sendMessage(m.chat, { image: buffer }, { quoted: m })
  fs.unlinkSync(ran)
  })
  }
  break
case 'tomp4': case 'tovideo': {
  if (!quoted) throw 'Reply Image'
  if (!/webp/.test(mime)) throw `reply sticker with caption *${prefix + command}*`
  m.reply(mess.wait)
  let { webp2mp4File } = require('../lib/uploader')
  let media = await ichi.downloadAndSaveMediaMessage(quoted)
  let webpToMp4 = await webp2mp4File(media)
  await ichi.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
  await fs.unlinkSync(media)
  }
  break
case 'toaud': case 'toaudio': {
  if (!/video/.test(mime) && !/audio/.test(mime)) throw `Send/Reply the Video/Audio You Want to Use as Audio With Caption ${prefix + command}`
  if (!quoted) throw `Send/Reply the Video/Audio You Want to Use as Audio With Caption ${prefix + command}`
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toAudio } = require('../lib/converter')
  let audio = await toAudio(media, 'mp4')
  ichi.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
  }
  break
case 'tomp3': {
  if (/document/.test(mime)) throw `Send/Reply Video/Audio You Want to Convert into MP3 With Caption ${prefix + command}`
  if (!/video/.test(mime) && !/audio/.test(mime)) throw `Send/Reply Video/Audio You Want to Convert into MP3 With Caption ${prefix + command}`
  if (!quoted) throw `Send/Reply Video/Audio You Want to Convert into MP3 With Caption ${prefix + command}`
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toAudio } = require('../lib/converter')
  let audio = await toAudio(media, 'mp4')
  ichi.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By ${ichi.user.name}.mp3`}, { quoted : m })
  }
  break
case 'tovn': case 'toptt': {
  if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply Video/Audio That You Want To Be VN With Caption ${prefix + command}`
  if (!quoted) throw `Reply Video/Audio That You Want To Be VN With Caption ${prefix + command}`
  m.reply(mess.wait)
  let media = await quoted.download()
  let { toPTT } = require('../lib/converter')
  let audio = await toPTT(media, 'mp4')
  ichi.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
  }
  break
case 'togif': {
  if (!quoted) throw 'Reply Image'
  if (!/webp/.test(mime)) throw `reply sticker with caption *${prefix + command}*`
  m.reply(mess.wait)
  let { webp2mp4File } = require('../lib/uploader')
  let media = await ichi.downloadAndSaveMediaMessage(quoted)
  let webpToMp4 = await webp2mp4File(media)
  await ichi.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
  await fs.unlinkSync(media)
  }
  break
case 'tourl': {
  m.reply(mess.wait)
  let { UploadFileUgu, webp2mp4File, TelegraPh } = require('../lib/uploader')
  let media = await ichi.downloadAndSaveMediaMessage(quoted)
  if (/image/.test(mime)) {
  let anu = await TelegraPh(media)
  m.reply(util.format(anu))
  } else if (!/image/.test(mime)) {
  let anu = await UploadFileUgu(media)
  m.reply(util.format(anu))
  }
  await fs.unlinkSync(media)
  }
  break

//Random Menu
case 'pinterest': {
  if (!text) return m.reply(`What Are You Looking For? ${command}?\nExample : *${prefix + command} hinata*`)
  m.reply(mess.wait)
  let anu = await pinterest(text)
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonspinterest = [{buttonId: `pinterest ${text}`, buttonText: {displayText: 'Next Result'}, type: 1}]
  ichi.sendMessage(m.chat, { image: { url: result }, caption: 'Source Url : '+result, buttons: buttonspinterest }, { quoted: m })
  }
  break
case 'wallpaper': {
  if (!text) return m.reply(`Mau Cari Apa Di ${command}?\nExample : *${prefix + command} hinata*`)
  m.reply(mess.wait)
  let anu = await wallpaper(text)
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonswallpaper = [{buttonId: `wallpaper ${text}`, buttonText: {displayText: 'Next Result'}, type: 1}]
  ichi.sendMessage(m.chat, { image: { url: result.image[0] }, caption: `Source Url : ${result.image[2] || result.image[1] || result.image[0]}`, buttons: buttonswallpaper }, { quoted: m })
  }
  break
case 'quotesanime': {
  m.reply(mess.wait)
  let anu = await quotesAnime()
  result = anu[Math.floor(Math.random() * anu.length)]
  let buttonsquotes = [{buttonId: `quotesanime`, buttonText: {displayText: 'Next Result'}, type: 1}]
  ichi.sendButtonText(m.chat, buttonsquotes, `${result.quotes}\n\nBy : ${result.karakter}`, global.ownerName, m)
  }
  break
case 'wikimedia': {
  if (!text) throw 'Enter Query Title'
  let wiki = await wikimedia(text)
  result = wiki[Math.floor(Math.random() * wiki.length)]
  let buttons = [{buttonId: `wikimedia ${text}`, buttonText: {displayText: 'Next Result'}, type: 1}]
  let buttonMessage = {
  image: { url: result.image },
  caption: `📄 Title : ${result.title}
📬 Source : ${result.source}
🔗 Media Url : ${result.image}`,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  ichi.sendMessage(m.chat, buttonMessage, { quoted: m })
  }
  break

//Downloader
case 'ytmp4': case 'ytvideo': case 'ytv': {
  let { ytv } = require('../lib/y2mate')
  if (!q) return m.reply(`Gunakan Format : ${command} linknya`)
  if (!isUrl(q)) return m.reply('Link Invalid ❎')
  if (!q.includes('youtube')/('youtu.be')) return m.reply('Link Invalid ❎')
  await m.reply(mess.wait)
  let quality = args[1] ? args[1] : '360p'
  let media = await ytv(text, quality)
  if (media.filesize >= 100000) return m.reply('File Exceeds Limit Please Download It Yourself : '+media.dl_link)
  var caption = `---- DATA VIDEO -----
  
📄 Judul : ${media.title}
🎚️ Size : ${media.filesizeF}
🔗 Url : ${isUrl(text)}
📥 Format : MP4
📮 Resolusi : ${args[1] || '360p'}`
  ichi.sendMessage(m.chat, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: caption }, { quoted: m })
  }
  break
case 'ytmp3': case 'ytaudio': case 'yta': {
  let { yta } = require('../lib/y2mate')
  if (!q) return m.reply(`Gunakan Format : ${command} linknya`)
  if (!isUrl(q)) return m.reply('Link Invalid ❎')
  if (!q.includes('youtube')/('youtu.be')) return m.reply('Link Invalid ❎')
  await m.reply(mess.wait)
  let quality = args[1] ? args[1] : '128kbps'
  let media = await yta(text, quality)
  if (media.filesize >= 100000) return m.reply('File Exceeds Limit Please Download It Yourself : '+media.dl_link)
  var caption = `*------ DATA AUDIO -----*

📄 Title : ${media.title}
🎚️ Size : ${media.filesizeF}
🔗 Url : ${isUrl(text)}
📥 Format : MP3
📮 Resolusi : ${args[1] || '128kbps'}`
  ichi.sendImage(m.chat, media.thumb, caption, m)
  ichi.sendMessage(m.chat, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: m })
  }
  break
case 'yts': case 'ytsearch': {
  m.reply(mess.wait)
  if (!text) throw `Example : ${prefix + command} story wa anime`
  let yts = require("yt-search")
  let search = await yts(text)
  let teks = '*---- Data Ditemukan ----*\n\n Keywords : '+text+'\n\n'
  let no = 1
  for (let i of search.all) {
  teks += `🔢 No : ${no++}
🎞️ Type : ${i.type}
📀 Video ID : ${i.videoId}
📄 Title : ${i.title}
👁️ Views : ${i.views}
👁️ Duration : ${i.timestamp}
📤 Upload : ${i.ago}
👨‍🎤 Author : ${i.author.name}
🔗 Url : ${i.url}\n\n─────────────────\n\n`
  }
  ichi.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: m })
  }
  break
case 'play':
  if (!text) throw `Example : ${prefix + command} story wa anime`
  let yts = require("yt-search")
  let search = await yts(text)
  let anu = search.videos[Math.floor(Math.random() * search.videos.length)]
  let buttons = [{buttonId: `ytmp3 ${anu.url}`, buttonText: {displayText: 'Audio 🎵'}, type: 1}, {buttonId: `ytmp4 ${anu.url}`, buttonText: {displayText: 'Video 🎦'}, type: 1}]
  let buttonMessage = {
  image: { url: anu.thumbnail },
  caption: `*----- DATA INFO -----*
  
*📄 Title :* ${anu.title}
*⌚ Duration :* ${anu.timestamp}
*👁️ Viewers :* ${anu.views}
*📤 Upload :* ${anu.ago}
*👨‍🎤 Channel :* ${anu.author.url}
*🔗 Url :* ${anu.url}`,
  footer: global.ownerName,
  buttons: buttons,
  headerType: 4
  }
  ichi.sendMessage(m.chat, buttonMessage, { quoted: m })
  break

//Eval
default:
if (budy.startsWith('=>')) {
  if (!isOwner) return m.reply(mess.botOwner)
  function Return(sul) {
  sat = JSON.stringify(sul, null, 2)
  bang = util.format(sat)
  if (sat == undefined) {
  bang = util.format(sul)
  }
  return m.reply(bang)
  }
  try {
  m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
  } catch (e) {
  m.reply(String(e))
  }
  }  
if (budy.startsWith('>')) {
  if (!isOwner) return m.reply(mess.botOwner)
  try {
  let evaled = await eval(budy.slice(2))
  if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
  await m.reply(evaled)
  } catch (err) {
  m = String(err)
  await m.reply(m)
  }
  }
if (budy.startsWith('$')) {
  if (!isOwner) return m.reply(mess.botOwner)
  exec(budy.slice(2), (err, stdout) => {
  if(err) return reply(err)
  if (stdout) return m.reply(stdout)
  })
  }

  }
  } catch (err) {
    console.log("error di bagian ichi.js "+util.format(err))
//  m.reply(util.format(err))
  }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})
