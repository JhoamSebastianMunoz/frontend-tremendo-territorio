export const LinkDetector = {
  patterns: {
    youtube: [
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w\-_]{11})/g,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([\w\-_]{11})/g
    ],
    instagram: [
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel)\/([\w\-_]+)/g,
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/tv\/([\w\-_]+)/g
    ],
    facebook: [
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[^\/\s]+\/videos\/(\d+)/g,           // /page/videos/12345
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/watch\/\?v=(\d+)/g,                 // /watch?v=12345
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/[^\/\s]+\/posts\/(\d+)/g,           // /page/posts/12345
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/sharer\/sharer\.php\?u=([^&\s]+)/g, // sharer.php?u=...
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/share\/r\/([A-Za-z0-9_\-]+)/g         // tu ejemplo /share/r/...
    ],
    tiktok: [
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/g
    ],
    twitter: [
      /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/g
    ],
    spotify: [
      /(?:https?:\/\/)?open\.spotify\.com\/track\/([\w]+)/g
    ],
    soundcloud: [
      /(?:https?:\/\/)?soundcloud\.com\/([\w-]+)\/([\w-]+)/g
    ],
    vimeo: [
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/g
    ]
  },

  // Configuración mejorada de plataformas con colores más vibrantes
  platformConfig: {
    youtube: {
      name: 'YouTube',
      icon: '▶️',
      color: 'from-red-500 to-red-600',
      borderColor: 'border-red-200',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      embedTemplate: (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    },
    instagram: {
      name: 'Instagram',
      icon: '📷',
      color: 'from-purple-500 via-pink-500 to-orange-400',
      borderColor: 'border-pink-200',
      hoverColor: 'hover:from-purple-600 hover:via-pink-600 hover:to-orange-500',
      embedTemplate: (id) => `https://www.instagram.com/p/${id}/embed/`
    },
    facebook: {
      name: 'Facebook',
      icon: '📘',
      color: 'from-blue-500 to-blue-700',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:from-blue-600 hover:to-blue-800',
      embedTemplate: (id, url) => `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=500`
    },
    tiktok: {
      name: 'TikTok',
      icon: '🎵',
      color: 'from-black to-gray-800',
      borderColor: 'border-gray-300',
      hoverColor: 'hover:from-gray-900 hover:to-black',
      embedTemplate: (id) => `https://www.tiktok.com/embed/v2/${id}`
    },
    spotify: {
      name: 'Spotify',
      icon: '🎧',
      color: 'from-green-400 to-green-600',
      borderColor: 'border-green-200',
      hoverColor: 'hover:from-green-500 hover:to-green-700',
      embedTemplate: (id) => `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`
    },
    soundcloud: {
      name: 'SoundCloud',
      icon: '🎵',
      color: 'from-orange-400 to-orange-600',
      borderColor: 'border-orange-200',
      hoverColor: 'hover:from-orange-500 hover:to-orange-700',
      embedTemplate: (id, url) => `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=true`
    },
    vimeo: {
      name: 'Vimeo',
      icon: '🎬',
      color: 'from-blue-400 to-indigo-500',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:from-blue-500 hover:to-indigo-600',
      embedTemplate: (id) => `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`
    }
  },

  detectLinks(text) {
    const links = [];
    const processedUrls = new Set();

    Object.entries(this.patterns).forEach(([platform, patterns]) => {
      patterns.forEach(pattern => {
        const matches = [...text.matchAll(pattern)];
       
        matches.forEach(match => {
          const fullUrl = match[0];
         
          if (processedUrls.has(fullUrl)) return;
          processedUrls.add(fullUrl);

          const normalizedUrl = fullUrl.startsWith('http')
            ? fullUrl
            : `https://${fullUrl}`;

          links.push({
            platform,
            url: normalizedUrl,
            id: match[1],
            fullMatch: match[0],
            index: match.index
          });
        });
      });
    });

    return links.sort((a, b) => a.index - b.index);
  },

  processTextWithLinks(text) {
    const links = this.detectLinks(text);
   
    if (links.length === 0) {
      return { processedText: text, detectedLinks: [] };
    }

    let processedText = text;
    const detectedLinks = [];
   
    links.reverse().forEach((link) => {
      const previewData = this.getPreviewData(link.platform, link.id, link.url);
      detectedLinks.unshift(previewData);
     
      const platformConfig = this.platformConfig[link.platform];
      const marker = `[${platformConfig.icon} ${platformConfig.name.toUpperCase()}]`;
     
      processedText = processedText.substring(0, link.index) +
                    marker +
                    processedText.substring(link.index + link.fullMatch.length);
    });

    return { processedText, detectedLinks };
  },

  getEmbedUrl(platform, id, url) {
    const config = this.platformConfig[platform];
    if (!config || !config.embedTemplate) {
      return url;
    }
    try {
      return config.embedTemplate(id, url);
    } catch (error) {
      console.warn(`Error generating embed URL for ${platform}:`, error);
      return url;
    }
  },

  getPreviewData(platform, id, url) {
    const config = this.platformConfig[platform] || {
      name: 'Link',
      icon: '🔗',
      color: 'from-gray-400 to-gray-600',
      borderColor: 'border-gray-200',
      hoverColor: 'hover:from-gray-500 hover:to-gray-700'
    };

    return {
      platform,
      id,
      url,
      embedUrl: this.getEmbedUrl(platform, id, url),
      title: `Contenido de ${config.name}`,
      config,
      canEmbed: this.canEmbed(platform, url)
    };
  },

  canEmbed(platform, url) {
    if (platform === 'facebook') {
      // No bloquear automáticamente /share/ — instead attempt to normalize or mark as "needs-resolve"
      // Si URL es claramente un redirect/share, devolvemos "needsResolve" para que el backend intente resolverla
      if (url.includes('/share/') || url.includes('/l.facebook.com/') || url.includes('/sharer/sharer.php')) {
        return { embeddable: false, needsResolve: true };
      }
      // Si llega una URL de video/post clara, permitir intento de embed (pero el iframe puede aún fallar por políticas de FB)
      return { embeddable: true, needsResolve: false };
    }
    // default: embeddable true/false simple
    return { embeddable: true, needsResolve: false };
  }
};





