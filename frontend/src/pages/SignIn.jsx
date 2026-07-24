import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('demo@healthcare.local');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  }

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center bg-background px-4 py-12">
      <form className="w-full max-w-md bg-card p-8 rounded-2xl shadow-lg border" onSubmit={submit}>
        <img src="/logo.svg" alt="LearnPath Logo" className="h-12 w-12 mb-6" />
        <h2 className="text-2xl font-display font-semibold mb-2">Welcome back</h2>
        <p className="text-muted-foreground mb-6">Use the prefilled demo credentials or enter any email/password.</p>
        {error && <div className="text-destructive mb-3 text-sm">{error}</div>}
        <label className="block mb-2 text-sm font-medium">Email</label>
        <Input className="mb-4" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label className="block mb-2 text-sm font-medium">Password</label>
        <Input type="password" className="mb-6" value={password} onChange={(event) => setPassword(event.target.value)} />
        <Button className="w-full">Sign in</Button>
        <p className="text-sm text-muted-foreground mt-5 text-center">
          Need a demo account? <Link to="/sign-up" className="text-primary font-medium">Create one</Link>
        </p>
      </form>
    </div>
  );
}
