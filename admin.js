const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt)
    console.log(salt);
    console.log(hash);
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("Welcome back!")
    } else {
        console.log("Sorry you're not registered")
    }
}

// hashPassword('monkey');
login('monkey', '$2b$10$yWCm.lRuF2mCeSE.rewekeG3StcJLpDjzLuVcSY8Ef/niV8r9jgW2')