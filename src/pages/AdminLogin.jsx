import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple mock authentication
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-500 mt-2">Enter your password to access the dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            placeholder="Enter password"
                        />
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/30"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">Hint: admin123</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
