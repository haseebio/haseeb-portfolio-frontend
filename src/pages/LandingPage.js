import React, { useEffect, useRef } from 'react';
import useSEO from '../hooks/useSEO';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useSEO({ title:'Home', description:'Haseeb Shop — premium product management platform with Admin and Customer panels.', keywords:'haseeb shop, product management, ecommerce, online store' });
  const heroRef = useRef();

  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    const onMove = (e) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      const o1 = el.querySelector('.orb-1'); const o2 = el.querySelector('.orb-2');
      if (o1) o1.style.transform = `translate(${x*30}px,${y*30}px)`;
      if (o2) o2.style.transform = `translate(${x*-20}px,${y*-20}px)`;
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const features = [
    {icon:'🔐',title:'Secure Auth',desc:'JWT tokens, bcrypt hashing, role-based access control'},
    {icon:'📦',title:'Full CRUD',desc:'Add, edit, delete products with cloud image upload'},
    {icon:'🌍',title:'Multi-Currency',desc:'USD, PKR, JPY, CNY, EUR, GBP with correct formatting'},
    {icon:'🚚',title:'Free Delivery',desc:'Flag products with free shipping across all views'},
    {icon:'🔍',title:'Search & Sort',desc:'MongoDB text search, price sorting, pagination'},
    {icon:'📱',title:'Responsive',desc:'Clean experience on mobile, tablet, and desktop'},
  ];

  return (
    <div style={{background:'#f5f5fa'}}>

      {/* Hero */}
      <div ref={heroRef} style={{background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)',minHeight:'560px',display:'flex',alignItems:'center',padding:'60px 32px',position:'relative',overflow:'hidden'}}>
        <div className="orb-1" style={{position:'absolute',width:400,height:400,borderRadius:'50%',background:'radial-gradient(circle,rgba(37,99,255,0.3),transparent)',top:'-80px',right:'10%',transition:'transform 0.1s ease'}} />
        <div className="orb-2" style={{position:'absolute',width:280,height:280,borderRadius:'50%',background:'radial-gradient(circle,rgba(124,58,237,0.25),transparent)',bottom:'-40px',right:'25%',transition:'transform 0.1s ease'}} />
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px)',backgroundSize:'32px 32px',pointerEvents:'none'}} />
        <div style={{maxWidth:1200,margin:'0 auto',width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center',position:'relative',zIndex:1}}>
          <div className="fade-in">
            <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'5px 14px',borderRadius:20,background:'rgba(37,99,255,0.2)',border:'1px solid rgba(37,99,255,0.4)',marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#60a5fa',display:'inline-block'}}></span>
              <span style={{fontSize:12,color:'#93c5fd',fontWeight:600,letterSpacing:'0.06em'}}>LIVE ON VERCEL · FULL STACK</span>
            </div>
            <h1 style={{fontFamily:'var(--font-display)',fontSize:'clamp(40px,5vw,64px)',fontWeight:400,color:'#fff',lineHeight:1.1,marginBottom:20,letterSpacing:'-0.01em'}}>
              Elevate Your<br />
              <span style={{fontStyle:'italic',background:'linear-gradient(135deg,#60a5fa,#a78bfa)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Product Journey</span>
            </h1>
            <p style={{fontSize:16,color:'rgba(255,255,255,0.6)',lineHeight:1.75,marginBottom:36,maxWidth:440}}>A production-grade platform for managing and discovering products. Separate panels for admins and customers, with real-time updates and cloud image storage.</p>
            <div style={{display:'flex',gap:14}}>
              <Link to="/auth"><button style={{background:'#2563ff',color:'#fff',border:'none',padding:'13px 30px',borderRadius:8,fontSize:15,fontWeight:600,cursor:'pointer',boxShadow:'0 4px 20px rgba(37,99,255,0.5)',transition:'all 0.2s'}}>Shop Now</button></Link>
              <Link to="/developer"><button style={{background:'rgba(255,255,255,0.08)',color:'#fff',border:'1px solid rgba(255,255,255,0.2)',padding:'13px 30px',borderRadius:8,fontSize:15,fontWeight:500,cursor:'pointer',backdropFilter:'blur(10px)',transition:'all 0.2s'}}>Learn More</button></Link>
            </div>
          </div>
          {/* 3D card */}
          <div className="slide-up" style={{perspective:1000}}>
            <div style={{background:'rgba(255,255,255,0.05)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:24,transform:'rotateY(-8deg) rotateX(4deg)',boxShadow:'0 32px 64px rgba(0,0,0,0.4)',transition:'transform 0.3s ease'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='rotateY(-4deg) rotateX(2deg)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='rotateY(-8deg) rotateX(4deg)'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
                <div style={{width:36,height:36,borderRadius:9,background:'#2563ff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:'#fff'}}>H</div>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>Haseeb Shop</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>Admin Dashboard</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
                {[{l:'Products',v:'1,240',c:'#60a5fa'},{l:'Revenue',v:'$48.2K',c:'#34d399'},{l:'Orders',v:'384',c:'#a78bfa'},{l:'Customers',v:'1,028',c:'#fb923c'}].map(s=>(
                  <div key={s.l} style={{background:'rgba(255,255,255,0.07)',borderRadius:10,padding:'12px 14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                    <div style={{fontSize:10,color:'rgba(255,255,255,0.4)',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.06em'}}>{s.l}</div>
                    <div style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'rgba(37,99,255,0.2)',borderRadius:10,padding:'12px 14px',border:'1px solid rgba(37,99,255,0.25)',display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:20}}>📦</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600,color:'#fff'}}>New Product Added</div>
                  <div style={{fontSize:11,color:'rgba(255,255,255,0.4)'}}>Sony WH-1000XM5 · $349.99</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div style={{background:'#fff',padding:'56px 32px',borderBottom:'1px solid var(--border)'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:32}}>
            <div>
              <div className="section-tag">Featured Products</div>
              <h2 style={{fontSize:26,fontWeight:700,color:'var(--text)',letterSpacing:'-0.02em'}}>Handpicked for you</h2>
            </div>
            <Link to="/auth"><button className="btn-outline" style={{fontSize:13}}>See All Products</button></Link>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
            {[{name:'Pro Wireless Headphones',cat:'Headphones',price:'$ 250.00 USD',img:'🎧',tag:'Best Seller'},
              {name:'Earbud Y168A',cat:'Earbuds',price:'$ 270.00 USD',img:'🎵',tag:'New'},
              {name:'Speaker P168A',cat:'Speakers',price:'$ 240.00 USD',img:'🔊',tag:'Free Ship'}].map((p,i)=>(
              <div key={i} className="card" style={{overflow:'hidden'}}>
                <div style={{height:180,background:'linear-gradient(135deg,#f0f4ff,#e8efff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:64,position:'relative'}}>
                  {p.img}
                  <div style={{position:'absolute',top:12,left:12}}><span className="badge badge-blue">{p.tag}</span></div>
                </div>
                <div style={{padding:'16px 18px'}}>
                  <div style={{fontSize:11,color:'var(--text4)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4}}>{p.cat}</div>
                  <div style={{fontSize:15,fontWeight:700,color:'var(--text)',marginBottom:6}}>{p.name}</div>
                  <div style={{fontSize:17,fontWeight:800,color:'var(--blue)'}}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop By Category */}
      <div style={{padding:'56px 32px',background:'#f5f5fa'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{marginBottom:32}}>
            <div className="section-tag">Categories</div>
            <h2 style={{fontSize:26,fontWeight:700,color:'var(--text)',letterSpacing:'-0.02em'}}>Shop By Category</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
            {[{name:'Speaker',icon:'🔊',desc:'Explore our curated collection of top speaker products.'},{name:'Accessories',icon:'🎧',desc:'Explore our curated collection of top accessories products.'},{name:'Wireless Charger',icon:'⚡',desc:'Explore our curated collection of top wireless charger products.'}].map((c,i)=>(
              <div key={i} className="card" style={{padding:24,cursor:'pointer'}}>
                <div style={{fontSize:32,marginBottom:12}}>{c.icon}</div>
                <div style={{fontSize:16,fontWeight:700,color:'var(--text)',marginBottom:6}}>{c.name}</div>
                <div style={{fontSize:13,color:'var(--text3)',lineHeight:1.6,marginBottom:16}}>{c.desc}</div>
                <Link to="/auth" style={{textDecoration:'none',fontSize:13,color:'var(--blue)',fontWeight:600}}>View {c.name} →</Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{padding:'56px 32px',background:'#fff',borderTop:'1px solid var(--border)'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div className="section-tag">Why Haseeb Shop</div>
            <h2 style={{fontSize:28,fontWeight:700,color:'var(--text)',letterSpacing:'-0.02em',marginBottom:10}}>Everything you need</h2>
            <p style={{color:'var(--text3)',fontSize:15,maxWidth:460,margin:'0 auto'}}>Built with production-grade tools for a real-world shopping experience.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18}}>
            {features.map((f,i)=>(
              <div key={i} className="card" style={{padding:'22px 20px'}}>
                <div style={{width:44,height:44,borderRadius:12,background:'var(--blue-pale)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:14}}>{f.icon}</div>
                <div style={{fontSize:15,fontWeight:700,color:'var(--text)',marginBottom:7}}>{f.title}</div>
                <div style={{fontSize:13,color:'var(--text3)',lineHeight:1.65}}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{padding:'64px 32px',background:'linear-gradient(135deg,#1a1a2e,#0f3460)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)',backgroundSize:'28px 28px'}} />
        <div style={{maxWidth:600,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
          <h2 style={{fontFamily:'var(--font-display)',fontSize:36,fontWeight:400,color:'#fff',marginBottom:14,letterSpacing:'-0.01em'}}>
            Experience <span style={{fontStyle:'italic',color:'#60a5fa'}}>Streamlined</span> Shopping
          </h2>
          <p style={{color:'rgba(255,255,255,0.55)',fontSize:15,marginBottom:32}}>Join Haseeb Shop and discover a better way to browse and manage products.</p>
          <div style={{display:'flex',gap:14,justifyContent:'center'}}>
            <Link to="/auth"><button style={{background:'#fff',color:'var(--blue)',border:'none',padding:'13px 32px',borderRadius:8,fontSize:15,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 20px rgba(0,0,0,0.3)'}}>Shop Now</button></Link>
            <Link to="/auth"><button style={{background:'transparent',color:'#fff',border:'1px solid rgba(255,255,255,0.3)',padding:'13px 32px',borderRadius:8,fontSize:15,fontWeight:500,cursor:'pointer',backdropFilter:'blur(10px)'}}>Learn More</button></Link>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{background:'#fff',borderTop:'1px solid var(--border)',padding:'20px 32px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div style={{display:'flex',gap:32}}>
            {[['📦','Free Delivery'],['🏪','Self Pickup'],['✅','Warranty']].map(([icon,label])=>(
              <span key={label} style={{fontSize:13,color:'var(--text3)',display:'flex',alignItems:'center',gap:7,fontWeight:500}}>{icon} {label}</span>
            ))}
          </div>
          <p style={{fontSize:12,color:'var(--text4)'}}>Haseeb Shop © 2024 · React · Node.js · MongoDB</p>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
