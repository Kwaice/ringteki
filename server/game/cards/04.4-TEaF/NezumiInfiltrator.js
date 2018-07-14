const DrawCard = require('../../drawcard.js');

class NezumiInfiltrator extends DrawCard {
    setupCardAbilities(ability) {
        this.persistentEffect({
            match: this,
            effect: ability.effects.immuneTo({
                restricts: '',
                source: this
            })
        }),
        this.reaction({
            title: 'Change attacked province\'s strength',
            condition: () => this.game.isDuringConflict(),
            when: {
                onCharacterEntersPlay: (event, context) => event.card === context.source
            },
            max: ability.limit.perConflict(1),
            target: {
                mode: 'select',
                choices: {
                    'Raise attacked province\'s strength by 1': ability.actions.cardLastingEffect(() => ({
                        target: this.game.currentConflict.conflictProvince,
                        targetLocation: 'province',
                        effect: ability.effects.modifyProvinceStrength(1)
                    })),
                    'Lower attacked province\'s strength by 1': ability.actions.cardLastingEffect(() => ({
                        target: this.game.currentConflict.conflictProvince,
                        targetLocation: 'province',
                        effect: ability.effects.modifyProvinceStrength(-1)
                    }))
                }
            }
        });
    }
}

NezumiInfiltrator.id = 'nezumi-infiltrator';

module.exports = NezumiInfiltrator;
