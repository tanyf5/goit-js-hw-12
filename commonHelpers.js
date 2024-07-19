import{a as m,S as L,i as n}from"./assets/vendor-b0d10f48.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const M="https://pixabay.com/api/",w="43864553-6e6fc803e67c38d9a685f3364",y=15;m.defaults.baseURL=M;const h=async(r,i)=>{try{return(await m({params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:y}})).data}catch(s){console.log(s)}},g=r=>r.map(({webformatURL:i,largeImageURL:s,tags:d,likes:e,views:o,comments:l,downloads:b})=>`<li class="gallery-item">
          <a class="gallery-link" href="${s}">
            <img
              class="gallery-image"
              src="${i}"
              alt="${d}"
            />
          </a>
          <ul class="description">
            <li class="description-item">
              <h3>Likes</h3>
              <p>${e}</p>
            </li>
            <li class="description-item">
              <h3>Views</h3>
              <p>${o}</p>
            </li>
            <li class="description-item">
              <h3>Comments</h3>
              <p>${l}</p>
            </li>
            <li class="description-item">
              <h3>Downloads</h3>
              <p>${b}</p>
            </li>
          </ul>
        </li>`).join(""),t={form:document.querySelector(".form"),input:document.querySelector("input"),loadMoreBtn:document.querySelector(".loadBtn"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")};let p=null,u=null,a=1;const c=new L(".gallery a");c.options.captionsData="alt";c.options.captionDelay=250;const S=async r=>{if(r.preventDefault(),a=1,p=t.input.value.trim(),t.gallery.innerHTML="",!p){n.error({message:"Field can not be empty",position:"topRight",timeout:2e3}),t.loadMoreBtn.style="display:none";return}try{t.loader.style="display:block";const{hits:i,total:s}=await h(p,a);setTimeout(()=>{if(t.loader.style="display:none",!i.length){n.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight",timeout:2e3});return}t.gallery.innerHTML=g(i),u=Math.ceil(s/y),u>1?t.loadMoreBtn.style="display:block":t.loadMoreBtn.style="display:none",c.refresh()},500)}catch{n.error({title:"Error!",message:"An error occurred while loading more photos.",position:"topRight",timeout:2e3})}t.form.reset()},v=()=>{const r=t.gallery.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:r,left:0,behavior:"smooth"})},f=async()=>{a+=1;try{t.loader.style="display:block";const{hits:r}=await h(p,a);setTimeout(()=>{t.loader.style="display:none",t.gallery.insertAdjacentHTML("beforeend",g(r)),v(),a>=u&&(t.loadMoreBtn.style="display:none",t.loadMoreBtn.removeEventListener("click",f),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3})),c.refresh()},500)}catch{n.error({title:"Error!",message:"An error occurred while loading more photos.",position:"topRight",timeout:2e3})}};t.form.addEventListener("submit",S);t.loadMoreBtn.addEventListener("click",f);c.on("show.simplelightbox",()=>{});
//# sourceMappingURL=commonHelpers.js.map
