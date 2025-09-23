import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

export const SocialMediaPreview = React.memo(({ link, onClose }) => {
  const { t, i18n } = useTranslation(["CommentsSection"])
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iframeRef = useRef(null);

  const platform = useMemo(() => {
    return link.config || EnhancedLinkDetector.platformConfig[link.platform] || {
      icon: '🔗',
      color: 'from-gray-400 to-gray-600',
      borderColor: 'border-gray-200',
      hoverColor: 'hover:from-gray-500 hover:to-gray-700',
      name: 'Link'
    };
  }, [link.config, link.platform]);

  const handleExpand = useCallback(() => {
    setIsExpanded(true);
    setIsLoading(true);
    setEmbedError(false);
    
    const comments = document.querySelector('.comments-container');
    if (comments) comments.style.pointerEvents = 'none';
    document.body.classList.add('media-modal-open');
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setIsLoading(false);
    setEmbedError(false);
    if (onClose) onClose();
    
    const comments = document.querySelector('.comments-container');
    if (comments) comments.style.pointerEvents = '';
    document.body.classList.remove('media-modal-open');
    document.body.style.overflow = '';
  }, [onClose]);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  const handleOpenExternal = useCallback(() => {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  }, [link.url]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setEmbedError(true);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isExpanded, handleClose]);

  // Vista compacta minimalista y llamativa
  if (!isExpanded) {
    return (
      <Suspense fallback={<p>Loading translate...</p>}>
      <div 
        className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r ${platform.color} p-1 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 cursor-pointer ${platform.borderColor} border-2`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleExpand}
      >
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative bg-white/95 backdrop-blur-sm rounded-xl p-4 min-h-[120px] flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Ícono animado */}
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
              <span className="text-2xl filter drop-shadow-lg">{platform.icon}</span>
            </div>
            
            {/* Información */}
            <div className="flex-1">
              <h4 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-gray-900 transition-colors">
                {t("Comments.SocialMediaPreview.subtitle")} {platform.name}
              </h4>
              <p className="text-gray-600 text-sm mb-2">
                {t("Comments.SocialMediaPreview.p")}
              </p>
              {/* Barra de progreso animada */}
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${platform.color} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}></div>
              </div>
            </div>
          </div>
          
          {/* Botón de play con animación */}
          <div className="relative">
            <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300`}>
              <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1 filter drop-shadow-sm"></div>
            </div>
            {/* Anillo pulsante */}
            {isHovered && (
              <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${platform.color} animate-ping opacity-30`}></div>
            )}
          </div>
        </div>
      </div>
      </Suspense>
    );
  }

  // Modal expandido con diseño mejorado
  const modal = (
    <Suspense fallback={<p>Loading translation...</p>}>
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      {/* Loader elegante */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 flex flex-col items-center space-y-6">
            <div className="relative">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${platform.color} animate-pulse`}></div>
              <div className={`absolute inset-2 rounded-full bg-gradient-to-r ${platform.color} animate-spin border-4 border-transparent border-t-white`}></div>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg mb-1">{t("Comments.SocialMediaPreview.Loader.p")}</p>
              <p className="text-white/70 text-sm">{t("Comments.SocialMediaPreview.Loader.p_2")} {platform.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Contenedor del modal */}
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
        {/* Header mejorado */}
        <div className={`bg-gradient-to-r ${platform.color} p-6 text-white relative overflow-hidden`}>
          {/* Patrón decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_70%)]"></div>
          </div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-xl">{platform.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">{t("Comments.SocialMediaPreview.linkDetector.title" )} {link.title}</h3>
                <p className="text-white/80 text-sm">{platform.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleOpenExternal}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-xl text-sm font-medium transition-colors duration-200"
              >
                {t("Comments.SocialMediaPreview.modal.button")}
              </button>
              <button 
                onClick={handleClose}
                className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-lg">×</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contenido del video */}
        <div className="relative bg-black" style={{ paddingBottom: '56.25%', height: 0 }}>
          {embedError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <div className={`w-24 h-24 bg-gradient-to-r ${platform.color} rounded-full flex items-center justify-center text-white mb-6 shadow-xl`}>
                <span className="text-3xl">{platform.icon}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{t("Comments.SocialMediaPreview.video_content.h3")}</h3>
              <p className="text-gray-600 text-center mb-6 max-w-md">
                {t("Comments.SocialMediaPreview.video_content.p")} {platform.name}
              </p>
              <button 
                onClick={handleOpenExternal}
                className={`px-8 py-3 bg-gradient-to-r ${platform.color} text-white rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
              >
                {t("Comments.SocialMediaPreview.video_content.button")} {platform.name}
              </button>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src={link.embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title={`{t("Comments.SocialMediaPreview.video_content.iframe.title")} ${platform.name}`}
              sandbox="allow-scripts allow-same-origin allow-presentation allow-forms"
              style={{
                border: 'none',
                outline: 'none',
                isolation: 'isolate',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity'
              }}
              loading="eager"
            />
          )}
        </div>

        {/* Footer con información */}
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <span>🔒</span>
              <span>{t("Comments.SocialMediaPreview.video_footer.span")}</span>
            </span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{t("Comments.SocialMediaPreview.video_footer.span_close")}</span>
          </div>
          <button 
            onClick={handleClose}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-700 font-medium transition-colors duration-200"
          >
            {t("Comments.SocialMediaPreview.video_footer.button_close")}
          </button>
        </div>
      </div>
    </div>
    </Suspense>
  );

  return createPortal(modal, document.body);
});





