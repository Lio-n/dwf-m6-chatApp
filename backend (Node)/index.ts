import { firestore, rtdb } from "./db";
import * as express from "express";
import { json } from "body-parser";
import { v4 as uuidv4 } from "uuid";
import * as cors from "cors";

const app = express();
app.use(json());
app.use(cors());

app.post("/messages", function (req, res) {
  const chatRoomRef = rtdb.ref("/chatrooms/general/messages");
  chatRoomRef.push(req.body, () => res.json("Todo Ok"));
});

app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});
