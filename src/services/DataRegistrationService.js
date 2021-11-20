import http from "../http-common";

class DataRegistrationService {
  getAll() {
    return http.get("/datasets");
  }

  get(id) {
    return http.get(`/datasets/${id}`);
  }

  create(data) {
    return http.post("/datasets", data);
  }

  update(id, data) {
    return http.put(`/datasets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/datasets/${id}`);
  }

  deleteAll() {
    return http.delete(`/datasets`);
  }

  findByUsername(username) {
    return http.get(`/datasets?username=${username}`);
  }
}

export default new DataRegistrationService();
