export enum EndPoint {
  // Global
  id = ':id',

  // Auth
  authPrefix = 'auth',
  signIn = 'signin',
  signUp = 'signup',
  registerByGoogle = 'register-by-google',
  forgetPassword = 'forget-password',
  verifyPassResetCode = 'verify-reset-code',
  resetPassword = 'reset-password',

  // user
  userPrefix = 'users',
  getMe = 'get-me',
  changePasswordLoggedUser = 'change-password',
  updateLoggedUser = 'update-user',
  deleteLoggedUser = 'delete-user',

  // seller
  sellerPrefix = 'seller',
  createSellerLoggedUser = 'create-seller',
  getSellerByIdLoggedUser = 'get-seller',
  getSellerByUserIdLoggedUser = 'get-seller-by-user-id',
  updateSellerByIdLoggedUser = 'update-seller',

  // language
  languagePrefix = 'languages',

  // occupation
  occupationPrefix = 'occupations',

  // Skills
  skillsPrefix = 'skills',

  // Gig
  gigPrefix = 'gigs',
  // GigSeller
  gigsSellerPrefix = 'gigs-seller',

  // GigCategory
  gigCategoryPrefix = 'gigs-category',

  // Gig SubCategory
  gigSubCategoryPrefix = 'gigs-sub-category',

  // Gig Tag
  gigSTagPrefix = 'gig-tag',

  // tags
  subCategories = 'sub-categories',

  // createGigLoggedUser = 'create-gig',
  // getGigByIdLoggedUser = 'get-gig',
  // updateGigByIdLoggedUser = 'update-gig',
  // deleteGigByIdLoggedUser = 'delete-gig',
  // getGigsBySellerIdLoggedUser = 'get-gig-by-seller-id',
  // getGigsByBuyerIdLoggedUser = 'get-gig-by-buyer-id',
  // getGigsByBuyerIdAndSellerIdLoggedUser = 'get-gig-by-buyer-id-and-seller-id',
  // getGigsByBuyerIdAndSellerIdAndStatusLoggedUser = 'get-gig-by-buyer-id-and-seller-id-and-status',
}
