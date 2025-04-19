
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-6 text-orange-500">WangSocial</h1>
      <p className="text-xl mb-8">Discover local social media posts near Wang Sam Mo</p>
      
      <div className="flex flex-col space-y-4 items-center">
        <Link to="/auth/login">
          <Button variant="default" className="bg-orange-500 hover:bg-orange-600">
            Login
          </Button>
        </Link>
        <Link to="/auth/signup">
          <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
