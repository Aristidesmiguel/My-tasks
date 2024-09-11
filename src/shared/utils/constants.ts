
export const APP_COLOR = "#2E2938"
export const APP_SECOND_COLOR = "#B4ACF9"

export const ROUTES = {
    home: "/",
    tasks: "/tasks",
    signIn: "/sign-in",
    dashboard: "/find-task",
    editTasks: "/edit-task",
    addTasks: "/add-tasks"
}

export interface ITarefa {
    id: number
    title: string
    isSelect: boolean
    data: string
}


export enum ToastStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'waring',
    
}
