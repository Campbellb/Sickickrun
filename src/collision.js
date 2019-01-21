const t = require('three')
const Effects = require('./special_effects')
// const Game = require('./game')

class Collision {
    constructor(){
		this.bugsInPath = [];
        // this.bugsToRemove = [];
        this.hasCollided = false;
        this.gotItem = false

    }



        doBugLogic(gameView, enemy, effectObject, collisionObject, item, difficulty){
             
            let oneBug;
            let oneItem;
            let bugPos = new t.Vector3();
            let itemPos = new t.Vector3();
            const bugsToRemove = [];
            const itemsToRemove = [];
            

            enemy.items.itemPool.forEach( function ( element, index ) {
                // console.log("bugs in path", enemy.bugsInPath)
                oneItem = enemy.items.itemPool[ index ];
                if (oneItem) {
                    // console.log("IN THE LENGTH CHECKER ")        
                    itemPos.setFromMatrixPosition( oneItem.matrixWorld );
                    // console.log("one Item:", oneItem)
                    // console.log("item pos AFTER", itemPos)
                    if(itemPos.z>20 &&oneItem.visible){//gone out of our view zone
                        itemsToRemove.push(oneItem);
                    }else {
                        if(itemPos.distanceTo(gameView.heroSprite.position)<=0.5){
                        

                        collisionObject.gotItem = true
                        // effectObject.addCoffee(gameView);
                        // effectObject.doCoffeeLogic(gameView);
                    
                        }
                    }
                }
            });
        






            enemy.bugsInPath.forEach( function ( element, index ) {
            
                oneBug=enemy.bugsInPath[ index ];
             
                bugPos.setFromMatrixPosition( oneBug.matrixWorld );
    
                if(bugPos.z>20 &&oneBug.visible){//gone out of our view zone
                    bugsToRemove.push(oneBug);
                }else if(difficulty === 'hard') {
                    if(bugPos.distanceTo(gameView.heroSprite.position)<=0.6){
                        

                        collisionObject.hasCollided = true
                        effectObject.addHit(gameView);
                        effectObject.doHitLogic(gameView);
                        
                    }

                }
                else{//check collision
                    if(bugPos.distanceTo(gameView.heroSprite.position)<=0.5){
                        

                        collisionObject.hasCollided = true
                        effectObject.addHit(gameView);
                        effectObject.doHitLogic(gameView);
                        
                    }

                }
            });

            let fromWhere;
            bugsToRemove.forEach( function ( element, index ) {
                oneBug = bugsToRemove[ index ];
                fromWhere=enemy.bugsInPath.indexOf(oneBug);
                enemy.bugsInPath.splice(fromWhere,1);
                enemy.bugPool.push(oneBug);
                oneBug.visible=false;
                console.log("Bug REMOVED");
            });

            itemsToRemove.forEach( function ( element, index ) {
                oneItem = itemsToRemove[ index ];
                fromWhere=enemy.items.itemPool.indexOf(oneItem);
                enemy.items.itemPool.splice(fromWhere,1);
                oneItem.visible=false;
                console.log("item REMOVED");
            });
        }

  

       

}

module.exports = Collision;
