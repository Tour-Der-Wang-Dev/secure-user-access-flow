
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Search, Bell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-orange-500">WangSocial</h1>
        <p className="text-xl mb-8 text-gray-700">
          Discover local social media posts near Wang Sam Mo
        </p>
        
        <div className="flex flex-col space-y-4 items-center">
          <Link to="/auth/login">
            <Button variant="default" className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto">
              Login
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button variant="outline" className="border-teal-500 text-teal-500 hover:bg-teal-50 w-full md:w-auto">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MapPin className="h-10 w-10 text-orange-500" />}
              title="Local Discovery"
              description="Find social media posts within a 50km radius of Wang Sam Mo, Udon Thani"
            />
            <FeatureCard 
              icon={<Search className="h-10 w-10 text-orange-500" />}
              title="Keyword Filtering"
              description="Filter content by specific keywords like 'วังสามหมอ', 'ไฟดับ'"
            />
            <FeatureCard 
              icon={<Bell className="h-10 w-10 text-orange-500" />}
              title="LINE Notifications"
              description="Get notified when new relevant content is discovered"
            />
          </div>
        </div>
      </div>

      {/* Trust Elements */}
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">SSL Secured</span>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1 .257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm text-gray-600">PDPA Compliant</span>
          </div>
          <Link to="/privacy" className="text-sm text-teal-500 hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
