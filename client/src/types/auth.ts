export class AuthClass {
  isLogged: boolean
  loginMethod: string
  sessionId: string
  constructor(isLogged: boolean = false, loginMethod: string = '', sessionId: string = '') {
    this.isLogged = isLogged
    this.loginMethod = loginMethod
    this.sessionId = sessionId
  }

  getIsLogged(): boolean {
    return this.isLogged
  }

  getLoginMethod(): string {
    return this.loginMethod
  }

  getSessionId(): string {
    return this.sessionId
  }

  static deserialize(data: AuthClass): AuthClass {
    return new AuthClass(data.isLogged, data.loginMethod, data.sessionId)
  }
}
