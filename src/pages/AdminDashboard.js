import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { productAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  useSEO({ title:'Dashboard', description:'Admin dashboard for Haseeb Shop.' });
  const [stats, setStats] = useState({ total:0, avgPrice:0, withImages:0, freeDelivery:0 });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productAPI.getAll({ limit:50, page:1 });
        const products = res.data.products;
        const total = res.data.total;
        const avgPrice = products.length ? products.reduce((s,p)=>s+p.price,0)/products.length : 0;
        setStats({ total, avgPrice:avgPrice.toFixed(2), withImages:products.filter(p=>p.image).length, freeDelivery:products.filter(p=>p.freeDelivery).length });
        setRecentProducts(products.slice(0,8));
      } catch {} finally { setLoading(false); }
    };
    load();
  }, []);

  const STATS = [
    { icon:'📦', label:'Total Products', value:loading?'...':stats.total, sub:'Across all shops', color:'#2563ff', bg:'#eff4ff' },
    { icon:'💰', label:'Avg. Price', value:loading?'...':'$'+stats.avgPrice, sub:'USD average', color:'#7c3aed', bg:'#faf5ff' },
    { icon:'📸', label:'With Images', value:loading?'...':stats.withImages, sub:'Products with photos', color:'#0891b2', bg:'#ecfeff' },
    { icon:'🚚', label:'Free Delivery', value:loading?'...':stats.freeDelivery, sub:'Offer free shipping', color:'#16a34a', bg:'#f0fdf4' },
  ];

  return (
    <div style={{ minHeight:'100vh', padding:'36px 28px', background:'#f5f5fa' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:32, flexWrap:'wrap', gap:14 }}>
          <div>
            <div className="section-tag">Admin</div>
            <h1 style={{ fontSize:30, fontWeight:700, color:'var(--text)', letterSpacing:'-0.02em' }}>Dashboard</h1>
            <p style={{ color:'var(--text3)', marginTop:4, fontSize:14 }}>Welcome back, <span style={{ color:'var(--blue)', fontWeight:700 }}>{user?.name}</span> 👋</p>
          </div>
          <Link to="/admin/add-product"><button className="btn-primary">+ Add Product</button></Link>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:14, marginBottom:32 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background:'#fff', borderRadius:14, padding:'20px 22px', border:'1px solid var(--border)', boxShadow:'var(--shadow-xs)', display:'flex', gap:14, alignItems:'center' }}>
              <div style={{ width:46, height:46, borderRadius:12, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{s.icon}</div>
              <div>
                <p style={{ fontSize:11, color:'var(--text4)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>{s.label}</p>
                <p style={{ fontSize:26, fontWeight:800, color:'var(--text)', lineHeight:1 }}>{s.value}</p>
                <p style={{ fontSize:11, color:'var(--text4)', marginTop:3 }}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom:32 }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:14 }}>Quick Actions</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12 }}>
            {[
              { icon:'➕', title:'Add New Product', desc:'Create a new product listing', to:'/admin/add-product', color:'#2563ff', bg:'#eff4ff' },
              { icon:'📋', title:'Manage Products', desc:'Edit or delete existing products', to:'/products', color:'#7c3aed', bg:'#faf5ff' },
              { icon:'🌐', title:'View as Customer', desc:'See the customer-facing store', to:'/products', color:'#0891b2', bg:'#ecfeff' },
            ].map(a => (
              <Link key={a.title} to={a.to} style={{ textDecoration:'none' }}>
                <div style={{ background:'#fff', borderRadius:14, padding:18, cursor:'pointer', display:'flex', gap:14, alignItems:'center', border:'1px solid var(--border)', boxShadow:'var(--shadow-xs)', transition:'all 0.2s' }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=a.color;e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='var(--shadow-xs)'}}>
                  <div style={{ width:42, height:42, borderRadius:12, background:a.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{a.icon}</div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:2 }}>{a.title}</p>
                    <p style={{ fontSize:12, color:'var(--text3)' }}>{a.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Products Table */}
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)' }}>Recent Products</h2>
            <Link to="/products" style={{ textDecoration:'none', fontSize:13, color:'var(--blue)', fontWeight:600 }}>View all →</Link>
          </div>
          <div style={{ background:'#fff', borderRadius:14, border:'1px solid var(--border)', overflow:'hidden', boxShadow:'var(--shadow-xs)' }}>
            {loading ? <div style={{ textAlign:'center', padding:40, color:'var(--text3)' }}>Loading...</div>
            : recentProducts.length === 0 ? <div style={{ padding:40, textAlign:'center', color:'var(--text3)' }}>No products yet. <Link to="/admin/add-product" style={{ color:'var(--blue)', fontWeight:600 }}>Add one!</Link></div>
            : (
              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:14 }}>
                <thead>
                  <tr style={{ borderBottom:'1px solid var(--border)', background:'var(--border2)' }}>
                    {['Product','Shop','Price','Rating','Stock','Delivery'].map(h => (
                      <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'var(--text3)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentProducts.map((p,i) => (
                    <tr key={p._id} style={{ borderBottom:i<recentProducts.length-1?'1px solid var(--border2)':'none', transition:'background 0.15s' }}
                      onMouseEnter={e=>e.currentTarget.style.background='var(--border2)'}
                      onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                      <td style={{ padding:'13px 16px' }}>
                        <div style={{ fontWeight:700, color:'var(--text)' }}>{p.productName}</div>
                        <div style={{ fontSize:11, color:'var(--text4)' }}>{p.name}</div>
                      </td>
                      <td style={{ padding:'13px 16px', color:'var(--text3)' }}>{p.shopName}</td>
                      <td style={{ padding:'13px 16px', fontWeight:700, color:'var(--blue)' }}>${p.price}</td>
                      <td style={{ padding:'13px 16px', color:'#f59e0b' }}>{'★'.repeat(p.rating)}</td>
                      <td style={{ padding:'13px 16px', color:'var(--text3)' }}>{p.stock}</td>
                      <td style={{ padding:'13px 16px' }}><span className={`badge ${p.freeDelivery?'badge-green':'badge-red'}`}>{p.freeDelivery?'Free':'Paid'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
