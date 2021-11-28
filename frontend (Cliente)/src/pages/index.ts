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
      const target = e.target as any;
      let menu = false;
      if (!menu && target.nombre.value) {
        formWarning.classList.add("remove");
        state.setNombre(target.nombre.value);
        Router.go("/chat");
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
