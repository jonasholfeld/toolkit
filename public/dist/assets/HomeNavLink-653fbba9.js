import{_ as b,h as d,v as M,i as k,x,y as X,o as g,c as m,l as y,t as f,q as v}from"./main-43e597f7.js";const C={props:{current:Object,previous:Object,next:Object,previousLeft:HTMLDivElement,title:String,color:String,index:Number,workOrInfo:String,show:Boolean,url:String,globalDragX:Number,globalisInitialChainMove:Boolean,currentChain:String},setup(t){const e=d(null);let i=d(0);const n=M(),r=()=>{let o=!1;return function(a){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))&&(o=!0)}(navigator.userAgent||navigator.vendor||window.opera),o},s=o=>{e.value&&(e.value.style.transition=o?"height 0.5s ease-in-out, width 0.5s ease-in-out, color 0.2s ease-in-out":"none")},l=()=>{if(t.workOrInfo=="work"){const o=window.innerWidth/2;let a=o-.35*o;a=a-t.index*(o*.13),i.value=a}else{const o=window.innerWidth/2,a=t.index*(o*.13)+o*.015;i.value=a}};if(k(()=>{window.addEventListener("resize",l)}),x(()=>{window.removeEventListener("resize",l)}),t.workOrInfo=="work"){const o=window.innerWidth/2;let a=o-.35*o;a=a-t.index*(o*.13),i=d(a)}else{const o=window.innerWidth/2,a=t.index*(o*.05);i=d(a)}let h=!0,c=!0;return t.index==0&&(h=!1,c=!1),{show:X(t,"show"),positionX:i,startX:0,startY:0,isDragging:!1,dragThreshold:3,router:n,draggable:e,setTransition:s,isMobile:r,currentlyInChainMovement:!1,chainMovementStartPosition:0,canMoveLeft:h,canMoveRight:c}},computed:{inlineStyleParent(){let t="100%",e="4.85rem";return!this.show&&!this.isMobile()&&(t="100%",e="0"),this.isMobile()&&(e="unset"),{width:t,height:e}},inlineStyle(){let t="0rem";this.index%2==0&&(t="3rem");let e="4.85rem",i=this.positionX+"px",n="black";return!this.show&&!this.isMobile()&&(e="0",n="transparent",i="30rem",this.workOrInfo=="info"&&(i="3rem")),this.isMobile()&&(e="unset"),{left:i,"background-color":this.color,"border-radius":t,height:e,color:n}}},watch:{globalDragX(t){if(this.currentChain!=this.workOrInfo)return!1;if(this.title=="Kontakt",this.index==0&&(this.canMoveLeft=!1,this.canMoveRight=!1),!this.isDragging){this.globalisInitialChainMove&&(this.chainMovementStartPosition=this.positionX);const e=this.chainMovementStartPosition-t,i=this.previous.getBoundingClientRect();let n=i.left+i.width/2;this.workOrInfo!="work"&&(n=n-window.innerWidth/2);const r=this.next.getBoundingClientRect();r.left+r.width/2;const s=e,l=e+i.width;let h=!0;if(e>this.positionX?this.previous.getAttribute("data-moveright")=="false"&&s>n&&(h=!1):this.previous.getAttribute("data-moveleft")=="false"&&l<n&&(h=!1),s>n?this.canMoveRight=!1:this.canMoveRight=!0,l<n?this.canMoveLeft=!1:this.canMoveLeft=!0,h){const c=this.positionX;this.positionX=this.chainMovementStartPosition-t,this.emitter.emit("movement",{startingX:c,newX:this.positionX,group:this.workOrInfo,index:this.index,movingElement:this.draggable})}}}},created(){this.emitter.on("movement",t=>{if(t.group==this.workOrInfo||t.index!=this.index)return;const e=10,i=t.movingElement.getBoundingClientRect(),n=this.draggable.getBoundingClientRect();i.right+e>n.left-e&&i.left-e<n.right+e&&i.bottom+e>n.top-e&&i.top-e<n.bottom+e;const r=Math.max(0,Math.min(i.right,n.right+e)-Math.max(i.left,n.left-e));this.workOrInfo=="info"?(this.positionX-(this.positionX+r),this.positionX=this.positionX+r):(this.positionX-(this.positionX-r),this.positionX=this.positionX-r);const s=this.previous.getBoundingClientRect();s.left+s.width/2;const l=this.positionX,h=this.positionX+n.width,c=this.next.getBoundingClientRect(),o=c.left+c.width/2;l>o||h<o?(this.currentlyInChainMovement||(this.chainMovementStartPosition=this.positionX),this.currentlyInChainMovement=!0):this.currentlyInChainMovement=!1})},methods:{handleEvent(t){console.log("Received event data:",t)},handleMessage(t){console.log(t)},onClick(t){this.isDragging||this.router.push(this.url)},onMouseDown(t){this.setTransition(!1),this.startX=t.clientX-this.positionX,this.startY=t.clientY,window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("mouseup",this.onMouseUp)},onMouseMove(t){const e=t.clientX-this.startX,i=t.clientY-this.startY;if(Math.sqrt(e*e+i*i)>this.dragThreshold&&(this.isDragging=!0),this.isDragging&&this.index!=0){const n=this.previous.getBoundingClientRect(),r=n.left+n.width/2,s=this.next.getBoundingClientRect(),l=s.left+s.width/2;let h=t.clientX-this.startX,c=t.clientX-this.startX+n.width,o=!0;this.workOrInfo=="info"&&(c=c+window.innerWidth/2,h=h+window.innerWidth/2);let a=!1,u=!1;if(h>r||c<r||h>l||c<l?(a=!0,this.currentlyInChainMovement||(this.chainMovementStartPosition=this.positionX,u=!0),this.currentlyInChainMovement=!0):this.currentlyInChainMovement=!1,t.clientX-this.startX>this.positionX?this.previous.getAttribute("data-moveright")=="false"&&h>r&&(o=!1):this.previous.getAttribute("data-moveleft")=="false"&&c<r&&(o=!1),o){const w=this.positionX;this.positionX=t.clientX-this.startX;const p=this.chainMovementStartPosition-this.positionX;this.emitter.emit("movement",{startingX:w,newX:this.positionX,group:this.workOrInfo,index:this.index,movingElement:this.draggable}),a&&this.$emit("dragging",p,u,this.workOrInfo)}}},onMouseUp(t){this.setTransition(!0),setTimeout(()=>{this.isDragging=!1},500),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("mouseup",this.onMouseUp)}}},R=["data-moveleft","data-moveright"],_=["data-to"],I={key:1};function B(t,e,i,n,r,s){return g(),m("div",{class:"draggable-container",style:v(s.inlineStyleParent)},[y("div",{ref:"draggable",class:"draggable","data-moveleft":n.canMoveLeft?"true":"false","data-moveright":n.canMoveRight?"true":"false",style:v(s.inlineStyle),onMousedown:e[1]||(e[1]=(...l)=>s.onMouseDown&&s.onMouseDown(...l))},[i.url?(g(),m("div",{key:0,"data-to":"/"+i.url,onClick:e[0]||(e[0]=(...l)=>s.onClick&&s.onClick(...l))},f(i.title),9,_)):(g(),m("span",I,f(i.title),1))],44,R)],4)}const S=b(C,[["render",B]]);export{S as _};
