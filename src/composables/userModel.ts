export interface UserModel {
  id?: string
  username: string
  password: string
  email?: EmailModel
  accessToken?: string
  roles?: Array<string>
}

export interface EmailModel {
  value?: string
  verified: boolean
}

export interface PhoneNumberModel {
  value?: string
  verified: boolean
}
