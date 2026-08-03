import React, { useState } from 'react';
import useSEO from '../hooks/useSEO';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';

const AuthPage = () => {
  const { login, signup, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'customer' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);

  useSEO({ title: isLogin ? 'Sign In' : 'Create Account', description:'Sign in or create your Haseeb Shop account.' });
  if (isAuthenticated) return <Navigate to={isAdmin ? '/admin' : '/products'} replace />;

  const validate = () => {
    const e = {};
    if (!isLogin && !form.name.trim()) e.name = 'Name required';
    if (!form.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'At least 6 characters';
    setErrors(e); return !Object.keys(e).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!validate()) return;
    setLoading(true);
    try {
      const user = isLogin
        ? await login(form.email, form.password)
        : await signup(form.name, form.email, form.password, form.role);
      toast.success(`Welcome${isLogin ? ' back' : ''}, ${user.name}!`);
      navigate(user.role === 'admin' ? '/admin' : '/products', { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const Err = ({ msg }) => msg ? <span style={{ fontSize:12, color:'#ef4444', display:'block', marginTop:4 }}>{msg}</span> : null;

  return (
    <div style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'1fr 1fr', background:'#f5f5fa' }}>

      {/* Left panel */}
      <div style={{ background:'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:56, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(37,99,255,0.2),transparent)', top:'-100px', right:'-60px' }} />
        <div style={{ position:'absolute', width:250, height:250, borderRadius:'50%', background:'radial-gradient(circle,rgba(124,58,237,0.15),transparent)', bottom:'-50px', left:'-30px' }} />
        <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize:'28px 28px' }} />
        <div style={{ position:'relative', zIndex:1, maxWidth:340, width:'100%' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:48 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:'#2563ff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:900, color:'#fff', boxShadow:'0 6px 20px rgba(37,99,255,0.5)' }}>H</div>
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:'#fff' }}>Haseeb <span style={{ color:'#60a5fa' }}>Shop</span></div>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.4)', marginTop:2 }}>Product Management Platform</div>
            </div>
          </div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:34, fontWeight:400, color:'#fff', lineHeight:1.2, marginBottom:14, letterSpacing:'-0.01em' }}>
            Get all your buying<br />
            <span style={{ fontStyle:'italic', color:'#60a5fa' }}>problems solved today</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:14, lineHeight:1.75, marginBottom:36 }}>Join Haseeb Shop and get connected to products across the globe.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { icon:'⚙️', role:'Admin', desc:'Add, edit, delete products', bg:'rgba(37,99,255,0.15)', border:'rgba(37,99,255,0.3)', col:'#93c5fd' },
              { icon:'🛍', role:'Customer', desc:'Browse products & shop', bg:'rgba(255,255,255,0.05)', border:'rgba(255,255,255,0.12)', col:'rgba(255,255,255,0.6)' },
            ].map(r => (
              <div key={r.role} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderRadius:10, background:r.bg, border:`1px solid ${r.border}` }}>
                <span style={{ fontSize:20 }}>{r.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>{r.role}</div>
                  <div style={{ fontSize:11, color:r.col }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:56, background:'#fff' }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          <h2 style={{ fontSize:26, fontWeight:700, color:'var(--text)', marginBottom:6 }}>{isLogin ? 'Sign in' : 'Create new account'}</h2>
          <p style={{ color:'var(--text3)', fontSize:14, marginBottom:28 }}>{isLogin ? 'Welcome back! Enter your credentials.' : 'Join Haseeb Shop today.'}</p>

          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {!isLogin && (
              <div>
                <label className="field-label">Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-field" style={errors.name ? { borderColor:'#ef4444' } : {}} />
                <Err msg={errors.name} />
              </div>
            )}
            <div>
              <label className="field-label">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field" style={errors.email ? { borderColor:'#ef4444' } : {}} />
              <Err msg={errors.email} />
            </div>
            <div>
              <label className="field-label">Password</label>
              <div style={{ position:'relative' }}>
                <input name="password" type={showPwd ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="input-field" style={{ paddingRight:44, ...(errors.password ? { borderColor:'#ef4444' } : {}) }} />
                <button type="button" onClick={() => setShowPwd(!showPwd)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text4)', cursor:'pointer', fontSize:15 }}>{showPwd ? '🙈' : '👁'}</button>
              </div>
              <Err msg={errors.password} />
            </div>
            {!isLogin && (
              <div>
                <label className="field-label">Signing As</label>
                <div style={{ display:'flex', gap:20, marginTop:8 }}>
                  {[{ value:'customer', label:'Buyer' }, { value:'admin', label:'Supplier' }].map(opt => (
                    <label key={opt.value} style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:14, color:'var(--text2)', fontWeight:500 }}>
                      <input type="radio" name="role" value={opt.value} checked={form.role === opt.value} onChange={handleChange} style={{ accentColor:'var(--blue)', width:16, height:16 }} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop:4, justifyContent:'center', padding:'13px', fontSize:15, borderRadius:8 }}>
              {loading ? <><span className="spinner"></span> {isLogin ? 'Signing in...' : 'Creating account...'}</> : isLogin ? 'Log In' : 'SIGN UP'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:20, fontSize:14, color:'var(--text3)' }}>
            {isLogin ? "Don't have an account? " : "Already registered? "}
            <button onClick={() => { setIsLogin(!isLogin); setErrors({}); }} style={{ background:'none', border:'none', color:'var(--blue)', fontWeight:600, cursor:'pointer', fontSize:14, textDecoration:'underline' }}>
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>

          {isLogin && (
            <div style={{ marginTop:24, padding:'14px 16px', borderRadius:10, background:'var(--blue-pale)', border:'1px solid rgba(37,99,255,0.15)' }}>
              <p style={{ fontSize:11, color:'var(--blue)', marginBottom:6, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em' }}>Demo Accounts</p>
              <div style={{ display:'flex', flexDirection:'column', gap:3, fontSize:12, color:'var(--text3)', fontFamily:'monospace' }}>
                <span>Admin → admin@shopflow.com / admin123</span>
                <span>Customer → customer@shopflow.com / user1234</span>
              </div>
            </div>
          )}

          <p style={{ textAlign:'center', marginTop:20, fontSize:12, color:'var(--text4)' }}>
            By registering, you agree to the <span style={{ color:'var(--blue)', textDecoration:'underline', cursor:'pointer' }}>Terms and Conditions</span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
