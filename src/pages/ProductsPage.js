import React, { useState, useEffect, useCallback, useRef } from 'react';
import useSEO from '../hooks/useSEO';
import { productAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import ProductForm from '../components/ProductForm';
import SearchBar from '../components/SearchBar';

const SORT_OPTIONS = [
  { value:'createdAt', label:'Newest First' },
  { value:'price', label:'Price: Low to High' },
  { value:'-price', label:'Price: High to Low' },
  { value:'rating', label:'Top Rated' },
];

const ProductsPage = () => {
  const { isAdmin } = useAuth();
  useSEO({ title: isAdmin ? 'Manage Products' : 'All Products', description:'Browse all products on Haseeb Shop.', keywords:'products, shop, buy online, haseeb shop' });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [editProduct, setEditProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const searchTimeout = useRef();

  const fetchProducts = useCallback(async (pg=1, q=search, sort=sortBy) => {
    setLoading(true);
    try {
      const res = await productAPI.getAll({ page:pg, limit:50, sortBy:sort });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch { toast.error('Failed to load products'); }
    finally { setLoading(false); }
  }, [search, sortBy]);

  useEffect(() => { fetchProducts(1); }, [sortBy]);

  const handleSearch = (q) => {
    setSearch(q); clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => { setPage(1); fetchProducts(1, q, sortBy); }, 400);
  };

  const handleEdit = async (formData) => {
    setFormLoading(true);
    try { await productAPI.update(editProduct._id, formData); toast.success('Product updated!'); setEditProduct(null); fetchProducts(page); }
    catch (err) { toast.error(err.response?.data?.message || 'Update failed'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = async (id) => {
    try { await productAPI.delete(id); toast.success('Product deleted'); setDeleteConfirm(null); fetchProducts(page); }
    catch (err) { toast.error(err.response?.data?.message || 'Delete failed'); }
  };

  const handlePageChange = (pg) => { setPage(pg); fetchProducts(pg); window.scrollTo({top:0,behavior:'smooth'}); };

  return (
    <div style={{ minHeight:'100vh', padding:'36px 28px', background:'#f5f5fa' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ marginBottom:28 }}>
          <div className="section-tag">{isAdmin ? 'Admin' : 'Browse'}</div>
          <h1 style={{ fontSize:30, fontWeight:700, color:'var(--text)', letterSpacing:'-0.02em' }}>{isAdmin ? 'Product Manager' : 'All Products'}</h1>
          <p style={{ color:'var(--text3)', fontSize:14, marginTop:4 }}>{total > 0 ? `${total} product${total!==1?'s':''} available` : 'No products yet'}</p>
        </div>

        <div style={{ display:'flex', gap:12, marginBottom:28, flexWrap:'wrap' }}>
          <div style={{ flex:'1 1 280px' }}><SearchBar onSearch={handleSearch} placeholder="Search products, shops..." /></div>
          <select value={sortBy} onChange={e=>{setSortBy(e.target.value);setPage(1);}} className="input-field" style={{ width:'auto', minWidth:180 }}>
            {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:18 }}>
            {[...Array(8)].map((_,i) => <div key={i} style={{ height:360, borderRadius:16, background:'#fff', border:'1px solid var(--border)', animation:'pulse 1.5s ease-in-out infinite' }}><style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style></div>)}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign:'center', padding:'80px 20px' }}>
            <div style={{ fontSize:56, marginBottom:16 }}>📦</div>
            <h3 style={{ fontSize:20, fontWeight:700, color:'var(--text)', marginBottom:8 }}>No products found</h3>
            <p style={{ color:'var(--text3)' }}>{search ? 'Try a different search term' : isAdmin ? 'Add your first product to get started' : 'Check back soon!'}</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:18 }}>
            {products.map(product => <ProductCard key={product._id} product={product} onEdit={setEditProduct} onDelete={(id)=>setDeleteConfirm(id)} />)}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display:'flex', justifyContent:'center', gap:8, marginTop:40 }}>
            <button onClick={()=>handlePageChange(page-1)} disabled={page===1} className="btn-ghost" style={{ padding:'9px 16px', opacity:page===1?0.4:1 }}>← Prev</button>
            {[...Array(totalPages)].map((_,i) => (
              <button key={i} onClick={()=>handlePageChange(i+1)} style={{ width:38, height:38, borderRadius:8, border:'none', cursor:'pointer', fontWeight:600, fontSize:14, transition:'all 0.2s', background:page===i+1?'var(--blue)':'#fff', color:page===i+1?'#fff':'var(--text3)', border:`1px solid ${page===i+1?'var(--blue)':'var(--border)'}`, boxShadow:page===i+1?'0 4px 12px rgba(37,99,255,0.3)':'none' }}>{i+1}</button>
            ))}
            <button onClick={()=>handlePageChange(page+1)} disabled={page===totalPages} className="btn-ghost" style={{ padding:'9px 16px', opacity:page===totalPages?0.4:1 }}>Next →</button>
          </div>
        )}
      </div>

      <Modal isOpen={!!editProduct} onClose={()=>setEditProduct(null)} title="Edit Product" maxWidth={620}>
        {editProduct && <ProductForm initialData={editProduct} onSubmit={handleEdit} onCancel={()=>setEditProduct(null)} loading={formLoading} />}
      </Modal>

      <Modal isOpen={!!deleteConfirm} onClose={()=>setDeleteConfirm(null)} title="Delete Product?" maxWidth={420}>
        <p style={{ color:'var(--text2)', marginBottom:24, lineHeight:1.7 }}>This action cannot be undone. The product and its image will be permanently removed.</p>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={()=>setDeleteConfirm(null)} className="btn-ghost" style={{ flex:1, justifyContent:'center' }}>Cancel</button>
          <button onClick={()=>handleDelete(deleteConfirm)} className="btn-danger" style={{ flex:1, justifyContent:'center' }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
};
export default ProductsPage;
