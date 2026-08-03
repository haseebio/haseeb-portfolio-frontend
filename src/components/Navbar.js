import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => { logout(); navigate('/auth'); };

  const navLinks = isAdmin
    ? [{ to:'/admin', label:'Dashboard' }, { to:'/admin/add-product', label:'Add Product' }, { to:'/products', label:'Store' }]
    : [{ to:'/', label:'Home' }, { to:'/products', label:'Products' }, { to:'/developer', label:'Developer' }];

  return (
    <nav style={{ position:'sticky', top:0, zIndex:100, background: scrolled ? 'rgba(255,255,255,0.97)' : '#fff', borderBottom:'1px solid var(--border)', boxShadow: scrolled ? 'var(--shadow-sm)' : 'none', transition:'all 0.3s ease', padding:'0 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>

        <Link to={isAuthenticated ? (isAdmin ? '/admin' : '/products') : '/'} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, fontWeight:800, color:'#fff', boxShadow:'0 4px 10px rgba(37,99,255,0.35)' }}>H</div>
          <span style={{ fontSize:18, fontWeight:700, color:'var(--text)', letterSpacing:'-0.02em' }}>Haseeb <span style={{ color:'var(--blue)' }}>Shop</span></span>
        </Link>

        {isAuthenticated && (
          <div style={{ display:'flex', alignItems:'center', gap:2 }}>
            {navLinks.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to} style={{ textDecoration:'none', padding:'7px 14px', borderRadius:8, fontSize:14, fontWeight: active ? 600 : 400, color: active ? 'var(--blue)' : 'var(--text3)', background: active ? 'var(--blue-pale)' : 'transparent', transition:'all 0.18s' }}>{label}</Link>
              );
            })}
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          {isAuthenticated ? (
            <>
              {!isAdmin && (
                <Link to="/cart" style={{ textDecoration:'none', position:'relative' }}>
                  <div style={{ width:38, height:38, borderRadius:9, background:'var(--blue-pale)', border:'1px solid rgba(37,99,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, cursor:'pointer', transition:'all 0.2s' }}>🛍</div>
                  {cartCount > 0 && <span style={{ position:'absolute', top:-5, right:-5, background:'var(--blue)', color:'#fff', borderRadius:'50%', width:18, height:18, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800 }}>{cartCount > 9 ? '9+' : cartCount}</span>}
                </Link>
              )}
              <div style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 10px', borderRadius:20, background:'var(--border2)', border:'1px solid var(--border)' }}>
                <div style={{ width:26, height:26, borderRadius:'50%', background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#fff' }}>{user?.name?.[0]?.toUpperCase()}</div>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{user?.name}</span>
              </div>
              <button onClick={handleLogout} className="btn-ghost" style={{ padding:'7px 14px', fontSize:13 }}>Sign out</button>
            </>
          ) : (
            <div style={{ display:'flex', gap:8 }}>
              <Link to="/auth"><button className="btn-ghost" style={{ padding:'8px 18px', fontSize:13 }}>Log in</button></Link>
              <Link to="/auth"><button className="btn-primary" style={{ padding:'8px 18px', fontSize:13 }}>Sign up</button></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
