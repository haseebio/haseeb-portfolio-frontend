import React, { useState } from 'react';
import useSEO from '../hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { productAPI } from '../utils/api';
import { toast } from '../utils/toast';
import ProductForm from '../components/ProductForm';

const AddProductPage = () => {
  const navigate = useNavigate();
  useSEO({ title:'Add Product', description:'Add a new product to Haseeb Shop.' });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (formData) => {
    setLoading(true);
    try { await productAPI.create(formData); toast.success('Product added!'); navigate('/products'); }
    catch (err) { toast.error(err.response?.data?.message || 'Failed to create product'); }
    finally { setLoading(false); }
  };
  return (
    <div style={{ minHeight:'100vh', padding:'40px 28px', background:'#f5f5fa' }}>
      <div style={{ maxWidth:660, margin:'0 auto' }}>
        <button onClick={()=>navigate(-1)} style={{ background:'none', border:'none', color:'var(--text3)', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', gap:6, marginBottom:20, padding:0, fontWeight:600 }}>← Back</button>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:32 }}>
          <div style={{ width:50, height:50, borderRadius:14, background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:24, boxShadow:'0 6px 20px rgba(37,99,255,0.3)' }}>📦</div>
          <div>
            <h1 style={{ fontSize:26, fontWeight:700, color:'var(--text)', lineHeight:1.1 }}>Add New Product</h1>
            <p style={{ color:'var(--text3)', fontSize:14, marginTop:4 }}>Fill in the details to list a new product</p>
          </div>
        </div>
        <div style={{ background:'#fff', borderRadius:16, padding:32, border:'1px solid var(--border)', boxShadow:'var(--shadow-sm)' }}>
          <ProductForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};
export default AddProductPage;
