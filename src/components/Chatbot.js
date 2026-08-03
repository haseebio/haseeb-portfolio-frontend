import React, { useState, useRef, useEffect } from 'react';

const FAQS = [
  { q:'How do I create an account?', a:'Click Sign Up on the top right. Choose Customer to shop or Admin to manage products. Fill in your name, email, and password.' },
  { q:'How do I add a product?', a:'Log in as Admin, then click Add Product in the navbar. Fill in the product details including name, price, currency, and optionally an image.' },
  { q:'What currencies are supported?', a:'We support USD ($), PKR (Rs), JPY (¥), CNY (¥), EUR (€), and GBP (£). You can set the currency when adding a product.' },
  { q:'How do I add to cart?', a:'Log in as a Customer, browse the Products page, and click Add to Cart on any product. You can also adjust quantity on the product detail page.' },
  { q:'Where can I find my cart?', a:'Your cart is accessible from the shopping bag icon in the navbar. It shows all selected products and your estimated total.' },
  { q:'How do I delete a product?', a:'Log in as Admin, go to Products, and click the Delete button on any product card. You will be asked to confirm before it is removed.' },
  { q:'Are images stored safely?', a:'Yes — all product images are uploaded to Cloudinary, a cloud storage service. Images are permanent and load on every device worldwide.' },
  { q:'Who built this?', a:'Haseeb Shop was built by Muhammad Haseeb, a full-stack developer. Visit the Developer page to see his profiles and portfolio.' },
  { q:'Is the site live?', a:'Yes! Haseeb Shop is fully deployed — frontend on Vercel, backend on Render, and database on MongoDB Atlas.' },
  { q:'How do I contact the developer?', a:'Visit the Developer page from the navbar to find GitHub, LinkedIn, Portfolio, Facebook, and Twitter profile links.' },
];

const BOT_INTRO = "Hi! I'm the Haseeb Shop assistant 👋 I can help you with questions about the shop, products, accounts, and more. What would you like to know?";

const TypingIndicator = () => (
  <div style={{ display:'flex', gap:4, padding:'10px 14px', background:'#fff', borderRadius:'18px 18px 18px 4px', border:'1px solid var(--border)', width:'fit-content', boxShadow:'var(--shadow-xs)' }}>
    {[0,1,2].map(i => (
      <div key={i} style={{ width:7, height:7, borderRadius:'50%', background:'var(--text4)', animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />
    ))}
    <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
  </div>
);

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from:'bot', text:BOT_INTRO }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages, typing]);

  const getBotReply = (userMsg) => {
    const msg = userMsg.toLowerCase();
    for (const faq of FAQS) {
      const keywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
      if (keywords.some(k => msg.includes(k))) return faq.a;
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return "Hello! How can I help you with Haseeb Shop today?";
    if (msg.includes('thank')) return "You're welcome! Let me know if you have any other questions.";
    if (msg.includes('price') || msg.includes('cost')) return "Product prices vary by item. Browse the Products page to see all prices. We support multiple currencies including PKR, USD, EUR, and more.";
    if (msg.includes('login') || msg.includes('sign in')) return "Click Sign In at the top right of the page. Enter your email and password to access your account.";
    if (msg.includes('forgot') || msg.includes('password')) return "Currently, password reset must be done through the admin. Please contact the developer via the Developer page for assistance.";
    if (msg.includes('free delivery') || msg.includes('shipping')) return "Some products have free delivery. You can see the Free Ship badge on eligible products when browsing.";
    return "I'm not sure about that, but I'm happy to help! You can also visit the Developer page to contact Haseeb directly.";
  };

  const sendMessage = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { from:'user', text:msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from:'bot', text:getBotReply(msg) }]);
    }, 1000 + Math.random() * 600);
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{ position:'fixed', bottom:24, right:24, width:56, height:56, borderRadius:'50%', background:'var(--blue)', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:'0 6px 24px rgba(37,99,255,0.45)', zIndex:999, transition:'all 0.3s ease', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
        {open ? '✕' : '💬'}
        {!open && unread > 0 && (
          <span style={{ position:'absolute', top:-4, right:-4, background:'#ef4444', color:'#fff', borderRadius:'50%', width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800 }}>{unread}</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{ position:'fixed', bottom:92, right:24, width:360, maxHeight:520, background:'#fff', borderRadius:20, boxShadow:'0 20px 60px rgba(0,0,0,0.18)', border:'1px solid var(--border)', zIndex:999, display:'flex', flexDirection:'column', overflow:'hidden', animation:'slideUp 0.3s ease' }}>

          {/* Header */}
          <div style={{ background:'linear-gradient(135deg,#1a1a2e,#0f3460)', padding:'16px 20px', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, boxShadow:'0 2px 8px rgba(37,99,255,0.4)' }}>H</div>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:'#fff' }}>Haseeb Shop</div>
              <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:2 }}>
                <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'inline-block' }}></span>
                <span style={{ fontSize:11, color:'rgba(255,255,255,0.6)' }}>Online · Usually replies instantly</span>
              </div>
            </div>
          </div>

          {/* Quick replies */}
          <div style={{ padding:'10px 14px', background:'var(--border2)', borderBottom:'1px solid var(--border)', display:'flex', gap:6, flexWrap:'wrap' }}>
            {['How to sign up?','What currencies?','Contact developer'].map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{ padding:'5px 11px', borderRadius:20, background:'#fff', border:'1px solid var(--border)', fontSize:11, color:'var(--blue)', cursor:'pointer', fontWeight:600, fontFamily:'var(--font-body)', transition:'all 0.15s' }}
                onMouseEnter={e => { e.target.style.background='var(--blue)'; e.target.style.color='#fff'; }}
                onMouseLeave={e => { e.target.style.background='#fff'; e.target.style.color='var(--blue)'; }}>
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'16px 14px', display:'flex', flexDirection:'column', gap:12, minHeight:200, maxHeight:300 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display:'flex', justifyContent: m.from==='user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth:'80%', padding:'10px 14px', borderRadius: m.from==='user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.from==='user' ? 'var(--blue)' : '#fff',
                  color: m.from==='user' ? '#fff' : 'var(--text)',
                  fontSize:13, lineHeight:1.6,
                  border: m.from==='user' ? 'none' : '1px solid var(--border)',
                  boxShadow:'var(--shadow-xs)',
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display:'flex', justifyContent:'flex-start' }}>
                <TypingIndicator />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding:'12px 14px', borderTop:'1px solid var(--border)', display:'flex', gap:8, background:'#fff' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              style={{ flex:1, padding:'9px 14px', borderRadius:20, border:'1.5px solid var(--border)', fontSize:13, fontFamily:'var(--font-body)', outline:'none', transition:'border-color 0.2s', background:'var(--border2)', color:'var(--text)' }}
              onFocus={e => e.target.style.borderColor='var(--blue)'}
              onBlur={e => e.target.style.borderColor='var(--border)'}
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              style={{ width:38, height:38, borderRadius:'50%', background: input.trim() ? 'var(--blue)' : 'var(--border)', border:'none', cursor: input.trim() ? 'pointer' : 'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, transition:'all 0.2s', flexShrink:0 }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Chatbot;
