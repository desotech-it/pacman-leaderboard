function removeAllChildren(element) {
	let first = element.firstElementChild;
	while (first) {
	  first.remove();
	  first = element.firstElementChild;
	}
  }
  
  function refreshHeader(table) {
	const existingHeader = table.querySelector('.table-header');
	if (existingHeader) {
	  existingHeader.remove();
	}
  
	const headerRow = document.createElement('li');
	headerRow.classList.add('table-header');
	const rankHeader = document.createElement('div');
	rankHeader.classList.add('col', 'col-1');
	rankHeader.setAttribute('data-label', 'Rank');
	rankHeader.textContent = 'Rank';
	const nameHeader = document.createElement('div');
	nameHeader.classList.add('col', 'col-2');
	nameHeader.setAttribute('data-label', 'Player');
	nameHeader.textContent = 'Player';
	const scoreHeader = document.createElement('div');
	scoreHeader.classList.add('col', 'col-3');
	scoreHeader.setAttribute('data-label', 'Score');
	scoreHeader.textContent = 'Score';
	const dateHeader = document.createElement('div');
	dateHeader.classList.add('col', 'col-4');
	dateHeader.setAttribute('data-label', 'Date');
	dateHeader.textContent = 'Date';
	headerRow.appendChild(rankHeader);
	headerRow.appendChild(nameHeader);
	headerRow.appendChild(scoreHeader);
	headerRow.appendChild(dateHeader);
	table.appendChild(headerRow);
  }
  
  function refreshLeaderboardRows(table, data) {
	refreshHeader(table);
	data.forEach((item, index) => {
	  const rank = index + 1;
	  const name = item.name;
	  const date = item.date;
	  const score = item.score;
  
	  const row = document.createElement('li');
	  row.classList.add('table-row');
	  const rankCell = document.createElement('div');
	  rankCell.classList.add('col', 'col-1');
	  rankCell.setAttribute('data-label', 'Rank');
	  rankCell.textContent = rank;
	  const nameCell = document.createElement('div');
	  nameCell.classList.add('col', 'col-2');
	  nameCell.setAttribute('data-label', 'Player');
	  nameCell.textContent = name;
	  const scoreCell = document.createElement('div');
	  scoreCell.classList.add('col', 'col-3');
	  scoreCell.setAttribute('data-label', 'Score');
	  scoreCell.textContent = score;
	  const dateCell = document.createElement('div');
	  dateCell.classList.add('col', 'col-4');
	  dateCell.setAttribute('data-label', 'Date');
	  dateCell.textContent = date;
	  row.appendChild(rankCell);
	  row.appendChild(nameCell);
	  row.appendChild(scoreCell);
	  row.appendChild(dateCell);
	  table.appendChild(row);
	});
  }
  
  async function refreshLeaderboard(table) {
	try {
	  const response = await fetch('/api/highscore');
	  if (!response.ok) {
		throw new Error('Network response was not ok');
	  }
	  const data = await response.json();
	  removeAllChildren(table);
	  refreshLeaderboardRows(table, data);
	} catch (error) {
	  console.error(`Download error: ${error.message}`);
	}
  }
  
  addEventListener('load', () => {
	const root = document.getElementById('root');
	const leaderboardTable = document.createElement('ul');
	leaderboardTable.classList.add('responsive-table');
	root.appendChild(leaderboardTable);
	refreshLeaderboard(leaderboardTable);
  });