import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, LogOut, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const initials = (user?.name || user?.email || 'U').slice(0, 1).toUpperCase();

  return (
    <>
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="h-24 w-24 rounded-full border-4 border-background shadow-sm bg-primary/10 text-primary flex items-center justify-center text-2xl font-semibold">
              {initials}
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-display font-bold">{user?.name || 'User'}</h1>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mt-2 text-muted-foreground text-sm">
                <div className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>Learning member</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="gap-2" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="border rounded-2xl bg-card p-8 text-center">
          <BookOpen className="h-10 w-10 mx-auto text-primary mb-4" />
          <p className="text-muted-foreground mb-4">Your learning journey appears on the dashboard.</p>
          <Button as={Link} to="/dashboard">Open Dashboard</Button>
        </div>
      </div>
    </>
  );
}
