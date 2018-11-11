const Tweet = require('../models/Tweet');

module.exports = {
    async store(req, res) {
        const tweet = await Tweet.findById(req.params.id);

        tweet.set({ likes: tweet.likes + 1 });

        await tweet.save();

        //avisar todo mundo que um like foi feito
        /*
            envia um evento chamado "tweet" contendo o tweet
        */
        req.io.emit('like', tweet);

        return res.json(tweet);
    },
};