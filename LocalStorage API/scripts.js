(function() {
    const bgcolorForm = document.getElementById("bgcolor");
    const fontForm = document.getElementById("font");
    const htmlElem = document.documentElement;
    const pElem = document.querySelector(".result p");

    class SettingsManager {
      setStyles() {
        const currentColor = localStorage.getItem("bgcolor");
        const currentFont = localStorage.getItem("font");

        bgcolorForm.value = currentColor || "#ffffff";
        fontForm.value = currentFont || "";

        htmlElem.style.backgroundColor = currentColor || "#ffffff";
        pElem.style.fontFamily = currentFont;
      }

      populateStorage() {
        localStorage.setItem("bgcolor", bgcolorForm.value);
        localStorage.setItem("font", fontForm.value);

        this.setStyles();

        const customEvent = new Event("customStorageChange");
        window.dispatchEvent(customEvent);
      }

      attachEventListeners() {
        bgcolorForm.addEventListener("input", () => this.populateStorage());
        fontForm.addEventListener("input", () => this.populateStorage());
      }

      init() {
        this.attachEventListeners();
        this.setStyles();

        window.addEventListener("customStorageChange", () => {
          document.querySelector(".storage").textContent = JSON.stringify(localStorage);
        });
      }
    }

    const settingsManager = new SettingsManager();
    settingsManager.init();
  })();