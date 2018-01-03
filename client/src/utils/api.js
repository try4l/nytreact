import axios from "axios";

const api = {
  // Query API
  searchNYT: function(topic, startYear, endYear) {
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231";
    return axios.get(queryURL);
  },
  // Get saved articles from database
  getArticle: function() {
    return axios.get("/api/saved");
  },
  // Save an article to database
  saveArticle: function(articleObj) {
    return axios.post("/api/saved", articleObj);
  },
  // Delete an article from the database
  deleteArticle: function(id) {
    return axios.delete(`/api/saved/${id}`);
  }
};

export default api;
