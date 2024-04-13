if(process.env.NODE_ENV == "production"){
  module.exports = {mongo_uri: `mongodb+srv://${process.env.DB_USER}:${DB_PASSWORD}@blogapp.8iohzg9.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`}
}else{
  module.exports = {mongo_uri: "mongodb://localhost/blogapp"}
}