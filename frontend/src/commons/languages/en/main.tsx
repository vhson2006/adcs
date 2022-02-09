export const common = {
  validateError: 'This field is not valid',
  requiredError: 'This field is required',
}
export const menu = {
  profileMenu: 'Update Profile',
  logoutMenu: 'Logout',
  changeLanguageMenu: 'Switch Language',
  redeemMenu: 'Redeem Data',
}
export const placeholder = {
  namePlaceholder: 'Name',
  emailPlaceholder: 'Username',
  passwordPlaceholder: 'Password',
  addressPlaceholder: 'Address',
  phonePlaceholder: 'Phone Number',
  claimPlaceholder: 'Unique Code',
  firstNamePlaceholder: 'First Name',
  lastNamePlacholder: 'Last Name',
  newPasswordPlaceholder: 'New Password',
  confirmPasswordPlaceholder: 'Confirm Password',
  searchPlaceholder: 'Keyword',
}
export const label = {
  forgotPasswordLabel: 'Forgot Password?',
}
export const button = {
  searchButton: 'Search',
  saveButton: 'Save Changes',
  closeButton: 'Close',
}
export const forgotPasswordPage = {
  forgotPasswordTitle: 'Provide Your Email',
  forgotPasswordFailMessage: 'Your email is not valid',
}
export const loginPage = {
  loginFailMessage: 'Your username or password is incorrect, please try again!',
  loginText: 'Share a little community love and attract new customers to your café with Alternative Dairy Co.',
}
export const profilePage = {
  profileFailMessage: 'Update fail',
  profileSuccessMessage: 'Update sucess',
  profileInitFailMessage: 'Something went wrong',
  getQrcodeLabel: 'Get QR Code',
}
export const redeemPage = {
  claimFailMessage: 'This code is not valid',
  claimSuccessMessage: 'Claim sucess',
  logoutFailMessage: 'Something went wrong',
}
export const refereePage = {
  inviteFailMessage: 'Invite fail',
  reachOutMessage: 'This campaign is over',
  fromSectionTitle: 'FROM (YOU)',
  toSectionTitle: 'TO (YOUR MATE)',
  refereeText: 'Share a little love and shout a mate a free brew, made with Alternative Dairy Co. Almond Milk.',
  refereeTerm: 'I agree to the T&Cs',
  refereeTermMessage: 'This field is required',
  refereeConsent: 'I have the consent of my friend to send them this message from me.',
}
export const resetPasswordPage = {
  resetPasswordTitle: 'Set new password',
  resetPasswordFailMessage: 'Something went wrong',
  passwordNotMatch: 'Confirm Password and Password must match together',
}
export const reportPage = {
  reportTitle: 'Redeem List',
  fromFirstNameHeader: 'From First Name',
  fromLastNameHeader: 'From Last Name',
  toFirstNameHeader: 'To First Name',
  toLastNameHeader: 'To Last Name',
  toPhoneNumberHeader: 'To Phone Number',
  redeemCodeHeader: 'Redeem Code',
  statusHeader: 'Status',
  inviteTimeHeader: 'Invite Time',
  activeTimeHeader: 'Active Time',
  actionsHeader: 'Action',
  activeStatus: 'Redeemed',
  waitingStatus: 'Waiting to be redeemed',
  editRedeemTitle: 'Edit Redeem',
}
export const handedOutPage = {
  handOutText: 'That means your allocation is now exhausted, so please remove your POS. Thanks so much for participating. Have a brewtiful day!',
}
export default {
  ...common,
  ...menu,
  ...placeholder,
  ...label,
  ...button,
  ...forgotPasswordPage,
  ...loginPage,
  ...profilePage,
  ...redeemPage,
  ...refereePage,
  ...resetPasswordPage,
  ...reportPage,
  ...handedOutPage,
};
