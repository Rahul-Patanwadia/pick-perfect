const {authService} = require('../services');

const authController = {
    async hello(){
        try {
            const userHello = await authService.helloService();
            console.log(userHello)
        } catch (error) {
            
        }
        
    }
}

module.exports = authController