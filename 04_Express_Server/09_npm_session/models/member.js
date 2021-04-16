const Sequelize = require('sequelize');
module.exports = class Member extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userid: {
                type: Sequelize.STRING(20),
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            pwd: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(11),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Member',
            tableName: 'members',
            paranoid: false,
            charset: 'utf8mb4', // string fk일 경우, main, sub table의 charset과 collate가 동일해야 fk 설정가능 + emoji(board에서 emoji지원을 위함)
            collate: 'utf8mb4_general_ci', // string fk일 경우, main, sub table의 charset과 collate가 동일해야 fk 설정가능 + emoji(board에서 emoji지원을 위함)
        });
    }
    // 테이블간 관계 설정 함수
    static associate(db) {
        db.Member.hasMany(db.Board, {
            foreignKey: 'writer',
            sourceKey: 'userid',
            onDelete: 'cascade',
        });
        db.Member.hasMany(db.Reply, {
            foreignKey: 'rewriter',
            sourceKey: 'userid',
            onDelete: 'cascade',
        });
    }
};