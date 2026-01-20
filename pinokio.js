module.exports = {
  version: "3.7",
  title: "HeartMuLa (HeartMuLaGen)",
  description: "Pinokio wrapper: installs HeartMuLa heartlib + downloads checkpoints + launches a Gradio UI for music generation.",

  menu: async (kernel, info) => {
    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.json"),
      start: info.running("start.json"),
      update: info.running("update.json"),
      reset: info.running("reset.json"),
      hardreset: info.running("hard_reset.json")
    }
    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.json",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.json")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.json",
          }]
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.json",
          }]
        }
      } else if (running.update) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Updating",
          href: "update.json",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Resetting",
          href: "reset.json",
        }]
      } else if (running.hardreset) {
        return [{
          default: true,
          icon: 'fa-solid fa-terminal',
          text: "Hard Resetting…",
          href: "hard_reset.json",
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.json",
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.json",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.json",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset (keeps /ckpt)",
          href: "reset.json",
          confirm: "Are you sure you wish to reset the app?"
        }, {
          icon: "fa-solid fa-trash",
          text: "Hard Reset (deletes /ckpt)",
          href: "hard_reset.json",
          confirm: "Are you sure you wish to hard reset the app?"
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.json",
      }]
    }
  }
}
