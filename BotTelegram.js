import fetch from "node-fetch";
const BOT_TOKEN = "TOKEN BOT";
const OPENAI_API_KEY = "sk-xxxxxxxxxxxx";
const FIREBASE_URL = "";
const ADMIN_USER_ID = 6254067837;
let offset = 0;
async function startBot() {
  console.log("🤖 Bot đang chạy bằng polling...");

  while (true) {
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates?timeout=50&offset=${offset}`
      );
      const data = await res.json();

      if (data.ok) {
        for (const update of data.result) {
          offset = update.update_id + 1;
          await handleUpdate(update);
        }
      }
    } catch (e) {
      console.error("Polling error:", e.message);
      await sleep(3000);
    }
  }
}

startBot();
async function handleUpdate(update) {
  if (!update.message) return;
  const msg = update.message;
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text?.trim() || "";
  const isGroup = ["group", "supergroup"].includes(msg.chat.type);
  const isReply = msg.reply_to_message?.from?.is_bot;
  if (text === "/start") {
    return sendMessage(chatId, "👋 Bot đang chạy!\n\nDùng /ai để hỏi AI.");
  }
  if (text.startsWith("/ai")) {
    const q = text.replace("/ai", "").trim();
    if (!q) return sendMessage(chatId, "⚠️ Nhập câu hỏi sau /ai");

    await sendTyping(chatId);
    const prefix = isGroup ? await getGroupPrefix(chatId) : null;
    const reply = await askChatGPT(q, prefix);
    return sendMessage(chatId, reply, msg.message_id);
  }
  if (isReply && text) {
    await sendTyping(chatId);
    const prefix = isGroup ? await getGroupPrefix(chatId) : null;
    const reply = await askChatGPT(text, prefix);
    return sendMessage(chatId, reply, msg.message_id);
  }
}
async function askChatGPT(prompt, groupPrefix = null) {
  const messages = [];

  if (groupPrefix) {
    messages.push({ role: "system", content: groupPrefix });
  }

  messages.push({ role: "user", content: prompt });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "AI không phản hồi.";
}
async function getGroupPrefix(chatId) {
  try {
    const res = await fetch(`${FIREBASE_URL}/group_prefixes/${chatId}/prefix.json`);
    return await res.json();
  } catch {
    return null;
  }
}
async function sendMessage(chatId, text, replyId = null) {
  const payload = { chat_id: chatId, text };
  if (replyId) payload.reply_to_message_id = replyId;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

async function sendTyping(chatId) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendChatAction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, action: "typing" })
  });
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
