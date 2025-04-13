import api from "../config/api"

class UserService {
  async getUser(id) {
    const responce = await api.get(`/users/show/${id}`)
    return responce.data
  }

  async createUser(user) {
    const responce = await api.post("/users/create", user)
    return responce.data
  }
}

export default new UserService()