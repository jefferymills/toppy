const sequelize = require('../sequelize');
const Battle = require('../models/Battle');

class WarService {
    getNewBattle(userId, warId) {
        return sequelize.query(`select
            a.name as contestantA,
            b.name as contestantB,
            a.id as idA,
            b.id as idB
            from Contestants a
            inner join Contestants b on a.id < b.id
            where a.warId = ${warId}
            and b.warId = ${warId}
            and not exists (
                select *
                from Battles c
                where c.contestantA = a.id
                    and c.contestantB = b.id
                    and c.warId = ${warId}
                    and userId = ${userId}) 
            order by a.id * rand()
            limit 1`,
            { type: sequelize.QueryTypes.SELECT }
        )
        .then(results => {
            const result = results[0];
            if (!result) return null;
            return [{
                id: result.idA,
                name: result.contestantA,
            }, {
                id: result.idB,
                name: result.contestantB,
            }];
        });
    }

    async getOldBattle(userId, warId, winnerId, loserId) {
        return Battle.findAll({
            where: {
                userId,
                warId,
                contestantA: Math.min(winnerId, loserId),
                contestantB: Math.max(winnerId, loserId),
            },
        });
    }

    async declareBattle(userId, warId, winnerId, loserId, transitive = true) {
        const oldBattle = await this.getOldBattle(userId, warId, winnerId, loserId);
        if (oldBattle.length) return;

        return Battle.create({
            userId,
            warId,
            winnerId,
            loserId,
            contestantA: Math.min(winnerId, loserId),
            contestantB: Math.max(winnerId, loserId)
        })
        .then(() => {
            if (transitive) {
                this._declareTransitiveWins(userId, warId, winnerId, loserId);
                this._declareTransitiveLosses(userId, warId, winnerId, loserId);
            }
        });
    }

    _declareTransitiveLosses(userId, warId, winnerId, loserId) {
        this._getLoserWins(userId, warId, loserId)
        .then(this._recordTransitiveLosses(userId, warId, winnerId));
    }

    _recordTransitiveLosses(userId, warId, winnerId) {
        return (loserWins) => {
            if(loserWins.length) {
                loserWins.forEach(loserWin => {
                    Battle.findAll({
                        where: {
                            userId,
                            warId,
                            contestantA: Math.min(loserWin.loserId, winnerId),
                            contestantB: Math.max(loserWin.loserId, winnerId),
                        }
                    }).then(oldBattles => {
                        if (oldBattles.length) return;

                        Battle.create({
                            userId,
                            warId,
                            loserId: loserWin.loserId,
                            winnerId,
                            contestantA: Math.min(loserWin.loserId, winnerId),
                            contestantB: Math.max(loserWin.loserId, winnerId)
                        }).then(() => {
                            this._declareTransitiveLosses(userId, warId, winnerId, loserWin.loserId);
                        })
                    })
                })
            }
        }
    }

    _declareTransitiveWins(userId, warId, winnerId, loserId) {
        this._getWinnerLosses(userId, warId, winnerId)
        .then(this._recordTransitiveWins(userId, warId, loserId))
    }

    _recordTransitiveWins(userId, warId, loserId) {
        return (winnerLosses) => {
            if (winnerLosses.length) {
                winnerLosses.forEach(winnerLoss => {
                    Battle.findAll({
                        where: {
                            userId,
                            warId,
                            contestantA: Math.min(winnerLoss.winnerId, loserId),
                            contestantB: Math.max(winnerLoss.winnerId, loserId),
                        }
                    }).then(oldBattles => {
                        if (oldBattles.length) return;

                        Battle.create({
                            userId,
                            warId,
                            winnerId: winnerLoss.winnerId,
                            loserId,
                            contestantA: Math.min(winnerLoss.winnerId, loserId),
                            contestantB: Math.max(winnerLoss.winnerId, loserId)
                        }).then(() => {
                            this._declareTransitiveWins(userId, warId, winnerLoss.winnerId, loserId);
                        });
                    })
                });
            }
        };
    }

    _getWinnerLosses(userId, warId, winnerId) {
        return Battle.findAll({
            where: {
                loserId: winnerId,
                userId,
                warId,
            }
        });
    }

    _getLoserWins(userId, warId, loserId) {
        return Battle.findAll({
            where: {
                winnerId: loserId,
                userId,
                warId,
            }
        });
    }
}

module.exports = new WarService;