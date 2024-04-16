import { config } from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import { PrismaClient } from "@prisma/client";

config();

const token = "INFORME_SEU_TOKEN";

const prisma = new PrismaClient();

const bot = new TelegramBot(token, { polling: true });
let msgCont = 1;

async function salvarEmail(email: string) {
  await prisma.user.create({ data: { email: email } });
  console.log("Email adicionado!");
}

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const data = new Date();
  const msgHora = data.getHours();

  if (msgHora >= 9 && msgHora <= 18 && msgCont === 1) {
    bot.sendMessage(chatId, "Link da Faesa: https://faesa.br.");
  } else if (msgCont === 1) {
    bot.sendMessage(
      chatId,
      "O horário de funcionamento da empresa é de 09:00 às 18:00"
    );
    bot.sendMessage(
      chatId,
      "Informe o seu email para que possamos entrar em contato"
    );
  }
  msgCont++;
  if (msgCont != 1 && msg.text?.includes("@")) {
    const email = String(msg.text);
    salvarEmail(email);

    bot.sendMessage(chatId, "Email recebido");
    msgCont = 1;
  }
});
