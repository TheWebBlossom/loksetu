import React, { useState } from 'react';
import { 
  KeyRound, 
  Smartphone, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ShieldAlert, 
  PhoneCall, 
  RotateCcw
} from 'lucide-react';
import LogoPlaceholder from '../components/common/LogoPlaceholder';
import DemoBadge from '../components/common/DemoBadge';

export default function ForgotPasswordPage({ onNavigate }) {
  const [step, setStep] = useState(1); // 1: identify, 2: verify otp, 3: reset password, 4: done
  const [identifier, setIdentifier] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('7842');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-civic-canvas py-12 flex flex-col justify-center bg-civic-grid">
      <div className="civic-container max-w-lg w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6 justify-center">
          <button onClick={() => onNavigate('home')} className="hover:text-forest-800">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <button onClick={() => onNavigate('login')} className="hover:text-forest-800">Login</button>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-forest-900 font-semibold">Account Recovery</span>
        </div>

        {/* Card Box */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-card p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <LogoPlaceholder size="default" />
            </div>
            <h1 className="text-2xl font-extrabold text-forest-950 tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Recover access to your LokSetu citizen or official profile
            </p>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center justify-between mb-8 px-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  step === s
                    ? 'bg-forest-800 text-white shadow-2xs'
                    : step > s
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s ? '✓' : s}
                </span>
                <span className={`text-[11px] font-semibold hidden sm:inline ${step >= s ? 'text-forest-900' : 'text-gray-400'}`}>
                  {s === 1 ? 'Identifier' : s === 2 ? 'Verify OTP' : 'New Password'}
                </span>
                {s < 3 && <div className="w-8 h-0.5 bg-gray-200 hidden sm:block mx-1"></div>}
              </div>
            ))}
          </div>

          {/* Step 1: Input Identifier */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="bg-forest-50 border border-forest-200 rounded-xl p-3 text-xs text-forest-900">
                <p>
                  Enter the registered Indian mobile number or government email address linked to your Ward account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Mobile Number / Email ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. +91 98765 43210 or official@gov.in"
                    className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 pl-9 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                  <Smartphone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Send One-Time Passcode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 text-xs text-teal-900 flex items-center justify-between">
                <span>Verification code sent to <strong>{identifier}</strong></span>
                <span className="text-[11px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-teal-300 text-teal-800">
                  Demo: 7842
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Enter 4-Digit Security OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center tracking-widest text-lg font-mono rounded-xl border border-gray-300 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Didn't receive code?</span>
                <button type="button" className="text-teal-700 font-semibold hover:underline">
                  Resend OTP in 24s
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Verify OTP & Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  New Secure Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    defaultValue="LokSetu@Secure2026"
                    className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 pl-9 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    defaultValue="LokSetu@Secure2026"
                    className="w-full text-xs rounded-xl border border-gray-300 py-2.5 px-3 pl-9 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Update Password</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Step 4: Finished */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Password Reset Successfully</h3>
              <p className="text-xs text-gray-600 max-w-xs mx-auto">
                Your credentials have been securely updated. You can now log into your ward account.
              </p>
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-2.5 bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold rounded-xl"
              >
                Proceed to Sign In
              </button>
            </div>
          )}

          {/* Helpdesk Notice */}
          <div className="mt-8 pt-5 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              <span>Lost mobile access?</span>
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-teal-700 font-semibold hover:underline"
            >
              Contact Ward Helpdesk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
