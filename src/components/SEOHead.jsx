import React from 'react';
import { Helmet } from 'react-helmet-async';
const BASE='https://haseeb-portfolio.vercel.app';
export default function SEOHead({title='Haseeb Portfolio — MERN Stack Developer | Muhammad Haseeb Ur Rehman',description='Haseeb Portfolio — Muhammad Haseeb Ur Rehman is a MERN Stack Developer from Lahore Pakistan.',keywords='Haseeb Portfolio,haseeb portfolio,MERN Stack Developer,Muhammad Haseeb Ur Rehman',path='/',type='website'}){
  const url=`${BASE}${path}`,img=`${BASE}/og-image.jpg`;
  return(<Helmet><title>{title}</title><meta name="description" content={description}/><meta name="keywords" content={keywords}/><link rel="canonical" href={url}/><meta property="og:type" content={type}/><meta property="og:url" content={url}/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:image" content={img}/><meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content={title}/><meta name="twitter:description" content={description}/><meta name="twitter:image" content={img}/></Helmet>);
}
