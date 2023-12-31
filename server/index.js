import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import customerRouter from "./routes/customerRouter.js";
import storeRouter from "./routes/storeRouter.js";
import storeOwnerRouter from "./routes/storeOwnerRouter.js";
import shippingCompanyRouter from "./routes/shippingCompanyRouter.js";
import itemRouter from "./routes/itemRouter.js";
import holdsRouter from "./routes/holdsRouter.js";
import warrantyRouter from "./routes/warrantyRouter.js";
import orderRouter from "./routes/orderRouter.js";
import repairRequestRouter from "./routes/repairRequestRouter.js";
import cartRouter from "./routes/cartRouter.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }))
  .use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
  .use(cors());

const PORT = parseInt(process.env.PORT) || 3001;
const CONNECTION =
  "mongodb+srv://mongo:mongodb@cluster0.ddnyu9i.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    mongoose.set('strictQuery', false),
    app.listen(PORT, () =>
      console.log(`Circuit Central server is running on port: ${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

app
  .use('/order', orderRouter)
  .use('/customer', customerRouter)
  .use('/store', storeRouter)
  .use('/storeOwner', storeOwnerRouter)
  .use('/shippingCompany', shippingCompanyRouter)
  .use('/item', itemRouter)
  .use('/hold', holdsRouter)
  .use('/warranty', warrantyRouter)
  .use('/repairRequest', repairRequestRouter)
  .use('/cart', cartRouter);

  // TODO: remove all id's from the database and replace them with _id's
