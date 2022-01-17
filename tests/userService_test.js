import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import * as questionService from "../services/questionService.js";
import * as userService from "../services/userService.js";
import { executeQuery } from "../database/database.js";

Deno.test({name: "Adding a user works", async fn() {
    let count = Number((await executeQuery("SELECT COUNT(*) FROM users;")).rows[0].count);

    await userService.addUser("testuser@testmail.com", "123456789012345678901234567890123456789012345678901234567890");
    assertEquals(count + 1, Number((await executeQuery("SELECT COUNT(*) FROM users;")).rows[0].count));
    
},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "Adding a single question works", async fn() {
    let count = Number((await executeQuery("SELECT COUNT(*) FROM questions;")).rows[0].count);
    const user_id = (await executeQuery("SELECT id FROM users WHERE email = 'testuser@testmail.com';"))[0];

    await questionService.addQuestion("Title", "test", user_id);
    assertEquals(count + 1, Number((await executeQuery("SELECT COUNT(*) FROM questions;")).rows[0].count));

},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "Listing a single question works", async fn() {
    const res = await questionService.listQuestion(10)
    assertEquals(res, (await executeQuery("SELECT * FROM questions WHERE id = 10;")).rows);

},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "Removing a single question works", async fn() {
    let count = Number((await executeQuery("SELECT COUNT(*) FROM questions;")).rows[0].count);
    const question_id = Number((await executeQuery("SELECT id FROM questions WHERE question_text = 'test';")).rows[0].id);

    await questionService.removeQuestion(question_id);
    assertEquals(count - 1, Number((await executeQuery("SELECT COUNT(*) FROM questions;")).rows[0].count));

},
sanitizeResources: false,
sanitizeOps: false,
});

Deno.test({name: "Finding a user works", async fn() {
    const res = await userService.findUserByEmail("testuser@testmail.com");
    await executeQuery("DELETE FROM users WHERE email = 'testuser@testmail.com';");
    assertEquals("123456789012345678901234567890123456789012345678901234567890", res[0].password);
},
sanitizeResources: false,
sanitizeOps: false,
});





