import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg z-[101] p-6"
          >
            <div className="bg-card border shadow-2xl rounded-xl overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                <h2 className="text-lg font-bold tracking-tight uppercase">{title}</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
                  <X size={18} />
                </Button>
              </div>
              <div className="p-6">
                {children}
              </div>
              <div className="p-4 border-t bg-muted/10 flex justify-end">
                <Button onClick={onClose} size="sm">Kapat</Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Modal };
