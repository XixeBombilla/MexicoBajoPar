//globals advanced------------------->
var pWidth; 
var pHeight; 
var isMoving=false;
var myBook,isHidden=false,AF;
var leftStart=0,rightStart=1;
var hideDiv,revealDiv,revealHtmlDiv,hideHtmlDiv,hasPlayed=false,pSound,tempSound,soundManager;
var myBook,myBinder,counter=0;
var numPixels = 20; //number of pixels to slide per move
var allowNavigation=false;
var tempPixelsToMove,tempSpeed;
var allowPageClick=false;
var doIncrementalAutoFlip = false;
//<----------------end globals

function flipSoundIni(){
	if(pSound){
		if(!soundManager){pSound=false;return false;};
		soundManager.url = 'soundmanager/soundmanager2.swf'; // override default SWF url
		soundManager.debugMode = false;
		soundManager.consoleOnly = false;
		soundManager.waitForWindowLoad = true;
		soundManager.onload = function() {
			// soundManager is initialised, ready to use. Create a sound for this demo page.
			soundManager.createSound({
				id: 'flip',
				url: 'flip.mp3',
				autoLoad: true
			});
		}
	}
}

function ini(){
if(pSound){flipSoundIni();}; //initialize soundManager
if(!document.getElementById("myBook") ){return;};
allowNavigation = selectNavigation;
numPixels=numPixelsToMove;
if(numPixels>100){numPixels=100;};

pWidth=myPageW+(pageBorderWidth*2); 
pHeight=myPageH+(pageBorderWidth*2); 

myBook=document.getElementById("myBook");
myBook.style.width=(pWidth*2)+'px';
myBook.style.height=pHeight+'px';
myBook.style.position="relative";
myBook.style.zIndex="0";

	for(var i=0;i<myBook.childNodes.length;i++){
		if(myBook.childNodes[i].nodeType == 1){ //element nodes only
			var original = myBook.childNodes[i]; 
			var myDiv = document.createElement('div'); 
			myDiv.style.position="absolute";
			myDiv.style.left=pWidth+'px';
			myDiv.style.top="0px";
			myDiv.style.width=pWidth+"px";
			myDiv.style.height=pHeight+"px";			
			myDiv.style.backgroundColor="#191919";
			myDiv.style.overflow="hidden";
			myDiv.style.zIndex=myBook.childNodes.length-counter;
			myDiv.setAttribute("id","flipPage"+counter);

			original.parentNode.replaceChild(myDiv, original);  
			original.setAttribute("id","flipHtml"+counter);	
			original.style.position="absolute";
			original.style.width=myPageW+"px";
			original.style.height=myPageH+"px";
			original.style.top="0px";
			original.style.left="0px";		
			original.style.overflow="hidden";			
			original.style.borderWidth=pageBorderWidth+"px";
			original.style.borderColor=	pageBorderColor;
			original.style.borderStyle=pageBorderStyle;	
			//original.style.backgroundImage=""; //debug
			
			if(!number_check(counter)){
				if(document.all){
					original.style.filter="progid:DXImageTransform.Microsoft.Alpha(Opacity=100, FinishOpacity=30, Style=1, StartX=80, FinishX=100, StartY=0, FinishY=0)";
				}else{
					var myPngDiv = document.createElement('div'); 
					myPngDiv.style.position="absolute";
					myPngDiv.style.left=(pWidth-80)+'px';
					myPngDiv.style.top="0px";
					myPngDiv.style.width=80+"px";
					myPngDiv.style.height=pHeight+"px";			
					myPngDiv.style.background="transparent url(img/black_gradient.png) top right repeat-y";				
					//myPngDiv.style.opacity="0.7";	
					//myPngDiv.style.filter="alpha(opacity=30)";				
					original.appendChild(myPngDiv);
				}			
			}

			
			if(allowPageClick){			
				if(number_check(counter)){
					original.onclick=function(e){whichElement(e,true);};
					//myDiv.onclick= function() { gonext();};
				}else{
					//myDiv.onclick= function() { goprev();};
					original.onclick=function(e){whichElement(e,false);};
				}
			}
			myDiv.appendChild(original);
			
			

			if( allowNavigation && document.getElementById("flipSelect") ){
				//name pages for navigation
				var y=document.createElement('option');
				if(counter==0){
				//alert(original.getAttribute("name"));
					if(original.getAttribute("name")){
						y.text=original.getAttribute("name");
					}else{
						y.text="Cover ";
					}
				}else{
					if(original.getAttribute("name")){
						y.text=original.getAttribute("name");
					}else{				
						y.text=counter;
					}
				}
				y.value=counter;
				//y.selected="selected";
				var x=document.getElementById("flipSelect");
				x.style.display="";
				x.onchange=function() {this.blur();document.body.focus();autoFlip(this.value);};
				try{
					x.add(y,null); // standards compliant
				}catch(ex){
					x.add(y); // IE only
				}
			}
			counter++;
		}
	}

	
	if(showBinder){
		myBinder = document.createElement('div'); 	
		myBinder.style.width=binderWidth+"px";
		myBinder.style.height=pHeight+'px';
		myBinder.style.position="absolute";
		myBinder.style.top="0px";
		myBinder.style.left=pWidth-(binderWidth/2)+"px";
		myBinder.style.background="transparent url('"+binderImage+"') top left repeat-y";
		myBinder.style.zIndex="200";
		myBook.appendChild(myBinder);		
	}
myBook.style.display=""; //all setup, display the book	
}

function number_check(value) {
  //  returns true if value is even, false if value is odd
      return ( 1 - (value%2) ) 
}

function autoFlip(topage){
	currentLeft=leftStart-1;
	if( topage > (currentLeft+1) ){
		cycles=topage-currentLeft;
		if(number_check(cycles)){
			cycles=cycles/2;
		}else{
			cycles=(cycles-1)/2;
		}
		
		if(doIncrementalAutoFlip){
			tempSound=pSound;
			pSound=false;
			tempPixelsToMove=numPixels;
			tempSpeed=pSpeed;
			pSpeed=0;
			numPixels=(pWidth/4);		
			doAutoFlip(cycles,true);
		}else{
			rightDirectFlip(cycles);
		}
	}else if( topage==currentLeft || topage==currentLeft+1 ){
		return false;
	}else{
		cycles=currentLeft-topage;
		if(number_check(cycles)){
			cycles=cycles/2;
		}else{
			cycles=(cycles+1)/2;
		}		
		if(doIncrementalAutoFlip){
			tempSound=pSound;
			pSound=false;	
			tempPixelsToMove=numPixels;
			tempSpeed=pSpeed;
			pSpeed=0;
			numPixels=(pWidth/4);
			doAutoFlip(cycles,false);
		}else{
			leftDirectFlip(cycles);		
		}
	}	
}

function doAutoFlip(num,dir){
	if(num==0){	AF=window.clearTimeout(AF);numPixels=tempPixelsToMove;pSpeed=tempSpeed;pSound=tempSound;return;};
	if(dir){
		gonext();
	}else{
		goprev();
	}
	num--;
	AF = window.setTimeout('doAutoFlip('+num+','+dir+')',100);
}

function rightDirectFlip(num){
	for(var i=0;i<num;i++){
		if(!document.getElementById("flipPage"+rightStart) ){return;};
		
		hideDiv   = document.getElementById("flipPage"+leftStart);
		hideHtmlDiv	= document.getElementById("flipHtml"+leftStart);
		
		revealDiv = document.getElementById("flipPage"+rightStart);
		revealHtmlDiv = document.getElementById("flipHtml"+rightStart);		
		
		revealDiv.style.left=0+'px';
		revealDiv.style.width=pWidth+'px';
		revealDiv.style.zIndex=0;
		
		hideDiv.style.left="";	
		hideDiv.style.right="0px";
		hideDiv.style.width="0px";

		hideHtmlDiv.style.left="";	
		hideHtmlDiv.style.right="0px";

		revealHtmlDiv.style.left="";	
		revealHtmlDiv.style.right="0px";
		
	
		leftStart=leftStart+2;
		rightStart=rightStart+2;
	}
}

function leftDirectFlip(num){
	for(var i=0;i<num;i++){
		if(!document.getElementById("flipPage"+(leftStart-2)) ){return false;};

		leftStart=leftStart-2;
		rightStart=rightStart-2;
		
		hideDiv = document.getElementById("flipPage"+rightStart);
		hideHtmlDiv	= document.getElementById("flipHtml"+rightStart);
		
		revealDiv = document.getElementById("flipPage"+leftStart);
		revealHtmlDiv = document.getElementById("flipHtml"+leftStart);	
		
		hideDiv.style.left="";
		hideDiv.style.right=pWidth+"px";
		hideDiv.style.width=0+'px';
		
		revealDiv.style.left=pWidth+"px";
		revealDiv.style.width=pWidth+"px";
		
		revealHtmlDiv.style.left="0px";	
		hideHtmlDiv.style.left="0px";		
	}
}




function gonext(){
	if(isMoving){return;};
	if(!document.getElementById("flipPage"+rightStart) ){return;}
	isMoving=true;
	hideDiv   = document.getElementById("flipPage"+leftStart);
	hideHtmlDiv	= document.getElementById("flipHtml"+leftStart);
	
	revealDiv = document.getElementById("flipPage"+rightStart);
	revealHtmlDiv = document.getElementById("flipHtml"+rightStart);
	
	revealDiv.style.width="0px";
	revealDiv.style.left=pWidth*2+'px';
	revealDiv.style.zIndex=99;
	goright(pWidth*2,0);
}

function goright(currLeft,currWidth){
	if(currLeft <= numPixels*2){
		window.clearTimeout(ID);
		revealDiv.style.left=0+'px';
		revealDiv.style.width=pWidth+'px';
		revealDiv.style.zIndex=revealDiv.style.zIndex-99;
		
		hideHtmlDiv.style.left="";	
		hideHtmlDiv.style.right="0px";

		revealHtmlDiv.style.left="";	
		revealHtmlDiv.style.right="0px";

		leftStart=leftStart+2;
		rightStart=rightStart+2;
		
		isHidden=false;		
		isMoving=false;
		if(showBinder){myBinder.style.zIndex="100";};
		if( allowNavigation && document.getElementById("flipSelect") ){ //update page select
			document.getElementById("flipSelect").selectedIndex=leftStart-1;
		}
		hasPlayed=false;
		return;
	}	

	currLeft=currLeft-(numPixels*2);//2 * width reveal
	currWidth=currWidth+numPixels;
	
	revealDiv.style.left=currLeft+'px';
	revealDiv.style.width=currWidth+'px';
	
	hideWidth = currLeft-pWidth;	
	if(hideWidth>0){
		hideDiv.style.width=hideWidth+'px';
	}else{
		if(!isHidden){
			hideDiv.style.width=0+'px';
			isHidden=true;
		}
	}
	if(currLeft<(pWidth+binderWidth+numPixels) && !hasPlayed){
		if(showBinder){myBinder.style.zIndex="0";};
		if(pSound){soundManager.play('flip');}
		hasPlayed=true;
	}
	ID = window.setTimeout('goright('+currLeft+','+currWidth+')',pSpeed);
}

function goprev(){
	if(isMoving){return;};
	if(!document.getElementById("flipPage"+(leftStart-2)) ){return false;}
	isMoving=true;

	leftStart=leftStart-2;
	rightStart=rightStart-2;
	
	hideDiv = document.getElementById("flipPage"+rightStart);
	hideHtmlDiv	= document.getElementById("flipHtml"+rightStart);
	
	revealDiv = document.getElementById("flipPage"+leftStart);
	revealHtmlDiv = document.getElementById("flipHtml"+leftStart);	
	
	revealDiv.style.left="0px";	
	revealDiv.style.width="0px";

	hideDiv.style.left="";
	hideDiv.style.right=pWidth+"px";
	
	goleft(0,0);
}

function goleft(currLeft,currWidth){
	
	if(currLeft >=(pWidth-(numPixels*2))){
		window.clearTimeout(ID);

		revealDiv.style.left=pWidth+"px";
		revealDiv.style.width=pWidth+"px";
		
		revealHtmlDiv.style.left="0px";	
		hideHtmlDiv.style.left="0px";	

		isHidden=false;	
		isMoving=false;
		if(showBinder){myBinder.style.zIndex="100";};
		
		if( allowNavigation && document.getElementById("flipSelect") ){ //update page select
			if(leftStart-1>0){
				document.getElementById("flipSelect").selectedIndex=leftStart-1;
			}else{	
				document.getElementById("flipSelect").selectedIndex=leftStart;
			}
		}
		
		hasPlayed=false;
		return;
	}
	
	currLeft=currLeft+numPixels;//1 * width reveal
	currWidth=currWidth+numPixels;
	
	revealDiv.style.width=currWidth+'px';	
	revealDiv.style.left=currLeft+'px';
	
	hideWidth = pWidth-currWidth;	
	
	if(hideWidth >(pWidth/2)){
		hideDiv.style.width=hideWidth-numPixels+'px';
	}else{
		if(!isHidden){
			hideDiv.style.width=0+'px';
			isHidden=true;
		}
	}	
	
	if(currLeft>((pWidth/2)-numPixels) && !hasPlayed){
		if(showBinder){myBinder.style.zIndex="0";};
		if(pSound){soundManager.play('flip');}
		hasPlayed=true;
	}
	ID = window.setTimeout('goleft('+currLeft+','+currWidth+')',pSpeed);
}


function whichElement(e,dir){
	var targ;
	if (!e){
		var e = window.event;
	}
	
	if (e.target){
		targ = e.target;
	}else if (e.srcElement) {
		targ = e.srcElement;
	}
	
	if (targ.nodeType == 3){ // defeat Safari bug
		targ = targ.parentNode;
	}
	
	//var tname;
	pname=targ.parentNode.tagName;

	tname=targ.tagName;
	if(tname=="A" || tname=="INPUT" || pname=="A" || pname=="INPUT" ){
		//alert("You clicked on a " + tname + " element. pname:"+pname);
		return false;
	}else{
		//alert("You clicked on a " + tname + " element. pname:"+pname);
		if(dir){
			return gonext();
		}else{
			return goprev();
		}
	}
}


//optional use functions follow
function toggleBinder(){
	showBinder = (showBinder != false ? false : true );
	if(showBinder){	myBinder.style.display="";}else{myBinder.style.display="none";}
}function toggleSound(){
	pSound = (pSound != false ? false : true );
}
