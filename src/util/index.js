import store from "../store/index"

export const saveToLocalUser = (user_data) => window.localStorage.setItem("USER", JSON.stringify(user_data))
export const readLocalUser = () => JSON.parse(window.localStorage.getItem("USER") || JSON.stringify(user))
export const user = {
    "id": "",
    "username": "",
    "integral": "",
    "introduce": "",
    "type": "",
    "email": ""
}