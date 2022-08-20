"use strict";(self.webpackChunkwabel_dashboard=self.webpackChunkwabel_dashboard||[]).push([[805],{805:(F,m,a)=>{a.r(m),a.d(m,{AdminModule:()=>L});var d=a(6019),r=a(7109),p=a(8498),f=a(8239),e=a(3668),h=a(3798),g=a(7236),u=a(7533);function v(t,i){if(1&t){const n=e.EpF();e.TgZ(0,"button",6),e.NdJ("click",function(){return e.CHM(n),e.oxw(2).enable()}),e._uU(1),e.ALo(2,"translate"),e.qZA()}2&t&&(e.xp6(1),e.Oqu(e.lcZ(2,1,"ENABLED")))}function y(t,i){if(1&t){const n=e.EpF();e.TgZ(0,"button",7),e.NdJ("click",function(){return e.CHM(n),e.oxw(2).enable()}),e._uU(1),e.ALo(2,"translate"),e.qZA()}2&t&&(e.xp6(1),e.hij(" ",e.lcZ(2,1,"CREATED")," "))}function b(t,i){if(1&t&&(e.TgZ(0,"div",3),e.YNc(1,v,3,3,"button",4),e.YNc(2,y,3,3,"button",5),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",0==n.user.active),e.xp6(1),e.Q6J("ngIf",1==n.user.active)}}function A(t,i){1&t&&(e.TgZ(0,"div",3),e.TgZ(1,"button",8),e._UZ(2,"i"),e.qZA(),e.qZA()),2&t&&(e.xp6(1),e.Q6J("routerLink","/dashboard/clients/form/edit"),e.xp6(1),e.Tol("fas fa-edit"))}let x=(()=>{class t{constructor(n,o){this.route=n,this.dataService=o}ngOnInit(){var n=this;return(0,f.Z)(function*(){n.getDataId()})()}monthBefore(){const n=new Date;return[...new Array(31).keys()].map((o,l)=>(l&&n.setDate(n.getDate()-1),n.getDate()+" "+n.toString().slice(4,7))).reverse()}getDataId(){this.route.queryParamMap.subscribe(n=>{const o=n.get("id");o&&(this.userId=+o)}),this.getUser()}getUser(){this.dataService.sendGetRequest(this.userId?"admins/"+this.userId:"profile",{}).subscribe({next:o=>{this.user=o},error:o=>{this.profileError=o}})}enable(){console.log(67),this.dataService.sendPutRequest("users/enable/"+this.userId,{}).subscribe({next:n=>{0==this.user.active?this.user.active=1:1==this.user.active&&(this.user.active=0)},error:n=>{console.log(n)}})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(r.gz),e.Y36(h.D))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-admin-display"]],decls:6,vars:7,consts:[[1,"p-4","bg-gray-100","h-full","overflow-auto"],[3,"title","profile","profileError"],["class","header-buttons",4,"ngIf"],[1,"header-buttons"],["type","button","class","outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ",3,"click",4,"ngIf"],["type","button","class","outline-none text-white bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ",3,"click",4,"ngIf"],["type","button",1,"outline-none","text-white","bg-green-700","hover:bg-green-800","font-medium","rounded-lg","text-sm","px-5","py-2.5","mr-2","mb-2",3,"click"],["type","button",1,"outline-none","text-white","bg-red-700","hover:bg-red-800","font-medium","rounded-lg","text-sm","px-5","py-2.5","mr-2","mb-2",3,"click"],[1,"row-btn","color-transition","hover:bg-primary","hover:text-white",3,"routerLink"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"app-display",1),e.ALo(2,"translate"),e.YNc(3,b,3,2,"div",2),e.YNc(4,A,3,3,"div",2),e.qZA(),e._UZ(5,"br"),e.qZA()),2&n&&(e.xp6(1),e.Q6J("title",e.lcZ(2,5,"client_details")+" / "+(o.user?o.user.name:""))("profile",o.user?o.user:null)("profileError",o.profileError),e.xp6(2),e.Q6J("ngIf",o.user&&0==o.user.role),e.xp6(1),e.Q6J("ngIf",o.user&&1==o.user.role))},directives:[g.D,d.O5,r.rH],pipes:[u.X$],styles:[""]}),t})();var s=a(9133),C=a(2911);let w=(()=>{class t{constructor(n){this.route=n,this.headers=[{name:"id",title:"id",hidden:!0,value:""},{name:"name",title:"full_name",type:"text",value:"",validators:[{validatorFn:s.kI.required,message:"full_name_required"}]},{name:"email",title:"email",type:"email",value:"",validators:[{validatorFn:s.kI.required,message:"email_required"},{validatorFn:s.kI.email,message:"email_email"}]},{name:"password",title:"password",type:"password",value:"",validators:[{validatorFn:s.kI.required,message:"password_required"},{validatorFn:s.kI.minLength(8),message:"password_min_ch"}]},{name:"password_confirmation",title:"password_confirmation",type:"password",value:"",validators:[{validatorFn:s.kI.required,message:"password_confirmation_required"},{validatorFn:s.kI.minLength(8),message:"password_confirmation_min_ch"}]},{title:"city",name:"city",type:"text"},{title:"sexe",name:"sexe",type:"text"},{title:"phone_number",name:"phone",type:"phone"}]}ngOnInit(){this.route.paramMap.subscribe(n=>{if("edit"==n.params.type){let o=-1;this.headers.map((l,Z)=>{"password"==l.name&&(o=Z)}),this.headers.splice(o,1),this.headers.splice(o,1)}})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(r.gz))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-admin-form"]],decls:1,vars:1,consts:[["pluralName","admins","singleName","admin","icon","fas fa-users-cog","redirectLink","/dashboard/admins/list","retrieveURL","users/:id","storeURL","admins","updateURL","admins",3,"headers"]],template:function(n,o){1&n&&e._UZ(0,"app-form",0),2&n&&e.Q6J("headers",o.headers)},directives:[C.U],styles:[""]}),t})();var c=a(1892),_=a(8745);const D=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-admin"]],decls:1,vars:0,template:function(n,o){1&n&&e._UZ(0,"router-outlet")},directives:[r.lC],styles:[""]}),t})(),children:[{path:"",redirectTo:"list",pathMatch:"full"},{path:"list",component:(()=>{class t{constructor(){this.headers=[{name:"id",title:"id"},{name:"name",title:"full_name"},{name:"email",title:"email",search:!0},{name:"city",title:"city"},{name:"phone",title:"phone_number"},{name:"created_at",title:"created_at",type:"date"},{name:"active",title:"status",type:"tag",tagsColors:{[c.m.CREATED]:"bg-blue-200",[c.m.ENABLED]:"bg-green-200"}}],this.tableButtons=[{name:"block",title:"block",icon:"fas fa-ban",color:"blue",dataField:"users.id",request:{url:"users",method:"delete"},confirmation:{title:"are_you_sure",text:"block_account_conf_msg",confirmButtonText:"yes",confirmButtonColor:"red",showCancelButton:!0,cancelButtonText:"no",icon:"warning"}}],this.buttons=[]}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-admin-list"]],decls:1,vars:5,consts:[["pluralName","admins","singleName","admin","primaryKey","id","deleteURL","admins/:id","retrieveURL","admin","displayLink","/dashboard/admins/display","editLink","/dashboard/admins/form/edit","createLink","/dashboard/admins/form/create","icon","fas fa-users-cog",3,"headers","rowButtons","tableButtons","showSortFilter","showDeleteButton"]],template:function(n,o){1&n&&e._UZ(0,"app-table",0),2&n&&e.Q6J("headers",o.headers)("rowButtons",o.buttons)("tableButtons",o.tableButtons)("showSortFilter",!1)("showDeleteButton",!1)},directives:[_.a],styles:[""]}),t})(),canActivate:[p.u]},{path:"form/:type",component:w},{path:"display",component:x}]}];let I=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[r.Bz.forChild(D)],r.Bz]}),t})();var T=a(6672);let L=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[d.ez,I,T.G,u.aw]]}),t})()}}]);