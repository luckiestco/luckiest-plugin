# Get the Luckiest skills (2 minutes, no coding)

I am giving you all my Luckiest skills for free while we test. They work in
Claude web chat, Cowork, and Claude Code, all from one install.

## In Claude (web or desktop)

1. Open Claude and look in the left sidebar for **Customize**, then **Plugins**.
2. Click **Add marketplace** and paste this address:
   `https://api.luckiest.co/api/skills/marketplace.json`
3. Find **Luckiest** in the list and click **Install**.

That is it. Now type `/` or click the **+** in any chat and you will see the
skills. In Cowork they are there automatically.

## If you use Claude Code (the terminal app)

Run these two lines:

```
/plugin marketplace add https://api.luckiest.co/api/skills/marketplace.json
/plugin install luckiest@luckiest
```

## Try it

Start a new chat and type `/brainstorm`, or just say "brainstorm an idea with
me." If the skill kicks in, you are set.

Stuck on any step? Send me a screenshot and I will sort it.

---

Notes for maintainers (not for the alpha group):

- The link only works after the plugin repo is published and the server is
  deployed. Until then the marketplace will not load.
- The Claude Code command assumes the plugin resolves to `luckiest@luckiest`.
  If the plugin or marketplace name changes before publishing, update that line.
