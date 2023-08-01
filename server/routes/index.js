const express = require('express')
const authRoute = require('./auth.route')
const router = express.Router()

routeIndexes = [
    {
        path:'/auth',
        route: authRoute
    }
]

routeIndexes.forEach(routeIndex => {
    router.use(routeIndex.path, routeIndex.route)
});

module.exports = router;