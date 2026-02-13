import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', orgName: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Send to Backend
      // const res = await axios.post('/auth/register', formData);
      
      // MOCK for now
      console.log("Registered:", formData);
      localStorage.setItem('token', 'mock-jwt-token');
      
      navigate('/dashboard');
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-surface p-8 rounded shadow-md border border-border w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-dark">Create Account</h1>
          <p className="text-sm text-dark-muted">Start building with CMaaS today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Organization Name</label>
            <input 
              type="text" 
              required
              className="w-full border-border rounded focus:ring-primary focus:border-primary text-sm p-2 border"
              placeholder="e.g. Acme Corp"
              onChange={(e) => setFormData({...formData, orgName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full border-border rounded focus:ring-primary focus:border-primary text-sm p-2 border"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full border-border rounded focus:ring-primary focus:border-primary text-sm p-2 border"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}