export const assets = {
  images: {
    profilePhoto: import.meta.env.VITE_PROFILE_PHOTO_URL || '/images/profile-photo.jpg',
    ogImage: import.meta.env.VITE_OG_IMAGE_URL || '/og-image.jpg',
  },
  resumes: {
    en: import.meta.env.VITE_RESUME_EN_URL || '/Resume_EN.pdf',
    pt: import.meta.env.VITE_RESUME_PT_BR_URL || '/Curriculo_PT-BR.pdf',
    fr: import.meta.env.VITE_RESUME_FR_URL || '/CV_FR.pdf',
  }
};
