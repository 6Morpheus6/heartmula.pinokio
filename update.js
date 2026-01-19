module.exports = {
    run: [{
        method: "shell.run",
        params: {
            venv: "env",
            message: [
                "git pull",
                "if [ -d heartlib ]; then cd heartlib && git pull; fi",
                "pip install -e ./heartlib"
            ]
        }
    }]
}
