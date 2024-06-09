class MyButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    button.className = "button";
    button.innerText = this.getAttribute("text") || "Default Text";

    const style = document.createElement("style");
    style.textContent = `
            .button {
                padding: 11.5px 25.5px;
                background-color: #2B59FF;
                color: white;
                border-radius: 4px;
                border: none;
                font-size: 16px;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .button:hover {
                background-color: #1A3EB1;
            }
        `;

    this.shadowRoot.append(style, button);
  }

  static get observedAttributes() {
    return ["text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "text") {
      this.shadowRoot.querySelector("button").innerText = newValue;
    }
  }
}

customElements.define("my-button", MyButton);

class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const wrapper = document.createElement("div");
    wrapper.classList.add("card-wrapper");

    const icon = this.getAttribute("icon") || "";
    const title = this.getAttribute("title") || "";
    const text = this.getAttribute("text") || "";

    wrapper.innerHTML = `
        <div class="card-content">
          <div class="card-header">
            <img src="${icon}" alt="icon">
            <p class="title">${title}</p>
          </div>
          <p class="text">${text}</p>
        </div>
      `;

    const style = document.createElement("style");
    style.textContent = `
        .card-wrapper {
          display: flex;
          flex-direction: column;
          padding: 16px;
          background-color: #ffffff;
          box-shadow: 10px 12px 27px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          height: fit-content;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .card-header {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 12px;
        }
        .card-header img {
          width: 42px;
          height: 42px;
        }
        .card-header .title {
          font-size: 20px;
          font-weight: 700;
          margin: 0; 
        }
        .card-content .text {
          font-size: 18px;
          margin: 0; 
          line-height: 32px;
        }
      `;

    this.shadowRoot.append(style, wrapper);
  }

  static get observedAttributes() {
    return ["icon", "title", "text"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateCard();
    }
  }

  updateCard() {
    const icon = this.getAttribute("icon") || "";
    const title = this.getAttribute("title") || "";
    const text = this.getAttribute("text") || "";

    const img = this.shadowRoot.querySelector(".card-header img");
    const titleElement = this.shadowRoot.querySelector(".card-header .title");
    const textElement = this.shadowRoot.querySelector(".card-content .text");

    if (img) img.src = icon;
    if (titleElement) titleElement.textContent = title;
    if (textElement) textElement.textContent = text;
  }
}

customElements.define("card-component", CardComponent);


document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const menuWrapper = document.getElementById('menu-wrapper');
    const menuClose = document.querySelector('.menu-close');
    const menu = document.querySelector('.menu');
    const action = document.querySelector('.action');

    let clonedMenu = menu.cloneNode(true);
    let clonedAction = action.cloneNode(true);

    
    menuWrapper.appendChild(clonedMenu);
    menuWrapper.appendChild(clonedAction);

    hamburger.addEventListener('click', () => {
        console.log("Toggling menu");
        if (menuWrapper.classList.contains('menu-open')) {
            menuWrapper.classList.remove('menu-open');
            setTimeout(() => { menuWrapper.style.transform = 'translateX(100%)'; }, 300); 
        } else {
            menuWrapper.style.transform = 'translateX(0%)';
            menuWrapper.classList.add('menu-open');
        }
    });

    menuClose.addEventListener('click', () => { 
        menuWrapper.classList.remove('menu-open');
        setTimeout(() => { menuWrapper.style.transform = 'translateX(100%)'; }, 300); 
    });
});
  
function animateCounter() {
    const counter = document.getElementById('count');
    const targetCount = parseInt(counter.getAttribute('data-target'), 10);  
    const duration = 20000; 
    let currentCount = 0;  

    const stepTime = Math.max(Math.floor(duration / targetCount), 1);  

    const timer = setInterval(() => {
        currentCount += Math.ceil(targetCount / (duration / 100));  
        counter.innerText = currentCount.toLocaleString('en-US');  
        if (currentCount >= targetCount) {
            clearInterval(timer);  
            counter.innerText = targetCount.toLocaleString('en-US');  
        }
    }, stepTime); 
}

window.onload = animateCounter;