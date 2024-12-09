# uptain Fullstack Coding Challenge, from 09.12.2024

Seems like you're trying out for a position at [Uptain](https://uptain.de) or you've found this and would like to apply. Fork this repo and go at it ;)
Make sure you are targeting a branch *R20241209*.

### Challenge

Here is a deal: we want to see how you can do a design of an extensible solution capable of supporting multiple integrations — each with unique configuration, while allowing a single action to be executed across all of them. We’re especially interested in how you structure your code in a way to easily add new integrations in the future without needing to modify existing code paths.

### Overview

The idea behind is simple - you have a list of items, and a user can CRUD them. For any of item user can also execute an "action".
Behind the scene there are integrations that do very specific actions against the item used for "action" execution.
Each integration must have it's own configuration (credentials, urls, secrets, whatever), support one or multiple actions, and finally run some logic.
When action is executed it can be that multiple integrations should run at once for same action if they both support it.

*Context Note:*
You can also think about this as "I do create a user in my database, and I must notify this event to all configured email providers, webhooks and 3rd party integrations", but it is simplified for this challenge.

### The Scenario

Imagine you have a set of "Items" stored in a database. You need to build a small application that:

1. **Manages Items:**  
   - Create, read, and list items from a database (PostgreSQL, MySQL, or SQLite are all fine).
   - Keep it simple—fields like `id`, `name`, and `description` are sufficient.
   
2. **Integrations and a Single Action:**  
   You must support a variety of integrations that can all respond to a single action. For example, you might have:
   - An integration that sends an email about the item.
   - Another integration that logs item details to an external system.
  
   Let's say actions are:
   - OnItemCreated
   - SynchronizeItem
   - Feel free to add more
   
   The key requirements:
   - You should be able to easily add new integrations without having to rewrite or extensively modify existing code.
   - Each integration will have its own configuration (which might differ per integration).
   - When you trigger a single action (e.g. `POST /items/:id/execute`), the system should execute the corresponding action across **all configured integrations** that *support* that action.
   - The system should validate configuration correctness before executing the action.
   
4. **Frontend:**  
   Build a simple React (TypeScript) frontend that:
   - Lists all items.
   - Lets you create new items.
   - Allows you to pick an item and trigger the action (like two examples before) that involves all integrations.
   - Displays the result of that triggered action (e.g., a success message or the outcome returned by the server).

### What We Expect

- **Backend**: Implemented in TypeScript using Node.js (NestJS or Express).
- **Frontend**: Implemented in TypeScript using React.
- **Database**: Use any SQL database you are comfortable with. If time permits, you can add migrations or a dockerized DB setup.
- **Architecture**: The primary challenge is to design the backend architecture so it's easy to add new integrations:
  - Show how you structure code so multiple integrations can coexist and be extended.
  - Consider how configuration and execution are orchestrated without needing to modify existing integrations.
  - Document your approach briefly in a `README` or code comments.
- **Testing**: Include a few tests (at least for the backend) to demonstrate how you’d verify the logic or architecture. (Jest or similar)

### Time Limit

You should be able to implement a workable solution within approximately six hours, assuming familiarity with the chosen technologies.

---

We’re looking forward to seeing how you approach this problem and your solution. gl&hf!

