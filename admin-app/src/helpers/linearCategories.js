const linearCategories = (categories, options = []) => {
    for (let category of categories) {

        options.push({ 
            value: category._id,
            parentId: category.parentId,
            name: category.name,
            type: category.type
        });
        if (category.children.length > 0) {
            linearCategories(category.children, options)
        }
    }
    return options;
}

export default linearCategories;