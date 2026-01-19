module.exports = {
  version: "3.0",
  title: "HeartMuLa (HeartMuLaGen)",
  description: "Pinokio wrapper: installs HeartMuLa heartlib + downloads checkpoints + launches a Gradio UI for music generation.",

  menu: async (kernel, info) => {
    const installed = info.exists("env") && info.exists("ckpt");
    const running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      reset: info.running("reset.js")
    };
    const local = info.local("start.js");

    if (running.install) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Installing…",
        href: "install.js"
      }];
    }

    if (!installed) {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js"
      }];
    }

    return [
      {
        icon: "fa-solid fa-rocket",
        text: running.start ? "Running…" : "Start",
        href: "start.js"
      },
      ...(local && local.url ? [{
        icon: "fa-solid fa-rocket",
        text: "Open UI",
        href: local.url
      }] : []),
      {
        icon: "fa-solid fa-plug",
        text: running.reset ? "Updating…" : "Update",
        href: "update.js"
      },
      {
        icon: "fa-solid fa-trash",
        text: running.reset ? "Resetting…" : "Reset (keeps /ckpt)",
        href: "reset.js"
      },
      {
        icon: "fa-solid fa-trash",
        text: running.reset ? "Hard Resetting…" : "Hard Reset (deletes /ckpt)",
        href: "hard_reset.js"
      }
    ];
  }
};
