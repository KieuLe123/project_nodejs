const itemsModel = require('../schemas/items');


let createFilterStatus = (currentStatus)=>{

    statusFilter= [
        {name:'All', value: 'all', count: 4, link: '#', class: 'secondary'},
        {name:'Active',value: 'active', count: 4, link: '#', class: 'secondary'},
        {name:'Inactive', value: 'inactive', count: 4, link: '#', class: 'secondary'},
    ];

    statusFilter.forEach((value, index, array) => {

        condition ={};
        if(value.value != 'all') condition = {status:value.value};
        if(value.value == currentStatus ) statusFilter[index].class='info';
        itemsModel.count(condition).then((value) => {
            statusFilter[index].count =  value
        })
    });


    return statusFilter;
}

module.exports ={
    createFilterStatus
}