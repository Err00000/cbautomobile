import React from 'react';

interface CBLogoProps {
  className?: string;
}

export const CBLogo: React.FC<CBLogoProps> = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-black border-2 border-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.3)] overflow-hidden ${className}`}>
      {/* Assuming the attached logo is named logo.jpg or logo.png in the public/root folder. 
          Please rename your attached file to logo.jpg if it differs. */}
      <img 
        src="logo.png" 
        alt="CB Automobile Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};