import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
  }, [isOpen, initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setLoading(true);

    try {
      let success = false;
      if (mode === 'signin') {
        success = await login(email, password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        const username = email.split('@')[0];
        success = await register(email, username, password);
        if (!success) {
          setError('Email already exists');
        }
      }

      if (success) {
        onClose();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-black/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[520px] animate-scale-in">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[28px] p-[3px] shadow-2xl">
          <div className="bg-white rounded-[26px] shadow-[0px_8px_32px_rgba(0,0,0,0.12)] !px-12 !py-10">

            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex justify-center mb-7">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5057EA]/10 to-[#5057EA]/20 flex items-center justify-center shadow-sm">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#5057EA" strokeWidth="2">
                  {mode === 'signin' ? (
                    <>
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </>
                  ) : (
                    <>
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <line x1="20" y1="8" x2="20" y2="14" />
                      <line x1="23" y1="11" x2="17" y2="11" />
                    </>
                  )}
                </svg>
              </div>
            </div>

            <div className="text-center mb-9">
              <h2 className="text-[20px] font-bold mb-2 text-gray-900">
                {mode === 'signin' ? 'WELCOME BACK' : 'SIGN UP'}
              </h2>
              <p className="text-[14px] text-gray-500">
                {mode === 'signin' ? 'Log into your account' : 'Create an account to continue'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2.5" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full bg-[#F4F4F4] border-2 border-transparent rounded-lg px-4 py-3.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5057EA] transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-[14px] font-medium text-gray-700" htmlFor="password">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button type="button" className="text-[12px] text-gray-500 hover:text-[#5057EA] transition-colors">
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full bg-[#F4F4F4] border-2 border-transparent rounded-lg px-4 py-3.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5057EA] transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {mode === 'signup' && (
                <div className="animate-slide-up">
                  <label className="block text-[14px] font-medium text-gray-700 mb-2.5" htmlFor="confirmPassword">
                    Confirm password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    className="w-full bg-[#F4F4F4] border-2 border-transparent rounded-lg px-4 py-3.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5057EA] transition-all"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-lg p-3.5 animate-slide-up">
                  {error}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#5057EA] text-white font-medium text-[14px] rounded-lg py-3.5 hover:bg-[#4048d8] active:scale-[0.98] transition-all shadow-lg shadow-[#5057ea]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{mode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
                    </span>
                  ) : (
                    mode === 'signin' ? 'Login now' : 'Continue'
                  )}
                </button>
              </div>
            </form>

            <div className="mt-5 text-center">
              <span className="text-[14px] text-gray-600">
                {mode === 'signin' ? 'Not registered yet? ' : 'Already have an account? '}
              </span>
              <button
                onClick={switchMode}
                type="button"
                className="text-[14px] text-[#5057EA] font-medium hover:underline"
              >
                {mode === 'signin' ? 'Register →' : 'Login →'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
