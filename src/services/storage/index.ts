import Tokens from "@/util/res/Token.res";

export default class LocalStorageService {
    private _token: string = "token"
    private _refreshToken: string = "refreshToken"

    setTokens(tokens: Tokens) {
        localStorage.setItem(this._token, tokens.token)
        localStorage.setItem(this._refreshToken, tokens.refreshToken)

        if (tokens.expirationRefreshToken) {
            localStorage.setItem("expirationRefreshToken", tokens.expirationRefreshToken.toISOString())
        }

        if (tokens.expirationToken) {
            localStorage.setItem("expirationToken", tokens.expirationToken.toISOString())
        }

    }

    getToken(): string | null {
        return localStorage.getItem(this._token)
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this._refreshToken)
    }

    clearAll() {
        localStorage.removeItem(this._refreshToken)
        localStorage.removeItem(this._token)
    }

}