"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore(state => state.setAuth);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await res.json();
      setAuth(data.token, data.user);
      router.push('/dashboard'); // or wherever the main app goes
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-6"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Sign in to your AgentOS control center</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
              <Input
                type="email"
                placeholder="agent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-5 h-5" />}
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-5 h-5" />}
                required
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full h-11" isLoading={isLoading}>
                Initialize Session <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            Don't have an access node?{' '}
            <Link href="/auth/register" className="text-blue-400 hover:text-blue-300 transition-colors">
              Request access
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
