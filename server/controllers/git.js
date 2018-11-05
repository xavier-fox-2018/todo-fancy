const axios = require('axios')


module.exports = {

    getMyRepos: function(req,res) {
        axios({
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                Authorization: process.env.GIT_ACCESS_TOKEN
            }
        })
        .then(response => {
            console.log('Berhasil get repos.', response.data)           
            res.status(200).json({
                message: 'Successfully get repos.',
                data: response.data
            })
        })
        .catch(err => {
            console.log('Gagal get repos.', err)  
            res.status(500).json({
                message: 'Failed to get repos',
                error: err
            })
        })
    },

    getStarredRepos: function(req,res) {
        axios({
            method: 'GET',
            url: 'https://api.github.com/user/starred',
            headers: {
                'User-Agent': 'request',
                Authorization: process.env.GIT_ACCESS_TOKEN
            }
        })
        .then(response => {
            // console.log('Ini bentuk response:', response);
            // console.log(typeof repos);
            
            console.log('Berhasil get starred repos.', response.data);
            res.status(200).json({
                message: 'Sucessfully get repos that self starred',
                data: response.data
            })
        })
        .catch(err => {
            console.log('Gagal get starred repos.', err);
            res.status(500).json({
                message: 'Failed to get repos that self starred',
                error: err
            })
        })
    },

    createRepo: function(req,res) {
        axios({
            method: 'POST',
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                Authorization: process.env.GIT_ACCESS_TOKEN
            },
            data: {
                name: req.body.name,
                description: req.body.description
            }
        })
        .then(response => {
            console.log(`Berhasil create repo ${req.body.name}.`, response.data);
            res.status(200).json({
                message: `Successfully create repo ${req.body.name}`,
                data: response.data
            })
        })
        .catch(err => {
            console.log(`Gagal create repo ${req.body.name}.`, err);
            res.status(500).json({
                message: `Failed to create repo ${req.body.name}.`,
                error: err
            })
        })
    },

    searchStarredRepo: function(req, res) {
        axios({
            method: 'GET',
            url: 'https://api.github.com/user/starred',
            headers: {
                'User-Agent': 'request',
                Authorization: process.env.GIT_ACCESS_TOKEN
            }
        })
        .then(response => {
            let reposArr = response.data
            let searchedArr = []

            for (let i = 0; i < reposArr.length; i++) {
                if(reposArr[i].name.toLowerCase().indexOf(req.params.input) !== -1 || reposArr[i].owner.login.toLowerCase().indexOf(req.params.input) !== -1) {
                    searchedArr.push(reposArr[i])
                }
            }             

            console.log('Berhasil search repos.', searchedArr)
            res.status(200).json({
                message: 'Sucessfully search repos that self starred',
                data: searchedArr
            })
        })
        .catch(err => {
            console.log('Gagal search starred repos.', err);
            res.status(500).json({
                message: 'Failed to search repos that self starred',
                error: err
            })
        })
    },

    getUserRepos: function(req,res) {
        axios({
            method: 'GET',
            url: `https://api.github.com/users/${req.params.user}/repos`,
            headers: {
                'User-Agent': 'request'
            }
        })
        .then(response => {
            console.log(`Berhasil get repos dari user ${req.params.user}.`, response.data)           
            res.status(200).json({
                message: `Successfully get repos from ${req.params.user}`,
                data: response.data
            })
        })
        .catch(err => {
            console.log(`Gagal get repos dari user ${req.params.user}.`, err)  
            res.status(500).json({
                message: `Failed to get repos from ${req.params.user}`,
                error: err
            })
        })
    },

    unstarRepo: function(req,res) {
        axios({
            method: 'DELETE',
            url: `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`,
            headers: {
                'User-Agent': 'request',
                Authorization: process.env.GIT_ACCESS_TOKEN
            }
        })
        .then(response => {
            console.log(`Berhasil unstar repo ${req.params.repo}.`, response.data);
            res.status(200).json({
                message: `Successfully unstar repo ${req.params.repo}`,
                data: response.data
            })
        })
        .catch(err => {
            console.log(`Gagal unstar repo ${req.params.repo}.`, err);
            res.status(500).json({
                message: `Failed to unstar repo ${req.params.repo}.`,
                error: err
            })
        })
    }
    
}