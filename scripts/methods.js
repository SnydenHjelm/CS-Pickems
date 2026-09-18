const alias = (name) => {
    switch (name) {
        case "Ninjas in Pyjamas":
            return "NiP";

        case "Natus Vincere":
            return "NaVi";

        case "Copenhagen Flames":
            return "CPH Flames";

        case "Into The Breach":
            return "ITB";

        case "GamerLegion":
            return "GL";

        default:
            return name;
    }
}

const coin = (value) => {
    switch (value) {
        case "bronze": return "Bronze Coin";

        case "silver": return "Silver Coin";

        case "gold": return "Gold Coin";

        case "diamond": return "Diamond Coin";
    }
}

const driver = async () => {
    await spawn.options();
    await eListeners.select();

    elements.select.addEventListener("change", eListeners.select);
}

const elements = {
    loading: document.querySelector("#loading"),

    majorName: document.querySelector("#major-name"),

    select: document.querySelector("#major")
}

const eListeners = {
    async select() {
        elements.loading.style.display = "block";
        let major = await req.send(`majors?major=${elements.select.value}`);
        elements.loading.style.display = "none";
        elements.majorName.textContent = major.name;
        update.coinResult(coin(major.coin), major.code);

        if (major.pickemFormat === "old") {
            oldPicks.display(major.code);
        }
    }
}

const hasSpace =  (name) => {
    let splitName = name.split(" ");

    if (splitName.length > 1) {
        return name.replaceAll(" ", "");
    } else {
        return name;
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

const update = {
    coinResult(h2, name) {
        oldElements.coinResult.h2.textContent = "Result: " + h2;
        oldElements.coinResult.img.setAttribute("src", `images/${name}.png`);
    }
}