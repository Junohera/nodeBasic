const Sequelize = require('sequelize');
module.exports = class Reply extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
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
            modelName: 'Reply',
            tableName: 'replies',
            paranoid: false,
            charset: 'utf8mb4', // string fk일 경우, main, sub table의 charset과 collate가 동일해야 fk 설정가능 + emoji
            collate: 'utf8mb4_general_ci', // string fk일 경우, main, sub table의 charset과 collate가 동일해야 fk 설정가능 + emoji
        });
    }
    static associate(db) {
        db.Reply.belongsTo(db.Member, {
            foreignKey: 'rewriter',
            targetKey: 'userid'
        });
        db.Reply.belongsTo(db.Board, {
            foreignKey: 'board',
            targetKey: 'id'
        });
    }
};