export default interface TaskModel {
    id: string
    title: string
    description: string
    done: boolean
    userId: string
    createdAt: Date
    updatedAt: Date
}