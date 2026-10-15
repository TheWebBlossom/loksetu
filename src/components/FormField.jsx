import React from 'react';

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  helperText,
  icon,
  children,
  className = ''
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-label-md font-label-md text-on-surface font-semibold" htmlFor={name}>
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      <div className="relative">
        {children ? (
          children
        ) : type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={4}
            className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full h-11 px-3.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface text-body-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        )}

        {icon && (
          <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline text-[20px] pointer-events-none">
            {icon}
          </span>
        )}
      </div>

      {error && (
        <p className="text-label-sm font-label-sm text-error mt-1 flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">error</span>
          <span>{error}</span>
        </p>
      )}

      {helperText && !error && (
        <p className="text-label-sm font-label-sm text-outline mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
