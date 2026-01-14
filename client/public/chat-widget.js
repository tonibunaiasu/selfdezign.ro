(function () {
  /**
   * Basic chat widget implementation.
   *
   * This script injects a floating chat button into the page. When clicked,
   * it opens a small chat window. User messages are sent to the `/api/chat`
   * endpoint and the AI's response is displayed. At the end of a session
   * you can trigger a POST to `/api/transcript` with the full conversation.
   *
   * Note: this is a very simple implementation intended as a starting
   * point. Feel free to customize the UI/UX, styling and error handling.
   */
  const style = document.createElement('style');
  style.textContent = `
    #sd-chat-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #333;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 9999;
    }
    #sd-chat-window {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 320px;
      max-height: 400px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
    }
    #sd-chat-header {
      background: #333;
      color: #fff;
      padding: 8px;
      font-weight: bold;
    }
    #sd-chat-messages {
      flex: 1;
      padding: 8px;
      overflow-y: auto;
      font-size: 14px;
    }
    #sd-chat-input {
      border-top: 1px solid #ddd;
      display: flex;
    }
    #sd-chat-input input {
      flex: 1;
      border: none;
      padding: 8px;
      font-size: 14px;
    }
    #sd-chat-input button {
      padding: 8px 12px;
      border: none;
      background: #333;
      color: #fff;
      cursor: pointer;
    }
    .sd-chat-bubble {
      margin: 4px 0;
      padding: 6px 10px;
      border-radius: 4px;
      max-width: 80%;
    }
    .sd-chat-bubble.user {
      background: #eef;
      align-self: flex-end;
    }
    .sd-chat-bubble.assistant {
      background: #f7f7f7;
      align-self: flex-start;
    }
  `;
  document.head.appendChild(style);

  const scriptEl = document.currentScript;
  const apiBase =
    scriptEl && scriptEl.getAttribute('data-api-base')
      ? scriptEl.getAttribute('data-api-base')
      : scriptEl && scriptEl.src
        ? new URL(scriptEl.src).origin
        : window.location.origin;

  // Create chat button
  const button = document.createElement('div');
  button.id = 'sd-chat-button';
  button.textContent = '💬';
  document.body.appendChild(button);

  // Create chat window
  const windowEl = document.createElement('div');
  windowEl.id = 'sd-chat-window';
  windowEl.innerHTML = `
    <div id="sd-chat-header">SelfDezign Chat</div>
    <div id="sd-chat-messages"></div>
    <div id="sd-chat-input">
      <input type="text" placeholder="Scrie mesajul..." />
      <button type="button">Trimite</button>
    </div>
  `;
  document.body.appendChild(windowEl);

  const messagesEl = windowEl.querySelector('#sd-chat-messages');
  const inputEl = windowEl.querySelector('#sd-chat-input input');
  const sendBtn = windowEl.querySelector('#sd-chat-input button');

  const messages = [];
  let sessionId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  function appendBubble(content, role) {
    const bubble = document.createElement('div');
    bubble.className = `sd-chat-bubble ${role}`;
    bubble.textContent = content;
    messagesEl.appendChild(bubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    appendBubble(text, 'user');
    messages.push({ role: 'user', content: text });
    inputEl.value = '';
    try {
      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, sessionId })
      });
      const aiResponse = await res.text();
      appendBubble(aiResponse, 'assistant');
      messages.push({ role: 'assistant', content: aiResponse });
    } catch (err) {
      console.error(err);
      appendBubble('A ap\u0103rut o eroare. V\u0103 rug\u0103m \u00eencerca\u021bi din nou.', 'assistant');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  inputEl.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      sendMessage();
    }
  });

  button.addEventListener('click', () => {
    windowEl.style.display = windowEl.style.display === 'flex' ? 'none' : 'flex';
    windowEl.style.flexDirection = 'column';
  });

  // Optional: send transcript on unload
  window.addEventListener('beforeunload', () => {
    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'User' : 'AI'}: ${m.content}`)
      .join('\n');
    // Fire and forget; we don't await this
    if (transcript) {
      navigator.sendBeacon(
        `${apiBase}/api/transcript`,
        new Blob([
          JSON.stringify({ sessionId, transcript }),
          { type: 'application/json' }
        ])
      );
    }
  });
})();
