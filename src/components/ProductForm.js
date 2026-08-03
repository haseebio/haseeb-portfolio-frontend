import React, { useState, useEffect, useRef } from 'react';
import { getImageUrl } from '../utils/api';

const CURRENCIES = [
  { value:'USD', label:'USD - US Dollar' },
  { value:'PKR', label:'PKR - Pakistani Rupee' },
  { value:'JPY', label:'JPY - Japanese Yen' },
  { value:'CNY', label:'CNY - Chinese Yuan' },
  { value:'EUR', label:'EUR - Euro' },
  { value:'GBP', label:'GBP - British Pound' },
];

// OUTSIDE component — prevents focus loss on every keystroke
const Field = ({ label, name, type='text', placeholder, min, max, step, required, error, value, onChange, children }) => (
  <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
    <label className="field-label">{label}{required && <span style={{ color:'#ef4444', marginLeft:3 }}>*</span>}</label>
    {children || (
      <input type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} min={min} max={max} step={step}
        className="input-field" style={error ? { borderColor:'#ef4444', boxShadow:'0 0 0 3px rgba(239,68,68,0.1)' } : {}} />
    )}
    {error && <span style={{ fontSize:12, color:'#ef4444' }}>{error}</span>}
  </div>
);

const ProductForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState({ name:'', productName:'', price:'', rating:3, freeDelivery:false, currencyCode:'USD', shopName:'', stock:100 });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  useEffect(() => {
    if (initialData) {
      setForm({ name:initialData.name||'', productName:initialData.productName||'', price:initialData.price||'', rating:initialData.rating||3, freeDelivery:initialData.freeDelivery||false, currencyCode:initialData.currencyCode||'USD', shopName:initialData.shopName||'', stock:initialData.stock||100 });
      if (initialData.image) setImagePreview(getImageUrl(initialData.image));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type==='checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]:'' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    if (file.size > 5*1024*1024) { setErrors(prev => ({ ...prev, image:'Image must be under 5MB' })); return; }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.productName.trim()) e.productName = 'Required';
    if (!form.price || isNaN(form.price) || Number(form.price) < 0) e.price = 'Valid price required';
    if (!form.shopName.trim()) e.shopName = 'Required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); if (!validate()) return;
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    onSubmit(fd);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
      {/* Image */}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        <label className="field-label">Product Image</label>
        <div onClick={() => fileInputRef.current.click()} style={{ height: imagePreview ? 180 : 110, borderRadius:10, border:`2px dashed ${errors.image ? '#ef4444' : 'var(--border)'}`, background:'var(--border2)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', transition:'all 0.2s', position:'relative' }}
          onMouseEnter={e => e.currentTarget.style.borderColor='var(--blue)'}
          onMouseLeave={e => e.currentTarget.style.borderColor= errors.image ? '#ef4444' : 'var(--border)'}>
          {imagePreview ? (
            <><img src={imagePreview} alt="Preview" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity=1} onMouseLeave={e => e.currentTarget.style.opacity=0}>
              <span style={{ color:'#fff', fontSize:13, fontWeight:600 }}>Click to change</span>
            </div></>
          ) : (
            <div style={{ textAlign:'center', color:'var(--text4)' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>📷</div>
              <div style={{ fontSize:13, fontWeight:500 }}>Click to upload image</div>
              <div style={{ fontSize:11, marginTop:4 }}>JPG, PNG, WebP — max 5MB</div>
            </div>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display:'none' }} />
        {errors.image && <span style={{ fontSize:12, color:'#ef4444' }}>{errors.image}</span>}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Field label="SKU / Code" name="name" placeholder="e.g. SONY-WH1000" required value={form.name} onChange={handleChange} error={errors.name} />
        <Field label="Display Name" name="productName" placeholder="e.g. Sony WH-1000XM5" required value={form.productName} onChange={handleChange} error={errors.productName} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Field label="Price" name="price" type="number" placeholder="0.00" min="0" step="0.01" required value={form.price} onChange={handleChange} error={errors.price} />
        <Field label="Currency" name="currencyCode" value={form.currencyCode} onChange={handleChange} error={errors.currencyCode}>
          <select name="currencyCode" value={form.currencyCode} onChange={handleChange} className="input-field">
            {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </Field>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
        <Field label="Shop Name" name="shopName" placeholder="e.g. TechStore" required value={form.shopName} onChange={handleChange} error={errors.shopName} />
        <Field label="Stock" name="stock" type="number" min="0" placeholder="100" value={form.stock} onChange={handleChange} error={errors.stock} />
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
        <label className="field-label">Rating: {form.rating} / 5</label>
        <input type="range" name="rating" min="1" max="5" step="1" value={form.rating} onChange={handleChange} style={{ width:'100%', accentColor:'var(--blue)' }} />
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text4)' }}>{[1,2,3,4,5].map(n=><span key={n}>{n}★</span>)}</div>
      </div>

      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 16px', background:'var(--border2)', borderRadius:10, border:'1px solid var(--border)' }}>
        <div>
          <div style={{ fontSize:14, fontWeight:600, color:'var(--text)' }}>Free Delivery</div>
          <div style={{ fontSize:12, color:'var(--text3)' }}>Offer free shipping on this product</div>
        </div>
        <label style={{ position:'relative', display:'inline-block', width:44, height:24, cursor:'pointer' }}>
          <input type="checkbox" name="freeDelivery" checked={form.freeDelivery} onChange={handleChange} style={{ opacity:0, width:0, height:0 }} />
          <span style={{ position:'absolute', inset:0, borderRadius:12, transition:'0.3s', background: form.freeDelivery ? 'var(--blue)' : '#cbd5e1' }}>
            <span style={{ position:'absolute', left: form.freeDelivery ? 22 : 2, top:2, width:20, height:20, background:'#fff', borderRadius:'50%', transition:'0.3s', boxShadow:'0 1px 3px rgba(0,0,0,0.2)' }}></span>
          </span>
        </label>
      </div>

      <div style={{ display:'flex', gap:12, paddingTop:4 }}>
        {onCancel && <button type="button" onClick={onCancel} className="btn-ghost" style={{ flex:1, justifyContent:'center' }}>Cancel</button>}
        <button type="submit" disabled={loading} className="btn-primary" style={{ flex:2, justifyContent:'center' }}>
          {loading ? <><span className="spinner"></span> Saving...</> : initialData ? 'Update Product' : '+ Add Product'}
        </button>
      </div>
    </form>
  );
};
export default ProductForm;
