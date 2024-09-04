const getMediaType = (url:any) => {
    const extension = url?.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return 'image';
    }
    if (['mp4', 'webm', 'ogg'].includes(extension)) {
      return 'video';
    }
    return 'unknown';
};

export {getMediaType};