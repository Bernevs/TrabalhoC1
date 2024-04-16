"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const client_1 = require("@prisma/client");
(0, dotenv_1.config)();
const token = "7008859303:AAE-YwJ1GXgraEAlNPJUoRR7xcyY6ZoeitM";
const prisma = new client_1.PrismaClient();
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
let msgCont = 1;
function salvarEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.create({ data: { email: email } });
        console.log("Email adicionado!");
    });
}
bot.on("message", (msg) => {
    var _a;
    const chatId = msg.chat.id;
    const data = new Date();
    const msgHora = data.getHours();
    if (msgHora >= 9 && msgHora <= 18 && msgCont === 1) {
        bot.sendMessage(chatId, "Link da Faesa: https://faesa.br.");
    }
    else if (msgCont === 1) {
        bot.sendMessage(chatId, "O horário de funcionamento da empresa é de 09:00 às 18:00");
        bot.sendMessage(chatId, "Informe o seu email para que possamos entrar em contato");
    }
    msgCont++;
    if (msgCont != 1 && ((_a = msg.text) === null || _a === void 0 ? void 0 : _a.includes("@"))) {
        const email = String(msg.text);
        salvarEmail(email);
        bot.sendMessage(chatId, "Email recebido");
        msgCont = 1;
    }
});
