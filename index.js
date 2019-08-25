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
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="bc-sticky-note"
                     style="top: 100px; left: 100px">
                    <button class="bc-op-sticky-note-append btn btn-light"
                            type="button">+</button>
                    <textarea class="bc-sticky-note bc-sticky-note__body form-control"></textarea>
                </div>
            `;

            const el = div.querySelector(".bc-sticky-note");
            this.elWhiteboard.appendChild(el);
            $(el).draggable();

            el.querySelector(".bc-op-sticky-note-append").addEventListener("click", () => {
                this.append();
            });
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        new Main().main();
    });
})();
