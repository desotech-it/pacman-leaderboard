function removeAllChildren(element) {
	let first = element.firstElementChild;
	while (first) {
		first.remove();
		first = element.firstElementChild;
	}
}

function refreshHeader(table) {
	const row = document.createElement('tr');
	const rankHeader = document.createElement('th');
	const nameHeader = document.createElement('th');
	const dateHeader = document.createElement('th');
	const scoreHeader = document.createElement('th');
	rankHeader.appendChild(document.createTextNode('Rank'));
	nameHeader.appendChild(document.createTextNode('Name'));
	dateHeader.appendChild(document.createTextNode('Date'));
	scoreHeader.appendChild(document.createTextNode('Score'));
	row.appendChild(rankHeader);
	row.appendChild(nameHeader);
	row.appendChild(dateHeader);
	row.appendChild(scoreHeader);
	table.appendChild(row);
}

function refreshLeaderboardRows(table, data) {
	refreshHeader(table);
	data.forEach((item, index) => {
		const rank = index + 1;
		const name = item.name;
		const date = item.date;
		const score = item.score;

		const row = document.createElement('tr');
		const rankCell = document.createElement('td');
		const nameCell = document.createElement('td');
		const dateCell = document.createElement('td');
		const scoreCell = document.createElement('td');
		rankCell.appendChild(document.createTextNode(rank));
		nameCell.appendChild(document.createTextNode(name));
		dateCell.appendChild(document.createTextNode(new Date(date)));
		scoreCell.appendChild(document.createTextNode(score));
		row.appendChild(rankCell);
		row.appendChild(nameCell);
		row.appendChild(dateCell);
		row.appendChild(scoreCell);
		table.appendChild(row);
	});
}

async function refreshLeaderboard(table) {
	fetch('/api/highscore')
		.then(response => response.json())
		.then(data => {
			removeAllChildren(table);
			refreshLeaderboardRows(table, data);
		})
		.catch(error => alert(`Download error: ${error.message}`));
}


addEventListener('load', () => {
	const root = document.getElementById('root');
	const leaderboardTable = document.createElement('table');
	leaderboardTable.setAttribute('id', 'highscore-table');
	root.appendChild(leaderboardTable);
	setTimeout(() => { refreshLeaderboard(leaderboardTable); }, 500);
});
