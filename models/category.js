const mongoose = require('mongoose');

// Category Schema
const categorySchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});

const Category = module.exports = mongoose.model('Category', categorySchema);

// Get Categories
module.exports.getCategories = function(callback, limit){
    Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}


//Add category
module.exports.addCategory = function (category, callback) {
    Category.create(category, callback);

}

//Get single category by Id
module.exports.getCategoryById = function (id, callback) {
    Category.findById(id, callback);
}


module.exports.updateCategory = function (query, update, {}, callback) {
    Category.findOneAndUpdate(query,update, {}, callback);
}

//Remove Category
module.exports.removeCategory = function (query, callback) {
    Category.remove(query, callback);
}
