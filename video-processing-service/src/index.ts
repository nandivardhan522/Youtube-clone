import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video",(req,res)=>{
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;
    console.log("Received payload:", req.body);
    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad Request: Missing file path.");
      }

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360") // 360p
    .on("end", () => {
      res.status(200).send("Processing Finished successfully.");
    })
    .on("error", (err) => {
      console.error(`An error occurred: ${err.message}`);
      res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Video processing service is listening at http://localhost:${port}`);
});
