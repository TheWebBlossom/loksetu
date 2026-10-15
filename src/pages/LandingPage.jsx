import React from 'react';
import HeroSection from '../components/landing/HeroSection';
import StatsBar from '../components/landing/StatsBar';
import HowItWorksPreview from '../components/landing/HowItWorksPreview';
import ServiceCategories from '../components/landing/ServiceCategories';
import ResolvedGrievances from '../components/landing/ResolvedGrievances';
import CommunityImprovement from '../components/landing/CommunityImprovement';

export default function LandingPage({ 
  onOpenRegister, 
  onOpenTrack, 
  onNavigate,
  onSelectCategory 
}) {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection 
        onOpenRegister={onOpenRegister}
        onOpenTrack={onOpenTrack}
        onBrowseDirectory={() => onNavigate('directory')}
      />

      {/* 2. Sample Statistics Bar (Clearly marked as Demo Data) */}
      <StatsBar />

      {/* 3. How It Works Section */}
      <HowItWorksPreview 
        onLearnMore={() => onNavigate('how-it-works')}
        onOpenRegister={onOpenRegister}
      />

      {/* 4. Public Service Categories */}
      <ServiceCategories 
        onSelectCategory={(cat) => {
          onSelectCategory(cat);
          onNavigate('directory');
        }}
        onOpenRegister={onOpenRegister}
      />

      {/* 5. Publicly Resolved Complaint Cards */}
      <ResolvedGrievances 
        onInspectCase={(id) => onOpenTrack(id)}
        onBrowseAll={() => onNavigate('directory')}
      />

      {/* 6. Community Improvement Section */}
      <CommunityImprovement 
        onParticipate={() => onNavigate('about')}
      />
    </main>
  );
}
