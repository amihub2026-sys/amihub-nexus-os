const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const si = require("systeminformation");
const { execFile } = require("child_process");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("JARVIS UI connected:", socket.id);

  socket.emit("jarvis-status", {
    status: "CONNECTED",
    message: "Local system connected"
  });

  socket.on("system-info", async () => {
    try {
      const [cpu, memory, os] = await Promise.all([
        si.currentLoad(),
        si.mem(),
        si.osInfo()
      ]);

      socket.emit("system-info-result", {
        cpu: Math.round(cpu.currentLoad),
        memory: Math.round(
          ((memory.total - memory.available) / memory.total) * 100
        ),
        platform: os.platform,
        hostname: os.hostname
      });
    } catch (error) {
      socket.emit("jarvis-error", {
        message: error.message
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("JARVIS UI disconnected");
  });

  socket.on("open-app", (appName) => {

  console.log("JARVIS COMMAND: OPEN APP:", appName);

  const allowedApps = {
    chrome: "Google Chrome",
    safari: "Safari",
    vscode: "Visual Studio Code",
    calculator: "Calculator",
    terminal: "Terminal"
  };

  const key = String(appName).toLowerCase().trim();
  const macAppName = allowedApps[key];

  if (!macAppName) {
    socket.emit("command-result", {
      success: false,
      message: `App "${appName}" is not allowed`
    });

    return;
  }

  execFile("open", ["-a", macAppName], (error) => {

    if (error) {
      console.error("OPEN APP ERROR:", error);

      socket.emit("command-result", {
        success: false,
        message: `Could not open ${macAppName}`
      });

      return;
    }

    console.log("OPENED:", macAppName);

    socket.emit("command-result", {
      success: true,
      message: `${macAppName} opened`
    });
  });
});

});

server.listen(5000, "127.0.0.1", () => {
  console.log("=================================");
  console.log(" JARVIS LOCAL AGENT ONLINE");
  console.log(" http://127.0.0.1:5000");
  console.log("=================================");
});