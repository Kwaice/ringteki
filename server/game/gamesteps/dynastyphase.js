const _ = require('underscore');

const Phase = require('./phase.js');
const SimpleStep = require('./simplestep.js');
const DynastyActionWindow = require('./dynasty/dynastyactionwindow.js');
const { Locations, Phases } = require('../Constants');

/*
I Dynasty Phase
1.1 Dynasty phase begins.
1.2 Reveal facedown dynasty cards.
1.3 Collect fate.
1.4 SPECIAL ACTION WINDOW
    Players alternate playing cards from
    provinces and/or triggering Action abilities.
1.5 Dynasty phase ends.
 */

class DynastyPhase extends Phase {
    constructor(game) {
        super(game, Phases.Dynasty);
        this.initialise([
            new SimpleStep(game, () => this.beginDynasty()),
            new SimpleStep(game, () => this.flipDynastyCards()),
            new SimpleStep(game, () => this.collectFate()),
            new SimpleStep(game, () => this.dynastyActionWindowStep())
        ]);
    }

    createPhase() {
        this.game.roundNumber++;
        this.game.conflictRecord = [];
        super.createPhase();
    }

    beginDynasty() {
        _.each(this.game.getPlayersInFirstPlayerOrder(), player => {
            player.beginDynasty();
        });
    }

    flipDynastyCards () {
        _.each(this.game.getPlayersInFirstPlayerOrder(), player => {
            let revealedCards = [];
            for(let province of [Locations.ProvinceOne, Locations.ProvinceTwo, Locations.ProvinceThree, Locations.ProvinceFour]) {
                let card = player.getDynastyCardInProvince(province);
                if(card && card.facedown) {
                    this.game.applyGameAction(null, { flipDynasty: card });
                    revealedCards.push(card);
                }
            }
            if(revealedCards.length > 0) {
                this.game.queueSimpleStep(() => this.game.addMessage('{0} reveals {1}', player, revealedCards));
            }
        });
    }

    collectFate() {
        _.each(this.game.getPlayersInFirstPlayerOrder(), player => {
            player.collectFate();
        });
    }

    dynastyActionWindowStep() {
        this.game.queueStep(new DynastyActionWindow(this.game));
    }

}

module.exports = DynastyPhase;
