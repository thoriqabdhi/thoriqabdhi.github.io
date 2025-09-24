// BARIS PENTING (Baris 1): Import seluruh modul sebagai objek 'GenAI'
import * as GenAI from "https://cdn.jsdelivr.net/npm/@google/genai@latest/dist/index.min.js"; 

// Variabel HTML
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

// --- API SETUP ---
const API_KEY = "AIzaSyA3B44feumkz4zBn67w9wkHyhlGxAUs5Ww"; 
// Inisialisasi sekarang akan berhasil dengan mengakses GenAI.GoogleGenAI
// Kita mengasumsikan kelas utama ada di properti GoogleGenAI dari objek yang diimpor.
const ai = new GenAI.GoogleGenAI({ apiKey: API_KEY });
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


