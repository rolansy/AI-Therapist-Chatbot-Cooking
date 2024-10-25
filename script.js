document.getElementById('send-btn').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatLog = document.getElementById('chat-log');
    const userMessage = document.createElement('div');
    userMessage.textContent = `User: ${userInput}`;
    chatLog.appendChild(userMessage);

    const query = encodeURIComponent(userInput);
    const url = `http://localhost:3000/search?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const botMessage = document.createElement('div');
            if (data.organic_results && data.organic_results.length > 0) {
                botMessage.textContent = `Bot: ${data.organic_results[0].snippet}`;
            } else {
                botMessage.textContent = `Bot: Sorry, I couldn't find any results.`;
            }
            chatLog.appendChild(botMessage);
        })
        .catch(error => {
            const botMessage = document.createElement('div');
            botMessage.textContent = `Bot: Sorry, I couldn't fetch the data.`;
            chatLog.appendChild(botMessage);
        });

    document.getElementById('user-input').value = '';
}