const sequelize = require('../sequelize');
const Battle = require('../models/Battle');

class BattleService {
    getNewBattle(warId) {
        return sequelize.query(`select
            a.name as name_a,
            b.name as name_b,
            a.id as id_a,
            b.id as id_b
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
                    and userId = 1) 
            order by a.id * rand()
            limit 1`
        ).then(results => results[0]);
    }
}

module.exports = new BattleService;