const oldElements = {
    advanced: [...document.querySelectorAll(".old-advanced")],

    coinResult: {
        h2: document.querySelector("#coin-result h2"),

        img: document.querySelector("#coin-result img"),

        parent: document.querySelector("#coin-result")
    },

    old: document.querySelector("#old"),

    oldGroup: [...document.querySelectorAll(".old-group")],

    undefeatedWinless: [...document.querySelectorAll(".old-30-03")]
}

const oldPicks = {
    async display(major) {
        let picks = await req.send(`picks?major=${major}`);
        this.group(picks.stages.find(x => x.stage === "challengers"), "challengers");
        this.group(picks.stages.find(x => x.stage === "legends"), "legends");
    },

    group(picks, stage) {
        let challengers3003 = oldElements.undefeatedWinless.find(x => x.getAttribute("stage") === stage);
        let challengersAdvanced = oldElements.advanced.find(x => x.getAttribute("stage") === stage);

        [...challengers3003.children].forEach(x => {
            let pick = x.getAttribute("pick");
            let pickInfo = picks.picks.find(y => y.pick === pick);
            let team = this.hasSpace(pickInfo.team);

            x.children[0].setAttribute("src", `images/${team}.png`);
            x.children[0].setAttribute("title", pickInfo.team);
            x.children[1].textContent = pickInfo.pick;
            this.removeClasses(x);
            if (pickInfo.correct) x.classList.add("correct")
            else x.classList.add("incorrect");
        });

        [...challengersAdvanced.children].forEach((x, i) => {
            let pickInfo = picks.picks.filter(y => y.pick === "advance");
            let team = this.hasSpace(pickInfo[i].team);

            x.children[0].setAttribute("src", `images/${team}.png`);
            x.children[0].setAttribute("title", pickInfo[i].team);
            x.children[1].textContent = pickInfo[i].pick;
            this.removeClasses(x);
            if (pickInfo[i].correct) x.classList.add("correct")
            else x.classList.add("incorrect");
        });
    },

    hasSpace(name) {
        let splitName = name.split(" ");

        if (splitName.length > 1) {
            return name.replaceAll(" ", "");
        } else {
            return name;
        }
    },

    removeClasses(e) {
        e.classList.remove("incorrect");
        e.classList.remove("correct");
    }
}