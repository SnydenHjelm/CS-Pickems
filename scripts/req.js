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