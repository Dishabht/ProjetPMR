const connexion = require("../../config/config");

const getAgentByName = async (connexion, name) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM agent WHERE name = ?";
        connexion.query(query, [name], (err, results) => {
            if (err) {
                console.error('Error fetching agent by name:', err);
                reject(err);
            } else {
                console.log('Agent results:', results);
                resolve(results);
            }
        });
    });
};

const comparePassword = (inputPassword, storedPassword) => {
    return inputPassword === storedPassword;
};

const GetIdAgentByName = (connexion, name, callback) => {
    const query = "SELECT ID_Agent FROM agent WHERE name = ?";
    connexion.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error fetching agent ID by name:', err);
            callback(err, null);
        } else {
            console.log('Results:', results);
            callback(null, results);
        }
    });
};

module.exports = {
    getAgentByName,
    comparePassword,
    GetIdAgentByName
};