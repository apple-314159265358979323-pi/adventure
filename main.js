const levelNames = ['The 0th Dimension','Place 1']
const levelEnemies = [[],[['Dark Fighter A1',1,'single',2000],500,500]]//[[enemy name,strength mag,spawn type, time info],enemy base health,level width]
const enemyDict = ['Dark Fighter A1']
const enemyStats = [['Dark Fighter A1',6,60,1,75,1,'normal']]//[enemy name, attack, health, knockbacks, speed, atk speed, type]
const shipDict = ['Fighter F1']
const shipStats = [['Fighter F1',6,60,1,75,1,'common','none','none']]//[unit name, attack, health, knockbacks, speed, atk speed, rarity, strengths, abilities]
function reset() {
	var game = {
		levelsCompleted:0,
		xp:0,
	}
	return game
}
function initLevel(num) {
	var base = document.getElementById('base')
	var enemybase = document.getElementById('enemybase')
	base.style.top = screen.availHeight/2-50 + 'px'
	base.style.left = (screen.availWidth+levelEnemies[num][-1])/2 + 'px'
	base.style.display = 'inline-block'
	enemybase.style.top = base.style.top
	enemybase.style.left = (screen.availWidth+levelEnemies[num][-1])/2 + 'px'
	enemybase.style.display = 'inline-block'
	for(i=1;i<levelNames.length;i++) document.getElementById('place'+i).style.display = 'none'
}
function init() {
	if(localStorage.getItem('adventure')!=null) load(localStorage.getItem('adventure'))
	setInterval(save,3000)
}
function save() { //save game
	localStorage.setItem('adventure',btoa(JSON.stringify(game)))
}
function load(save) {
	game=JSON.parse(atob(save))
}
