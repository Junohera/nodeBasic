const Sequelize = require('sequelize');
module.exports = class Board extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            num: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            subject: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            content: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps: false,
            modelName: 'Board',
            tableName: 'boards',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Board.belongsTo( db.Member, { foreignKey: 'writer', targetKey: 'userid' } );
    }
};