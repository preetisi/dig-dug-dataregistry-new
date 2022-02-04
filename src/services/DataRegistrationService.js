import http from "../http-common";

class DataRegistrationService {
  getAll() {
    return http.get("/registereddatasets");
  }

  get(datasetname) {
    return http.get(`/registereddatasets/${datasetname}`);
  }

  create(data) {
    return http.post("/registereddatasets", data);
  }

  getAllUsers() {
    return http.get("/registreduser");
  }
  getAUser(emailid) {
    return http.get(`/registreduser/${emailid}`);
  }

  createUser(data) {
    return http.post("/registreduser", data);
  }

  update(id, data) {
    return http.put(`/registereddatasets/${id}`, data);
  }

  delete(id) {
    return http.delete(`/registereddatasets/${id}`);
  }

  deleteAll() {
    return http.delete(`/registereddatasets`);
  }

  findByEmailid(emailid) {
    return http.get(`/registereddatasets?emailid=${emailid}`);
  }
  findByName(name) {
    return http.get(`/registereddatasets?name=${name}`);
  }
}

export default new DataRegistrationService();
