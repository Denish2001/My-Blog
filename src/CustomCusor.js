// components/CustomCursor.js
import React, { useEffect, useRef, useState } from 'react';
import './CSS/CustomCusor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);
    
    const handleLinkHoverEvents = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setIsPointer(true));
        el.addEventListener('mouseleave', () => setIsPointer(false));
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Delay to ensure DOM is ready
    setTimeout(handleLinkHoverEvents, 1000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${position.x - 10}px, ${position.y - 10}px)`;
    }
  }, [position]);

  return (
    <div 
      ref={cursorRef}
      className={`advanced-cursor ${isPointer ? 'cursor-pointer' : ''} ${isHidden ? 'cursor-hidden' : ''}`}
    >
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
    </div>
  );
};

export default CustomCursor;