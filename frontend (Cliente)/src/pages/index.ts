import { Router } from "@vaadin/router";
import { state } from "../state";
import "../components/form/form";

class Home extends HTMLElement {
  connectedCallback() {
    this.render();
    const shadowRoot = document.querySelector("custom-form").shadowRoot;
    const form = shadowRoot.querySelector(".form");
    const input = form.querySelector("input");
    const formWarning = form.querySelector(".form__warning");

    input.setAttribute("placeholder", "Ingresar Nombre..");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const { nombre } = e.target as any;
      let menu = false;
      if (!menu && nombre.value) {
        formWarning.classList.add("remove");
        state.setNombre(nombre.value); // ! Envio la data al STATE
        Router.go("/chat"); // ! Cambio de RUTA
        menu = true;
      } else {
        formWarning.classList.add("open");
        input.style.border = "3px solid #e60026";
        menu = false;
      }
    });
  }
  render() {
    this.innerHTML = `
      <h1 class="title">Bienvenidos</h1>
      <custom-form label="Tu nombre" btn="Comenzar" input="nombre"> </custom-form>
    `;
  }
}

customElements.define("home-page", Home);
