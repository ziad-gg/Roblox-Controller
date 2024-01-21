const fs = require('fs');
const routeMap = new Map();

const apiDirectory = 'server/routes/api';

const apiCategories = fs.readdirSync(apiDirectory);

apiCategories.forEach(category => {
    const endpoints = [];
    const categoryName = category;

    const routeFiles = fs.readdirSync(`${apiDirectory}/${category}`).filter(file => file.includes('routes'));

    routeFiles.forEach(routeFile => {
        const endpointName = routeFile.split('.')[0] === 'main' ? '/' : `/${routeFile.split('.')[0]}`;

        endpoints.push({
            parentCategory: categoryName,
            category: category,
            name: endpointName,
            data: require(`./api/${categoryName}${endpointName === '/' ? '/main' : endpointName}.${routeFile.split('.')[1]}.${routeFile.split('.')[2]}`)
        });
    });

    routeMap.set(category, endpoints);
});

/**
 * 
 * @param {import('express').Express} app 
 * @param {'challenge' | 'users'} category 
 */
function loadRoutes(app, category) {
    routeMap.get(category).forEach(endpointData => {
        const endpointPath = `/api/${category}${endpointData.name}`;
        app.use(endpointPath, endpointData['data']);
    });
}

module.exports = {
    routeMap,
    loadRoutes
};
