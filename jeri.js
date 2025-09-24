
// Variabel HTML
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

// --- API SETUP ---
const API_KEY = "YOUR_API_KEY_HERE"; 
const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash"; 

// --- Chat Session & System Instruction ---
const systemInstruction = 
  "Anda adalah Jeri, Asisten Virtual yang ramah dan sopan. Anda bertugas menjawab pertanyaan. Selalu sebut diri Anda 'Jeri' dan pertahankan nada bicara yang santai dan membantu. Jangan berikan jawaban yang terlalu panjang.";

const chat = ai.chats.create({
    model: model,
    config: {
        systemInstruction: systemInstruction,
    }
});

// --- Fungsi Utama ---
function displayMessage(message, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") return;

    displayMessage(userText, 'user');
    userInput.value = '';
    
    // Tampilkan indikator mengetik
    displayMessage("Jeri sedang mengetik...", 'bot-loading');
    
    try {
        const response = await chat.sendMessage({ message: userText });
        
        // Hapus indikator mengetik
        const loadingMsg = chatbox.querySelector('.bot-loading');
        if (loadingMsg) {
             chatbox.removeChild(loadingMsg);
        }

        const botResponse = response.text.trim();
        displayMessage(botResponse, 'bot');
        
    } catch (error) {
        console.error("Gemini API Error:", error);
        
        const loadingMsg = chatbox.querySelector('.bot-loading');
        if (loadingMsg) {
             chatbox.removeChild(loadingMsg);
        }
        
        displayMessage("Maaf, terjadi kesalahan saat menghubungi Jeri. Coba lagi.", 'bot');
    }
}

// Event Listener: Kirim pesan ketika tombol Enter ditekan
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Perbaikan CSS untuk indikator loading (tambahkan di file CSS Anda)
/*
.bot-loading {
    background-color: #cb86e0;
    font-style: italic;
    color: #495057;
    animation: blink 1s infinite;
}
@keyframes blink {
    50% { opacity: 0.5; }
}
*/


// const chatbox = document.getElementById("chatbox");
// const userInput = document.getElementById("user-input");

// // Menggunakan Map untuk struktur balasan yang lebih baik
// // Buat objek balasan yang menggunakan pola RegEx
// const botReplies = new Map([
//   [["siapa", "kamu", "anda"], "Saya Thoriq, pengembang web dan penulis."],
//   [["kontak", "hubungi", "telepon"], "Kamu bisa menghubungi saya lewat <a href='https://thoriqabdhi.github.io/contact.html'>thoriqabdhi</a>"],
//   [["proyek", "project", "karya", "pekerjaan"], "Beberapa proyek saya: buku resep, sistem kasir, landing page microstock."],
//   [["terima kasih", "makasih", "thank you", "tks", "trims"], "Sama-sama! Senang bisa membantu 😊"]
// ]);

// function getBotReply(msg) {
//   const msgWords = msg.toLowerCase().split(/\s+/);
//   let highestScore = 0;
//   let bestReply = "Maaf, saya belum paham pertanyaan itu.";

//   for (const [keywords, reply] of botReplies) {
//     let currentScore = 0;
//     // Beri skor untuk setiap kata kunci yang cocok
//     for (const word of msgWords) {
//       if (keywords.includes(word)) {
//         currentScore++;
//       }
//     }

//     // Jika skor lebih tinggi, simpan balasan ini
//     if (currentScore > highestScore) {
//       highestScore = currentScore;
//       bestReply = reply;
//     }
//   }
  
//   // Hanya beri balasan jika ada skor yang signifikan
//   if (highestScore > 0) {
//       return bestReply;
//   } else {
//       return "Maaf, saya belum paham pertanyaan itu.";
//   }
// }

// function addMessage(sender, text) {
//   const msg = document.createElement("div");
//   msg.className = sender === "user" ? "user-msg" : "bot-msg";

//   // Membedakan penggunaan textContent dan innerHTML untuk keamanan
//   if (sender === "user") {
//     // textContent untuk input pengguna agar aman dari XSS
//     msg.textContent = text;
//   } else {
//     // innerHTML untuk balasan bot yang sudah dikontrol
//     msg.innerHTML = text;
//   }

//   chatbox.appendChild(msg);
//   chatbox.scrollTop = chatbox.scrollHeight;
// }

// userInput.addEventListener("keypress", function (e) {
//   if (e.key === "Enter") {
//     const input = userInput.value.trim();
//     if (input === "") return;

//     addMessage("user", input);
//     const reply = getBotReply(input.toLowerCase());
    
//     // Memberi waktu tunda 500ms untuk efek yang lebih alami
//     setTimeout(() => {
//       addMessage("bot", reply);
//     }, 500);

//     // Mengosongkan input setelah pesan dikirim
//     userInput.value = "";
//   }
// });


// API Gemini
// AIzaSyA3B44feumkz4zBn67w9wkHyhlGxAUs5Ww



