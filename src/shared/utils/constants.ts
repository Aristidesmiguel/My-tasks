
export const APP_COLOR = "#2E2938"
export const APP_SECOND_COLOR = "#B4ACF9"

export const COLLECTION_NAME = "tasks";

//export const baseUrl = 'https://my-tasks-bay.vercel.app';

//teste

export const ROUTES = {
    home: "/",
    profile: "/profile",
    signIn: "/sign-in",
    signUp: "/sign-up",
    dashboard: "/find-task",
    editTasks: "/edit-task",
    addTasks: "/add-tasks"
}

export interface ITarefa {
    id: string
    title: string
    isSelect: boolean
    data: string
    uid?: string
}


export type ToastStatus = 'info' | 'success' | 'warning' | 'error';
