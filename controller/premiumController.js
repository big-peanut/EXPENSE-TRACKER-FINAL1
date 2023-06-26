const Expenses = require('../models/expenses');
const Users = require('../models/users');
const sequelize = require('../util/database');
const { Sequelize } = require('sequelize');

exports.getleaderboard = async (req, res, next) => {
  try {
    const leaderboardData = await Users.findAll({
      attributes: ['name', [sequelize.fn('SUM', sequelize.col('expenses.amount')), 'total_cost']],
      include: [{
        model: Expenses,
        attributes: []
      }],
      group: ['users.id'],
      order: [[sequelize.literal('total_cost'), 'DESC']]
    });

    const userleaderboarddetails = leaderboardData.map(user => ({
      name: user.name,
      total_cost: user.get('total_cost') || 0
    }));

    res.status(200).json(userleaderboarddetails);
  } catch (err) {
    res.status(500).json(err);
  }
};
