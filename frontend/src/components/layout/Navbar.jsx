import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { Search, Bell, User, Menu, X, Layers } from 'lucide-react';

export default function Navbar(){
  const { user, logout } = useAuth();
  const isSignedIn = !!user;
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Courses', path: '/courses' },
    { name: 'Dashboard', path: '/dashboard', auth: true },
    { name: 'Resources', path: '/resources' },
  ];

  return (
    <>
      <header className={`fixed top-4 left-4 right-4 z-50 md:top-6 md:left-auto md:right-auto md:w-full md:max-w-5xl md:mx-auto transition-transform duration-300 ${scrolled ? 'md:-translate-y-2' : ''}`}>
        <div className={`flex h-16 items-center justify-between px-6 rounded-[24px] bg-surface/70 backdrop-blur-xl border border-border shadow-soft transition-all duration-300 ${scrolled ? 'shadow-premium bg-surface/85 border-border/80' : ''}`}>
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-220">
                 <Layers size={18} strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-heading">MedVerse</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.auth && !isSignedIn) return null;
                const isActive = location.pathname.startsWith(link.path) && link.path !== '/';
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-220 ${
                      isActive 
                        ? 'bg-surface-secondary text-primary' 
                        : 'text-body hover:text-heading hover:bg-surface-secondary/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 border-r border-border pr-4 mr-2">
               <button className="h-10 w-10 rounded-full flex items-center justify-center text-body hover:bg-surface-secondary hover:text-heading transition-colors">
                  <Search size={18} />
               </button>
               {isSignedIn && (
                 <button className="h-10 w-10 rounded-full flex items-center justify-center text-body hover:bg-surface-secondary hover:text-heading transition-colors relative">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-error border-2 border-surface"></span>
                 </button>
               )}
            </div>

            {isSignedIn ? (
              <div className="hidden sm:flex items-center gap-3">
                 <div className="h-9 w-9 rounded-full bg-surface-secondary border border-border flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors">
                    <User size={16} className="text-body" />
                 </div>
                 <Button variant="outline" size="sm" onClick={() => logout()} className="hidden lg:flex rounded-button">Log out</Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/sign-in" className="text-sm font-medium text-body hover:text-heading transition-colors px-2">Sign In</Link>
                <Button as={Link} to="/sign-up" size="sm" className="rounded-button px-5">Get Started</Button>
              </div>
            )}

            <button 
              className="md:hidden h-10 w-10 flex items-center justify-center text-body hover:text-heading"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-heading/20 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 z-[110] w-full max-w-sm bg-surface border-l border-border shadow-premium transform transition-transform duration-300 ease-spring md:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary text-white flex items-center justify-center">
                 <Layers size={18} strokeWidth={2.5} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-heading">MedVerse</span>
            </div>
            <button 
              className="h-10 w-10 rounded-full flex items-center justify-center text-body hover:bg-surface-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
         </div>

         <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              if (link.auth && !isSignedIn) return null;
              const isActive = location.pathname.startsWith(link.path) && link.path !== '/';
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 rounded-[16px] text-base font-medium transition-colors ${
                    isActive 
                      ? 'bg-surface-secondary text-primary' 
                      : 'text-body hover:text-heading hover:bg-surface-secondary/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
         </div>

         <div className="p-6 border-t border-border flex flex-col gap-4">
            <div className="flex items-center justify-between mb-4">
               <button className="flex items-center gap-3 text-body hover:text-heading transition-colors">
                  <Search size={20} />
                  <span className="font-medium">Search</span>
               </button>
               {isSignedIn && (
                 <button className="flex items-center gap-3 text-body hover:text-heading transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-error border-2 border-surface"></span>
                 </button>
               )}
            </div>

            {isSignedIn ? (
              <div className="flex items-center justify-between bg-surface-secondary p-4 rounded-[18px]">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-surface border border-border flex items-center justify-center">
                       <User size={18} className="text-body" />
                    </div>
                    <div>
                      <div className="font-medium text-heading text-sm">My Profile</div>
                      <div className="text-xs text-body truncate w-32">{user?.email || 'user@example.com'}</div>
                    </div>
                 </div>
                 <Button variant="outline" size="sm" onClick={() => logout()} className="rounded-button">Log out</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Button as={Link} to="/sign-up" className="w-full justify-center rounded-button">Get Started</Button>
                <Button variant="outline" as={Link} to="/sign-in" className="w-full justify-center rounded-button">Sign In</Button>
              </div>
            )}
         </div>
      </div>
    </>
  );
}
