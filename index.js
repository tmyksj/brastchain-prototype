(() => {
    class Uuid {
        static generate() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("").map((value) => {
                if (value === "x") {
                    return Math.floor(Math.random() * 16).toString(16);
                } else if (value === "y") {
                    return Math.floor(Math.random() * 4 + 8).toString(16);
                } else {
                    return value;
                }
            }).join("");
        }
    }

    class StickyNote {
        constructor() {
            this.uuid = Uuid.generate();
            this.body = "";
            this.left = 100;
            this.top = 100;
        }
    }

    class Main {
        constructor() {
        }

        main() {
            this.stickyNoteList = [];

            this.elOpMasterAppend = document.querySelector("#bc-op-master-append");
            this.elWhiteboard = document.querySelector("#bc-whiteboard");

            this.elOpMasterAppend.addEventListener("click", () => {
                this.append(new StickyNote());
            });
        }

        append(stickyNote) {
            this.stickyNoteList.push(stickyNote);

            const div = document.createElement("div");
            div.innerHTML = `
                <div class="bc-sticky-note"
                     id="${stickyNote.uuid}"
                     style="left: ${stickyNote.left}px; top: ${stickyNote.top}px;">
                    <button class="bc-op-sticky-note__append btn btn-light"
                            type="button">+</button>
                    <textarea class="bc-sticky-note__body form-control">${stickyNote.body}</textarea>
                </div>
            `;

            const el = div.querySelector(".bc-sticky-note");
            this.elWhiteboard.appendChild(el);

            el.querySelector(".bc-op-sticky-note__append").addEventListener("click", () => {
                const note = new StickyNote();
                note.left = parseInt(el.style.left.slice(0, -2)) + 32;
                note.top = parseInt(el.style.top.slice(0, -2)) + 32;
                this.append(note);
            });

            el.querySelector(".bc-sticky-note__body").addEventListener("input", () => {
                stickyNote.body = el.querySelector(".bc-sticky-note__body").value;
            });

            $(el).draggable({
                drag: () => {
                    stickyNote.left = parseInt(el.style.left.slice(0, -2));
                    stickyNote.top = parseInt(el.style.top.slice(0, -2));
                },
            });
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        new Main().main();
    });
})();
