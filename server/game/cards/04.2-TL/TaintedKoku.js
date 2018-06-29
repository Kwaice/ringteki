const DrawCard = require('../../drawcard.js');

class TaintedKoku extends DrawCard {
    setupCardAbilities(ability) {
        this.interrupt({
            title: 'Move attachment to another character',
            when: {
                onCardLeavesPlay: (event, context) => event.card === context.source.parent
            },
            target: {
                cardType: 'character',
                cardCondition: (card, context) => card.controller === context.source.parent.controller,
                gameAction: ability.actions.attach(context => ({ attachment: context.source }))
            }
        });
    }
}

TaintedKoku.id = 'tainted-currency';

module.exports = TaintedKoku;
