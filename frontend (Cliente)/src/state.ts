import { rtdb } from "./rtdb";
import map from "lodash/map";

const API_BASE_URL = "http://localhost:3000";

const state = {
  data: { nombre: "", messages: [] },
  listeners: [],
  init() {
    const chatroomsRef = rtdb.ref(`/chatrooms/general`);
    const currentState = this.getState();

    chatroomsRef.on("value", (snapchot) => {
      const messageFromServer = snapchot.val(); // ! Retorna Todo lo que contenga esta RUTA '/chatrooms/general'
      const messagesList = map(messageFromServer.messages); // ! Crea un ARRAY de todos los mensajes ALMACENADOS en RTDB
      currentState.messages = messagesList; // * Cada vez halla un cambio, se reemplazara ("Pisa") la info original
      this.setState(currentState);
    });
  },
  getState() {
    return this.data;
  },
  setNombre(nombre: string) {
    const currentState = this.getState();
    currentState.nombre = nombre;
    this.setState(currentState);
  },
  pushMessage(message: string) {
    const nombreDelState = this.data.nombre;
    fetch(`${API_BASE_URL}/messages`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: nombreDelState,
        message: message,
      }),
    });
  },
  setState(newState) {
    this.data = newState;
    for (const cd of this.listeners) {
      cd();
    }
    console.log("Soy el State he cambiado", this.data);
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
