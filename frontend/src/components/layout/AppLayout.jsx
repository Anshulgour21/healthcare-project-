import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Layers, Twitter, Github } from 'lucide-react';

export default function AppLayout({ children }){
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 w-full pt-28 pb-16 md:pt-32 md:pb-24">
        {children}
      </main>
      
      <footer className="pt-24 pb-12 bg-surface border-t border-border mt-auto">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
               <div className="col-span-2 lg:col-span-2 space-y-6">
                  <Link to="/" className="flex items-center gap-2">
                     <div className="h-8 w-8 rounded-xl bg-primary text-white flex items-center justify-center">
                        <Layers size={18} strokeWidth={2.5} />
                     </div>
                     <span className="font-display font-bold text-xl tracking-tight text-heading">MedVerse</span>
                  </Link>
                  <p className="text-body max-w-sm">
                     The world's most advanced learning platform. Designed for high-performance teams and lifelong learners.
                  </p>
                  <div className="flex gap-4">
                     <a href="#" className="h-10 w-10 rounded-full bg-surface-secondary flex items-center justify-center text-body hover:text-primary transition-colors">
                        <Twitter size={18} />
                     </a>
                     <a href="#" className="h-10 w-10 rounded-full bg-surface-secondary flex items-center justify-center text-body hover:text-primary transition-colors">
                        <Github size={18} />
                     </a>
                  </div>
               </div>
               
               <div className="space-y-6">
                  <h4 className="font-bold text-heading">Product</h4>
                  <ul className="space-y-4">
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Features</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Enterprise</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Security</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Pricing</a></li>
                  </ul>
               </div>

               <div className="space-y-6">
                  <h4 className="font-bold text-heading">Resources</h4>
                  <ul className="space-y-4">
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Documentation</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Blog</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Guides</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Help Center</a></li>
                  </ul>
               </div>

               <div className="space-y-6">
                  <h4 className="font-bold text-heading">Company</h4>
                  <ul className="space-y-4">
                     <li><a href="#" className="text-body hover:text-primary transition-colors">About</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Careers</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Contact</a></li>
                     <li><a href="#" className="text-body hover:text-primary transition-colors">Partners</a></li>
                  </ul>
               </div>
            </div>
            
            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
               <p className="text-sm text-body">© 2026 MedVerse Inc. All rights reserved.</p>
               <div className="flex gap-6">
                  <a href="#" className="text-sm text-body hover:text-heading transition-colors">Privacy Policy</a>
                  <a href="#" className="text-sm text-body hover:text-heading transition-colors">Terms of Service</a>
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
