import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
  ArrowRight, Brain, Zap, ShieldCheck, Target, Trophy, 
  BarChart, PlayCircle, Star, Sparkles, Layers,
  Activity, Microscope, Stethoscope, Syringe, CheckCircle2,
  Users, Building, MessageSquare, Twitter, Github,
  User, Cross, Heart
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10"></div>
        
        <div className="container mx-auto px-6 md:px-8 max-w-7xl relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Hero Content */}
            <div className="lg:w-1/2 flex flex-col items-start text-left space-y-8 animate-slide">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 backdrop-blur border border-border shadow-soft">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-heading">The Next Generation of Clinical Education</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-hero font-display font-extrabold tracking-tight text-heading leading-[1.1]">
                Accelerate clinical excellence with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Intelligent Learning.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-body max-w-xl leading-relaxed">
                MedVerse is the world's most advanced, AI-powered learning platform designed for healthcare professionals. Train faster, maintain compliance, and improve patient care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Button as={Link} to="/sign-up" size="lg" className="h-14 px-8 text-base rounded-button shadow-premium group">
                  Start Clinical Training
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button as={Link} to="/explore" size="lg" variant="outline" className="h-14 px-8 text-base rounded-button bg-surface/50 backdrop-blur">
                  View Healthcare Enterprise
                </Button>
              </div>
              
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-surface bg-surface-secondary flex items-center justify-center overflow-hidden">
                       <User className="h-5 w-5 text-body" />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-body">
                  <span className="text-heading font-bold">5,000+</span> hospitals already learning
                </div>
              </div>
            </div>

            {/* Hero Dashboard Abstract */}
            <div className="lg:w-1/2 relative w-full aspect-square md:aspect-[4/3] animate-fade" style={{ animationDelay: '200ms' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-[40px] blur-3xl -z-10 transform scale-90"></div>
              
              {/* Main Dashboard Window */}
              <div className="absolute inset-4 bg-surface/60 backdrop-blur-2xl border border-border/80 shadow-premium rounded-[32px] overflow-hidden flex flex-col transform transition-transform hover:scale-[1.02] duration-500 ease-spring">
                <div className="h-12 border-b border-border/50 flex items-center px-6 gap-2 bg-surface/40">
                  <div className="w-3 h-3 rounded-full bg-error/80"></div>
                  <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                  <div className="w-3 h-3 rounded-full bg-success/80"></div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-6">
                   <div className="flex gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-primary/20 animate-pulse flex items-center justify-center">
                        <Activity className="h-6 w-6 text-primary" />
                     </div>
                     <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 bg-border rounded-full w-1/3"></div>
                        <div className="h-3 bg-border/60 rounded-full w-1/4"></div>
                     </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="flex-1 bg-surface rounded-[24px] border border-border/50 p-4 shadow-soft">
                         <div className="h-24 bg-gradient-to-t from-primary/20 to-transparent rounded-xl flex items-end px-4 gap-2">
                            <div className="w-full bg-primary rounded-t-sm h-[40%]"></div>
                            <div className="w-full bg-primary rounded-t-sm h-[60%]"></div>
                            <div className="w-full bg-primary rounded-t-sm h-[80%]"></div>
                            <div className="w-full bg-primary rounded-t-sm h-[50%]"></div>
                            <div className="w-full bg-primary rounded-t-sm h-[90%]"></div>
                         </div>
                      </div>
                      <div className="w-1/3 bg-surface rounded-[24px] border border-border/50 p-4 shadow-soft flex flex-col items-center justify-center gap-3">
                         <div className="relative w-16 h-16">
                           <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border)" strokeWidth="3" />
                             <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="100, 100" />
                           </svg>
                           <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-heading text-success">
                              <ShieldCheck className="h-6 w-6" />
                           </div>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-4">
                     {[1,2,3].map(i => (
                        <div key={i} className="h-12 bg-surface rounded-[16px] border border-border/50 flex items-center px-4 gap-4">
                           <div className="w-8 h-8 rounded-full bg-surface-secondary"></div>
                           <div className="flex-1 h-2 bg-border/60 rounded-full"></div>
                        </div>
                     ))}
                   </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -left-8 top-1/4 bg-surface p-4 rounded-[20px] shadow-premium border border-border animate-slide" style={{ animationDelay: '400ms' }}>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                       <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-heading">CME Credits Earned</div>
                       <div className="text-xs text-body">Advanced Patient Care</div>
                    </div>
                 </div>
              </div>

              <div className="absolute -right-6 bottom-1/4 bg-surface p-4 rounded-[20px] shadow-premium border border-border animate-slide" style={{ animationDelay: '600ms' }}>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                       <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-bold text-heading">HIPAA Compliant</div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 border-y border-border/50 bg-surface/30">
         <div className="container mx-auto px-6 max-w-7xl">
            <p className="text-center text-sm font-semibold text-body mb-8 uppercase tracking-widest">Trusted by leading health systems</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               {[Layers, Building, Activity, Heart, ShieldCheck].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-2">
                     <Icon className="h-8 w-8 text-heading" />
                     <span className="text-xl font-bold font-display text-heading">Health{['Care', 'Net', 'Plus', 'System', 'Trust'][i]}</span>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-heading">Engineered for Clinical Excellence</h2>
              <p className="text-lg text-body">MedVerse provides a comprehensive suite of tools designed to optimize healthcare training and ensure hospital compliance.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Brain, title: "Adaptive Clinical Pathways", desc: "AI-driven curriculum that molds to each practitioner's specialty and learning speed." },
                { icon: ShieldCheck, title: "Compliance Tracking", desc: "Automated monitoring for HIPAA, OSHA, and hospital-specific certifications." },
                { icon: Target, title: "CME & Skill Milestones", desc: "Set micro-goals and achieve continuing medical education credits effortlessly." },
                { icon: Activity, title: "Real-time Metrics", desc: "Deep analytics to track department engagement, course completion, and knowledge retention." },
                { icon: Zap, title: "Seamless Shift Sync", desc: "Start on desktop, finish on mobile during rounds. Progress is always in sync." },
                { icon: Users, title: "Peer Case Studies", desc: "Discuss complex patient scenarios, share medical notes, and learn collaboratively." },
              ].map((feat, i) => (
                 <div key={i} className="bg-surface border border-border p-8 rounded-[24px] hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                    <div className="h-12 w-12 rounded-[16px] bg-surface-secondary flex items-center justify-center text-primary mb-6">
                       <feat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-heading mb-3">{feat.title}</h3>
                    <p className="text-body leading-relaxed">{feat.desc}</p>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Learning Experience Split Pane */}
      <section className="py-24 md:py-32 bg-surface-secondary/30">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 order-2 lg:order-1 relative">
                 <div className="bg-heading rounded-[32px] p-8 shadow-premium transform -rotate-2 hover:rotate-0 transition-transform duration-500 ease-spring">
                    <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
                       <div className="w-3 h-3 rounded-full bg-error/50"></div>
                       <div className="w-3 h-3 rounded-full bg-warning/50"></div>
                       <div className="w-3 h-3 rounded-full bg-success/50"></div>
                    </div>
                    <div className="space-y-4 font-mono text-sm">
                       <div className="flex items-center gap-3 text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Advanced Cardiac Life Support (ACLS)</span>
                       </div>
                       <div className="flex items-center gap-3 text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>HIPAA Privacy and Security</span>
                       </div>
                       <div className="flex items-center gap-3 text-success">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Bloodborne Pathogens Safety</span>
                       </div>
                       <div className="flex items-center gap-3 text-primary/70">
                          <Activity className="h-4 w-4 animate-pulse" />
                          <span className="text-white/90">Pediatric Advanced Life Support (In Progress...)</span>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2 space-y-6">
                 <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-heading">A frictionless learning experience.</h2>
                 <p className="text-lg text-body leading-relaxed">
                   Say goodbye to clunky, outdated hospital LMS interfaces. MedVerse provides a distraction-free, modern environment that physicians and nurses love. Focus entirely on absorbing knowledge.
                 </p>
                 <ul className="space-y-4 pt-4">
                    {['Bite-sized modules for busy shifts', 'Offline access for remote clinics', 'Automated CME credit reporting'].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-heading font-medium">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          {item}
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="space-y-4 max-w-2xl">
                 <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-heading">Explore Curated Clinical Categories</h2>
                 <p className="text-lg text-body">Discover world-class medical content across specialties, structured perfectly for fast consumption.</p>
              </div>
              <Button as={Link} to="/explore" variant="ghost" className="gap-2">
                 Browse all <ArrowRight className="h-4 w-4" />
              </Button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Stethoscope, name: "Nursing Education", count: "120+ Courses" },
                { icon: Activity, name: "Patient Care & Safety", count: "85+ Courses" },
                { icon: Syringe, name: "Surgical Protocols", count: "200+ Courses" },
                { icon: Microscope, name: "Medical Technology", count: "45+ Courses" },
              ].map((cat, i) => (
                 <Link key={i} to="/explore" className="group bg-surface border border-border p-6 rounded-[24px] hover:border-primary hover:shadow-soft transition-all duration-300">
                    <div className="h-12 w-12 rounded-[16px] bg-surface-secondary flex items-center justify-center text-heading group-hover:bg-primary group-hover:text-white transition-colors mb-6">
                       <cat.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-heading mb-1">{cat.name}</h3>
                    <p className="text-sm text-body">{cat.count}</p>
                 </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-heading text-surface">
         <div className="container mx-auto px-6 max-w-7xl text-center space-y-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Loved by clinical leaders</h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
               {[1,2,3].map((i) => (
                  <div key={i} className="bg-surface/10 border border-surface/10 p-8 rounded-[24px] backdrop-blur-sm">
                     <div className="flex gap-1 text-accent mb-6">
                        {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                     </div>
                     <p className="text-lg leading-relaxed mb-8">
                       "MedVerse completely transformed how we onboard clinical staff. What used to take weeks now takes days. The AI-driven training paths are nothing short of magic."
                     </p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-surface/20"></div>
                        <div>
                           <div className="font-bold">Dr. Sarah Jenkins</div>
                           <div className="text-sm text-surface/60">Chief Medical Officer, General Hospital</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-24 border-b border-border/50">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
               {[
                  { value: "2M+", label: "Active Clinicians" },
                  { value: "100%", label: "HIPAA Compliant" },
                  { value: "50M+", label: "CME Credits Awarded" },
                  { value: "300+", label: "Health Systems" }
               ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                     <div className="text-4xl md:text-5xl font-display font-extrabold text-heading">{stat.value}</div>
                     <div className="text-sm font-medium text-body uppercase tracking-wider">{stat.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 md:py-32">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="bg-gradient-to-br from-primary to-accent rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-premium">
               {/* Abstract shapes in background */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
               
               <div className="relative z-10 space-y-8 max-w-3xl mx-auto text-white">
                  <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight">Ready to elevate patient care?</h2>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">
                     Join thousands of modern hospitals building the future of clinical education. Start your free enterprise trial today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                     <Button as={Link} to="/sign-up" size="lg" className="h-14 px-8 text-base rounded-button bg-white text-primary hover:bg-surface shadow-soft">
                        Get Started for Free
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
