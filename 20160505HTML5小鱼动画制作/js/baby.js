var babyObj = function () {
	this.x;
	this.y;
	this.angle;
	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();

	this.babyTailTimer = 0;//计数
	this.babyTailCount= 0;//当前图片

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

babyObj.prototype.init = function() {
	this.x = canWidth * 0.5 - 50;
	this.y = canWidth * 0.5 + 50;
	this.angle = 0;
	
	
	
}

babyObj.prototype.draw = function () {

	this.x = lerpDistance(fishMom.x,this.x,0.98);
	this.y = lerpDistance(fishMom.y,this.y,0.98);
	//angle
	var gapY = fishMom.y - this.y;
	var gapX = fishMom.x - this.x;
	var beta = Math.atan2(gapY,gapX) + Math.PI;
	this.angle = lerpAngle(beta,this.angle,0.6);
	//babyTail animate
	this.babyTailTimer += gapTime;
	if (this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}
	//babyEye animate
	this.babyEyeTimer += gapTime;
	if (this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		if (this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random()*1500 + 2000;
		}else{
			this.babyEyeInterval = 200;
		}
	}
	//babyBody animate
	this.babyBodyTimer += gapTime;
	if (this.babyBodyTimer > 300) {
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if (this.babyBodyCount > 19) {
			this.babyBodyCount = 19 ;
			//game over
			data.gameOver = true;
		}
	}
	ctx1.save();//动画起始
	ctx1.translate(this.x,this.y);
	//角度跟随
	ctx1.rotate(this.angle);
	//尾巴动画
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5+23,-babyTail[babyTailCount].height * 0.5);
	
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width * 0.5,-babyBody[babyBodyCount].height * 0.5);
	
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width * 0.5,-babyEye[babyEyeCount].height * 0.5);

	ctx1.restore();//结束
	
}