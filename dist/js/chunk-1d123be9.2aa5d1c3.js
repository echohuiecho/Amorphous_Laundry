(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d123be9"],{"057f":function(e,t,o){var r=o("fc6a"),c=o("241c").f,a={}.toString,n="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],i=function(e){try{return c(e)}catch(t){return n.slice()}};e.exports.f=function(e){return n&&"[object Window]"==a.call(e)?i(e):c(r(e))}},"4de4":function(e,t,o){"use strict";var r=o("23e7"),c=o("b727").filter,a=o("1dde"),n=a("filter");r({target:"Array",proto:!0,forced:!n},{filter:function(e){return c(this,e,arguments.length>1?arguments[1]:void 0)}})},5530:function(e,t,o){"use strict";o.d(t,"a",(function(){return a}));o("b64b"),o("a4d3"),o("4de4"),o("e439"),o("159b"),o("dbb4");function r(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function c(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?c(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}},"746f":function(e,t,o){var r=o("428f"),c=o("5135"),a=o("e538"),n=o("9bf2").f;e.exports=function(e){var t=r.Symbol||(r.Symbol={});c(t,e)||n(t,e,{value:a.f(e)})}},a434:function(e,t,o){"use strict";var r=o("23e7"),c=o("23cb"),a=o("a691"),n=o("50c4"),i=o("7b0b"),l=o("65f0"),d=o("8418"),s=o("1dde"),u=s("splice"),b=Math.max,p=Math.min,m=9007199254740991,f="Maximum allowed length exceeded";r({target:"Array",proto:!0,forced:!u},{splice:function(e,t){var o,r,s,u,h,g,O=i(this),j=n(O.length),y=c(e,j),v=arguments.length;if(0===v?o=r=0:1===v?(o=0,r=j-y):(o=v-2,r=p(b(a(t),0),j-y)),j+o-r>m)throw TypeError(f);for(s=l(O,r),u=0;u<r;u++)h=y+u,h in O&&d(s,u,O[h]);if(s.length=r,o<r){for(u=y;u<j-r;u++)h=u+r,g=u+o,h in O?O[g]=O[h]:delete O[g];for(u=j;u>j-r+o;u--)delete O[u-1]}else if(o>r)for(u=j-r;u>y;u--)h=u+r-1,g=u+o-1,h in O?O[g]=O[h]:delete O[g];for(u=0;u<o;u++)O[u+y]=arguments[u+2];return O.length=j-r+o,s}})},a4d3:function(e,t,o){"use strict";var r=o("23e7"),c=o("da84"),a=o("d066"),n=o("c430"),i=o("83ab"),l=o("4930"),d=o("fdbf"),s=o("d039"),u=o("5135"),b=o("e8b5"),p=o("861d"),m=o("825a"),f=o("7b0b"),h=o("fc6a"),g=o("c04e"),O=o("5c6c"),j=o("7c73"),y=o("df75"),v=o("241c"),V=o("057f"),k=o("7418"),N=o("06cf"),w=o("9bf2"),P=o("d1e7"),T=o("9112"),C=o("6eeb"),x=o("5692"),S=o("f772"),D=o("d012"),U=o("90e3"),M=o("b622"),B=o("e538"),L=o("746f"),_=o("d44e"),E=o("69f3"),I=o("b727").forEach,A=S("hidden"),$="Symbol",F="prototype",q=M("toPrimitive"),G=E.set,J=E.getterFor($),W=Object[F],K=c.Symbol,Q=a("JSON","stringify"),R=N.f,Y=w.f,z=V.f,H=P.f,X=x("symbols"),Z=x("op-symbols"),ee=x("string-to-symbol-registry"),te=x("symbol-to-string-registry"),oe=x("wks"),re=c.QObject,ce=!re||!re[F]||!re[F].findChild,ae=i&&s((function(){return 7!=j(Y({},"a",{get:function(){return Y(this,"a",{value:7}).a}})).a}))?function(e,t,o){var r=R(W,t);r&&delete W[t],Y(e,t,o),r&&e!==W&&Y(W,t,r)}:Y,ne=function(e,t){var o=X[e]=j(K[F]);return G(o,{type:$,tag:e,description:t}),i||(o.description=t),o},ie=d?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof K},le=function(e,t,o){e===W&&le(Z,t,o),m(e);var r=g(t,!0);return m(o),u(X,r)?(o.enumerable?(u(e,A)&&e[A][r]&&(e[A][r]=!1),o=j(o,{enumerable:O(0,!1)})):(u(e,A)||Y(e,A,O(1,{})),e[A][r]=!0),ae(e,r,o)):Y(e,r,o)},de=function(e,t){m(e);var o=h(t),r=y(o).concat(me(o));return I(r,(function(t){i&&!ue.call(o,t)||le(e,t,o[t])})),e},se=function(e,t){return void 0===t?j(e):de(j(e),t)},ue=function(e){var t=g(e,!0),o=H.call(this,t);return!(this===W&&u(X,t)&&!u(Z,t))&&(!(o||!u(this,t)||!u(X,t)||u(this,A)&&this[A][t])||o)},be=function(e,t){var o=h(e),r=g(t,!0);if(o!==W||!u(X,r)||u(Z,r)){var c=R(o,r);return!c||!u(X,r)||u(o,A)&&o[A][r]||(c.enumerable=!0),c}},pe=function(e){var t=z(h(e)),o=[];return I(t,(function(e){u(X,e)||u(D,e)||o.push(e)})),o},me=function(e){var t=e===W,o=z(t?Z:h(e)),r=[];return I(o,(function(e){!u(X,e)||t&&!u(W,e)||r.push(X[e])})),r};if(l||(K=function(){if(this instanceof K)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=U(e),o=function(e){this===W&&o.call(Z,e),u(this,A)&&u(this[A],t)&&(this[A][t]=!1),ae(this,t,O(1,e))};return i&&ce&&ae(W,t,{configurable:!0,set:o}),ne(t,e)},C(K[F],"toString",(function(){return J(this).tag})),C(K,"withoutSetter",(function(e){return ne(U(e),e)})),P.f=ue,w.f=le,N.f=be,v.f=V.f=pe,k.f=me,B.f=function(e){return ne(M(e),e)},i&&(Y(K[F],"description",{configurable:!0,get:function(){return J(this).description}}),n||C(W,"propertyIsEnumerable",ue,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!l,sham:!l},{Symbol:K}),I(y(oe),(function(e){L(e)})),r({target:$,stat:!0,forced:!l},{for:function(e){var t=String(e);if(u(ee,t))return ee[t];var o=K(t);return ee[t]=o,te[o]=t,o},keyFor:function(e){if(!ie(e))throw TypeError(e+" is not a symbol");if(u(te,e))return te[e]},useSetter:function(){ce=!0},useSimple:function(){ce=!1}}),r({target:"Object",stat:!0,forced:!l,sham:!i},{create:se,defineProperty:le,defineProperties:de,getOwnPropertyDescriptor:be}),r({target:"Object",stat:!0,forced:!l},{getOwnPropertyNames:pe,getOwnPropertySymbols:me}),r({target:"Object",stat:!0,forced:s((function(){k.f(1)}))},{getOwnPropertySymbols:function(e){return k.f(f(e))}}),Q){var fe=!l||s((function(){var e=K();return"[null]"!=Q([e])||"{}"!=Q({a:e})||"{}"!=Q(Object(e))}));r({target:"JSON",stat:!0,forced:fe},{stringify:function(e,t,o){var r,c=[e],a=1;while(arguments.length>a)c.push(arguments[a++]);if(r=t,(p(t)||void 0!==e)&&!ie(e))return b(t)||(t=function(e,t){if("function"==typeof r&&(t=r.call(this,e,t)),!ie(t))return t}),c[1]=t,Q.apply(null,c)}})}K[F][q]||T(K[F],q,K[F].valueOf),_(K,$),D[A]=!0},dbb4:function(e,t,o){var r=o("23e7"),c=o("83ab"),a=o("56ef"),n=o("fc6a"),i=o("06cf"),l=o("8418");r({target:"Object",stat:!0,sham:!c},{getOwnPropertyDescriptors:function(e){var t,o,r=n(e),c=i.f,d=a(r),s={},u=0;while(d.length>u)o=c(r,t=d[u++]),void 0!==o&&l(s,t,o);return s}})},e01a:function(e,t,o){"use strict";var r=o("23e7"),c=o("83ab"),a=o("da84"),n=o("5135"),i=o("861d"),l=o("9bf2").f,d=o("e893"),s=a.Symbol;if(c&&"function"==typeof s&&(!("description"in s.prototype)||void 0!==s().description)){var u={},b=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof b?new s(e):void 0===e?s():s(e);return""===e&&(u[t]=!0),t};d(b,s);var p=b.prototype=s.prototype;p.constructor=b;var m=p.toString,f="Symbol(test)"==String(s("test")),h=/^Symbol\((.*)\)[^)]+$/;l(p,"description",{configurable:!0,get:function(){var e=i(this)?this.valueOf():this,t=m.call(e);if(n(u,e))return"";var o=f?t.slice(7,-1):t.replace(h,"$1");return""===o?void 0:o}}),r({global:!0,forced:!0},{Symbol:b})}},e439:function(e,t,o){var r=o("23e7"),c=o("d039"),a=o("fc6a"),n=o("06cf").f,i=o("83ab"),l=c((function(){n(1)})),d=!i||l;r({target:"Object",stat:!0,forced:d,sham:!i},{getOwnPropertyDescriptor:function(e,t){return n(a(e),t)}})},e538:function(e,t,o){var r=o("b622");t.f=r},f4fc:function(e,t,o){"use strict";o.r(t);var r=o("7a23"),c={class:"container mt-5"},a={class:"d-flex justify-content-between align-content-center mb-3"},n=Object(r["createVNode"])("h1",{class:"h3 text-uppercase m-0"}," All products ",-1),i=Object(r["createVNode"])("i",{class:"material-icons"},"add",-1),l=Object(r["createVNode"])("span",null," create product ",-1),d={class:"card product-card border border-gray-600 rounded-0"},s={class:"card-body bg-gray-700"},u={class:"table table-hover mt-4"},b=Object(r["createVNode"])("thead",null,[Object(r["createVNode"])("tr",null,[Object(r["createVNode"])("th",{class:"table-title-hk text-start"},"Product Title"),Object(r["createVNode"])("th",{class:"table-title-hk text-start",width:"120"},"Category"),Object(r["createVNode"])("th",{class:"table-title-hk text-start",width:"120"},"Cost"),Object(r["createVNode"])("th",{class:"table-title-hk text-start",width:"120"},"Selling Price"),Object(r["createVNode"])("th",{class:"table-title-hk text-start",width:"150"},"Enable"),Object(r["createVNode"])("th",{class:"table-title-hk text-end",width:"80"},"Edit"),Object(r["createVNode"])("th",{class:"table-title-hk text-end",width:"80"},"Delete")])],-1),p={class:"text-start"},m={class:"text-start",width:"120"},f={class:"text-start",width:"120"},h={class:"text-start",width:"120"},g={class:"text-start"},O={class:"text-end"},j=Object(r["createVNode"])("i",{class:"material-icons"},"edit",-1),y={class:"text-end"},v=Object(r["createVNode"])("i",{class:"material-icons"},"close",-1);function V(e,t,o,V,k,N){var w=Object(r["resolveComponent"])("Pagination"),P=Object(r["resolveComponent"])("ProductModal"),T=Object(r["resolveComponent"])("DeleteModal");return Object(r["openBlock"])(),Object(r["createBlock"])(r["Fragment"],null,[Object(r["createVNode"])("div",c,[Object(r["createVNode"])("div",a,[n,Object(r["createVNode"])("button",{type:"button",class:"btn btn-secondary rounded-0\n      d-flex align-items-center text-gray-400 text-uppercase",onClick:t[1]||(t[1]=function(e){return N.openModal("addProduct")})},[i,l])]),Object(r["createVNode"])("div",d,[Object(r["createVNode"])("div",s,[Object(r["createVNode"])("table",u,[b,Object(r["createVNode"])("tbody",null,[(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(k.products,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])("tr",{key:e.id},[Object(r["createVNode"])("td",p,Object(r["toDisplayString"])(e.title),1),Object(r["createVNode"])("td",m,Object(r["toDisplayString"])(e.category),1),Object(r["createVNode"])("td",f,Object(r["toDisplayString"])(e.origin_price),1),Object(r["createVNode"])("td",h,Object(r["toDisplayString"])(e.price),1),Object(r["createVNode"])("td",g,Object(r["toDisplayString"])("1"===e.is_enabled?"Enabled":"Disabled"),1),Object(r["createVNode"])("td",O,[Object(r["createVNode"])("button",{type:"button",id:"editProduct",class:"btn btn-light btn-outline-primary","data-id":e.id,onClick:function(t){return N.openModal("editProduct",e)}},[j],8,["data-id","onClick"])]),Object(r["createVNode"])("td",y,[Object(r["createVNode"])("button",{type:"button",id:"removeProduct",class:"btn btn-light btn-outline-primary","data-action":"remove","data-id":e.id,onClick:function(t){return N.openModal("deleteProduct",e)}},[v],8,["data-id","onClick"])])])})),128))])])])])]),Object(r["createVNode"])(w,{page:k.paginationData,onGetData:N.getProducts},null,8,["page","onGetData"]),Object(r["createVNode"])(P,{ref:"ProductModal",temp:k.temp,"modal-type":k.modalType,onSuccessAlert:N.successAlert},null,8,["temp","modal-type","onSuccessAlert"]),Object(r["createVNode"])(T,{ref:"DeleteModal",temp:k.temp,"modal-type":k.modalType,onGetData:N.getProducts},null,8,["temp","modal-type","onGetData"])],64)}var k=o("5530"),N=(o("99af"),o("29e4")),w=(o("a4d3"),o("e01a"),{class:"modal fade",ref:"ProductModal",tabindex:"-1","aria-labelledby":"ProductModalLabel","aria-hidden":"true"}),P={class:"modal-dialog modal-form modal-dialog-centered modal-dialog-scrollable"},T={class:"modal-content bg-body"},C={class:"modal-header form-modal-header"},x={key:0,class:"h3"},S={key:1,class:"h3"},D=Object(r["createVNode"])("i",{class:"material-icons"},"close",-1),U={class:"modal-body"},M=Object(r["createVNode"])("div",{class:"modal-title-hk w-100 text-end"}," *Compulsory fields ",-1),B={class:"input-group mb-3"},L=Object(r["createVNode"])("label",{for:"productTitle",class:"modal-title-hk w-100 mb-2"},"Product Title*",-1),_={class:"input-group mb-3"},E=Object(r["createVNode"])("label",{for:"productCategory",class:"modal-title-hk w-100 mb-2"},"Product Category*",-1),I=Object(r["createVNode"])("option",{value:"",disabled:""},"Please Choose",-1),A={class:"input-group mb-3"},$=Object(r["createVNode"])("label",{for:"productColor",class:"modal-title-hk w-100 mb-2"},"Color*",-1),F=Object(r["createVNode"])("option",{value:"",disabled:""},"Please Choose",-1),q={class:"input-group mb-3"},G=Object(r["createVNode"])("label",{for:"productUnit",class:"modal-title-hk w-100 mb-2"},"Product Unit*",-1),J={class:"input-group mb-3"},W=Object(r["createVNode"])("label",{for:"productOriginPrice",class:"modal-title-hk w-100 mb-2"},"Original Price*",-1),K={class:"input-group mb-3"},Q=Object(r["createVNode"])("label",{for:"productPrice",class:"modal-title-hk w-100 mb-2"},"Selling Price*",-1),R={class:"input-group mb-3"},Y=Object(r["createVNode"])("label",{for:"productDescription",class:"modal-title-hk w-100 mb-2"},"Description",-1),z={class:"input-group mb-3"},H=Object(r["createVNode"])("label",{for:"productContent",class:"modal-title-hk w-100 mb-2"},"Content",-1),X={class:"input-group mb-3"},Z=Object(r["createVNode"])("label",{for:"productMainImageUrl",class:"modal-title-hk w-100 mb-2"}," Product Key Image ",-1),ee={class:"w-100"},te={for:"'url' + index",class:"modal-title-hk w-100 mb-2"},oe={class:"w-100"},re={class:"w-100"},ce=Object(r["createVNode"])("label",{for:"wetCleaning",class:"modal-title-hk w-100 mb-2"},"Dry Clean Service",-1),ae={class:"input-group form-check form-switch d-flex align-items-center mb-3"},ne={class:"form-check-label modal-title-hk ml-2",for:"wetCleaning"},ie=Object(r["createVNode"])("label",{for:"dryCleaning",class:"modal-title-hk w-100 mb-2"},"Wet Clean Service",-1),le={class:"input-group form-check form-switch d-flex align-items-center mb-3"},de={class:"form-check-label modal-title-hk ml-2",for:"dryCleaning"},se=Object(r["createVNode"])("label",{for:"ironing",class:"modal-title-hk w-100 mb-2"},"Ironing Service",-1),ue={class:"input-group form-check form-switch d-flex align-items-center mb-3"},be={class:"form-check-label modal-title-hk ml-2",for:"ironing"},pe=Object(r["createVNode"])("label",{for:"dirtService",class:"modal-title-hk w-100 mb-2"},"Dirt Removal Service",-1),me={class:"input-group form-check form-switch d-flex align-items-center mb-3"},fe={class:"form-check-label modal-title-hk ml-2",for:"dirtService"},he={class:"input-group form-check form-switch d-flex align-items-center mb-3"},ge={class:"form-check-label modal-title-hk ml-2",for:"productIsEnable"},Oe={class:"modal-footer product-modal-footer"},je={key:0,class:"spinner-grow spinner-grow-sm me-2",role:"status"},ye=Object(r["createVNode"])("span",{class:"visually-hidden"},"Loading...",-1),ve=Object(r["createTextVNode"])(" Add Product "),Ve={key:0,class:"spinner-grow spinner-grow-sm me-2",role:"status"},ke=Object(r["createVNode"])("span",{class:"visually-hidden"},"Loading...",-1),Ne=Object(r["createTextVNode"])(" Update Product ");function we(e,t,o,c,a,n){var i=Object(r["resolveComponent"])("Field"),l=Object(r["resolveComponent"])("ErrorMessage"),d=Object(r["resolveComponent"])("Form");return Object(r["openBlock"])(),Object(r["createBlock"])("div",w,[Object(r["createVNode"])("div",P,[Object(r["createVNode"])("div",T,[Object(r["createVNode"])("div",C,["addProduct"===o.modalType?(Object(r["openBlock"])(),Object(r["createBlock"])("h1",x," Add New Product ")):(Object(r["openBlock"])(),Object(r["createBlock"])("h1",S," Edit Product ")),Object(r["createVNode"])("button",{type:"button",class:"btn p-0","aria-label":"Close",disabled:a.isLoading,onClick:t[1]||(t[1]=function(){return n.closeModal&&n.closeModal.apply(n,arguments)})},[D],8,["disabled"])]),Object(r["createVNode"])("div",U,[Object(r["createVNode"])(d,{id:"productForm",onSubmit:t[19]||(t[19]=function(e){return n.updateProduct(o.modalType)})},{default:Object(r["withCtx"])((function(e){var c=e.errors;return[M,Object(r["createVNode"])("div",B,[L,Object(r["createVNode"])(i,{id:"productTitle",type:"text",name:"Title",class:["form-control product-modal-form-control",{"is-invalid":c["Title"]}],placeholder:"Please type the product title here","aria-label":"Product title input","aria-describedby":"productTitleLabel",rules:"required",modelValue:a.productTemp.title,"onUpdate:modelValue":t[2]||(t[2]=function(e){return a.productTemp.title=e})},null,8,["class","modelValue"]),Object(r["createVNode"])(l,{name:"Title",class:"invalid-feedback"})]),Object(r["createVNode"])("div",_,[E,Object(r["createVNode"])(i,{id:"productCategory",name:"Category",as:"select",class:["form-control product-modal-form-control",{"is-invalid":c["Category"]}],rules:"required",modelValue:a.productTemp.category,"onUpdate:modelValue":t[3]||(t[3]=function(e){return a.productTemp.category=e})},{default:Object(r["withCtx"])((function(){return[I,(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(a.category,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])("option",{value:e,key:e},Object(r["toDisplayString"])(e),9,["value"])})),128))]})),_:2},1032,["class","modelValue"]),Object(r["createVNode"])(l,{name:"Category",class:"invalid-feedback"})]),Object(r["createVNode"])("div",A,[$,Object(r["createVNode"])(i,{id:"productColor",name:"Product Color",as:"select",class:["form-control product-modal-form-control",{"is-invalid":c["Product Color"]}],rules:"required",modelValue:a.productTemp.colorType,"onUpdate:modelValue":t[4]||(t[4]=function(e){return a.productTemp.colorType=e})},{default:Object(r["withCtx"])((function(){return[F,(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],null,Object(r["renderList"])(a.colorType,(function(e){return Object(r["openBlock"])(),Object(r["createBlock"])("option",{value:e,key:e},Object(r["toDisplayString"])(e),9,["value"])})),128))]})),_:2},1032,["class","modelValue"]),Object(r["createVNode"])(l,{name:"Product Color",class:"invalid-feedback"})]),Object(r["createVNode"])("div",q,[G,Object(r["createVNode"])(i,{id:"productUnit",name:"Product Unit",type:"text",class:["form-control product-modal-form-control",{"is-invalid":c["Product Unit"]}],placeholder:"Type the Product unit","aria-label":"Product unit input","aria-describedby":"productUnitLabel",rules:"required",modelValue:a.productTemp.unit,"onUpdate:modelValue":t[5]||(t[5]=function(e){return a.productTemp.unit=e})},null,8,["class","modelValue"]),Object(r["createVNode"])(l,{name:"Product Unit",class:"invalid-feedback"})]),Object(r["createVNode"])("div",J,[W,Object(r["createVNode"])(i,{id:"productOriginPrice",name:"Original Price",type:"number",min:"0",class:["form-control product-modal-form-control",{"is-invalid":c["Original Price"]}],rules:"required","aria-label":"Product original price input","aria-describedby":"productOriginPriceLabel",modelValue:a.productTemp.origin_price,"onUpdate:modelValue":t[6]||(t[6]=function(e){return a.productTemp.origin_price=e}),modelModifiers:{number:!0}},null,8,["class","modelValue"]),Object(r["createVNode"])(l,{name:"Original Price",class:"invalid-feedback"})]),Object(r["createVNode"])("div",K,[Q,Object(r["createVNode"])(i,{id:"productPrice",name:"Price",type:"number",min:"0",class:["form-control product-modal-form-control",{"is-invalid":c["Price"]}],"aria-label":"Product price input","aria-describedby":"productPriceLabel",rules:"required",modelValue:a.productTemp.price,"onUpdate:modelValue":t[7]||(t[7]=function(e){return a.productTemp.price=e}),modelModifiers:{number:!0}},null,8,["class","modelValue"]),Object(r["createVNode"])(l,{name:"Price",class:"invalid-feedback"})]),Object(r["createVNode"])("div",R,[Y,Object(r["withDirectives"])(Object(r["createVNode"])("textarea",{id:"productDescription",name:"Description",as:"textarea",class:"form-control w-100",rows:"5",placeholder:"Please type the product description here","aria-label":"Product description","aria-describedby":"productDescriptionLabel","onUpdate:modelValue":t[8]||(t[8]=function(e){return a.productTemp.description=e})},null,512),[[r["vModelText"],a.productTemp.description]])]),Object(r["createVNode"])("div",z,[H,Object(r["withDirectives"])(Object(r["createVNode"])("textarea",{name:"",id:"productContent",class:"form-control w-100",rows:"10",placeholder:"Please type the product content here","aria-label":"Product content","aria-describedby":"productContentLabel","onUpdate:modelValue":t[9]||(t[9]=function(e){return a.productTemp.content=e})},null,512),[[r["vModelText"],a.productTemp.content]])]),Object(r["createVNode"])("div",X,[Z,Object(r["createVNode"])("img",{class:"productImage mb-2",src:a.productTemp.imageUrl,alt:""},null,8,["src"]),Object(r["withDirectives"])(Object(r["createVNode"])("input",{type:"text",id:"productMainImageUrl",class:"form-control w-100 mb-2",placeholder:"Image address url","aria-label":"Product main image url input","aria-describedby":"productMainImageUrlLabel","onUpdate:modelValue":t[10]||(t[10]=function(e){return a.productTemp.imageUrl=e})},null,512),[[r["vModelText"],a.productTemp.imageUrl]]),Object(r["createVNode"])("div",ee,[Object(r["createVNode"])("button",{type:"button",class:"btn btn-gray-dark mb-2",onClick:t[11]||(t[11]=function(e){return n.openUploadModal("key image")})}," Browse Image ")])]),a.productTemp.imagesUrl.length>0?(Object(r["openBlock"])(!0),Object(r["createBlock"])(r["Fragment"],{key:0},Object(r["renderList"])(a.productTemp.imagesUrl,(function(e,t){return Object(r["openBlock"])(),Object(r["createBlock"])("div",{class:"input-group mb-3",key:"url"+t},[Object(r["createVNode"])("label",te," Product Image"+Object(r["toDisplayString"])(t+1),1),Object(r["createVNode"])("img",{class:"productImage mb-2",src:a.productTemp.imagesUrl[t],alt:""},null,8,["src"]),Object(r["withDirectives"])(Object(r["createVNode"])("input",{type:"text",id:"url"+t,class:"form-control w-100 mb-2",placeholder:"輸入主要圖片連結","aria-label":"Product image url input","aria-describedby":"productImageUrlLabel","onUpdate:modelValue":function(e){return a.productTemp.imagesUrl[t]=e}},null,8,["id","onUpdate:modelValue"]),[[r["vModelText"],a.productTemp.imagesUrl[t]]]),Object(r["createVNode"])("div",oe,[Object(r["createVNode"])("button",{type:"button",class:"btn btn-gray-dark mb-2",onClick:function(e){return n.openUploadModal("image",t)}}," Browse Image ",8,["onClick"])]),Object(r["createVNode"])("div",re,[Object(r["createVNode"])("button",{type:"button",class:"btn btn-gray-dark mb-2",onClick:function(e){return n.removeImage(t)}}," Delete Image ",8,["onClick"])])])})),128)):Object(r["createCommentVNode"])("",!0),Object(r["createVNode"])("button",{type:"button",class:"btn btn-gray-dark mb-3",onClick:t[12]||(t[12]=function(e){return a.productTemp.imagesUrl.push("")})}," Add Image "),ce,Object(r["createVNode"])("div",ae,[Object(r["withDirectives"])(Object(r["createVNode"])("input",{type:"checkbox",id:"wetCleaning",class:"form-check-input","aria-label":"Enable or disable wet cleaning service","aria-describedby":"productIsEnabledLabel","onUpdate:modelValue":t[13]||(t[13]=function(e){return a.productTemp.wetCleaning=e})},null,512),[[r["vModelCheckbox"],a.productTemp.wetCleaning]]),Object(r["createVNode"])("label",ne,Object(r["toDisplayString"])(a.productTemp.wetCleaning?"Provided":"Not Provided"),1)]),ie,Object(r["createVNode"])("div",le,[Object(r["withDirectives"])(Object(r["createVNode"])("input",{type:"checkbox",id:"dryCleaning",class:"form-check-input","aria-label":"Enable or disable wet cleaning service","aria-describedby":"productIsEnabledLabel","onUpdate:modelValue":t[14]||(t[14]=function(e){return a.productTemp.dryCleaning=e})},null,512),[[r["vModelCheckbox"],a.productTemp.dryCleaning]]),Object(r["createVNode"])("label",de,Object(r["toDisplayString"])(a.productTemp.dryCleaning?"Provided":"Not Provided"),1)]),se,Object(r["createVNode"])("div",ue,[Object(r["withDirectives"])(Object(r["createVNode"])("input",{type:"checkbox",id:"ironing",class:"form-check-input","aria-label":"Enable or disable wet cleaning service","aria-describedby":"productIsEnabledLabel","onUpdate:modelValue":t[15]||(t[15]=function(e){return a.productTemp.ironing=e})},null,512),[[r["vModelCheckbox"],a.productTemp.ironing]]),Object(r["createVNode"])("label",be,Object(r["toDisplayString"])(a.productTemp.ironing?"Provided":"Not Provided"),1)]),pe,Object(r["createVNode"])("div",me,[Object(r["withDirectives"])(Object(r["createVNode"])("input",{type:"checkbox",id:"dirtService",class:"form-check-input","aria-label":"Enable or disable wet cleaning service","aria-describedby":"productIsEnabledLabel","onUpdate:modelValue":t[16]||(t[16]=function(e){return a.productTemp.dirtService=e})},null,512),[[r["vModelCheckbox"],a.productTemp.dirtService]]),Object(r["createVNode"])("label",fe,Object(r["toDisplayString"])(a.productTemp.dirtService?"Provided":"Not Provided"),1)]),Object(r["createVNode"])("div",he,[Object(r["withDirectives"])(Object(r["createVNode"])("input",{type:"checkbox",id:"productIsEnable",class:"form-check-input","aria-label":"Enable or disable product","aria-describedby":"productIsEnabledLabel","onUpdate:modelValue":t[17]||(t[17]=function(e){return a.productTemp.is_enabled=e})},null,512),[[r["vModelCheckbox"],a.productTemp.is_enabled]]),Object(r["createVNode"])("label",ge,Object(r["toDisplayString"])(a.productTemp.is_enabled?"Enabled":"Disabled"),1)]),Object(r["createVNode"])("div",Oe,[Object(r["createVNode"])("button",{type:"button",class:"btn btn-secondary text-gray-400 rounded-0 btn-md",onClick:t[18]||(t[18]=function(){return n.closeModal&&n.closeModal.apply(n,arguments)})}," Cancel "),"addProduct"===o.modalType?(Object(r["openBlock"])(),Object(r["createBlock"])("button",{key:0,type:"submit",class:"btn btn-primary rounded-0 btn-md",disabled:a.isLoading},[a.isLoading?(Object(r["openBlock"])(),Object(r["createBlock"])("div",je,[ye])):Object(r["createCommentVNode"])("",!0),ve],8,["disabled"])):(Object(r["openBlock"])(),Object(r["createBlock"])("button",{key:1,type:"submit",class:"btn btn-primary rounded-0 btn-md",disabled:a.isLoading},[a.isLoading?(Object(r["openBlock"])(),Object(r["createBlock"])("div",Ve,[ke])):Object(r["createCommentVNode"])("",!0),Ne],8,["disabled"]))])]})),_:1})])])])],512)}o("a434");var Pe=o("7c2b"),Te=o.n(Pe),Ce={props:["temp","modalType"],data:function(){return{modal:"",category:["Clothes","Bags","Shoes","Soft Toys","Beddings"],colorType:["Color","White"],productTemp:{imagesUrl:[]},isLoading:!1}},watch:{temp:function(){this.productTemp=this.temp,void 0===this.productTemp.imagesUrl&&(this.productTemp.imagesUrl=[]),this.productTemp.is_enabled="1"===this.temp.is_enabled}},methods:{openModal:function(){this.modal.show()},closeModal:function(){this.modal.hide()},openUploadModal:function(e,t){var o=this,r="";switch(this.productTemp.category){case"Clothes":r="2021_Amorphous_hotel/Clothes";break;case"Bags":r="2021_Amorphous_hotel/Bags";break;case"Shoes":r="2021_Amorphous_hotel/Shoes";break;case"Soft Toys":r="2021_Amorphous_hotel/Soft-toys";break;case"Beddings":r="2021_Amorphous_hotel/Clothings";break;default:console.log("cannot match the product category");break}window.cloudinary.openUploadWidget({cloud_name:"echohui",upload_preset:"wqrjfdlf",folder:r},(function(r,c){!r&&c&&"success"===c.event&&(console.log("Done uploading..: ",c.info),"key image"===e?o.productTemp.imageUrl=c.info.url:o.productTemp.imagesUrl[t]=c.info.url)})).open()},removeImage:function(e){this.productTemp.imagesUrl.splice(e,1)},updateProduct:function(e){var t=this,o="".concat("https://vue3-course-api.hexschool.io/","api/").concat("vue3-echohui","/admin/product"),r="post";"editProduct"===e&&(o="".concat(o,"/").concat(this.productTemp.id),r="put"),this.productTemp.is_enabled=this.productTemp.is_enabled?"1":"0",this.isLoading=!0,this.$http[r](o,{data:this.productTemp}).then((function(e){console.log(e),e.data.success?(t.closeModal(),t.$emit("success-alert")):alert(e.data.message),t.isLoading=!1})).catch((function(e){console.log(e),t.isLoading=!1}))}},mounted:function(){this.modal=new Te.a(this.$refs.ProductModal,{keyboard:!1,backdrop:"static"})}};Ce.render=we;var xe=Ce,Se=o("1843"),De={data:function(){return{products:[],paginationData:"",temp:{imagesUrl:[]},modalType:""}},components:{Pagination:N["a"],DeleteModal:Se["a"],ProductModal:xe},methods:{getProducts:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,o=this.$loading.show(),r="".concat("https://vue3-course-api.hexschool.io/","api/").concat("vue3-echohui","/admin/products?page=").concat(t);this.$http.get(r).then((function(t){t.data.success?(e.products=t.data.products,e.paginationData=t.data.pagination):alert(t.data.message),o.hide()})).catch((function(e){console.log(e),o.hide()}))},openModal:function(e,t){switch(this.temp="addProduct"===e?{title:"",category:"",productType:"",colorType:"",unit:"",origin_price:0,price:0}:Object(k["a"])({},t),this.modalType=e,e){case"addProduct":this.$refs.ProductModal.openModal();break;case"editProduct":this.$refs.ProductModal.openModal();break;case"deleteProduct":this.$refs.DeleteModal.openModal();break;default:console.log("Cannot match the modal type")}},successAlert:function(){this.$swal({position:"top-end",icon:"success",iconColor:"#000000",title:"Your product has been saved",showConfirmButton:!1,timer:1500}),this.getProducts()}},mounted:function(){console.clear(),this.getProducts()}};De.render=V;t["default"]=De}}]);
//# sourceMappingURL=chunk-1d123be9.2aa5d1c3.js.map