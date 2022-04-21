// index.js is a special name in node
// when requiring an entire directory, node will look for the index.js file

const fetchData = require('./fetchData')
const loginUser = require('./loginUser')

const allUtils = {
    fetchData,
    loginUser
}

module.exports = allUtils;