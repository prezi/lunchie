var Sequelize = require('sequelize');

// var sequelize = new Sequelize('postgres://kieutran@localhost/demodb1', {
//     dialect: 'postgres'
// })

var sequelize = new Sequelize('lunchie', 'kieutran', 'hello', {
  // gimme postgres, please!
  dialect: 'postgres'
})

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
  .sync({ force: false })
  .complete(function(err) {
     if (!!err) {
       console.log('An error occurred while creating the table:', err)
     } else {
       console.log('It worked!')
     }
  })

// export connection
module.exports.sequelize = sequelize;
module.exports.User = User;