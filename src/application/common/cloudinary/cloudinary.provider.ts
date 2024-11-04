import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () =>
    cloudinary.config({
      cloud_name: '',
      api_key: '',
      api_secret: '',
    }),
};
