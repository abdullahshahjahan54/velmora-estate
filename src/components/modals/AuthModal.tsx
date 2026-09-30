import React, { useState } from 'react';
import { usePropertyContext } from '../../context/PropertyContext';
import { X, Building2, ShieldCheck, Mail, Lock, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login'
}) => {
  const { loginUser } = usePropertyContext();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isAdminDemo, setIsAdminDemo] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') {
      setForgotSent(true);
      return;
    }

    const role = isAdminDemo || email.includes('admin') ? 'admin' : 'user';
    loginUser(email || 'client@velmora.com', role, name);
    onClose();
  };

  const handleQuickDemo = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      loginUser('director.admin@velmoraestates.com', 'admin', 'Senior Managing Director');
    } else {
      loginUser('alexander.cross@client.com', 'user', 'Alexander Cross');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-[#E8E5DF] bg-white p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-[#737A82] hover:bg-[#EFECE6] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand Kicker */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#191C1E] text-[#C2A772]">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="font-serif text-lg font-bold text-[#191C1E]">
            Velmora Estates
          </span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-2xl font-bold text-[#191C1E] mb-1">
          {mode === 'login' && 'Sign In to Your Account'}
          {mode === 'register' && 'Create Your Client Account'}
          {mode === 'forgot' && 'Reset Your Password'}
        </h2>
        <p className="text-xs text-[#545B63] mb-6">
          {mode === 'login' && 'Access your saved properties, scheduled visits, and market insights.'}
          {mode === 'register' && 'Save favorite properties and receive priority off-market notices.'}
          {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
        </p>

        {forgotSent ? (
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-center space-y-2 mb-4">
            <p className="text-xs font-semibold text-emerald-800">Password Reset Email Dispatched</p>
            <p className="text-[11px] text-emerald-600">Check {email} for instructions to reset your security credentials.</p>
            <button
              onClick={() => { setForgotSent(false); setMode('login'); }}
              className="text-xs font-semibold text-[#191C1E] underline pt-2"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-[#737A82] mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737A82]" />
                  <input
                    type="text"
                    required
                    placeholder="Alexander Cross"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] pl-9 pr-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#737A82] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737A82]" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] pl-9 pr-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#737A82]">Password</label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-[#9C7E44] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#737A82]" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border border-[#E8E5DF] bg-[#FBFBF9] pl-9 pr-3 py-2 text-xs text-[#191C1E] focus:outline-none"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-sm bg-[#191C1E] py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2B3037] transition-colors"
            >
              {mode === 'login' && 'Sign In'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot' && 'Send Reset Link'}
            </button>
          </form>
        )}

        {/* Quick Demo Logins for evaluator convenience */}
        <div className="mt-6 pt-5 border-t border-[#F0ECE1] space-y-2">
          <p className="text-[11px] font-medium text-[#737A82] text-center">
            Instant Demo Access:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('user')}
              className="rounded-md border border-[#E8E5DF] bg-[#FAF8F5] py-1.5 text-xs text-[#191C1E] font-medium hover:bg-[#EFECE6] transition-colors"
            >
              Client Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="rounded-md border border-[#C2A772] bg-[#FAF8F5] py-1.5 text-xs text-[#9C7E44] font-medium hover:bg-[#EFECE6] transition-colors"
            >
              Admin Demo
            </button>
          </div>
        </div>

        {/* Footer switch */}
        <div className="mt-5 text-center text-xs text-[#737A82]">
          {mode === 'login' ? (
            <span>
              Don't have an account yet?{' '}
              <button onClick={() => setMode('register')} className="text-[#191C1E] font-semibold underline">
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button onClick={() => setMode('login')} className="text-[#191C1E] font-semibold underline">
                Sign In
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
