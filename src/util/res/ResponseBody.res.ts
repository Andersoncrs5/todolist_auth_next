export default interface ResponseBody<T>{
    url?: string
    message: string
    statusCode: number
    body: T
    success: boolean
    links: []
    timestamp: Date
}