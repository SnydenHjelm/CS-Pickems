const driver = async () => {
    await spawn.options();
    await eListeners.select();

    elements.select.addEventListener("change", eListeners.select);
}

const elements = {
    majorName: document.querySelector("#major-name"),

    select: document.querySelector("#major")
}

const eListeners = {
    async select() {
        let major = await req.send(`majors?major=${elements.select.value}`);
        elements.majorName.textContent = major.name;
    }
}

const req = {
    async send(path) {
        try {
            let resp = await fetch(`http://localhost:8000/${path}`);
            return await resp.json();
        } catch(e) {
            console.log(e.message);
        }
    }
}

const spawn = {
    async options() {
        let majors = await req.send("majors");

        majors.forEach(x => {
            let opt = document.createElement("option");
            opt.setAttribute("value", x.code);
            opt.textContent = x.name;
            elements.select.appendChild(opt);
        });
    }
}