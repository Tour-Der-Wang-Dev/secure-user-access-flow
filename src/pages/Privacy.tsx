
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <p className="mb-4">
          This Privacy Policy describes how WangSocial ("we", "us", or "our") collects, uses, and discloses your personal information when you use our service.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
        <p className="mb-4">
          We collect information that you provide directly to us when you register for an account, create or modify your profile, and use the features of our service. This information may include your name, email address, profile picture, and other details you choose to provide.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to provide, maintain, and improve our services, including to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Create and maintain your account</li>
          <li>Provide personalized content based on your location</li>
          <li>Send notifications about relevant social media posts</li>
          <li>Improve and develop new features for our service</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">PDPA Compliance</h2>
        <p className="mb-4">
          We comply with the Thailand Personal Data Protection Act (PDPA). You have the right to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Request access to your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent at any time</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at privacy@wangsocial.example.com.
        </p>
      </div>
      
      <div className="mt-8">
        <Link to="/">
          <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Privacy;
