 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;',Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ09GcTdHTHhqR3MvUENKOGNkNnNxbFRiSTFiNEMzcythQWovYzJaNlZVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGJwZkZMUjliZVRrTkdpYjNjdm44a1pCVjFBcmtkR0liSEh1NVVZd0xYUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTFp0QzBJclIzRGl0TmdHbTdxbW9pbnN1TlZFS0lJUjhianpMYzRNamt3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrYUM2b3NNdlVCRGxDZ2VqMDJZS3RPZzNOMHlWbUhYd0V2ZkpHOHJUMUJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdLNWtueElYZ3dldmcwclQwNHZCUmRRMG5Pd3NOdFVRRU1lckZGSE5JVTQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFrUUU5ZDlRMFR4WHZBeUt5ZzNXRmNxTGwrSU5QOHV1ODd6eFBBQnA3WEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUpHZGdMTi83bEIyTys1dWJqc3Y5Q2xWSXBBbnVFZ055QnNUUEJBek5XVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0tYQUxwWHovcm9jcjVTMkdxSlpoQjM4QkY0Sm83bldXYTJMOWhpVmxCcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhnY3I2TldyZ2ZtZmZFYzFwT3VwZDNTL0JiZkczN2cwNFcxUTk2RDlyMStPY1B5WGlPMkZkY0tKZS9qMThyK3VmUGR6UmxjMDlsRHo3VEtwUVZHNERnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQwLCJhZHZTZWNyZXRLZXkiOiJEVEJnUUk0ZW1LU1lvZTViekI3Z2x1WnVGZjJjS2tqaC9LNTlrVDVXN2hBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgwODc4MjIyODhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMUZBQUY4MDlBOTc5NDc1MDM3N0I5RjY2MUU2ODc4MzUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNjg0NjM4MH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODA4NzgyMjI4OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIyOUI1MkVBNTRERDdFODRDMkYzREE4MTFGNTBEQjZBQiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI2ODQ2MzgyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MDg3ODIyMjg4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNCOTcxMjlFRkYzQkI3MzQ3NkQzRTRBMDQ3NURBQ0FCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjY4NDYzOTF9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjRrNVpGZ05sUU42VWl2QkhSbHFBZlEiLCJwaG9uZUlkIjoiNzg5MjQxMjktNzk3Mi00ZmJlLTk5MDYtNzI1MTNkMjFmMjI3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNmNTdQaUVxbEVFd1hOVkpyTDZSZlVjNjZJOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJleWpBM25uL0lqVHlCUjQwcmk5V0cxdWthRzA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWDlBMVRZTkMiLCJtZSI6eyJpZCI6IjIzNDgwODc4MjIyODg6MTBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQ2hpZGVyYSBObmFraWZlIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPRGE2N0lFRUp1cnRyY0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJvMTN4VThzMEU0dm9KS1BNeDNNVDZSejZhTW83Qm03bFUxK2JTZjcwakRjPSIsImFjY291bnRTaWduYXR1cmUiOiJRTko4a2NVeVd5OWlZakJYVXRjRUpKaEo2YTdzZEVnR0c3OExSb2ptczBGdEtHS3YyTWdGQXBDeDQzOS9GZTNaOWN5eEtqY0hUTC91VHVwSnNLQjdDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoieERucUdRdmI1WXB0d0hkeEE3TVF2ZW8rUnd5TE13dXZIamNlL2lHNkJKMndwUm1OOFpYUjFLMmV4Z3VoQ0tVb1MvVU1XOElkZ3VXY2JHTnByYWh2RGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDg3ODIyMjg4OjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFOZDhWUExOQk9MNkNTanpNZHpFK2tjK21qS093WnU1Vk5mbTBuKzlJdzMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY4NDYzNzYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUHdxIn0=

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
