
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { BarChart2, FileText, User, Home } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    // Check current session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    checkUser();
    
    return () => subscription.unsubscribe();
  }, []);

  // Don't show navbar on landing page or auth pages
  if (location.pathname === '/' || location.pathname.startsWith('/auth/')) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-orange-500 mr-8">
            WangSocial
          </Link>
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              <NavLink 
                to="/dashboard" 
                label="แดชบอร์ด" 
                active={location.pathname === '/dashboard'} 
                icon={<BarChart2 className="h-4 w-4" />}
              />
              <NavLink 
                to="/content" 
                label="คอนเทนต์" 
                active={location.pathname === '/content'} 
                icon={<FileText className="h-4 w-4" />}
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {user ? (
            <Button 
              onClick={() => supabase.auth.signOut()}
              variant="ghost"
              size="sm"
              className="text-gray-600"
            >
              ออกจากระบบ
            </Button>
          ) : (
            <>
              <Link to="/auth/login">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600"
                >
                  เข้าสู่ระบบ
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button 
                  variant="default" 
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  สมัครสมาชิก
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, label, active, icon }) => {
  return (
    <Link to={to}>
      <Button 
        variant={active ? "default" : "ghost"} 
        size="sm"
        className={active ? "bg-orange-500 hover:bg-orange-600" : "text-gray-600"}
      >
        {icon}
        <span className="ml-1">{label}</span>
      </Button>
    </Link>
  );
};

export default NavBar;
