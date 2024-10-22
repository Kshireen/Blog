const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const swaggerDocs = require('./swagger');


dotenv.config();



connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend's URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use('/api-docs', swaggerDocs.serve, swaggerDocs.setup);
app.use(express.json());
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Blog API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});