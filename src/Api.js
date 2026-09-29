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
  getOne: (eventType) => api.get(`/events/${eventType}`),

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
    getOne: (attributeName) => api.get(`/attributes/${attributeName}`),

     // POST /attributes
  create: (newAttribute) => api.post("/attributes", newAttribute),
 
  // PUT /attributes/:id
  update: (id, payload) => api.put(`/attributes/${id}`, payload),
 
  // DELETE /attributes/:id
  delete: (id) => api.delete(`/attributes/${id}`),
}
export const categoriesApi = {
  //GET /categories
  getAll: ()=> api.get("/categories"), 

  // GET /categories/:category
  getOne: (category) => api.get(`/categories/${encodeURIComponent(category)}`),

  // POST /categories
  create: (newCategory) => api.post("/categories", newCategory),

  // PUT /categories/:category
  update: (category, payload) =>
    api.put(`/categories/${encodeURIComponent(category)}`, payload),

  // DELETE /categories/:category
  delete: (category) =>
    api.delete(`/categories/${encodeURIComponent(category)}`),
}
export default api;