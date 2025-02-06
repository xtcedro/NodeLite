        async function sendMessage() {
            const userInput = document.getElementById("user-input").value;
            if (!userInput) return;

            const chatBox = document.getElementById("chat-box");
            chatBox.innerHTML += `<p class="user-message"><b>You:</b> ${userInput}</p>`;

            document.getElementById("user-input").value = ""; // Clear input

            try {
                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: userInput }),
                });

                const data = await response.json();
                chatBox.innerHTML += `<p class="bot-message"><b>Bot:</b> ${data.reply}</p>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
            } catch (error) {
                chatBox.innerHTML += `<p class="error-message"><b>Error:</b> AI service is unavailable.</p>`;
            }
        }
