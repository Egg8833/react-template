export interface LoginPayload {
  UserID: string
  UserCyph: string
}

export interface LoginResponse {
  code: string
  data: {
    loginToken: string
    verState: boolean
  }
  message: string

}

export interface TodoResponse {
  userId: number
  id: number
  title: string
  completed: boolean
}
