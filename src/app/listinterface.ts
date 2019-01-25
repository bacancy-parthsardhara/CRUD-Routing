export interface Listinterface {
    id: number,
    first_name: string,
    last_name: string,
    avatar: string,

}

export interface UserDataInterface {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: Listinterface[],
    
}