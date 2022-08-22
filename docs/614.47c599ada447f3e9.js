"use strict";(self.webpackChunkwabel_dashboard=self.webpackChunkwabel_dashboard||[]).push([[614],{8498:(h,g,a)=>{a.d(g,{u:()=>s});var c=a(3668),m=a(7109);let s=(()=>{class t{constructor(r){this.router=r}canActivate(){if(!window.localStorage.getItem("token"))return this.router.navigateByUrl("/auth"),!1;const r=JSON.parse(localStorage.getItem("user"));return 1==r.role?(this.router.navigateByUrl("/dashboard/clients/display"),!1):!!r}}return t.\u0275fac=function(r){return new(r||t)(c.LFG(m.F0))},t.\u0275prov=c.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},614:(h,g,a)=>{a.r(g),a.d(g,{DashboardModule:()=>S});var c=a(7533),m=a(6672),s=a(6019),t=a(3668),l=a(7321),r=a(4522);let f=(()=>{class o{constructor(n){this.http=n}statistics(){return this.http.get(l.T+"statistics")}getCategories(){return this.http.get(`${l.T}categories`)}getMessages(n,i){return this.http.get(`${l.T}messages/${n}`,{params:i})}getCorrespondents(n){return this.http.get(`${l.T}messages/correspondents`,{params:{role:n}})}}return o.\u0275fac=function(n){return new(n||o)(t.LFG(r.eN))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var v=a(8710);function x(o,e){if(1&o&&(t.TgZ(0,"div",9),t._UZ(1,"app-alert",10),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.Q6J("message",n.error)}}function y(o,e){1&o&&(t.TgZ(0,"span"),t._UZ(1,"i",20),t.qZA())}function Z(o,e){if(1&o&&(t.TgZ(0,"span"),t._uU(1),t.qZA()),2&o){const n=t.oxw().$implicit;t.xp6(1),t.Oqu(n.count)}}function b(o,e){if(1&o&&(t.TgZ(0,"div",13),t.TgZ(1,"div",14),t.TgZ(2,"span",15),t._UZ(3,"i"),t.qZA(),t.TgZ(4,"span",16),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.qZA(),t.TgZ(7,"div",17),t.TgZ(8,"span",18),t.YNc(9,y,2,0,"span",19),t.YNc(10,Z,2,1,"span",19),t.qZA(),t.qZA(),t.qZA()),2&o){const n=e.$implicit,i=t.oxw(2);t.xp6(3),t.Tol(n.icon),t.xp6(2),t.Oqu(t.lcZ(6,5,n.title)),t.xp6(4),t.Q6J("ngIf",i.statisticsLoading),t.xp6(1),t.Q6J("ngIf",!i.statisticsLoading)}}function A(o,e){if(1&o&&(t.TgZ(0,"div",11),t.YNc(1,b,11,7,"div",12),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.Q6J("ngForOf",n.items)}}let T=(()=>{class o{constructor(n){this.dashboardService=n,this.statisticsLoading=!0,this.items=[{title:"admins",icon:"fas fa-users-cog",count:0,name:"admins"},{title:"clients",icon:"fas fa-users",count:0,name:"clients"},{title:"events",icon:"fas fa-calendar-alt",count:0,name:"events"},{title:"articles",icon:"fas fa-newspaper",count:0,name:"articles"},{title:"categories",icon:"fas fa-tags",count:0,name:"categories"},{title:"notifications",icon:"fas fa-bell",count:0,name:"notifications"}]}ngOnInit(){this.getStatistics()}getStatistics(){this.statisticsLoading=!0,this.error=null,this.dashboardService.statistics().subscribe({next:n=>{console.log(n),this.statisticsLoading=!1,this.items=this.items.map(i=>Object.assign(Object.assign({},i),{count:n[i.name?i.name:i.title]})),console.log("statistics done")},error:n=>{console.log(n),this.error=n,this.statisticsLoading=!1}})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(f))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-home"]],decls:14,vars:8,consts:[[1,""],[1,"flex","flex-col","items-center","bg-primary","justify-center","py-20"],[1,"text-7xl","font-bold","text-white"],[1,"block","mt-2"],[1,"bg-white","w-full","px-4","py-2","mt-4"],[1,"text-3xl","uppercase","my-2"],[1,"fa-solid","fa-chart-column","mx-3"],["class","p-4",4,"ngIf"],["class","mt-3 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:grid-cols-4 xl:gap-5",4,"ngIf"],[1,"p-4"],["type","danger",3,"message"],[1,"mt-3","p-4","grid","grid-cols-1","sm:grid-cols-2","lg:grid-cols-3","gap-4","xl:grid-cols-4","xl:gap-5"],["class","border border-gray-400 shadow-lg p-4 rounded-lg",4,"ngFor","ngForOf"],[1,"border","border-gray-400","shadow-lg","p-4","rounded-lg"],[1,"flex","items-center"],[1,"text-5xl","block","text-primary"],[1,"text-2xl","mx-4","block","text-primary","capitalize"],[1,"flex","justify-end","w-full"],[1,"text-secondary","font-bold","block","text-5xl"],[4,"ngIf"],[1,"fas","fa-circle-notch","fa-spin"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"span",2),t.TgZ(3,"span",3),t._uU(4),t.ALo(5,"translate"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(6,"div",4),t.TgZ(7,"span",5),t._UZ(8,"i",6),t._uU(9),t.ALo(10,"translate"),t.qZA(),t._UZ(11,"hr"),t.qZA(),t.YNc(12,x,2,1,"div",7),t.YNc(13,A,2,1,"div",8),t.qZA()),2&n&&(t.xp6(4),t.Oqu(t.lcZ(5,4,"app_name_dashboard")),t.xp6(5),t.Oqu(t.lcZ(10,6,"statistics")),t.xp6(3),t.Q6J("ngIf",i.error),t.xp6(1),t.Q6J("ngIf",i.items&&!i.error))},directives:[s.O5,v.w,s.sg],pipes:[c.X$],styles:[".list-item[_ngcontent-%COMP%]{display:flex;cursor:pointer;align-items:center;padding:.75rem 1rem;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-duration:.3s}.list-item[_ngcontent-%COMP%]:hover{--tw-bg-opacity: 1;background-color:rgba(224,231,255,var(--tw-bg-opacity))}.list-item.selected[_ngcontent-%COMP%]{--tw-bg-opacity: 1;background-color:rgba(0,22,83,var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity))}.map-container[_ngcontent-%COMP%]{padding-bottom:100%}"]}),o})();var d=a(7109),C=a(8239),w=a(6636),M=a(4832);function O(o,e){if(1&o&&(t.TgZ(0,"span",9),t._UZ(1,"img",10),t.TgZ(2,"span",8),t._uU(3),t.qZA(),t.qZA()),2&o){const n=t.oxw();t.xp6(1),t.Q6J("src","./../../../../assets/admin_avatar.png",t.LSH),t.xp6(2),t.Oqu(n.user.name)}}function I(o,e){if(1&o&&(t.TgZ(0,"a",11),t.TgZ(1,"span",8),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"div",12),t._UZ(5,"i"),t.qZA(),t.qZA()),2&o){const n=e.$implicit;t.Q6J("routerLink",n.path),t.xp6(2),t.Oqu(t.lcZ(3,4,n.name)),t.xp6(3),t.Tol(n.icon)}}let N=(()=>{class o{constructor(n,i,u){this.router=n,this.authService=i,this.afAuth=u,this.showNotifications=new t.vpe,this.hideNotifications=new t.vpe,this.showNotification=!1,this.menuItems=[]}ngOnInit(){this.getUser(),this.initMenuItems()}initMenuItems(){0==this.user.role?this.menuItems=[{name:"home",icon:"fas fa-home",path:"/dashboard/home"},{name:"admins",icon:"fas fa-users-cog",path:"/dashboard/admins/"},{name:"clients",icon:"fas fa-users",path:"/dashboard/clients/"},{name:"articles",icon:"fas fa-newspaper",path:"/dashboard/articles/"},{name:"events",icon:"fas fa-calendar-alt",path:"/dashboard/events/"},{name:"notifications",icon:"fas fa-bell",path:"/dashboard/notifications/"},{name:"categories",icon:"fas fa-tags",path:"/dashboard/categories/"}]:1==this.user.role&&(this.menuItems=[{name:"profile",icon:"fas fa-id-badge",path:"/dashboard/clients/display"}])}logout(){var n=this;return(0,C.Z)(function*(){yield n.afAuth.signOut(),n.authService.logout()})()}getUser(){this.user=JSON.parse(localStorage.getItem("user"))}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(d.F0),t.Y36(w.e),t.Y36(M.zQ))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-menu"]],inputs:{showNotification:"showNotification"},outputs:{showNotifications:"showNotifications",hideNotifications:"hideNotifications"},decls:12,vars:5,consts:[[1,"flex"],[1,"h-screen","bg-primary","py-3","relative","top-0","left-0","border","md:border-0","border-gray-600","shadow-2xl"],[1,"w-full"],["class","mt-3 bg-white text-primary flex justify-center py-3 group",4,"ngIf"],["routerLinkActive","active","class","menu-item group",3,"routerLink",4,"ngFor","ngForOf"],[1,"menu-item","group",3,"click"],[1,"px-4","py-3"],[1,"fas","fa-sign-out-alt"],[1,"menu-tooltip","group-hover:scale-100"],[1,"mt-3","bg-white","text-primary","flex","justify-center","py-3","group"],["alt","",1,"w-8","h-8",3,"src"],["routerLinkActive","active",1,"menu-item","group",3,"routerLink"],[1,"py-3","px-4"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.YNc(3,O,4,2,"span",3),t.qZA(),t.TgZ(4,"nav"),t.YNc(5,I,6,6,"a",4),t.TgZ(6,"a",5),t.NdJ("click",function(){return i.logout()}),t.TgZ(7,"span",6),t._UZ(8,"i",7),t.qZA(),t.TgZ(9,"span",8),t._uU(10),t.ALo(11,"translate"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&n&&(t.xp6(3),t.Q6J("ngIf",i.user&&0==i.user.role),t.xp6(2),t.Q6J("ngForOf",i.menuItems),t.xp6(5),t.Oqu(t.lcZ(11,3,"logout")))},directives:[s.O5,s.sg,d.yS,d.Od],pipes:[c.X$],styles:[".menu-item[_ngcontent-%COMP%]{margin:.5rem;display:flex;cursor:pointer;justify-content:space-between;border-radius:1.5rem;--tw-bg-opacity: 1;background-color:rgba(0,22,83,var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity));transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-duration:.3s;transition-timing-function:linear}.menu-item[_ngcontent-%COMP%]:hover{border-radius:.75rem;--tw-bg-opacity: 1;background-color:rgba(255,177,25,var(--tw-bg-opacity))}.menu-item.active[_ngcontent-%COMP%]{--tw-text-opacity: 1;color:rgba(255,177,25,var(--tw-text-opacity))}.menu-item.active[_ngcontent-%COMP%]:hover{--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity))}.menu-tooltip[_ngcontent-%COMP%]{z-index:2001;position:absolute;right:75px;margin-left:auto;margin-right:auto;transform-origin:left;--tw-scale-x: 0;--tw-scale-y: 0;transform:var(--tw-transform);white-space:nowrap;border-radius:.75rem;--tw-bg-opacity: 1;background-color:rgba(0,22,83,var(--tw-bg-opacity));padding:.5rem 1.25rem;--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity));--tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, .25);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-duration:.1s}.notification[_ngcontent-%COMP%]{position:absolute;right:2.5rem;display:flex;height:1.5rem;width:1.5rem;align-items:center;justify-content:center;border-radius:9999px;--tw-bg-opacity: 1;background-color:rgba(255,177,25,var(--tw-bg-opacity));--tw-text-opacity: 1;color:rgba(0,0,0,var(--tw-text-opacity));transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s;transition-duration:.3s}"]}),o})();function U(o,e){1&o&&t._UZ(0,"app-menu")}let L=(()=>{class o{constructor(){this.showMenu=!0,this.showNotification=!1}ngOnInit(){}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-dashboard"]],decls:4,vars:1,consts:[[1,"flex","h-screen","overflow-hidden"],[4,"ngIf"],[1,"h-full","min-h-0","overflow-auto","flex-grow","relative"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0),t.YNc(1,U,1,0,"app-menu",1),t.TgZ(2,"div",2),t._UZ(3,"router-outlet"),t.qZA(),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngIf",i.showMenu))},directives:[s.O5,d.lC,N],styles:[".notification-container[_ngcontent-%COMP%]{z-index:2000}"]}),o})();var p=a(8498);const P=[{path:"",component:L,children:[{path:"",redirectTo:"home",pathMatch:"full"},{path:"home",component:T,canActivate:[p.u]},{path:"clients",loadChildren:()=>Promise.all([a.e(287),a.e(592),a.e(816)]).then(a.bind(a,8816)).then(o=>o.ClientModule)},{path:"admins",loadChildren:()=>Promise.all([a.e(287),a.e(592),a.e(805)]).then(a.bind(a,805)).then(o=>o.AdminModule)},{path:"events",loadChildren:()=>Promise.all([a.e(287),a.e(592),a.e(653)]).then(a.bind(a,7653)).then(o=>o.EventModule)},{path:"articles",loadChildren:()=>Promise.all([a.e(287),a.e(592),a.e(193)]).then(a.bind(a,7193)).then(o=>o.ArticleModule),canActivate:[p.u]},{path:"notifications",loadChildren:()=>Promise.all([a.e(287),a.e(592),a.e(430)]).then(a.bind(a,5430)).then(o=>o.NotificationModule),canActivate:[p.u]},{path:"categories",loadChildren:()=>Promise.all([a.e(287),a.e(602)]).then(a.bind(a,1602)).then(o=>o.CategoryModule),canActivate:[p.u]}]}];let D=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[d.Bz.forChild(P)],d.Bz]}),o})(),S=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=t.oAB({type:o}),o.\u0275inj=t.cJS({imports:[[s.ez,D,m.G,c.aw]]}),o})()}}]);