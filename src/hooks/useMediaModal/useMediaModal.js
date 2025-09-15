import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

// Hook optimizado para modal multimedia
export const useMediaModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const modalRef = useRef(null);
  const originalBodyStyle = useRef({});

  const openMedia = useCallback((mediaData) => {
    originalBodyStyle.current = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    };

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}px`;
   
    setCurrentMedia(mediaData);
    setIsModalOpen(true);
  }, []);

  const closeMedia = useCallback(() => {
    document.body.style.overflow = originalBodyStyle.current.overflow || '';
    document.body.style.paddingRight = originalBodyStyle.current.paddingRight || '';
   
    setIsModalOpen(false);
    setCurrentMedia(null);
  }, []);

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeMedia();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closeMedia]);

  useEffect(() => {
    return () => {
      if (isModalOpen) {
        document.body.style.overflow = originalBodyStyle.current.overflow || '';
        document.body.style.paddingRight = originalBodyStyle.current.paddingRight || '';
      }
    };
  }, []);

  return {
    isModalOpen,
    currentMedia,
    openMedia,
    closeMedia,
    modalRef
  };
};