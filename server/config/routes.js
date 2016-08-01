/**
 * Created by hoang on 1/25/15.
 */

var routes = require('../../routes');
var user = require('../../routes/user');
var web = require('../../routes/web');
var food = require('../../routes/food');
var element = require('../../routes/element');
var dish = require('../../routes/dish');
var period = require('../../routes/period');
var fetus = require('../../routes/fetus');
var search = require('../../routes/search');
var question = require('../../routes/question');

module.exports = function(app) {
    app.get('/', routes.index);
    app.get('/element', web.element);
    app.get('/food', web.food);
    app.get('/dish', web.dish);
    app.get('/period', web.period);
    app.get('/fetus', web.fetus);
    app.get('/search', web.search);
    app.get('/question', web.question);
    app.get('/qna', web.qna);
    app.get('/scan', web.scan);
    app.post('/scan.json', web.doScan);

    app.get('/api/user', user.list);
    app.post('/api/user', user.create);

    app.get('/api/food', food.list);
    app.get('/api/food/:id', food.listById);
    app.post('/api/food', food.create);

    app.get('/api/element', element.list);
    app.post('/api/element', element.create);

    app.get('/api/dish', dish.list);
    app.post('/api/dish', dish.create);

    app.get('/api/period', period.list);
    app.post('/api/period', period.create);

    app.get('/api/fetus', fetus.list);
    app.post('/api/fetus', fetus.create);

    app.get('/api/search', search.list);

    app.get('/api/question', question.list);
    app.post('/api/question', question.create);
};