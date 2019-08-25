(() => {
    class Pair {
        constructor(first, second) {
            this.first = first;
            this.second = second;
        }
    }

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
            this.stickyNoteChain = [];
            this.stickyNoteList = [];

            this.elOpMasterAppend = document.querySelector("#bc-op-master-append");
            this.elWhiteboard = document.querySelector("#bc-whiteboard");
            this.elWhiteboardChain = document.querySelector("#bc-whiteboard-chain");

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
            `.trim();

            const el = div.querySelector(".bc-sticky-note");
            this.elWhiteboard.appendChild(el);

            el.querySelector(".bc-op-sticky-note__append").addEventListener("click", () => {
                const note = new StickyNote();
                note.left = parseInt(el.style.left.slice(0, -2)) + 32;
                note.top = parseInt(el.style.top.slice(0, -2)) + 32;
                this.append(note);

                this.stickyNoteChain.push(new Pair(stickyNote.uuid, note.uuid));
                this.updateChain();
            });

            el.querySelector(".bc-sticky-note__body").addEventListener("input", () => {
                stickyNote.body = el.querySelector(".bc-sticky-note__body").value;
            });

            $(el).draggable({
                drag: () => {
                    stickyNote.left = parseInt(el.style.left.slice(0, -2));
                    stickyNote.top = parseInt(el.style.top.slice(0, -2));
                    this.updateChain();
                },
            });
        }

        updateChain() {
            let html = "";
            this.stickyNoteChain.forEach((chain) => {
                const src = this.stickyNoteList.filter(v => v.uuid === chain.first)[0];
                const dst = this.stickyNoteList.filter(v => v.uuid === chain.second)[0];
                html += `
                    <line fill="transparent"
                          stroke="orange" 
                          stroke-width="5"
                          x1="${src.left + 80}"
                          x2="${dst.left + 80}"
                          y1="${src.top + 45}"
                          y2="${dst.top + 45}"/>
                `.trim();
            });

            this.elWhiteboardChain.innerHTML = html;
        }
    }

    window.addEventListener("DOMContentLoaded", () => {
        new Main().main();
    });
})();
