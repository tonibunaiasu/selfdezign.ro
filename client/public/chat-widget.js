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
    :root {
      --sd-black: #1a1a1a;
      --sd-accent: #f5c400;
      --sd-accent-strong: #ff6b6b;
      --sd-gray: #8c8c8c;
      --sd-surface: #ffffff;
      --sd-soft: #f7f5ef;
    }
    #sd-chat-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--sd-accent);
      color: var(--sd-black);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      z-index: 9999;
      border: 1px solid rgba(0,0,0,0.08);
      box-shadow: 0 8px 20px rgba(0,0,0,0.18);
    }
    #sd-chat-window {
      position: fixed;
      bottom: 84px;
      right: 20px;
      width: 360px;
      max-height: 520px;
      background: var(--sd-surface);
      border: 1px solid rgba(0,0,0,0.08);
      border-radius: 16px;
      box-shadow: 0 24px 48px rgba(0,0,0,0.18);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      font-family: "Space Grotesk", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
    }
    #sd-chat-header {
      background: var(--sd-black);
      color: var(--sd-accent);
      padding: 12px 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      letter-spacing: 0.2px;
    }
    #sd-chat-header-title {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    #sd-chat-header-title span {
      font-size: 12px;
      color: rgba(255,255,255,0.7);
      font-weight: 500;
    }
    #sd-chat-close {
      background: transparent;
      color: var(--sd-accent);
      border: none;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }
    #sd-chat-subheader {
      background: #111;
      color: rgba(255,255,255,0.7);
      font-size: 11px;
      padding: 6px 14px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    #sd-chat-messages {
      flex: 1;
      padding: 14px;
      overflow-y: auto;
      font-size: 14px;
      background: linear-gradient(180deg, #ffffff 0%, #faf8f3 100%);
    }
    #sd-chat-input {
      border-top: 1px solid rgba(0,0,0,0.08);
      display: flex;
      padding: 10px;
      gap: 8px;
      background: #fff;
    }
    #sd-chat-input input {
      flex: 1;
      border: 1px solid rgba(0,0,0,0.1);
      border-radius: 10px;
      padding: 10px 12px;
      font-size: 14px;
      outline: none;
    }
    #sd-chat-input button {
      padding: 10px 14px;
      border: none;
      border-radius: 10px;
      background: var(--sd-accent);
      color: var(--sd-black);
      font-weight: 600;
      cursor: pointer;
    }
    #sd-chat-consent {
      font-size: 11px;
      color: var(--sd-gray);
      padding: 0 14px 12px 14px;
      background: #fff;
      line-height: 1.4;
    }
    .sd-chat-bubble {
      margin: 6px 0;
      padding: 8px 12px;
      border-radius: 12px;
      max-width: 82%;
      line-height: 1.4;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .sd-chat-bubble.user {
      background: #fff2bf;
      align-self: flex-end;
    }
    .sd-chat-bubble.assistant {
      background: var(--sd-soft);
      align-self: flex-start;
    }
    @media (max-width: 480px) {
      #sd-chat-window {
        left: 12px;
        right: 12px;
        width: auto;
        bottom: 76px;
        max-height: 70vh;
      }
      #sd-chat-button {
        right: 12px;
        bottom: 12px;
      }
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
  button.innerHTML = `
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="#1a1a1a" d="M6.5 19.5l.3-2H7a7 7 0 1 1 0-14h10a7 7 0 0 1 0 14H10l-3.5 2z"/>
      <circle cx="9.5" cy="10.5" r="1.25" fill="#ffffff"/>
      <circle cx="12.5" cy="10.5" r="1.25" fill="#ffffff"/>
      <circle cx="15.5" cy="10.5" r="1.25" fill="#ffffff"/>
    </svg>
  `;
  document.body.appendChild(button);

  // Create chat window
  const windowEl = document.createElement('div');
  windowEl.id = 'sd-chat-window';
  windowEl.innerHTML = `
    <div id="sd-chat-header">
      <div id="sd-chat-header-title">
        <div>SelfDezign®</div>
        <span>Asistent AI</span>
      </div>
      <button id="sd-chat-close" type="button" aria-label="Inchide">×</button>
    </div>
    <div id="sd-chat-subheader">Program L-V 09:00-18:00 · Asistentul raspunde 24/7</div>
    <div id="sd-chat-messages"></div>
    <div id="sd-chat-input">
      <input type="text" placeholder="Scrie mesajul..." />
      <button type="button">Trimite</button>
    </div>
    <div id="sd-chat-consent">
      Continuand, esti de acord ca mesajele tale sa fie procesate pentru a oferi raspunsuri si pentru a imbunatati serviciul. Nu trimite date sensibile.
    </div>
  `;
  document.body.appendChild(windowEl);

  const messagesEl = windowEl.querySelector('#sd-chat-messages');
  const inputEl = windowEl.querySelector('#sd-chat-input input');
  const sendBtn = windowEl.querySelector('#sd-chat-input button');
  const closeBtn = windowEl.querySelector('#sd-chat-close');

  const messages = [];
  let sessionId = `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

  function trackEvent(name, data) {
    const payload = Object.assign({ sessionId }, data || {});
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', name, payload);
      }
      if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        window.dataLayer.push(Object.assign({ event: name }, payload));
      }
      window.dispatchEvent(new CustomEvent('sd:chat', { detail: { event: name, ...payload } }));
    } catch (err) {
      console.warn('Chat tracking failed', err);
    }
  }

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
    trackEvent('chat_message_sent', { length: text.length });
    inputEl.value = '';
    try {
      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, sessionId })
      });
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      const aiResponse = await res.text();
      appendBubble(aiResponse, 'assistant');
      messages.push({ role: 'assistant', content: aiResponse });
      trackEvent('chat_message_received', { length: aiResponse.length });
    } catch (err) {
      console.error(err);
      appendBubble('A ap\u0103rut o eroare. V\u0103 rug\u0103m \u00eencerca\u021bi din nou.', 'assistant');
      trackEvent('chat_error', { message: String(err && err.message ? err.message : err) });
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
    const isOpen = windowEl.style.display === 'flex';
    windowEl.style.display = isOpen ? 'none' : 'flex';
    windowEl.style.flexDirection = 'column';
    trackEvent(isOpen ? 'chat_close' : 'chat_open');
  });
  closeBtn.addEventListener('click', () => {
    windowEl.style.display = 'none';
    trackEvent('chat_close');
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
      trackEvent('chat_transcript_sent', { length: transcript.length });
    }
  });

  trackEvent('chat_widget_loaded');
})();
