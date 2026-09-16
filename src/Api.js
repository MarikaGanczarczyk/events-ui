import axios from "axios";

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const eventsApi = {
  // GET /events
  getAll: () => api.get("/events"),

  // GET /events/:eventtype  
  getOne: (eventtype) => api.get(`/events/${eventtype}`),

  // POST /events
  create: (newEvent) => api.post("/events", newEvent),

  // PUT /events/:id
  update: (id, payload) => api.put(`/events/${id}`, payload),

  // DELETE /events/:id
  delete: (id) => api.delete(`/events/${id}`),
};

export const attributesApi = {

    //GET /attributes
    getAll: () => api.get("/attributes"),

    //GET /attributes/:attributename
    getOne: (attributename) => api.get(`/attributes/${attributename}`),

     // POST /attributes
  create: (newAttribute) => api.post("/attributes", newAttribute),
 
  // PUT /attributes/:id
  update: (id, payload) => api.put(`/attributes/${id}`, payload),
 
  // DELETE /attributes/:id
  delete: (id) => api.delete(`/attributes/${id}`),
}
export default api;