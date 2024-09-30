'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import bananaImage from "/public/images/banana.webp";

// todo
// - [ ] add app navigation in the bottom
// - [ ] add game counter, top down is like a soccer game, whenever a banana hits it it adds the number up.
// - [ ] awhen some banan hits hadiz, we show 🎉
// - [ ] when user click on bana it removes
// - [ ] user can drag banana everywhere (we can disable auto direction moving)

export default function Home() {
  const [bananas, setBananas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const normalSize = 36;
  const textSize = { width: 90, height: 30 }; // Approximate size for the text box

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 4;

    const newBananas = Array.from({ length: 14 }, () => {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * radius;
      return {
        x: centerX + distance * Math.cos(angle) - normalSize / 2,
        y: centerY + distance * Math.sin(angle) - normalSize / 2,
        xspeed: (Math.random() * 6 - 2), // Reduced speed
        yspeed: (Math.random() * 6 - 2), // Reduced speed
        width: normalSize,
        height: normalSize,
        rotation: Math.random() * 10, // Initial rotation set to a small value
        rotationSpeed: Math.random() * 0.1 - 0.05, // Initial rotation speed set to a very small value
      };
    });
    setBananas(newBananas);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const animate = () => {
      setBananas((prevBananas) => {
        const newBananas = prevBananas.map((banana) => {
          let newX = banana.x + banana.xspeed;
          let newY = banana.y + banana.yspeed;
          let newXspeed = banana.xspeed;
          let newYspeed = banana.yspeed;
          let newRotation = banana.rotation;
          let newRotationSpeed = banana.rotationSpeed;

          // Check collision with walls
          if (newX + banana.width > window.innerWidth || newX < 0) {
            newXspeed *= -1;
            newX = newX < 0 ? 0 : window.innerWidth - banana.width;
            newRotation += 10; // Small rotation change
            newRotationSpeed = Math.random() * 0.1 - 0.05; // Small rotation speed change
          }
          
          if (newY + banana.height > window.innerHeight || newY < 0) {
            newYspeed *= -1;
            newY = newY < 0 ? 0 : window.innerHeight - banana.height;
            newRotation += 10; // Small rotation change
            newRotationSpeed = Math.random() * 0.1 - 0.05; // Small rotation speed change
          }

          // Check collision with text box
          const textX = window.innerWidth / 2 - textSize.width / 2;
          const textY = window.innerHeight / 2 - textSize.height / 2;
          if (
            newX < textX + textSize.width &&
            newX + banana.width > textX &&
            newY < textY + textSize.height &&
            newY + banana.height > textY
          ) {
            // Collision with text box detected
            if (Math.abs(newX - textX) < Math.abs(newY - textY)) {
              newYspeed *= -1;
              newY = newY < textY ? textY - banana.height : textY + textSize.height;
            } else {
              newXspeed *= -1;
              newX = newX < textX ? textX - banana.width : textX + textSize.width;
            }
            newRotation += 10; // Small rotation change
            newRotationSpeed = Math.random() * 0.1 - 0.05; // Small rotation speed change
          }

          return {
            ...banana,
            x: newX,
            y: newY,
            xspeed: newXspeed,
            yspeed: newYspeed,
            rotation: newRotation % 360,
            rotationSpeed: newRotationSpeed,
          };
        });

        // Check for collisions between bananas
        for (let i = 0; i < newBananas.length; i++) {
          for (let j = i + 1; j < newBananas.length; j++) {
            const b1 = newBananas[i];
            const b2 = newBananas[j];
            const dx = b1.x - b2.x;
            const dy = b1.y - b2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < normalSize) {
              const angle = Math.atan2(dy, dx);
              const separation = normalSize - distance;
              
              newBananas[i].x += Math.cos(angle) * separation / 2;
              newBananas[i].y += Math.sin(angle) * separation / 2;
              newBananas[j].x -= Math.cos(angle) * separation / 2;
              newBananas[j].y -= Math.sin(angle) * separation / 2;

              const temp = { x: newBananas[i].xspeed, y: newBananas[i].yspeed };
              newBananas[i].xspeed = newBananas[j].xspeed;
              newBananas[i].yspeed = newBananas[j].yspeed;
              newBananas[j].xspeed = temp.x;
              newBananas[j].yspeed = temp.y;

              newBananas[i].rotation = (newBananas[i].rotation + 10) % 360; // Small rotation change
              newBananas[j].rotation = (newBananas[j].rotation + 10) % 360; // Small rotation change

              newBananas[i].rotationSpeed = Math.random() * 0.1 - 0.05; // Small rotation speed change
              newBananas[j].rotationSpeed = Math.random() * 0.1 - 0.05; // Small rotation speed change
            }
          }
        }

        return newBananas;
      });

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isLoading]);

  const bounceTransition = {
    type: "spring",
    stiffness: 300,
    damping: 20
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#000', color: '#fff' }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
        zIndex: 10,
      }}>
        Hadiz
      </div>
      {bananas.map((banana, index) => (
        <motion.div
          key={index}
          style={{
            position: 'absolute',
            top: banana.y,
            left: banana.x,
          }}
          animate={{
            width: banana.width,
            height: banana.height,
            rotate: banana.rotation
          }}
          transition={{
            ...bounceTransition,
            rotate: {
              type: "spring",
              stiffness: 50,
              damping: 10
            }
          }}
        >
          <Image
            src={bananaImage}
            alt="Banana"
            width={banana.width}
            height={banana.height}
          />
        </motion.div>
      ))}
    </div>
  );
}
