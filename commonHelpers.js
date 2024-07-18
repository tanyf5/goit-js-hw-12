import{a as y,S as L,i as p}from"./assets/vendor-b0d10f48.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const M="https://pixabay.com/api/",S="43864553-6e6fc803e67c38d9a685f3364",m=15;y.defaults.baseURL=M;const h=async(r,s)=>{try{return(await y({params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:m}})).data}catch(i){console.log(i)}},g=r=>r.map(({webformatURL:s,largeImageURL:i,tags:c,likes:e,views:o,comments:l,downloads:b})=>`<li class="gallery-item">
          <a class="gallery-link" href="${i}">
            <img
              class="gallery-image"
              src="${s}"
              alt="${c}"
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
        </li>`).join(""),t={form:document.querySelector(".form"),input:document.querySelector("input"),loadMoreBtn:document.querySelector(".loadBtn"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")};let d=null,u=null,n=1;const a=new L(".gallery a");a.options.captionsData="alt";a.options.captionDelay=250;const v=async r=>{if(r.preventDefault(),n=1,d=t.input.value.trim(),t.gallery.innerHTML="",!d){p.error({message:"Field can not be empty",position:"topRight",timeout:2e3}),t.loadMoreBtn.style="display:none";return}try{t.loader.style="display:block";const{hits:s,total:i}=await h(d,n);setTimeout(()=>{if(t.loader.style="display:none",!s.length){p.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight",timeout:2e3});return}t.gallery.innerHTML=g(s),u=Math.ceil(i/m),u>1?t.loadMoreBtn.style="display:block":t.loadMoreBtn.style="display:none",a.refresh()},500)}catch{}t.form.reset()},w=()=>{const r=t.gallery.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({top:r,left:0,behavior:"smooth"})},f=async()=>{n+=1;try{t.loader.style="display:block";const{hits:r}=await h(d,n);setTimeout(()=>{t.loader.style="display:none",t.gallery.insertAdjacentHTML("beforeend",g(r)),w(),n>=u&&(t.loadMoreBtn.style="display:none",t.loadMoreBtn.removeEventListener("click",f),p.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3})),a.refresh()},500)}catch(r){console.error(`An error occurred: ${r.message}`)}};t.form.addEventListener("submit",v);t.loadMoreBtn.addEventListener("click",f);a.on("show.simplelightbox",()=>{});
//# sourceMappingURL=commonHelpers.js.map
