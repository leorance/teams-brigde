    const express = require("express");
    const axios = require("axios");

    const app = express();

    app.get("/run", async (req, res) => {
    const resource = req.query.resource;

    if (!resource) {
        return res.status(400).send("missing resource parameter");
    }

    try {
        const response = await axios.post(
        "https://httpbin.org/post",
        {
            resource: resource
        },
        {
            headers: {
            "Content-Type": "application/json"
            }
        }
        );

        res.json({
        status: "posted",
        sent: { resource },
        httpbin_response: response.data.json
        });

    } catch (err) {
        res.status(500).json({
        status: "failed",
        error: err.message
        });
    }
    });

    app.listen(8080, () => {
    console.log("Listening on http://localhost:8080");
    });