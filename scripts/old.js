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
    challengers() {
        let challengers3003 = oldElements.undefeatedWinless.find(x => x.getAttribute("stage") === "challengers");
        let challengersAdvanced = oldElements.advanced.find(x => x.getAttribute("stage") === "challengers");
        //continue this headache
    },

    async display(major) {
        let picks = await req.send(`picks?major=${major}`);
        this.challengers(picks.stages.find(x => x.stage === "challengers"));
    }
}