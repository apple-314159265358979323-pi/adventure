const levelNames = ['The 0th Dimension','Place 1']
const levelEnemies = {
	lvl0:{
	},
	lvl1:{
		enemybasehealth:500,
		width:750,
		totaltypes:1,
		type1:{
			id:1,
			strengthmag:1,
			spawninfo:'single',
			spawned:false,
			timeinfo:[2000],
		}
	}
}
//[[],[['Dark Fighter A1',1,'single',2000],500,750]]//[[enemy name,strength mag,spawn type, time info],enemy base health,level width]
const enemyDict = ['darkFighterA1']
const enemyStats = {
	id1: {
		attack:6,
		health:60,
		knockbacks:1,
		speed:75,
		attackspeed:1000,
		type:'normal',
		name: 'darkFighterA1',
		width:100,
		height:50
	}
}
//[['Dark Fighter A1',6,60,1,75,1000,'normal']]//[enemy name, attack, health, knockbacks, speed, atk speed, type]
const shipDict = ['fighterF1']
const shipStats = {
	id1:{
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
		name:'fighterF1'
	}
}
//[['Fighter F1',6,60,1,75,1000,5000,50,'common','none','none']]//[unit name, attack, health, knockbacks, speed, atk speed, recharge time, cost, rarity, strengths, abilities]
function reset() {
	var game = {
		levelsCompleted:0,
		xp:0,
		maxBaseHealth:500,
		currentLevel: {
			levelNum:1,
			enemyFrontLine:10000,
			frontLine:0,
			baseHealth:500,
			enemyBaseHealth:500,
			money:0,
			levelTime:0,
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
var game = reset()
var tickcontrol
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
	update('enemybasehealth',game.currentLevel.enemyBaseHealth + '/' + levelEnemies['lvl'+num].enemybasehealth)
	for(i=1;i<levelNames.length;i++) document.getElementById('place'+i).style.display = 'none'
	tickcontrol = setInterval(levelTick,50)
}
function levelTick() {
	game.currentLevel.levelTime += 50
	var thislvl = levelEnemies['lvl'+game.currentLevel.levelNum]
	for(i=1,i<=thislvl.totalTypes,i++) {
		var currentEnemy = thislvl['type'+i]
		if(currentEnemy.spawninfo === 'single' && game.currentLevel.levelTime === currentEnemy.timeinfo[0]) {
			spawnEnemy(currentEnemy.id)
		}
		else if(currentEnemy.spawninfo === 'repeat' && (game.currentLevel.levelTime - currentEnemy.timeinfo[0]) % currentEnemy.timeinfo[1] === 0) {
			spawnEnemy(currentEnemy.id)
		}
		else if(currentEnemy.spawninfo === 'basehealth' && game.currentLevel.enemyBaseHealth <= currentEnemy.timeInfo[0] && !currentEnemy.spawned) {
			spawnEnemy(currentEnemy.id)
		}
	}
	for(i=0;i<10,i++) {
		var currentlvl = game.currentLevel
		if(game.currentlvl.enemyids[i] != 0) {
			var whichType = currentlvl.enemyids[i]
			var currentEnemy = thislvl['type' + whichType]
			var id = currentEnemy.id
			var newPos = currentlvl.enemypos[i] - enemyStats['id'+id].speed/20
			currentlvl.enemypos[i] = Math.max(newPos,currentlvl.frontLine)
			currentlvl.enemyFrontLine = Math.min(currentlvl.enemyFrontLine, newPos)
			document.getElementById('enemy'+i).style.left = (screen.availWidth+levelEnemies['lvl'+num].width)/2 - currentlvl.enemypos[i]-enemyStats['id'+id].width+'px'
			document.getElementById('enemy'+i).style.top = screen.availHeight/2 + 50 - enemyStats['id'+id].height+'px'
			if(currentlvl.enemypos[i] === currentlvl.frontLine) {
				for(i=0;i<10;i++) {
					if(currentlvl.shippos[i] === currentlvl.frontLine) {
						currentlvl.shiphealths[i] -= enemyStats['id' + id].attack
						break
					}
				}
			}
		}
	}
}
function spawnEnemy(id) {
	for(i=0;i<10;i++) {
		if(game.currentLevel.enemyids[i] === 0) {
			break
		}
	}
	i++
	var enemy = document.getElementById('enemy'+i)
	enemy.src = enemyStats['id' + i].name + '.png'
	enemy.style.left = (screen.availWidth-levelEnemies['lvl'+game.currentLevel.levelNum].width)/2 + 'px'
	enemy.style.top = screen.availHeight/2 + 50 - enemyStats['id'+id].height+'px'
	enemy.style.display = 'inline-block'
	currentLevel.enemyids[i-1] = id
	currentLevel.enemyhealths[i-1] = enemyStats['id' + id].health
	currentLevel.enemypos[i-1] = levelEnemies['lv' + game.currentLevel.levelNum].width
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
	if(game.currentLevel.levelTime === undefined) {
		game.currentLevel.levelTime = 0
		game.currentLevel.levelNum = 1
	}
}
