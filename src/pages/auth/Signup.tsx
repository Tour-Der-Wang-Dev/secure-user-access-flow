
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from './AuthLayout';
import { toast } from 'sonner';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signup successful');
      navigate('/');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            placeholder="Choose a username" 
          />
        </div>
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
            placeholder="Choose a strong password" 
          />
        </div>
        <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
