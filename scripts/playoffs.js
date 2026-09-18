const createPlayoffElements = (e, parent, content) => {
    let element = document.createElement(e);

    if (content.content) {
        element.textContent = alias(content.content);

        if (content.content === content.pick) element.classList.add("picked");

        if (content.correct) parent.classList.add("correct") 
        else parent.classList.add("incorrect");
    }

    if (content.src) {
        element.setAttribute("src", `images/${hasSpace(content.src)}.png`);
        element.setAttribute("title", content.src);
    }

    parent.appendChild(element);
}

const playoffElements = {
    parent: document.querySelector("#old .playoffs"),

    wrapper: document.querySelector("#old .playoffs .playoff-wrapper"),
}

const playoffs = {
    display(data) {
        for (let e of playoffElements.wrapper.children) {
            let game = e.getAttribute("game");
            let picks = data.picks.filter(x => x.game === game);

            let divs = [...e.children];
            for (let i = 0; i < divs.length; i++) {
                divs[i].innerHTML = "";
                createPlayoffElements("img", divs[i], { src: picks[i].team1 });
                createPlayoffElements("p", divs[i], { content: picks[i].team1, correct: picks[i].correct, pick: picks[i].pickedWinner });
                createPlayoffElements("p", divs[i], { content: "vs", correct: picks[i].correct });
                createPlayoffElements("p", divs[i], { content: picks[i].team2, correct: picks[i].correct, pick: picks[i].pickedWinner });
                createPlayoffElements("img", divs[i], { src: picks[i].team2});
            }
        }
    }
}