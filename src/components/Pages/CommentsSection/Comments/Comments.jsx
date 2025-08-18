import React, { useState, useContext } from 'react'
import { CommentsContext } from '../../../../contexts/Comments/Comments';
import { RatingContext } from '../../../../contexts/Rating/Rating';
import { RatingStars } from '../../../Shared/RatingStars/RatingStars';

export const Comments = () => {
    //Manejar el Número de estrellas según la calificación
    const { renderStar } = useContext(RatingContext);

    // Extrae el array de comentarios y su función para actualizarlos desde el contexto
    const { 
        comments, 
        setComments 
    } = useContext(CommentsContext);
    
    // Estado para mostrar/ocultar el formulario de nuevo comentario
    const [showCommentForm, setShowCommentForm] = useState(false);

    // Estado local para manejar los datos de un nuevo comentario
    const [newComment, setNewComment] = useState({
        authorName: '', // Nombre del autor
        rating: 0,      // Calificación inicial por defecto
        text: ''        // Texto del comentario
    });

    // Función para publicar un nuevo comentario
    const handleSubmitComment = () => {
        // Verifica que el nombre y el comentario no estén vacíos
        if (newComment.authorName.trim() && newComment.text.trim()) {
            const comment = {
                id: comments.length + 1, // ID único (simplemente basado en el tamaño del array)
                authorName: newComment.authorName, // Nombre del autor
                // Iniciales del autor en mayúscula
                authorInitials: newComment.authorName.split(' ').map(n => n[0]).join('').toUpperCase(),
                date: "Ahora", // Fecha simulada
                rating: newComment.rating, // Calificación
                text: newComment.text // Texto del comentario
            };
            // Agrega el nuevo comentario al inicio de la lista
            setComments([comment, ...comments]);
            // Limpia los campos del formulario
            setNewComment({ authorName: '', rating: 5, text: '' });
            // Oculta el formulario
            setShowCommentForm(false);
        }
    };


    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-primary-first">
            {/* Título de la sección */}
            <h2 className="text-3xl font-bold text-primary-third mb-6 font-primary-brand flex items-center space-x-2">
                <span>💬</span>
                <span>Reseñas de Restaurantes</span>
            </h2>

            {/* Lista de comentarios existentes */}
            <div className="space-y-6 mb-8">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="bg-primary-fifth rounded-2xl p-6 transition-all duration-300 hover:bg-primary-fourth hover:translate-x-2 border border-primary-fourth"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-4">
                                {/* Avatar con iniciales del autor */}
                                <div className="w-14 h-14 bg-gradient-to-br from-primary-second to-primary-sixth rounded-full flex items-center justify-center text-white font-bold text-lg font-primary-brand">
                                    {comment.authorInitials}
                                </div>
                                {/* Información del autor */}
                                <div className="flex-1">
                                    <h4 className="font-bold text-primary-third text-lg font-primary-brand">
                                        {comment.authorName}
                                    </h4>
                                    <p className="text-primary-first text-sm font-primary-brand">
                                        {comment.date}
                                    </p>
                                </div>
                            </div>
                            {/* Calificación en estrellas */}
                            <div className="text-primary-second text-xl hover:scale-110 transition-transform duration-200">
                                {renderStar(comment.rating)}
                            </div>
                        </div>
                        
                        {/* Texto del comentario */}
                        <p className="text-primary-third leading-relaxed font-primary-brand">
                            "{comment.text}"
                        </p>
                    </div>
                ))}
            </div>

            {/* Botón para mostrar el formulario de agregar comentario */}
            {!showCommentForm && (
                <div className="text-center">
                    <button
                        onClick={() => setShowCommentForm(true)}
                        className="bg-primary-second hover:bg-primary-sixth text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-primary-brand flex items-center mx-auto space-x-2"
                    >
                        <span>✏️</span>
                        <span>Escribir Reseña</span>
                    </button>
                </div>
            )}

            {/* Formulario para nuevo comentario */}
            {showCommentForm && (
                <div className="mt-8 bg-primary-fifth rounded-2xl p-6 border-2 border-primary-second">
                    <h3 className="text-xl font-bold text-primary-first mb-4 font-primary-brand">
                        Agregar Nueva Reseña
                    </h3>
                    
                    <div className="space-y-4">
                        {/* Campo para el nombre del restaurante */}
                        <div>
                            <label className="block text-primary-first font-semibold mb-2 font-primary-brand">
                                Nombre del Restaurante *
                            </label>
                            <input
                                type="text"
                                value={newComment.authorName}
                                onChange={(e) => setNewComment({...newComment, authorName: e.target.value})}
                                className="w-full px-4 py-3 border border-primary-fourth rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-second focus:border-primary-second font-primary-brand"
                                placeholder="Ej: Restaurante La Mesa Verde"
                            />
                        </div>

                        {/* Campo para la calificación */}
                        <div>
                            <label className="block text-primary-first font-semibold mb-2 font-primary-brand">
                                Calificación
                            </label>
                            <div className="flex items-center space-x-2">
                                <RatingStars value={newComment.rating} onChange={e => setNewComment({...newComment, rating:e})}/>
                                <span className="ml-4 text-primary-first font-primary-brand">
                                    {newComment.rating} de 5 estrellas
                                </span>
                            </div>
                        </div>

                        {/* Campo para el texto del comentario */}
                        <div>
                            <label className="block text-primary-first font-semibold mb-2 font-primary-brand">
                                Tu Reseña *
                            </label>
                            <textarea
                                value={newComment.text}
                                onChange={(e) => setNewComment({...newComment, text: e.target.value})}
                                rows="4"
                                className="w-full px-4 py-3 border border-primary-fourth rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-second focus:border-primary-second resize-none font-primary-brand"
                                placeholder="Comparte tu experiencia con este agricultor..."
                            />
                        </div>

                        {/* Botones de acción */}
                        <div className="flex space-x-4 pt-4">
                            {/* Publicar comentario */}
                            <button
                                type="button"
                                onClick={handleSubmitComment}
                                className="flex-1 bg-primary-second hover:bg-primary-first text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-primary-brand"
                            >
                                Publicar Reseña
                            </button>
                            {/* Cancelar y limpiar formulario */}
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCommentForm(false);
                                    setNewComment({ authorName: '', rating: 5, text: '' });
                                }}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 font-primary-brand"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
