// Funktion zum Anwenden von Gift auf eine Waffe
async function applyPoisonToWeapon(token, weaponName, poisonName) {
  // Suche nach der Waffe im Inventar des Tokens
  const weapon = token.actor.items.find(i => i.name === weaponName && i.type === "weapon");
  if (!weapon) {
    ui.notifications.error(`Die Waffe ${weaponName} wurde nicht im Inventar des Tokens gefunden.`);
    return;
  }

  // Suche nach dem Gift im Inventar des Tokens
  const poison = token.actor.items.find(i => i.name === poisonName && i.type === "consumable");
  if (!poison) {
    ui.notifications.error(`Das Gift ${poisonName} wurde nicht im Inventar des Tokens gefunden.`);
    return;
  }

  // Entferne das Gift aus dem Inventar des Tokens
  await poison.delete();

  // Füge die Bedingung hinzu
  await token.addCondition(`${poisonName} auf ${weaponName}`, {icon: "icons/svg/poison.svg"});
  ui.notifications.info(`Das Gift ${poisonName} wurde erfolgreich auf ${weaponName} angewendet.`);
}

// Funktion zum Erstellen des Buttons
function createPoisonButton() {
  // Überprüfen, ob ein Token ausgewählt ist
  const token = canvas.tokens.controlled[0];
  if (!token) {
    ui.notifications.error("Es wurde kein Token ausgewählt.");
    return;
  }

  // Erstellen des Fensters zur Auswahl der Waffe
  let weaponChoices = {};
  for (let item of token.actor.items) {
    if (item.type === "weapon") {
      weaponChoices[item.name] = item.name;
    }
  }
  new Dialog({
    title: "Waffe auswählen",
    content: `
      <div>
        <p>Wähle die Waffe aus, auf die das Gift aufgetragen werden soll:</p>
        <div class="form-group">
          <label>Waffe:</label>
          <select id="weapon-select" name="weapon">
            ${Object.entries(weaponChoices).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}
          </select>
        </div>
      </div>
    `,
    buttons: {
      ok: {
        label: "OK",
        callback: async (html) => {
          const weaponName = html.find("#weapon-select")[0].value;

          // Erstellen des Fensters zur Auswahl des Gifts
          let poisonChoices = {};
          for (let item of token.actor.items) {
            if (item.type === "consumable" && item.data.consumableType.value === "poison") {
              poisonChoices[item.name] = item.name;
            }
          }
          new Dialog({
            title: "Gift auswählen",
            content: `
              <div>
                <p>Wähle das Gift aus, das auf ${weaponName} aufgetragen werden soll:</p>
                <div class="form-group">
                  <label>Gift:</label>
                  <select id="poison-select" name="poison">
                    ${Object.entries(poisonChoices).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}
                  </select>
                </div>
              </div>
            `,
            buttons: {
              ok: {
                label: "OK",
                callback: async (html) => {
                  const poisonName
  }).render(true);
}
// Hinzufügen des Buttons zum Kontextmenü des Tokens
Hooks.on("getSceneControlButtons", controls => {
controls[4].tools.push({
name: "applyPoison",
title: "Gift auftragen",
icon: "fas fa-vial",
visible: true,
onClick: createPoisonButton,
button: true
  });
});
