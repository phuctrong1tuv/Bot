```markdown
# 🤖 Telegram ChatGPT Bot

Bot Telegram tích hợp ChatGPT API, hỗ trợ chat cá nhân và nhóm với khả năng tùy chỉnh system prompt cho từng nhóm.

## ✨ Tính năng

- 💬 Chat với ChatGPT thông qua Telegram
- 👥 Hỗ trợ cả chat cá nhân và nhóm
- 🎯 Tùy chỉnh system prompt riêng cho từng nhóm
- ⚡ Phản hồi nhanh với typing indicator
- 🔄 Tự động polling để nhận tin nhắn

## 📋 Yêu cầu

- Node.js 14+ 
- Telegram Bot Token
- OpenAI API Key
- Firebase Realtime Database (tùy chọn - cho group prefix)

## 🚀 Cài đặt

### 1. Clone/Download code

```bash
# Tạo thư mục dự án
mkdir telegram-chatgpt-bot
cd telegram-chatgpt-bot
```

### 2. Cài đặt dependencies

```bash
npm install node-fetch
```

### 3. Cấu hình

Mở file `bot.js` và thay đổi các thông tin sau:

```javascript
const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
const OPENAI_API_KEY = "sk-YOUR_OPENAI_API_KEY";
const FIREBASE_URL = "https://your-project.firebaseio.com"; // Tùy chọn
const ADMIN_USER_ID = YOUR_TELEGRAM_USER_ID;
```

#### Lấy Telegram Bot Token:
1. Tìm [@BotFather](https://t.me/botfather) trên Telegram
2. Gửi `/newbot` và làm theo hướng dẫn
3. Copy token nhận được

#### Lấy OpenAI API Key:
1. Truy cập [platform.openai.com](https://platform.openai.com)
2. Vào API Keys → Create new secret key
3. Copy key (chỉ hiện 1 lần)

#### Lấy User ID:
1. Tìm [@userinfobot](https://t.me/userinfobot) trên Telegram
2. Start bot để xem ID của bạn

## 🎮 Sử dụng

### Khởi động bot

```bash
node bot.js
```

### Các lệnh

#### Chat cá nhân:
- `/start` - Khởi động bot
- `/ai <câu hỏi>` - Hỏi AI
- Reply tin nhắn của bot để tiếp tục hội thoại

#### Chat nhóm:
1. Thêm bot vào nhóm
2. Dùng `/ai <câu hỏi>` hoặc reply tin nhắn của bot
3. Bot sẽ tự động trả lời

### Ví dụ:

```
/ai Giải thích về blockchain

/ai Viết code Python đọc file CSV

/ai Dịch sang tiếng Anh: Xin chào
```

## 🔧 Tùy chỉnh

### Thay đổi model GPT

```javascript
model: "gpt-4o-mini",  // Đổi thành "gpt-4o", "gpt-3.5-turbo", etc.
```

### Điều chỉnh độ sáng tạo

```javascript
temperature: 0.7,  // 0.0 (chính xác) -> 2.0 (sáng tạo)
```

### Thay đổi độ dài phản hồi

```javascript
max_tokens: 1024,  // Tăng để có câu trả lời dài hơn
```

### Cấu hình Group Prefix (Firebase)

Cấu trúc dữ liệu trong Firebase:
```json
{
  "group_prefixes": {
    "-1001234567890": {
      "prefix": "Bạn là trợ lý lập trình chuyên nghiệp"
    }
  }
}
```

## 📝 Cấu trúc code

```
telegram-chatgpt-bot/
│
├── bot.js                 # File chính
├── package.json          # Dependencies
├── package-lock.json
└── README.md            # File này
```

## 🐛 Xử lý lỗi

### Bot không phản hồi:
- Kiểm tra BOT_TOKEN đúng chưa
- Kiểm tra bot có bị chặn không

### Lỗi OpenAI API:
- Kiểm tra API key còn hiệu lực
- Kiểm tra tài khoản còn credit không
- Xem log để biết chi tiết lỗi

### Bot bị lag:
- Giảm `max_tokens`
- Tăng timeout trong getUpdates
- Kiểm tra kết nối internet

## 💰 Chi phí

- **Telegram Bot**: Miễn phí
- **OpenAI API**: 
  - GPT-4o-mini: ~$0.15/1M tokens input, ~$0.60/1M tokens output
  - GPT-4o: ~$2.50/1M tokens input, ~$10/1M tokens output
- **Firebase**: Free tier đủ dùng

## 🔒 Bảo mật

⚠️ **QUAN TRỌNG:**
- Không commit API keys lên GitHub
- Sử dụng `.env` file cho production
- Giới hạn quyền admin bot
- Theo dõi usage để tránh vượt quota

## 📱 Deploy

### Chạy 24/7 với PM2:

```bash
npm install -g pm2
pm2 start bot.js --name telegram-bot
pm2 save
pm2 startup
```

### Deploy lên VPS/Cloud:
1. Upload code lên server
2. Cài Node.js và dependencies
3. Chạy với PM2 hoặc screen
4. Cấu hình firewall nếu cần

## 🆘 Hỗ trợ

- Website: [https://aistv.pages.dev](https://aistv.pages.dev)
- Tác giả: Trọng Phúc

## 📄 License

© Trọng Phúc - All rights reserved

---

**Lưu ý:** Đây là bot đơn giản cho mục đích học tập. Với production nên thêm:
- Error handling tốt hơn
- Rate limiting
- Database để lưu lịch sử chat
- Monitoring và logging
- Security middleware
```
