import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import { productAPI, formatPrice, getImageUrl } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from '../utils/toast';

const StarRating = ({ rating, size=16 }) => (
  <div style={{ display:'flex', gap:2 }}>
    {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize:size, color:i<=rating?'#f59e0b':'#e2e8f0' }}>★</span>)}
  </div>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [qty, setQty] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x:50, y:50 });

  useSEO({ title: product ? product.productName : 'Product Detail', description: product ? `Buy ${product.productName} from ${product.shopName}.` : '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await productAPI.getOne(id);
        setProduct(res.data.product);
        const rel = await productAPI.getAll({ limit:50, page:1 });
        setRelated(rel.data.products.filter(p=>p._id!==id).slice(0,4));
      } catch { toast.error('Product not found'); navigate('/products'); }
      finally { setLoading(false); }
    };
    load();
    window.scrollTo({ top:0, behavior:'smooth' });
  }, [id]);

  const handleAddToCart = async () => {
    setAdding(true);
    try { await addToCart(product._id, qty); toast.success(`${product.productName} added to cart!`); }
    catch { toast.error('Failed to add to cart'); }
    finally { setAdding(false); }
  };

  const handleMouseMove = useCallback((e) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x:((e.clientX-rect.left)/rect.width)*100, y:((e.clientY-rect.top)/rect.height)*100 });
  }, [zoomed]);

  if (loading) return <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f5f5fa' }}><div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid rgba(37,99,255,0.15)', borderTopColor:'var(--blue)', animation:'spin 0.7s linear infinite' }}></div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;
  if (!product) return null;

  const imageUrl = getImageUrl(product.image);

  return (
    <div style={{ minHeight:'100vh', padding:'32px 28px', background:'#f5f5fa' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24, fontSize:13, color:'var(--text4)' }}>
          <Link to="/products" style={{ color:'var(--blue)', textDecoration:'none', fontWeight:600 }}>Products</Link>
          <span>›</span><span style={{ color:'var(--text3)' }}>{product.shopName}</span>
          <span>›</span><span style={{ color:'var(--text)', fontWeight:600 }}>{product.productName}</span>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:56, alignItems:'start' }}>
          {/* Image */}
          <div style={{ position:'relative', borderRadius:16, overflow:'hidden', background:'linear-gradient(135deg,#f0f4ff,#e8efff)', cursor:imageUrl?(zoomed?'zoom-out':'zoom-in'):'default', aspectRatio:'1', border:'1px solid var(--border)', boxShadow:'var(--shadow-md)' }}
            onClick={()=>imageUrl&&setZoomed(!zoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={()=>setZoomed(false)}>
            {imageUrl ? (
              <img src={imageUrl} alt={product.productName} style={{ width:'100%', height:'100%', objectFit:'cover', transition:zoomed?'none':'transform 0.3s ease', transform:zoomed?'scale(2.2)':'scale(1)', transformOrigin:zoomed?`${zoomPos.x}% ${zoomPos.y}%`:'center', display:'block' }} />
            ) : (
              <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12 }}>
                <span style={{ fontSize:60 }}>📦</span>
                <span style={{ fontSize:13, color:'var(--text4)' }}>No image available</span>
              </div>
            )}
            {imageUrl && !zoomed && <div style={{ position:'absolute', bottom:14, right:14, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', borderRadius:20, padding:'5px 12px', fontSize:11, color:'#fff', fontWeight:600 }}>🔍 Click to zoom</div>}
            {product.freeDelivery && <div style={{ position:'absolute', top:14, left:14 }}><span className="badge badge-green">Free Delivery</span></div>}
          </div>

          {/* Info */}
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <span style={{ fontSize:12, fontWeight:700, color:'var(--blue)', textTransform:'uppercase', letterSpacing:'0.07em' }}>{product.shopName}</span>
              <span className="badge badge-blue">{product.currencyCode}</span>
            </div>
            <div>
              <h1 style={{ fontSize:28, fontWeight:700, color:'var(--text)', lineHeight:1.2, marginBottom:6 }}>{product.productName}</h1>
              <p style={{ fontSize:13, color:'var(--text4)' }}>SKU: {product.name}</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <StarRating rating={product.rating} size={18} />
              <span style={{ fontSize:14, fontWeight:600, color:'var(--text2)' }}>{product.rating}.0 / 5</span>
            </div>
            <div style={{ padding:'16px 20px', borderRadius:12, background:'var(--blue-pale)', border:'1px solid rgba(37,99,255,0.15)' }}>
              <p style={{ fontSize:11, color:'var(--blue)', marginBottom:4, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em' }}>Price</p>
              <span style={{ fontSize:36, fontWeight:800, color:'var(--blue)', lineHeight:1 }}>{formatPrice(product.price, product.currencyCode)}</span>
              {product.freeDelivery && <p style={{ fontSize:12, color:'#16a34a', marginTop:6, fontWeight:600 }}>✓ Free delivery included</p>}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:product.stock>0?'#22c55e':'#ef4444' }}></div>
              <span style={{ fontSize:13, color:'var(--text3)', fontWeight:600 }}>{product.stock>0?`${product.stock} in stock`:'Out of stock'}</span>
            </div>
            {!isAdmin && (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:13, fontWeight:600, color:'var(--text3)' }}>Quantity</span>
                  <div style={{ display:'flex', alignItems:'center', background:'#fff', borderRadius:8, border:'1px solid var(--border)', overflow:'hidden' }}>
                    <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{ width:36, height:38, background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:18, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center' }}>−</button>
                    <span style={{ minWidth:38, textAlign:'center', fontSize:14, fontWeight:700, color:'var(--text)' }}>{qty}</span>
                    <button onClick={()=>setQty(q=>Math.min(product.stock,q+1))} style={{ width:36, height:38, background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:18, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center' }}>+</button>
                  </div>
                </div>
                <button onClick={handleAddToCart} disabled={adding||product.stock===0} className="btn-primary" style={{ padding:'14px', fontSize:15, justifyContent:'center', width:'100%' }}>
                  {adding?<><span className="spinner"></span> Adding...</>:product.stock===0?'Out of Stock':`Add ${qty>1?qty+' items':'to Cart'} →`}
                </button>
              </div>
            )}
            {isAdmin && <Link to="/products" style={{ textDecoration:'none' }}><button className="btn-ghost" style={{ width:'100%', justifyContent:'center' }}>← Back to Manage</button></Link>}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, paddingTop:8, borderTop:'1px solid var(--border2)' }}>
              {[{label:'Category',value:product.shopName},{label:'Currency',value:product.currencyCode},{label:'Rating',value:`${product.rating} / 5`},{label:'Delivery',value:product.freeDelivery?'🚚 Free':'Standard'}].map(d=>(
                <div key={d.label} style={{ padding:'10px 12px', background:'var(--border2)', borderRadius:8, border:'1px solid var(--border)' }}>
                  <p style={{ fontSize:10, color:'var(--text4)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>{d.label}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <h2 style={{ fontSize:22, fontWeight:700, color:'var(--text)' }}>You may also like</h2>
              <Link to="/products" style={{ textDecoration:'none', fontSize:13, color:'var(--blue)', fontWeight:600 }}>See all →</Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
              {related.map(p => {
                const imgUrl = getImageUrl(p.image);
                return (
                  <Link key={p._id} to={`/products/${p._id}`} style={{ textDecoration:'none' }}>
                    <div className="card" style={{ overflow:'hidden' }}>
                      <div style={{ height:150, background:'linear-gradient(135deg,#f0f4ff,#e8efff)', position:'relative', overflow:'hidden' }}>
                        {imgUrl?<img src={imgUrl} alt={p.productName} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }} onMouseEnter={e=>e.target.style.transform='scale(1.05)'} onMouseLeave={e=>e.target.style.transform='scale(1)'} />:<div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32 }}>📦</div>}
                      </div>
                      <div style={{ padding:'12px 14px' }}>
                        <p style={{ fontSize:10, color:'var(--text4)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{p.shopName}</p>
                        <h3 style={{ fontSize:13, fontWeight:700, color:'var(--text)', marginBottom:6, lineHeight:1.3 }}>{p.productName}</h3>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                          <span style={{ fontSize:16, fontWeight:800, color:'var(--blue)' }}>{formatPrice(p.price,p.currencyCode)}</span>
                          <div style={{ display:'flex', gap:1 }}>{[1,2,3,4,5].map(i=><span key={i} style={{ fontSize:11, color:i<=p.rating?'#f59e0b':'#e2e8f0' }}>★</span>)}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductDetailPage;
