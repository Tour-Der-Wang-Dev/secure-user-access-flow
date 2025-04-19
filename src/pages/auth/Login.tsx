
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from './AuthLayout';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Login successful');
      navigate('/');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="you@example.com" 
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Enter your password" 
          />
        </div>
        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
          Login
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
