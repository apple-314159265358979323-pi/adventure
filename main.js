const levelNames = ['The 0th Dimension','Place 1']
const levelEnemies = {
	lvl0:{
	},
	lvl1:{
		enemybasehealth:500,
		width:750,
		totaltypes:1,
		type1:{
			name:'darkFighterA1',
			strengthmag:1,
			spawninfo:'single',
			timeinfo:[2000],
		}
	}
}
//[[],[['Dark Fighter A1',1,'single',2000],500,750]]//[[enemy name,strength mag,spawn type, time info],enemy base health,level width]
const enemyDict = ['Dark Fighter A1']
const enemyStats = {
	darkFighterA1: {
		attack:6,
		health:60,
		knockbacks:1,
		speed:75,
		attackspeed:1000,
		type:'normal'
	}
}
//[['Dark Fighter A1',6,60,1,75,1000,'normal']]//[enemy name, attack, health, knockbacks, speed, atk speed, type]
const shipDict = ['Fighter F1']
const shipStats = {
	fighterF1:{
		attack:6,
		health:60,
		knockbacks:1,
		speed:75,
		attackspeed:1000,
		rechargetime:5000,
		cost:50,
		rarity:'common',
		strengths:[],
		abilities:[],
	}
}
//[['Fighter F1',6,60,1,75,1000,5000,50,'common','none','none']]//[unit name, attack, health, knockbacks, speed, atk speed, recharge time, cost, rarity, strengths, abilities]
function reset() {
	var game = {
		levelsCompleted:0,
		xp:0,
		maxBaseHealth:500,
		currentLevel: {
			baseHealth:500,
			enemyBaseHealth:500,
			money:0,
			enemyids:[0,0,0,0,0,0,0,0,0,0],
			enemyhealths:[0,0,0,0,0,0,0,0,0,0],
			enemypos:[0,0,0,0,0,0,0,0,0,0],
			shipids:[0,0,0,0,0,0,0,0,0,0],
			equippedshipids:[0,0,0,0,0],
			shipcooldowns:[0,0,0,0,0],
			shiphealths:[0,0,0,0,0,0,0,0,0,0],
			shippos:[0,0,0,0,0,0,0,0,0,0],
		}
	}
	return game
}
function update(what,withWhat) {
	document.getElementById(what).innerHTML = withWhat
}
function initLevel(num) {
	var base = document.getElementById('base')
	var enemybase = document.getElementById('enemybase')
	var basehealth = document.getElementById('basehealth')
	var enemybasehealth = document.getElementById('enemybasehealth')
	base.style.top = screen.availHeight/2-50 + 'px'
	base.style.left = (screen.availWidth+levelEnemies['lvl'+num].width)/2 + 'px'
	base.style.display = 'inline-block'
	enemybase.style.top = base.style.top
	enemybase.style.left = (screen.availWidth-levelEnemies['lvl'+num].width)/2 + 'px'
	enemybase.style.display = 'inline-block'
	basehealth.style.top = screen.availHeight/2 - 100 + 'px'
	basehealth.style.left = base.style.left
	basehealth.style.display = 'inline-block'
	update('basehealth',game.currentLevel.baseHealth + '/' + game.maxBaseHealth)
	enemybasehealth.style.top = basehealth.style.top
	enemybasehealth.style.left = enemybase.style.left
	enemybasehealth.style.display = 'inline-block'
	update('enemybasehealth',game.currentLevel.enemyBaseHealth + '/' + game['lvl'+num].enemybasehealth)
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
