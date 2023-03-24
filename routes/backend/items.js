var express = require('express');
var router = express.Router();


const itemsModel = require('../../schemas/items');
const utilsHelper = require('../../helpers/utils');
const paramsHelper = require('../../helpers/params');
const systemConfig = require('../../configs/system');
const linkIndex = '/' + systemConfig.prefixAdmin + '/items';


router.get('(/status/:status)?', (req, res, next) => {


    let objWhere = {};
    let currentStatus = paramsHelper.getParams(req.params, 'status', 'all');
    let keyword = paramsHelper.getParams(req.query, 'keyword', '');
    let statusFilter = utilsHelper.createFilterStatus(currentStatus);


    if (currentStatus == 'all') {
        if (keyword != '') objWhere = { name: new RegExp(keyword, 'i') };
    } else {
        objWhere = { status: currentStatus, name: new RegExp(keyword, 'i') };
    }

    itemsModel.find(objWhere).then((items) => {
        res.render('pages/backend/items', {
            title: 'List items',
            items,
            statusFilter,
            currentStatus,
            keyword,
        });

    });

});

router.get('/change-status/:id/:status', (req, res, next) => {
    let currentStatus = paramsHelper.getParams(req.params, 'status', 'active');
    let id = paramsHelper.getParams(req.params, 'id', ' ');
    let status = (currentStatus === 'active') ? 'inactive' : 'active';

    itemsModel.updateOne({ _id: id }, { status: status }, (err, items) => {
        res.redirect(linkIndex);
    });

});



router.get('/delete/:id', (req, res, next) => {

    let id = paramsHelper.getParams(req.params, 'id', ' ');

    itemsModel.deleteOne({ _id: id }, (err, items) => {
        res.redirect(linkIndex);
    });
});



router.get('/add', (req, res, next) => {
    res.render('pages/backend/items/add', { title: 'Add items' });

});

module.exports = router;