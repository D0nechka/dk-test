export interface IPost {
    userId: number,
    id: number,
    title: string,
    body: string,
    user: {
        name: string
    }
}

export type PostCreationAttributes = Omit<IPost, 'user' | 'id'>