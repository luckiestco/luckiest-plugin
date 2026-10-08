// Run: node --test packages/luckiest-plugin/bin/skill-names.test.js
// Plugin skills show as /luckiest:<name>, where <name> is the SKILL.md frontmatter
// name. Two skills with one name, or a skill named like a command, would shadow
// each other in the slash menu.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function skillNames(dir) {
  return fs.readdirSync(path.join(dir, 'skills')).flatMap((folder) => {
    const file = path.join(dir, 'skills', folder, 'SKILL.md');
    if (!fs.existsSync(file)) return [];
    const front = fs.readFileSync(file, 'utf8').split(/^---$/m)[1] || '';
    const name = (front.match(/^name:\s*(.+)$/m) || [])[1];
    const hidden = /^user-invocable:\s*false\s*$/m.test(front);
    return [{ folder, name: name && name.trim(), hidden }];
  });
}

function problems(skills, commands) {
  const out = [];
  const seen = new Map();
  for (const s of skills) {
    if (!s.name) out.push(`${s.folder}: no name`);
    else if (seen.has(s.name)) out.push(`${s.folder}: name ${s.name} also used by ${seen.get(s.name)}`);
    else seen.set(s.name, s.folder);
    if (s.name && !s.hidden && commands.includes(s.name)) out.push(`${s.folder}: name ${s.name} clashes with a command`);
  }
  return out;
}

test('every plugin skill has a unique name that no visible skill shares with a command', () => {
  const dir = path.join(root, 'commands');
  const commands = fs.existsSync(dir) ? fs.readdirSync(dir).map((f) => f.replace(/\.md$/, '')) : [];
  assert.deepStrictEqual(problems(skillNames(root), commands), []);
});

test('the check catches a duplicate name and a visible skill named like a command', () => {
  const found = problems(
    [
      { folder: 'luckiest-ads', name: 'ads', hidden: false },
      { folder: 'ads', name: 'ads', hidden: false },
      { folder: 'luckiest-plan', name: 'plan', hidden: false },
      { folder: 'luckiest-go', name: 'go', hidden: true },
    ],
    ['plan', 'go'],
  );
  assert.strictEqual(found.length, 2);
});
