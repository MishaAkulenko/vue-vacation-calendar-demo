import request from "./request";

export default {
    get_users_list(params) {
        return request('/users', params)
    },
    send_selected_vacation(params) {
        return request('/save_vacation', params)
    },
}
