export const FullNameType = {
  required: true,
  minLength: 1,
  maxLength: 50,
}

export const FirstNameType = {
  required: true,
  pattern: /^[A-Za-z ]*$/,
  minLength: 1,
  maxLength: 50,
}

export const LastNameType = {
  required: true,
  pattern: /^[A-Za-z ]*$/,
  minLength: 1,
  maxLength: 50,
}

export const EmailType = {
  required: true,
  minLength: 4,
}

export const PasswordType = {
  required: true,
  minLength: 6,
}

export const PhoneNumberType = {
  required: true,
  minLength: 8,
  maxLength: 14,
}

export const AddressType = {
  required: true,
  maxLength: 200,
}

export const RedeemCodeType = {
  required: true,
  minLength: 5,
  maxLength: 5,
}

export const AgreementType = {
  required: true,
}