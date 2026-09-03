import React, { ReactNode } from 'react';

interface CrtFrameProps {
  children: ReactNode;
  deck?: ReactNode;
}

export const CrtFrame: React.FC<CrtFrameProps> = ({ children, deck }) => {
  return (
    <div className="crt-shell">
      <div className="crt-face">
        {/* Corner Screws */}
        <span className="crt-screw crt-screw-tl" aria-hidden="true" />
        <span className="crt-screw crt-screw-tr" aria-hidden="true" />
        <span className="crt-screw crt-screw-bl" aria-hidden="true" />
        <span className="crt-screw crt-screw-br" aria-hidden="true" />

        {/* Main Stage: Screen Area + Right Deck */}
        <div className="crt-stage">
          {/* CRT Screen Port */}
          <div className="crt-port">
            <div className="crt-well">
              <div className="crt-view">
                {/* CRT Screen Glare & Scanlines */}
                <div className="crt-scan" aria-hidden="true" />
                <div className="crt-glare" aria-hidden="true" />
                
                {/* Viewport Content */}
                {children}
              </div>
            </div>
          </div>

          {/* Right Control Deck (Desktop) */}
          {deck && <aside className="crt-deck">{deck}</aside>}
        </div>

        {/* Bottom Chin with Blinking Power LED */}
        <div className="crt-chin" aria-hidden="true">
          <div className="flex items-center gap-2">
            <span className="crt-led" />
            <span className="crt-etch-mute text-[10px] tracking-widest font-mono uppercase opacity-70">
              POWER / ON
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
