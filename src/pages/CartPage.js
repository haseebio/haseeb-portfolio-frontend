import React from 'react';
import useSEO from '../hooks/useSEO';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice, getImageUrl } from '../utils/api';
import { toast } from '../utils/toast';

const CartPage = () => {
  useSEO({ title:'Your Cart', description:'Review your cart on Haseeb Shop.' });
  const { cart, cartTotal, cartLoading, removeFromCart, updateQuantity, clearCart } = useCart();
  const [imgErrors, setImgErrors] = React.useState({});
  const [removing, setRemoving] = React.useState(null);
  const [clearing, setClearing] = React.useState(false);

  const handleRemove = async (productId, name) => {
    setRemoving(productId);
    try { await removeFromCart(productId); toast.success(`${name} removed`); }
    catch { toast.error('Failed to remove'); } finally { setRemoving(null); }
  };

  const handleClear = async () => {
    setClearing(true);
    try { await clearCart(); toast.success('Cart cleared'); }
    catch { toast.error('Failed to clear'); } finally { setClearing(false); }
  };

  const handleQty = async (productId, qty) => {
    try { await updateQuantity(productId, qty); }
    catch { toast.error('Failed to update'); }
  };

  if (cartLoading) return <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center' }}><div style={{ width:40, height:40, borderRadius:'50%', border:'3px solid rgba(37,99,255,0.15)', borderTopColor:'var(--blue)', animation:'spin 0.7s linear infinite' }}></div><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style></div>;

  if (cart.length === 0) return (
    <div style={{ minHeight:'80vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:18, background:'#f5f5fa' }}>
      <div style={{ fontSize:72 }}>🛍</div>
      <h2 style={{ fontSize:26, fontWeight:700, color:'var(--text)' }}>Your cart is empty</h2>
      <p style={{ color:'var(--text3)', fontSize:15 }}>Start adding products to your cart</p>
      <Link to="/products"><button className="btn-primary">Browse Products</button></Link>
    </div>
  );

  return (
    <div style={{ minHeight:'100vh', padding:'36px 28px', background:'#f5f5fa' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28, flexWrap:'wrap', gap:12 }}>
          <div>
            <div className="section-tag">Shopping</div>
            <h1 style={{ fontSize:28, fontWeight:700, color:'var(--text)', letterSpacing:'-0.02em' }}>Your Cart</h1>
            <p style={{ color:'var(--text3)', marginTop:4, fontSize:14 }}>{cart.reduce((s,i)=>s+i.quantity,0)} items</p>
          </div>
          <button onClick={handleClear} disabled={clearing} className="btn-ghost" style={{ fontSize:13 }}>
            {clearing ? <><span className="spinner spinner-blue"></span> Clearing...</> : 'Clear All'}
          </button>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:22, alignItems:'start' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {cart.map(item => {
              const product = item.product; if (!product) return null;
              const imageUrl = getImageUrl(product.image);
              return (
                <div key={item._id||product._id} style={{ background:'#fff', borderRadius:14, border:'1px solid var(--border)', padding:18, display:'flex', gap:16, alignItems:'center', boxShadow:'var(--shadow-xs)' }}>
                  <div style={{ width:80, height:80, borderRadius:10, overflow:'hidden', flexShrink:0, background:'var(--border2)' }}>
                    {imageUrl && !imgErrors[product._id] ? <img src={imageUrl} alt={product.productName} onError={()=>setImgErrors(p=>({...p,[product._id]:true}))} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>📦</div>}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:10, color:'var(--text4)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{product.shopName}</p>
                    <h3 style={{ fontSize:14, fontWeight:700, color:'var(--text)', marginBottom:6, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{product.productName}</h3>
                    <span style={{ fontSize:17, fontWeight:800, color:'var(--blue)' }}>{formatPrice(product.price, product.currencyCode)}</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                    <div style={{ display:'flex', alignItems:'center', background:'var(--border2)', borderRadius:8, border:'1px solid var(--border)', overflow:'hidden' }}>
                      <button onClick={()=>handleQty(product._id,item.quantity-1)} style={{ width:32, height:34, background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:16, fontWeight:600 }}>−</button>
                      <span style={{ minWidth:30, textAlign:'center', fontSize:14, fontWeight:700, color:'var(--text)' }}>{item.quantity}</span>
                      <button onClick={()=>handleQty(product._id,item.quantity+1)} style={{ width:32, height:34, background:'none', border:'none', color:'var(--text)', cursor:'pointer', fontSize:16, fontWeight:600 }}>+</button>
                    </div>
                    <button onClick={()=>handleRemove(product._id,product.productName)} disabled={removing===product._id} style={{ width:34, height:34, borderRadius:8, background:'#fff1f2', border:'1px solid #fecdd3', color:'#ef4444', cursor:'pointer', fontSize:15, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      {removing===product._id ? <span className="spinner" style={{ width:13, height:13, borderColor:'rgba(239,68,68,0.2)', borderTopColor:'#ef4444' }}></span> : '✕'}
                    </button>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0, minWidth:72 }}>
                    <p style={{ fontSize:11, color:'var(--text4)', marginBottom:3 }}>Subtotal</p>
                    <p style={{ fontSize:14, fontWeight:700, color:'var(--text)' }}>{formatPrice(product.price*item.quantity, product.currencyCode)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background:'#fff', borderRadius:16, border:'1px solid var(--border)', padding:22, position:'sticky', top:80, boxShadow:'var(--shadow-sm)' }}>
            <h3 style={{ fontSize:17, fontWeight:700, color:'var(--text)', marginBottom:18 }}>Order Summary</h3>
            <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text3)', fontSize:14, marginBottom:10 }}>
              <span>{cart.reduce((s,i)=>s+i.quantity,0)} items</span>
              <span style={{ fontWeight:600, color:'var(--text)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            {cart.some(i=>i.product?.freeDelivery) && (
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#16a34a', marginBottom:10, fontWeight:600 }}>
                <span>🚚 Free Delivery</span><span>−$0.00</span>
              </div>
            )}
            <div style={{ height:1, background:'var(--border)', margin:'14px 0' }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:20 }}>
              <span style={{ fontSize:14, color:'var(--text3)', fontWeight:600 }}>Total</span>
              <span style={{ fontSize:24, fontWeight:800, color:'var(--blue)' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="btn-primary" style={{ width:'100%', justifyContent:'center', padding:'13px', fontSize:14 }}>Proceed to Checkout →</button>
            <Link to="/products" style={{ textDecoration:'none' }}>
              <button className="btn-ghost" style={{ width:'100%', justifyContent:'center', marginTop:10, fontSize:13 }}>Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
