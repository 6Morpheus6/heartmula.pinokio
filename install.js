module.exports = {
    run: [
        {
            method: "shell.run",
            params: {
                conda: {
                    path: "env",
                    python: "python=3.10"
                },
                message: [
                    "pip install -U pip",
                    "pip install -U huggingface_hub[cli]",
                    "pip install gradio pydub uvicorn[standard] websockets wsproto",
                    "if [ ! -d heartlib ]; then git clone https://github.com/HeartMuLa/heartlib.git; fi",
                    "pip install -e ./heartlib"
                ]
            }
        },
        {
            method: "script.start",
            params: {
                uri: "torch.js",
                params: {
                    venv: "env",
                    path: "app",
                    flashattention: true,
                    xformers: true,
                    triton: true,
                    sageattention: true
                }
            }
        },
        {
            method: "hf.download",
            params: {
                local_dir: "ckpt",
                models: [
                    "HeartMuLa/HeartMuLaGen",
                    "HeartMuLa/HeartMuLa-oss-3B",
                    "HeartMuLa/HeartCodec-oss"
                ]
            }
        }
    ]
}
