export default interface Page<T> {
    items: T,
    pageIndex: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}