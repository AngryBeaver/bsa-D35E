export class D35E implements SystemApi {

    get version() {
        return 2;
    }

    get id() {
        return "D35E";
    }

    async actorRollSkill(actor, skillId) {
        const roll = await actor.rollSkill(skillId);
        return roll[0];
    }

    async actorRollAbility(actor, abilityId) {
        const roll = await actor.rollAbilityTest(abilityId);
        return roll[0];
    }

    actorCurrenciesGet(actor): Currencies {
        return actor["system"].currency;
    }

    async actorCurrenciesStore(actor, currencies: Currencies): Promise<void> {
        await actor.update({system: {currency: currencies}});
    }

    actorSheetAddTab(sheet, html, actor, tabData: { id: string, label: string, html: string }, tabBody: string): void {
        const tabs = $(html).find('nav[data-group="primary"]');
        const tabItem = $('<a class="item" data-tab="' + tabData.id + '" title="' + tabData.label + '">' + tabData.html + '</a>');
        tabs.append(tabItem);
        const body = $(html).find(".primary-body");
        const tabContent = $('<div class="tab" data-group="primary" data-tab="' + tabData.id + '"></div>');
        body.append(tabContent);
        tabContent.append(tabBody);
        if (!sheet._tabs?.[0] ) {
            sheet.options.tabs = [{navSelector: ".tabs", contentSelector: ".primary-body", initial: "details"}];
            sheet._tabs = sheet._createTabHandlers();
        }
    }

    itemSheetReplaceContent(app, html, element): void {
        const sheetBody = html.find('.sheet-content');
        app.saveMCEContent = async function (data = null) {

        }
        sheetBody.css("overflow", "hidden")
        sheetBody.css("min-height", "inherit");
        sheetBody.css("height", "inherit");
        sheetBody.empty();
        sheetBody.append(element);
    }

    get configSkills(): SkillConfig[] {
        return Object.entries(CONFIG["D35E"].skills)
            .map(skills => {
                // @ts-ignore
                return {id: skills[0], label: skills[1] as string};
            })
    }

    get configAbilities(): AbilityConfig[] {
        return Object.entries(CONFIG["D35E"].abilities).map(ab => {
            return {id: ab[0], label: ab[1] as string};
        });
    }

    get configCurrencies(): CurrencyConfig[] {
        return [
            {
                id: "pp",
                factor: 1000,
                label: "PP"
            },
            {
                id: "gp",
                factor: 100,
                label: "GP"
            },
            {
                id: "sp",
                factor: 10,
                label: "SP"
            },
            {
                id: "cp",
                factor: 1,
                label: "CP"
            }
        ]
    }

    get configCanRollAbility(): boolean {
        return true;
    }

    get configLootItemType(): string {
        return "loot";
    }

    get itemPriceAttribute(): string {
        return "system.price";
    }

    get itemQuantityAttribute(): string {
        return "system.quantity";
    }

}