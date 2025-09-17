import React, { useRef, useEffect } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stars = starsRef.current;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create stars
    const createStars = () => {
      stars.length = 0;
      const numStars = 200;
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          prevX: 0,
          prevY: 0,
        });
      }
    };

    createStars();

    // Mouse movement handler
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      stars.forEach((star) => {
        // Calculate parallax effect based on mouse position
        const parallaxX = (mouseX - centerX) * (star.z / 1000) * 0.1;
        const parallaxY = (mouseY - centerY) * (star.z / 1000) * 0.1;

        star.prevX = star.x;
        star.prevY = star.y;

        star.x += parallaxX;
        star.y += parallaxY;

        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw star
        const size = (1000 - star.z) / 100;
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + star.z / 2000})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Draw trail
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 + star.z / 2000})`;
        ctx.lineWidth = size / 2;
        ctx.beginPath();
        ctx.moveTo(star.prevX, star.prevY);
        ctx.lineTo(star.x, star.y);
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        background: 'linear-gradient(to bottom, #000011, #000033)',
      }}
    />
  );
};

export default Starfield;