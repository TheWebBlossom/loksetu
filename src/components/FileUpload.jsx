import React, { useState } from 'react';

export default function FileUpload({ onImagesChange, maxFiles = 3 }) {
  const [previews, setPreviews] = useState([]);

  const sampleImages = [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=600&q=80'
  ];

  const handleSimulateUpload = () => {
    if (previews.length < maxFiles) {
      const nextImg = sampleImages[previews.length % sampleImages.length];
      const updated = [...previews, nextImg];
      setPreviews(updated);
      onImagesChange && onImagesChange(updated);
    }
  };

  const handleRemove = (index) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onImagesChange && onImagesChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div 
        onClick={handleSimulateUpload}
        className="border-2 border-dashed border-outline-variant hover:border-primary/60 bg-surface-container-low/40 hover:bg-surface-container-low rounded-xl p-6 text-center cursor-pointer transition-all duration-150"
      >
        <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center mx-auto mb-3">
          <span className="material-symbols-outlined text-[24px]">add_a_photo</span>
        </div>
        <p className="text-label-lg font-label-lg font-semibold text-on-surface">
          Click to Snap or Upload Geotagged Photo Evidence
        </p>
        <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
          Supports JPG, PNG up to 10MB. GPS coordinates will be extracted automatically.
        </p>
        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-surface-container text-primary text-label-sm font-label-sm font-medium">
          + Simulate Photo Evidence Attachment ({previews.length}/{maxFiles})
        </span>
      </div>

      {/* Previews Grid */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {previews.map((src, i) => (
            <div key={i} className="relative rounded-lg overflow-hidden border border-outline-variant/40 group aspect-video">
              <img src={src} alt="Evidence preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleRemove(i); }}
                  className="p-1.5 rounded-full bg-error text-on-error hover:bg-red-700 transition-colors"
                  title="Remove image"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
              <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                Geo-verified
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
