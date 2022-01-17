import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { app } from "../app.js";
import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as questionService from "../services/questionService.js";
import { executeQuery } from "../database/database.js";

Deno.test({name: "POST request to /api/questions/answer returns a json file", async fn() {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").send('{"id": 1, "optionId": 1}').expect({status: "Faulty json file!"});
},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "POST request to /api/questions/answer with a faulty json file should return an error", async fn() {
    const testClient = await superoak(app);
    await testClient.post("/api/questions/answer").send('{"id": 1, "optionId": 1}').expect("Content-Type", new RegExp("application/json"));
},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "GET request to /api/questions/random returns status 200", async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect(200);
},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "GET request to /api/questions/random returns status a json file", async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random").expect("Content-Type", new RegExp("application/json"));
},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "GET request to / returns status 200", async fn() {
    const testClient = await superoak(app);

await testClient.get("/").expect(200);
},
sanitizeResources: false,
sanitizeOps: false,
});