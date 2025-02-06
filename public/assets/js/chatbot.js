document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
    const chatBox = document.getElementById("chat-box");

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    async function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        chatBox.innerHTML += `<p class="user-message"><b>You:</b> ${message}</p>`;
        userInput.value = "";

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            chatBox.innerHTML += `<p class="bot-message"><b>Bot:</b> ${data.reply}</p>`;
            chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
        } catch (error) {
            chatBox.innerHTML += `<p class="error-message"><b>Error:</b> AI service is unavailable.</p>`;
        }
    }
});