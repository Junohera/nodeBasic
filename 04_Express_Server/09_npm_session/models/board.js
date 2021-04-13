const Sequelize = require('sequelize');
module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            subject: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            text: {
                type: Sequelize.STRING(1000),
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,
            charset: 'utf8mb4', // string fk일 경우, main, sub table의 charset과 collate가 동일해야 fk 설정가능 + emoji
            collate: 'utf8mb4_general_ci', // string fk일 경우, main, sub table의 charset과 collate가 동일해야 fk 설정가능 + emoji
        });
    }
    static associate(db) {
        db.Board.belongsTo(db.Member, {
            foreignKey: 'writer',
            targetKey: 'userid'
        });
    }
};