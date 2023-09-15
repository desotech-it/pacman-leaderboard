const express = require('express');
const router = express.Router();
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const ddb = new DynamoDBClient();

const getHighscoreCommand = new ScanCommand({
	TableName: "highscore",
});

router.get('/highscore', (req, res) => {
	ddb.send(getHighscoreCommand)
		.then(response => {
			const result = [];
			response.Items.forEach(item => {
				result.push({
					name: item.Name.S,
					date: item.Date.S,
					score: item.Score.N,
				});
			});
			result.sort((a, b) => {
				if (a.score < b.score) return 1;
				if (a.score > b.score) return -1;
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				if (dateA - dateB) return -1;
				if (dateB - dateA) return 1;
				return 0;
			});
			res.json(result);
		})
		.catch(err => {
			console.log(err);
			res.sendStatus(500);
		});
});

module.exports = router;
