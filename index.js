(() => {
    class Main {
        constructor() {
        }

        main() {
            this.elOpMasterAppend = document.querySelector("#bc-op-master-append");
            this.elWhiteboard = document.querySelector("#bc-whiteboard");

            this.elOpMasterAppend.addEventListener("click", () => {
                this.append(100, 100);
            });
        }

        append(left, top) {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="bc-sticky-note"
                     style="left: ${left}px; top: ${top}px;">
                    <button class="bc-op-sticky-note-append btn btn-light"
                            type="button">+</button>
                    <textarea class="bc-sticky-note bc-sticky-note__body form-control"></textarea>
                </div>
            `;

            const el = div.querySelector(".bc-sticky-note");
            this.elWhiteboard.appendChild(el);
            $(el).draggable();

            el.querySelector(".bc-op-sticky-note-append").addEventListener("click", () => {
                this.append(parseInt(el.style.left.slice(0, -2)) + 32, parseInt(el.style.top.slice(0, -2)) + 32);
            });
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        new Main().main();
    });
})();
