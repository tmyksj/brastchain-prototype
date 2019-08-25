(() => {
    class Main {
        constructor() {
        }

        main() {
            this.elOpMasterAppend = document.querySelector("#bc-op-master-append");
            this.elWhiteboard = document.querySelector("#bc-whiteboard");

            this.elOpMasterAppend.addEventListener("click", () => {
                this.append();
            });
        }

        append() {
            const el = document.createElement("div");
            el.innerHTML = `
                <div class="bc-sticky-note"
                     style="top: 100px; left: 100px">
                    <button class="btn btn-light"
                            type="button">+</button>
                    <textarea class="bc-sticky-note bc-sticky-note__body form-control"></textarea>
                </div>
            `;

            this.elWhiteboard.appendChild(el.querySelector(".bc-sticky-note"));
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        new Main().main();
    });
})();
