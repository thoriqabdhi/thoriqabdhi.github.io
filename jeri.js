// --- KUNCI: IMPOR YANG PALING STABIL ---
// Impor semua modul sebagai objek GenAI.
import * as GenAI from "https://cdn.jsdelivr.net/npm/@google/genai@latest/dist/index.min.js"; 

// Variabel HTML
const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");

// --- API SETUP ---
// PERINGATAN: GANTI DENGAN KUNCI API ANDA! JANGAN DITARUH DI GITHUB PUBLIK!
const API_KEY = "AIzaSyA3B44feumkz4zBn67w9wkHyhlGxAUs5Ww";  

// Inisialisasi klien dengan mengakses kelas GoogleGenAI dari objek GenAI yang diimpor
const ai = new GenAI.GoogleGenAI({ apiKey: API_KEY });
const model = "gemini-2.5-flash"; 

// --- Chat Session & System Instruction (Mendefinisikan Karakter Jeri) ---
const systemInstruction = 
  "Anda adalah Jeri, Asisten Virtual yang ramah, sopan, dan sedikit humoris. Tugas Anda adalah menjawab semua pertanyaan pengguna dalam Bahasa Indonesia. Selalu sebut diri Anda 'Jeri' dan pertahankan nada bicara yang santai dan membantu. Jangan berikan jawaban yang terlalu panjang dan hindari menyebutkan bahwa Anda adalah model AI.";

const chat = ai.chats.create({
    model: model,
    config: {
        systemInstruction: systemInstruction,
    }
});

// --- Fungsi Utama ---
function displayMessage(message, sender) {
    const msgDiv = document.createElement("div");
    // Mengganti karakter newline (\n) menjadi tag <br> untuk tampilan HTML
    msgDiv.innerHTML = message.replace(/\n/g, '<br>'); 
    msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');
    
    // Hapus indikator 'bot-loading' jika ada (untuk mencegah penumpukan)
    const loadingMsg = chatbox.querySelector('.bot-loading');
    if (loadingMsg && sender !== 'bot-loading') {
        chatbox.removeChild(loadingMsg);
    }

    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Gulir ke bawah
}

async function sendMessage() {
    const userText = userInput.value.trim();
    if (userText === "") return;

    displayMessage(userText, 'user');
    userInput.value = '';
    
    // Tampilkan indikator mengetik
    displayMessage("Jeri sedang berpikir...", 'bot-loading');
    
    try {
        // Kirim pesan ke sesi chat Gemini
        const response = await chat.sendMessage({ message: userText });
        
        // Hapus indikator mengetik (Jika masih ada, pastikan dihapus sebelum pesan bot)
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
        
        displayMessage("Maaf, Jeri sedang mengalami gangguan jaringan. Coba lagi.", 'bot');
    }
}

// Event Listener: Kirim pesan ketika tombol Enter ditekan
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});
