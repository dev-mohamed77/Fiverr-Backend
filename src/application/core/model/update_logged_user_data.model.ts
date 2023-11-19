import { Gender } from '../../config/enum/gender';

export type UpdateLoggedUserData = {
  name?: string;
  gender?: Gender;
  phone?: string;
  age?: number;
  country?: string;
};
