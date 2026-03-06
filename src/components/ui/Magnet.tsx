import { useState, useEffect, useRef } from 'react';

interface MagnetProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: number;
  magnetStrength?: number;
}

const Magnet: React.FC<MagnetProps> = ({ children, padding = 100, magnetStrength = 2, ...props }) => {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;
      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        setPosition({ x: (e.clientX - centerX) / magnetStrength, y: (e.clientY - centerY) / magnetStrength });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, magnetStrength]);

  return (
    <div ref={magnetRef} style={{ position: 'relative', display: 'inline-block' }} {...props}>
      <div style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.5s ease-in-out' }}>
        {children}
      </div>
    </div>
  );
};

export default Magnet;
