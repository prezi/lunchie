var Sequelize = require('sequelize');
var appConfig = require('./AppConfig');

var sequelize;

if (appConfig.deployment_mode == 'local') {
    // working with the local database

    sequelize = new Sequelize(appConfig.dbName, appConfig.dbUserName, appConfig.dbPassword, {
        dialect: appConfig.dbDialect
    })

} else {
    // working with the server database

    var match = process.env.HEROKU_POSTGRESQL_BRONZE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

    sequelize = new Sequelize(match[5], match[1], match[2], {
        dialect: 'postgres',
        protocol: 'postgres',
        port: match[4],
        host: match[3],
    });
}

sequelize
    .authenticate()
    .complete(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err)
        } else {
            console.log('Connection has been established successfully.')
        }
    })

var User = sequelize.define('User', {
    mention_name: Sequelize.STRING,
    jid: Sequelize.STRING,
    request_time: Sequelize.STRING,
    rounded_time: Sequelize.STRING,
}, {
    tableName: 'users',
    updatedAt: 'last_update'
})

sequelize
    .sync({
        force: false
    })
    .complete(function(err) {
        if (!!err) {
            console.log('An error occurred while creating the table:', err)
        } else {
            console.log('Table Synced successfully ')
        }
    })

// export connection
module.exports.sequelize = sequelize;
module.exports.User = User;