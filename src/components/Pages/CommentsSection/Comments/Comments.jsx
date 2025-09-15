import React, { useState, useContext, useEffect, useCallback, useMemo, useRef } from 'react';
import { CommentsContext } from '../../../../contexts/Comments/Comments';
import { RatingContext } from '../../../../contexts/Rating/Rating';
import { RatingStars } from '../../../Shared/RatingStars/RatingStars';
import { SocialMediaPreview } from './SocialMediaPreview';
import { LinkDetector } from './linkDetector';
import { useMediaModal } from '../../../../hooks/useMediaModal/useMediaModal';


export const Comments = () => {
  const { renderStar } = useContext(RatingContext);
  const { comments, setComments } = useContext(CommentsContext);
  const { isModalOpen, currentMedia, openMedia, closeMedia } = useMediaModal();
   
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState({
    authorName: '',
    rating: 5,
    text: ''
  });

  const processTextWithLinks = useCallback((text) => {
    return LinkDetector.processTextWithLinks(text);
  }, []);

  const handleSubmitComment = useCallback(() => {
    if (newComment.authorName.trim() && newComment.text.trim()) {
      const { processedText, detectedLinks } = processTextWithLinks(newComment.text);
       
      const comment = {
        id: Date.now(),
        authorName: newComment.authorName,
        authorInitials: newComment.authorName.split(' ').map(n => n[0]).join('').toUpperCase(),
        date: "Ahora",
        rating: newComment.rating,
        text: newComment.text,
        processedText,
        socialLinks: detectedLinks,
        timestamp: new Date().toISOString()
      };

      setComments([comment, ...comments]);
      setNewComment({ authorName: '', rating: 5, text: '' });
      setShowCommentForm(false);
    }
  }, [newComment, comments, setComments, processTextWithLinks]);

  const handleToggleCommentForm = useCallback(() => {
    setShowCommentForm(prev => !prev);
    if (showCommentForm) {
      setNewComment({ authorName: '', rating: 5, text: '' });
    }
  }, [showCommentForm]);

  const handleCancelComment = useCallback(() => {
    setShowCommentForm(false);
    setNewComment({ authorName: '', rating: 5, text: '' });
  }, []);

  const CommentContent = React.memo(({ comment }) => {
    const { processedText, detectedLinks } = processTextWithLinks(comment.text);
   
    return (
      <div>
        <p className="text-primary-third leading-relaxed font-body mb-3">
          "{processedText}"
        </p>
       
        {detectedLinks.length > 0 && (
          <div className="space-y-3 mt-4">
            {detectedLinks.map((link, index) => (
              <SocialMediaPreview
                key={`${link.platform}-${link.id}-${index}`}
                link={link}
                onClose={closeMedia}
              />
            ))}
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-3xl font-bold text-primary-third mb-6 font-subtitle flex items-center space-x-2">
        <span>💬</span>
        <span>Reseñas sobre el usuario</span>
      </h2>
       
      <div className="space-y-6 mb-8 comments-container">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-primary-fifth rounded-2xl p-6 transition-all duration-300 hover:bg-primary-fourth hover:translate-x-2 border border-primary-fourth"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-second to-primary-sixth rounded-full flex items-center justify-center text-white font-bold text-lg font-body">
                  {comment.authorInitials}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary-third text-lg font-subtitle">
                    {comment.authorName}
                  </h4>
                  <p className="text-primary-first text-sm font-body">
                    {comment.date}
                  </p>
                </div>
              </div>
              <div className="text-primary-second text-xl hover:scale-110 transition-transform duration-200">
                {renderStar(comment.rating)}
              </div>
            </div>
           
            <CommentContent comment={comment} />
          </div>
        ))}
       
        {comments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Aún no hay reseñas
            </h3>
            <p className="text-gray-500">
              Sé el primero en compartir tu experiencia
            </p>
          </div>
        )}
      </div>

      {!showCommentForm && (
        <div className="text-center">
          <button
            onClick={handleToggleCommentForm}
            className="bg-primary-second hover:bg-primary-sixth text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-body flex items-center mx-auto space-x-2"
          >
            <span>✏️</span>
            <span>Escribir Reseña</span>
          </button>
        </div>
      )}

      {showCommentForm && (
        <div className="mt-8 bg-primary-fifth rounded-2xl p-6 border-2 border-primary-second">
          <h3 className="text-xl font-bold text-primary-first mb-4 font-body">
            Agregar Nueva Reseña
          </h3>
           
          <div className="space-y-4">
            <div>
              <label className="block text-primary-first font-semibold mb-2 font-subtitle">
                Nombre del Restaurante, Agricultor o Usuario *
              </label>
              <input
                type="text"
                value={newComment.authorName}
                onChange={(e) => setNewComment({...newComment, authorName: e.target.value})}
                className="w-full px-4 py-3 border border-primary-fourth rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-second focus:border-primary-second font-body"
                placeholder="Ej: Daniel Lopez, Restaurante La Mesa"
              />
            </div>
           
            <div>
              <label className="block text-primary-first font-semibold mb-2 font-subtitle">
                Calificación
              </label>
              <div className="flex items-center space-x-2">
                <RatingStars
                  value={newComment.rating}
                  onChange={e => setNewComment({...newComment, rating: e})}
                />
                <span className="ml-4 text-primary-first font-body">
                  {newComment.rating} de 5 estrellas
                </span>
              </div>
            </div>
           
            <div>
              <label className="block text-primary-first font-semibold mb-2 font-subtitle">
                Tu Reseña *
              </label>
              <div className="mb-2">
                <small className="text-primary-second font-body">
                  💡 Puedes incluir enlaces de YouTube, Instagram, Facebook, TikTok, Spotify, Vimeo y más
                </small>
              </div>
              <textarea
                value={newComment.text}
                onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                rows="4"
                className="w-full px-4 py-3 border border-primary-fourth rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-second focus:border-primary-second resize-none font-body"
                placeholder="Comparte tu experiencia con este agricultor... También puedes incluir enlaces de redes sociales o videos"
              />
            </div>
           
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={handleSubmitComment}
                disabled={!newComment.authorName.trim() || !newComment.text.trim()}
                className="flex-1 bg-primary-second hover:bg-primary-first text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-body disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Publicar Reseña
              </button>
              <button
                type="button"
                onClick={handleCancelComment}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 font-body"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};