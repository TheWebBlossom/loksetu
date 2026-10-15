import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';
import Toast from '../components/Toast';

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: 'Ramesh Chandra Verma',
    mobile: '9876543210',
    email: 'ramesh.verma@domain.gov.in',
    password: 'Password@123',
    confirmPassword: 'Password@123',
    state: 'UP',
    district: 'fatehpur',
    tehsil: 'haswa',
    panchayat: 'rampur',
    terms: true
  });

  const [toastMsg, setToastMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login('citizen');
    setToastMsg('Account created successfully! Jurisdictional ward mapped to Rampur GP.');
    setTimeout(() => {
      navigate('/citizen/dashboard');
    }, 1000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
        <div className="flex items-center gap-2 text-label-md font-label-md text-outline">
          <span className="material-symbols-outlined text-[18px]">account_balance</span>
          <Link to="/" className="hover:text-primary">National Grievance Portal</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Citizen Identification &amp; Enrollment</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-primary/10 text-primary border border-primary/20">
          <span className="material-symbols-outlined text-[14px]">verified_user</span>
          <span>256-Bit SSL Secured</span>
        </span>
      </div>

      {/* Split Bento Card Structure */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-primary/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
        {/* LEFT COLUMN: Civic Trust Hero Panel */}
        <section className="lg:col-span-5 bg-gradient-to-br from-primary via-[#176B45] to-[#104F33] text-on-primary p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none text-on-primary">
            <span className="material-symbols-outlined text-[260px]">account_balance</span>
          </div>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 text-label-sm font-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">assured_workload</span>
              <span className="tracking-wide">Citizens' Rights &amp; Redressal Charter</span>
            </div>

            <h1 className="text-headline-lg font-headline-lg text-on-primary font-bold mb-4">
              Democracy at Your Fingertips. Transparent &amp; Accountable.
            </h1>
            <p className="text-surface-variant text-body-md font-body-md mb-8 leading-relaxed">
              Register your verified citizen identity to participate directly in local governance, log civic issues, and monitor Gram Panchayat public works in real time.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white/5 border border-white/10">
                <div className="p-1.5 rounded bg-primary-fixed/20 text-primary-fixed shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">hub</span>
                </div>
                <div>
                  <h2 className="text-title-md font-title-md text-on-primary font-semibold">Direct connection to your Gram Panchayat &amp; Ward Engineer</h2>
                  <p className="text-body-sm font-body-sm text-surface-variant mt-0.5">Complaints route automatically to jurisdictional field officers with zero intermediary friction.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white/5 border border-white/10">
                <div className="p-1.5 rounded bg-primary-fixed/20 text-primary-fixed shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">shield_person</span>
                </div>
                <div>
                  <h2 className="text-title-md font-title-md text-on-primary font-semibold">100% Identity Privacy on Public Feeds</h2>
                  <p className="text-body-sm font-body-sm text-surface-variant mt-0.5">Your personal credentials remain strictly confidential. Only anonymized community metrics appear on public registers.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white/5 border border-white/10">
                <div className="p-1.5 rounded bg-primary-fixed/20 text-primary-fixed shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">sms</span>
                </div>
                <div>
                  <h2 className="text-title-md font-title-md text-on-primary font-semibold">Real-time SMS/WhatsApp progress updates</h2>
                  <p className="text-body-sm font-body-sm text-surface-variant mt-0.5">Receive instantaneous dispatch alerts, inspect engineer logs, and track milestone resolutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between text-surface-variant text-label-sm font-label-sm">
            <span>Digital India Certified Public Stack</span>
            <span className="font-mono">Ver. 2.4.0 (ISO 27001)</span>
          </div>
        </section>

        {/* RIGHT COLUMN: Registration Form */}
        <section className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-surface-container-lowest">
          <div>
            {/* Tab Switcher */}
            <div className="flex border-b border-outline-variant/40 mb-8">
              <div className="flex-1 pb-3 text-center font-title-md text-title-md text-primary border-b-2 border-primary font-bold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                <span>Register New Citizen Account</span>
              </div>
              <Link
                to="/login"
                className="flex-1 pb-3 text-center font-title-md text-title-md text-on-surface-variant hover:text-on-surface border-b-2 border-transparent transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">login</span>
                <span>Existing Citizen Login</span>
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-headline-sm font-headline-sm text-on-surface font-bold">Create Citizen Profile</h2>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">Fill in your verifiable credentials to authenticate your jurisdiction.</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-surface-container text-primary font-medium">Step 1 of 2</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <FormField
                      label="Full Legal Name"
                      name="fullname"
                      value={formData.fullname}
                      onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                      placeholder="e.g. Ramesh Chandra Verma"
                      required
                      helperText="As stated on your official government photo ID (Aadhaar / Voter ID)."
                      icon="badge"
                    />
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-label-md font-label-md text-on-surface font-semibold mb-1">
                      Mobile Number <span className="text-error">*</span>
                    </label>
                    <div className="flex rounded-lg border border-outline-variant focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden">
                      <span className="inline-flex items-center px-3 bg-surface-container-low text-on-surface font-medium text-label-lg border-r border-outline-variant">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="98765 43210"
                        className="w-full h-11 px-3 bg-surface-container-lowest text-on-surface text-body-md border-none focus:ring-0 outline-none"
                      />
                    </div>
                    <p className="text-label-sm font-label-sm text-outline mt-1">OTP verification will be sent here.</p>
                  </div>

                  {/* Email */}
                  <div>
                    <FormField
                      label="Email Address (Optional)"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="citizen@domain.gov.in"
                      helperText="For monthly civic digest reports."
                      icon="mail"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <FormField
                      label="Account Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      icon="lock"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <FormField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                      helperText="Must match password entered on left."
                      icon="lock_reset"
                    />
                  </div>
                </div>

                {/* Jurisdictional Cascading Location Selectors */}
                <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 space-y-3">
                  <div className="flex items-center gap-2 text-primary font-semibold text-label-lg font-label-lg">
                    <span className="material-symbols-outlined text-[20px]">location_on</span>
                    <span>Jurisdictional Panchayat / Ward Mapping</span>
                  </div>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Assigns your grievances to your legitimate local council representative and ward engineer.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-label-sm font-label-sm text-on-surface font-semibold mb-1">State / UT</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-label-lg focus:border-primary outline-none"
                      >
                        <option value="UP">Uttar Pradesh</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="BR">Bihar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-label-sm font-label-sm text-on-surface font-semibold mb-1">District</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-label-lg focus:border-primary outline-none"
                      >
                        <option value="fatehpur">Fatehpur</option>
                        <option value="kanpur">Kanpur Nagar</option>
                        <option value="prayagraj">Prayagraj</option>
                        <option value="lucknow">Lucknow</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-label-sm font-label-sm text-on-surface font-semibold mb-1">Block / Tehsil</label>
                      <select
                        value={formData.tehsil}
                        onChange={(e) => setFormData({ ...formData, tehsil: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-label-lg focus:border-primary outline-none"
                      >
                        <option value="haswa">Haswa</option>
                        <option value="asothar">Asothar</option>
                        <option value="bahua">Bahua</option>
                        <option value="khajuha">Khajuha</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-label-sm font-label-sm text-on-surface font-semibold mb-1">Gram Panchayat / Urban Ward</label>
                      <select
                        value={formData.panchayat}
                        onChange={(e) => setFormData({ ...formData, panchayat: e.target.value })}
                        className="w-full h-10 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-label-lg focus:border-primary outline-none"
                      >
                        <option value="rampur">Rampur Gram Panchayat</option>
                        <option value="chak_haswa">Chak Haswa Ward 04</option>
                        <option value="bhitargaon">Bhitargaon GP</option>
                        <option value="shampur">Shampur GP</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="chk-terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                    required
                    className="mt-1 h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/30"
                  />
                  <label htmlFor="chk-terms" className="text-body-sm font-body-sm text-on-surface-variant leading-snug">
                    I agree to the <span className="text-primary font-semibold underline cursor-pointer">LokSetu Citizen Charter</span> &amp; <span className="text-primary font-semibold underline cursor-pointer">Public Governance Privacy Policy</span>. I certify that my residential jurisdiction details are true and correct.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-primary text-on-primary font-label-lg text-label-lg font-semibold hover:bg-[#104F33] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">sms</span>
                  <span>Verify Mobile &amp; Create Account</span>
                </button>
              </form>
            </div>
          </div>

          <div className="pt-6 border-t border-outline-variant/30 text-center text-body-sm font-body-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">
              Sign In to Your Account
            </Link>
          </div>
        </section>
      </div>

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}
