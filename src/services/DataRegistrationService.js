import http from "../http-common";

class DataRegistrationService {
  getAll() {
    return http.get("/datasets");
  }

  get(datasetname) {
    return http.get(`/datasets/${datasetname}`);
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

  findByDatasetId(dataset_id) {
    return http.get(`/datasets?dataset_id=${dataset_id}`);
  }
}

export default new DataRegistrationService();
