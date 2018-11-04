let axios = require('axios')

module.exports = {
    getQuote: function (req, res) {
        axios({
          url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
          method: 'get'
        })
        .then(response => {
            let quote = response.data.quoteText
            let author = response.data.quoteAuthor
            res.status(200).json({
                quote: quote,
                author: author
            })
        })
        .catch(err => {
        res.status(500).json(err)
        })
    }
}
