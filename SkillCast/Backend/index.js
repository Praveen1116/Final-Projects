const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

const { userRouter } =  require('./routes/user');
const { adminRouter } =  require('./routes/admin');
const { courseRouter } =  require('./routes/course');

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

app.listen(3000); 