const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));

// Configurar Multer para manejar archivos
const upload = multer({ storage: multer.memoryStorage() });

// Página principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Ruta para subir archivos
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.json({ error: "No se ha subido ningún archivo" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
