import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useComplaints } from '../context/ComplaintContext';
import { useAuth } from '../context/AuthContext';
import FormField from '../components/FormField';
import FileUpload from '../components/FileUpload';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { SERVICE_CATEGORIES } from '../data/mockComplaints';

export default function SubmitGrievancePage() {
  const { addComplaint } = useComplaints();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Drinking Water Supply',
    department: 'Jal Nigam & Rural Water Supply Mission',
    urgency: 'Standard Priority',
    description: '',
    locationDetail: '',
    ward: user?.ward || 'Ward 4 (Chak Haswa)',
    panchayat: user?.panchayat || 'Rampur Gram Panchayat',
    district: user?.district || 'Fatehpur',
    state: user?.state || 'Uttar Pradesh',
    evidenceImages: []
  });

  const [createdDocket, setCreatedDocket] = useState(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleCategorySelect = (catName) => {
    let dept = 'Rural Engineering & Public Works';
    if (catName.includes('Water')) dept = 'Jal Nigam & Rural Water Supply Mission';
    else if (catName.includes('Road')) dept = 'Public Works Department (PWD)';
    else if (catName.includes('Sanitation')) dept = 'Swachh Bharat Mission (Grameen)';
    else if (catName.includes('Power')) dept = 'Madhyanchal Vidyut Vitran Nigam';
    else if (catName.includes('Drain')) dept = 'Rural Engineering Services';

    setFormData({ ...formData, category: catName, department: dept });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setToastMsg('Please fill in the required issue title and description.');
      return;
    }

    const newDocket = addComplaint(formData);
    setCreatedDocket(newDocket);
    setSuccessModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Page Header */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-label-md font-label-md text-on-surface-variant mb-2">
          <Link to="/citizen/dashboard" className="hover:text-primary flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">account_balance</span>
            <span>Citizen Portal</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
          <span className="text-primary font-semibold">Submit a Complaint</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Citizen Grievance Registration
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Formal public lodging mechanism under the Digital Panchayati Raj Act with guaranteed redressal SLAs.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant/30 text-label-sm font-label-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
            <span>Verified Citizen: <strong className="font-semibold text-on-surface">{user?.aadharMasked || 'AADHAR-***-9021'}</strong></span>
          </div>
        </div>
      </div>

      {/* Multi-Step Stepper Header */}
      <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-4 sm:p-5 mb-8 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
          {[
            { num: 1, title: '1. Issue Details', subtitle: currentStep === 1 ? 'Active Step' : currentStep > 1 ? 'Completed' : 'Pending' },
            { num: 2, title: '2. Location & Ward', subtitle: currentStep === 2 ? 'Active Step' : currentStep > 2 ? 'Completed' : 'Pending' },
            { num: 3, title: '3. Evidence & Photos', subtitle: currentStep === 3 ? 'Active Step' : currentStep > 3 ? 'Completed' : 'Pending' },
            { num: 4, title: '4. Review & Confirmation', subtitle: currentStep === 4 ? 'Active Step' : 'Final Step' }
          ].map((s) => (
            <div key={s.num} className={`flex items-center gap-3 ${currentStep < s.num ? 'opacity-60' : ''}`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-label-lg shrink-0 ${
                currentStep === s.num
                  ? 'bg-primary-container text-on-primary ring-4 ring-primary-container/20 shadow-sm'
                  : currentStep > s.num
                  ? 'bg-secondary text-on-secondary'
                  : 'bg-surface-container-high border border-outline-variant/60 text-outline'
              }`}>
                {currentStep > s.num ? '✓' : s.num}
              </div>
              <div className="min-w-0">
                <span className={`block text-label-sm font-label-sm uppercase tracking-wider ${
                  currentStep === s.num ? 'text-primary font-bold' : 'text-outline'
                }`}>
                  {s.subtitle}
                </span>
                <p className="text-label-lg font-label-lg text-on-surface font-semibold truncate">
                  {s.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Linear Step Progress Bar */}
        <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Grievance Form Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: Issue Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  Select Grievance Category
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-0.5">
                  Your complaint will automatically route to the corresponding department engineer.
                </p>
              </div>

              {/* Category Radio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isSelected = formData.category === cat.name;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isSelected 
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs' 
                          : 'border-outline-variant/40 hover:bg-surface-container-low'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg shrink-0 overflow-hidden ${
                        isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-primary'
                      }`}>
                        <span className="material-symbols-outlined text-[20px] leading-none select-none">{cat.icon}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-title-md text-title-md font-semibold text-on-surface truncate">
                            {cat.name}
                          </h4>
                          {isSelected && (
                            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                          )}
                        </div>
                        <span className="text-label-sm font-label-sm text-outline">
                          Citizen SLA: {cat.sla}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Title Input */}
              <FormField
                label="Complaint Subject / Title"
                name="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Broken Submersible Motor & Pipeline Leakage on Main Gali"
                required
                helperText="Summarize the core failure in a single concise sentence."
                icon="title"
              />

              {/* Description */}
              <FormField
                label="Detailed Description & Community Hazard"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what occurred, how many households are affected, whether children or elders are in danger, and nearby landmarks..."
                required
                helperText="Character count: 50+ characters recommended for faster engineer triage."
              />

              {/* Urgency Level */}
              <div>
                <label className="block text-label-md font-label-md text-on-surface font-semibold mb-2">
                  Citizen Urgency Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Standard Priority', sub: 'Standard Citizen Charter SLA', val: 'Standard Priority' },
                    { label: 'High Priority', sub: 'Impacting 20+ households', val: 'High Priority' },
                    { label: 'Critical Emergency', sub: 'Direct risk to human life', val: 'Critical Emergency' }
                  ].map((u) => (
                    <div
                      key={u.val}
                      onClick={() => setFormData({ ...formData, urgency: u.val })}
                      className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                        formData.urgency === u.val
                          ? 'border-primary bg-primary-container text-on-primary font-bold shadow-xs'
                          : 'border-outline-variant/40 hover:bg-surface-container-low text-on-surface'
                      }`}
                    >
                      <div className="text-label-md font-label-md">{u.label}</div>
                      <div className={`text-[11px] ${formData.urgency === u.val ? 'text-surface-variant' : 'text-outline'}`}>
                        {u.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-label-lg hover:bg-secondary transition-all flex items-center gap-2"
                >
                  <span>Continue to Location &amp; Ward</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Location & Ward */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  Jurisdictional Location &amp; Ward Verification
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-0.5">
                  Confirm the geographic jurisdiction where this public infrastructure failure is located.
                </p>
              </div>

              {/* Auto-filled Jurisdiction Pill Card */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-primary/20 space-y-3">
                <div className="flex items-center gap-2 text-primary font-semibold text-label-lg">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                  <span>Mapped Panchayat Jurisdiction</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-body-sm">
                  <div>
                    <span className="text-label-sm text-outline block">State</span>
                    <strong className="text-on-surface font-semibold">{formData.state}</strong>
                  </div>
                  <div>
                    <span className="text-label-sm text-outline block">District</span>
                    <strong className="text-on-surface font-semibold">{formData.district}</strong>
                  </div>
                  <div>
                    <span className="text-label-sm text-outline block">Gram Panchayat</span>
                    <strong className="text-on-surface font-semibold">{formData.panchayat}</strong>
                  </div>
                  <div>
                    <span className="text-label-sm text-outline block">Ward</span>
                    <strong className="text-on-surface font-semibold">{formData.ward}</strong>
                  </div>
                </div>
              </div>

              {/* Landmark detail */}
              <FormField
                label="Exact Street Address / Nearby Landmark"
                name="locationDetail"
                value={formData.locationDetail}
                onChange={(e) => setFormData({ ...formData, locationDetail: e.target.value })}
                placeholder="e.g. Near Primary School Water Standpost, Main Gali, House #42"
                required
                helperText="Provide specific landmarks to assist field engineers and contractors in navigating directly to the site."
                icon="pin_drop"
              />

              {/* GPS Coordinates Simulation */}
              <div className="p-4 rounded-xl border border-outline-variant/40 bg-surface-container-lowest flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary-container text-on-secondary-container">
                    <span className="material-symbols-outlined text-[20px]">my_location</span>
                  </div>
                  <div>
                    <div className="text-label-md font-semibold text-on-surface">Simulated GPS Geotag Pin</div>
                    <div className="text-label-sm text-outline font-mono">25.9281° N, 80.8124° E (Accuracy ±3m)</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-label-sm bg-secondary-container text-on-secondary-container font-semibold">
                  GPS Locked
                </span>
              </div>

              <div className="flex justify-between pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface font-semibold text-label-lg hover:bg-surface-container"
                >
                  ← Back to Details
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-label-lg hover:bg-secondary transition-all flex items-center gap-2"
                >
                  <span>Continue to Evidence Photos</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Evidence & Photos */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  Attach Photo Evidence &amp; Visual Proof
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-0.5">
                  Upload images of the issue. Closed dockets will display this alongside the authority's "After" photo.
                </p>
              </div>

              <FileUpload 
                onImagesChange={(images) => setFormData({ ...formData, evidenceImages: images })}
              />

              <div className="flex justify-between pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface font-semibold text-label-lg hover:bg-surface-container"
                >
                  ← Back to Location
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-label-lg hover:bg-secondary transition-all flex items-center gap-2"
                >
                  <span>Review Docket Summary</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">
                  Docket Verification &amp; Statutory Submission
                </h3>
                <p className="text-body-sm text-on-surface-variant mt-0.5">
                  Please review the details of your grievance before generating your official tracking token.
                </p>
              </div>

              {/* Review Card */}
              <div className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
                  <span className="font-title-md text-title-md font-bold text-primary">
                    {formData.title || 'Untitled Issue'}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-label-sm font-semibold bg-surface-container text-primary">
                    {formData.category}
                  </span>
                </div>

                <p className="text-body-md text-on-surface leading-relaxed">
                  {formData.description || 'No description provided.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-label-md text-on-surface-variant border-t border-outline-variant/20">
                  <div>
                    <span className="text-outline text-label-sm block">Location</span>
                    <strong>{formData.locationDetail || 'Village Center'}, {formData.ward}</strong>
                  </div>
                  <div>
                    <span className="text-outline text-label-sm block">Department Target</span>
                    <strong>{formData.department}</strong>
                  </div>
                  <div>
                    <span className="text-outline text-label-sm block">SLA Target</span>
                    <strong className="text-primary">Within 48 Hours</strong>
                  </div>
                </div>
              </div>

              {/* Confirmation Notice */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-body-sm text-on-surface flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
                <p>
                  Upon submission, an SMS with your tracking token will be dispatched to your registered mobile number. Your complaint will appear in the Public Transparency Feed under redacted DPDP protection.
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface font-semibold text-label-lg hover:bg-surface-container"
                >
                  ← Edit Evidence
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-lg bg-primary hover:bg-[#104F33] text-on-primary font-bold text-label-lg shadow-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                  <span>Confirm &amp; Register Grievance</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={successModalOpen}
        onClose={() => { setSuccessModalOpen(false); navigate('/citizen/complaints'); }}
        title="Grievance Successfully Registered"
        subtitle="Public Redressal Docket Token Generated"
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <div>
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
              Official Reference Token
            </span>
            <div className="font-mono text-headline-sm font-bold text-primary mt-1 bg-surface-container px-3 py-1.5 rounded-lg inline-block border border-outline-variant/30">
              {createdDocket?.id || 'LOK-2025-UP-9021'}
            </div>
          </div>

          <p className="text-body-sm text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            Your complaint has been mapped to <strong>{formData.ward}</strong> and assigned to <strong>Er. Sandeep Patel (Junior Engineer)</strong>.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => { setSuccessModalOpen(false); navigate(`/citizen/complaints/${createdDocket?.id}`); }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-label-md"
            >
              Track Live Audit Rail
            </button>
            <button
              onClick={() => { setSuccessModalOpen(false); navigate('/citizen/complaints'); }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface font-semibold text-label-md"
            >
              View My Complaints
            </button>
          </div>
        </div>
      </Modal>

      <Toast message={toastMsg} onClose={() => setToastMsg('')} />
    </div>
  );
}
