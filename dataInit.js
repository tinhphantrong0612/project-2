const User = require('./server-src/models/userModel');

dataInit = async function() {
    for(var i = 0; i < 10; i++) {
        let isExist = await User.checkUserExistByName('user0' + i);
        if (!isExist) {
            await User.createUser({
                username: 'user0' + i,
                password: '123456',
                dateOfBirth: Date.now(),
                gender: "Male",
                email: 'a@gmail.com'
            })
        }
    }
    console.log("Done");
    return;
}

dataInit();