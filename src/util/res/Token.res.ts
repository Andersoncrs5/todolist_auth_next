export default interface Tokens {
    token: string,
    refreshToken: string,
    expirationToken: Date | undefined
    expirationRefreshToken: Date | undefined
}