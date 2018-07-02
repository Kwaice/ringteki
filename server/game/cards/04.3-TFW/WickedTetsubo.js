const DrawCard = require('../../drawcard.js');

class WickedTetsubo extends DrawCard {
    setupCardAbilities(ability) {
        this.action({
            title: 'Set Military or Political skill to 0',
            condition: context => context.source.parent.isAttacking(),
            targets: {
                character: {
                    activePromptTitle: 'Choose a defending character',
                    cardType: 'character',
                    cardCondition: card => card.isDefending()
                },
                skill: {
                    dependsOn: 'character',
                    mode: 'select',
                    activePromptTitle: 'Choose a skill to set to 0',
                    choices: {
                        'military': ability.actions.cardLastingEffect(context => ({
                            target: context.targets.character,
                            effect: ability.effects.setMilitarySkill(0)
                        })),
                        'political': ability.actions.cardLastingEffect(context => ({
                            target: context.targets.character,
                            effect: ability.effects.setPoliticalSkill(0)
                        }))
                    }
                }
            },
            effect: 'set {0}\'s {1} skill to 0',
            effectArgs: context => context.selects.skill.choice
        });
    }

    canAttach(card, context) {
        if(card.controller !== context.player) {
            return false;
        }

        return super.canAttach(card, context);
    }
}

WickedTetsubo.id = 'wicked-tetsubo';

module.exports = WickedTetsubo;
