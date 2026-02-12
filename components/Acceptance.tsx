import React, { useState, useRef, useEffect } from 'react';
import { Section } from './Section';
import { Button } from './Button';
import { COMPANY_INFO } from '../constants';
import { Send, Phone, Mail, MapPin, FileDown, Loader2, Eraser, PenTool, Check } from 'lucide-react';

export const Acceptance: React.FC = () => {
  const [signed, setSigned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);

  // Initialize Canvas
  useEffect(() => {
    if (signed) return; // Don't try to init canvas if signed state is showing success

    const canvas = canvasRef.current;
    if (canvas) {
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                // Save current content
                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                if (tempCtx) tempCtx.drawImage(canvas, 0, 0);

                // Resize
                canvas.width = parent.clientWidth;
                canvas.height = 160; 

                // Restore context styles
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.strokeStyle = '#000000';
                    ctx.lineWidth = 2;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    // Restore content (scaled if necessary, or just top-left)
                    // For simplicity in this demo, we might clear on resize or just accept potential loss/stretch
                    // A better approach for a simple signature pad is just to clear or keep it simple.
                    // Given this is a prototype/demo, we'll re-apply styles.
                }
            }
        };

        // Initial setup
        resizeCanvas();
        
        // Window resize listener
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }
  }, [signed]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const coords = getCoords(e, canvas);
    lastX.current = coords.x;
    lastY.current = coords.y;
    
    // Draw a single dot in case it's just a tap
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 1, 0, Math.PI * 2);
        ctx.fill();
        setIsSignatureEmpty(false);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !canvasRef.current) return;
    e.preventDefault(); // Prevent scrolling on touch

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCoords(e, canvas);
    
    ctx.beginPath();
    ctx.moveTo(lastX.current, lastY.current);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();

    lastX.current = coords.x;
    lastY.current = coords.y;
    setIsSignatureEmpty(false);
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  const getCoords = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setIsSignatureEmpty(true);
      }
    }
  };

  const handleSign = () => {
    if (!firstName.trim() || !lastName.trim() || isSignatureEmpty) return;

    setIsSubmitting(true);
    
    // Get signature data URL if needed for backend
    // const signatureData = canvasRef.current?.toDataURL(); 

    // Simulate API call to generate PDF and send email
    setTimeout(() => {
      setSigned(true);
      setIsSubmitting(false);
      // In a real application, this is where the backend would trigger the email
      console.log(`Sending proposal acceptance email to ${COMPANY_INFO.email}`);
      console.log(`Signed by: ${firstName} ${lastName}`);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isFormValid = firstName.trim().length > 0 && lastName.trim().length > 0 && !isSignatureEmpty;

  return (
    <>
      <Section id="acceptance" title="Next Steps" subtitle="Let's get the ball rolling." className="bg-slate-50 print:hidden">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-brand-900 mb-4">We're ready, are you?</h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Efficiency is our business. Let us help your business take the next step in being on time, every time.
              Please fill in your details and sign below to accept the proposal.
            </p>

            {!signed ? (
              <div className="bg-brand-50 p-8 rounded-xl border border-brand-100 max-w-lg mx-auto text-left">
                <p className="text-sm text-slate-500 mb-6 uppercase tracking-wide font-semibold border-b border-brand-200 pb-2">
                  Digital Acceptance
                </p>
                
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                                placeholder="Name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                            <input 
                                type="text" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                                placeholder="Surname"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-end mb-1">
                            <label className="block text-sm font-medium text-slate-700">Digital Signature <span className="text-red-500">*</span></label>
                            <button 
                                type="button"
                                onClick={clearSignature} 
                                className="text-xs text-brand-600 hover:text-brand-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-brand-100 transition-colors"
                            >
                                <Eraser size={14} /> Clear
                            </button>
                        </div>
                        <div className="border-2 border-slate-300 border-dashed rounded-lg bg-white overflow-hidden touch-none relative hover:border-brand-300 transition-colors">
                            {isSignatureEmpty && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400">
                                    <PenTool size={24} className="mb-2 opacity-50" />
                                    <span className="text-sm">Sign here using your mouse or finger</span>
                                </div>
                            )}
                            <canvas
                                ref={canvasRef}
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                                className="w-full h-40 cursor-crosshair block"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded border border-slate-200 text-xs text-slate-500">
                        By clicking 'Accept & Sign Proposal', I, <strong>{firstName || '...'} {lastName || '...'}</strong>, agree to the terms outlined in this proposal.
                    </div>

                    <Button 
                        size="lg" 
                        onClick={handleSign} 
                        disabled={!isFormValid || isSubmitting}
                        className="w-full shadow-lg shadow-brand-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                    >
                        {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Finalizing...
                        </>
                        ) : (
                        "Accept & Sign Proposal"
                        )}
                    </Button>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-8 rounded-xl border border-green-200 max-w-lg mx-auto animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Check size={32} />
                </div>
                <h4 className="text-xl font-bold text-green-800 mb-2">Proposal Accepted!</h4>
                <div className="text-green-700 mb-6 space-y-2 text-sm">
                  <p>
                    Thank you, <strong>{firstName} {lastName}</strong>.
                  </p>
                  <p>
                    We have successfully received your digital acceptance. A confirmation email with the signed proposal has been sent to <strong>{COMPANY_INFO.email}</strong>.
                  </p>
                  <p>
                    We will be in touch within 24 hours to schedule your onboarding.
                  </p>
                </div>
                <Button variant="outline" onClick={handlePrint} className="w-full bg-white hover:bg-green-50 text-green-700 border-green-200 shadow-sm">
                  <FileDown className="mr-2" size={18} />
                  Download/Print PDF
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-brand-900 p-8 md:p-12 text-white">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="flex flex-col items-center text-center">
                 <Mail className="mb-4 text-brand-500" size={24} />
                 <h4 className="font-semibold mb-2">Email Us</h4>
                 <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:text-white transition-colors">{COMPANY_INFO.email}</a>
               </div>
               <div className="flex flex-col items-center text-center">
                 <Phone className="mb-4 text-brand-500" size={24} />
                 <h4 className="font-semibold mb-2">Call Us</h4>
                 <div className="text-slate-300">
                   {COMPANY_INFO.phone.map(p => <div key={p}>{p}</div>)}
                 </div>
               </div>
               <div className="flex flex-col items-center text-center">
                 <MapPin className="mb-4 text-brand-500" size={24} />
                 <h4 className="font-semibold mb-2">Visit Us</h4>
                 <p className="text-slate-300 max-w-xs">{COMPANY_INFO.address}</p>
               </div>
             </div>
          </div>
        </div>
      </Section>
      
      <footer className="bg-slate-900 text-slate-500 py-8 text-center text-sm border-t border-slate-800 print:hidden">
        <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
      </footer>
    </>
  );
};