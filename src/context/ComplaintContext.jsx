import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_COMPLAINTS } from '../data/mockComplaints';

const ComplaintContext = createContext();

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('loksetu_complaints_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved complaints', e);
      }
    }
    return MOCK_COMPLAINTS;
  });

  useEffect(() => {
    localStorage.setItem('loksetu_complaints_data', JSON.stringify(complaints));
  }, [complaints]);

  // Add new complaint
  const addComplaint = (newComplaint) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const generatedId = `LOK-2025-UP-${randomSuffix}`;
    const timestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const fullComplaint = {
      id: generatedId,
      title: newComplaint.title || 'Untitled Grievance',
      category: newComplaint.category || 'Drinking Water Supply',
      department: newComplaint.department || 'Rural Public Utilities',
      state: newComplaint.state || 'Uttar Pradesh',
      district: newComplaint.district || 'Fatehpur',
      block: newComplaint.block || 'Haswa',
      panchayat: newComplaint.panchayat || 'Rampur Gram Panchayat',
      ward: newComplaint.ward || 'Ward 4 (Chak Haswa)',
      locationDetail: newComplaint.locationDetail || 'Near Village Center',
      gpsCoordinates: newComplaint.gpsCoordinates || '25.9281° N, 80.8124° E',
      status: 'Submitted',
      urgency: newComplaint.urgency || 'Standard Priority',
      filedDate: timestamp,
      slaTotalHours: 48,
      slaHoursRemaining: 48,
      slaDeadline: 'Within 48 Hours',
      citizenName: newComplaint.citizenName || 'Rajesh Kumar',
      citizenMasked: 'R. K. (Resident)',
      assignedOfficer: 'Er. Sandeep Patel (Junior Engineer, Jal Nigam)',
      assignedCrew: 'Sanitation Team Alpha',
      officerPhone: '+91 94150 78210',
      description: newComplaint.description || '',
      upvotes: 1,
      evidenceImages: newComplaint.evidenceImages || [
        'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80'
      ],
      resolutionEvidence: null,
      timeline: [
        {
          step: 'Grievance Registered',
          date: timestamp,
          status: 'completed',
          actor: 'Citizen (SMS Auth Verified)',
          note: 'Geo-tagged docket initialized with GPS coordinates. Reference token generated.'
        },
        {
          step: 'Jurisdictional Triage & Auto-Routing',
          date: 'Completed',
          status: 'completed',
          actor: 'Panchayat Redressal Desk',
          note: 'Docket mapped to Rampur Gram Panchayat jurisdiction.'
        }
      ]
    };

    setComplaints(prev => [fullComplaint, ...prev]);
    return fullComplaint;
  };

  // Update status and optional details (e.g. In Progress, Under Review, Resolved)
  const updateComplaintStatus = (id, newStatus, note = '', actor = 'Authority Officer', extraData = {}) => {
    const timestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updatedTimeline = c.timeline ? [...c.timeline] : [];
        updatedTimeline.push({
          step: `Status changed to ${newStatus}`,
          date: timestamp,
          status: 'completed',
          actor: actor,
          note: note || `Action recorded in Panchayati Raj grievance ledger.`
        });

        return {
          ...c,
          status: newStatus,
          resolvedDate: newStatus === 'Resolved' ? timestamp : c.resolvedDate,
          turnaround: newStatus === 'Resolved' ? 'Completed on target' : c.turnaround,
          assignedOfficer: extraData.assignedOfficer || c.assignedOfficer,
          assignedCrew: extraData.assignedCrew || c.assignedCrew,
          resolutionEvidence: extraData.resolutionEvidence || c.resolutionEvidence,
          resolutionNote: extraData.resolutionNote || c.resolutionNote,
          internalNotes: note ? [...(c.internalNotes || []), { text: note, by: actor, date: timestamp }] : c.internalNotes,
          timeline: updatedTimeline
        };
      }
      return c;
    }));
  };

  // Upvote complaint
  const upvoteComplaint = (id) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, upvotes: (c.upvotes || 0) + 1 };
      }
      return c;
    }));
  };

  // Get single complaint
  const getComplaintById = (id) => {
    return complaints.find(c => c.id === id) || null;
  };

  // Reset to initial mock data
  const resetComplaints = () => {
    setComplaints(MOCK_COMPLAINTS);
    localStorage.setItem('loksetu_complaints_data', JSON.stringify(MOCK_COMPLAINTS));
  };

  return (
    <ComplaintContext.Provider value={{
      complaints,
      addComplaint,
      updateComplaintStatus,
      upvoteComplaint,
      getComplaintById,
      resetComplaints
    }}>
      {children}
    </ComplaintContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintProvider');
  }
  return context;
}
