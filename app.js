const defaults = [
 {id:1,type:'kitchen',title:'مطبخ نوفا',desc:'خشب جوز · رخام كالكوتا',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',featured:true},
 {id:2,type:'bedroom',title:'غرفة أوريانا',desc:'هدوء طبيعي · تفاصيل دافئة',image:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85'},
 {id:3,type:'bath',title:'شاور بوكس ريفي',desc:'زجاج شفاف · إكسسوارات سوداء',image:'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1000&q=85'},
 {id:4,type:'opening',title:'أبواب أوري',desc:'بلوط طبيعي · خطوط معاصرة',image:'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85'},
 {id:5,type:'kitchen',title:'مطبخ إيليت',desc:'رمادي مطفي · إضاءة مخفية',image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1100&q=85'},
];
let items=JSON.parse(localStorage.getItem('hammour-projects')||'null')||defaults, filter='all'; const grid=document.querySelector('#projects');
const typeLabel={kitchen:'مطابخ',bedroom:'غرف نوم',bath:'شاور بوكس',opening:'أبواب وشبابيك'};
function render(){grid.innerHTML=items.filter(x=>filter==='all'||x.type===filter).map(x=>`<article class="project ${x.featured?'featured':''}" data-id="${x.id}"><div class="project-image"><img src="${x.image}" alt="${x.title}" loading="lazy"></div><div class="project-meta"><div><h3>${x.title}</h3><p>${x.desc}</p></div><span>↖</span></div></article>`).join('');document.querySelectorAll('.project').forEach(x=>x.onclick=()=>openEditor(+x.dataset.id))}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelector('.filters .active').classList.remove('active');b.classList.add('active');render()});
const dialog=document.querySelector('#editor'), form=document.querySelector('#editor form');
function openEditor(id){let x=items.find(p=>p.id===id)||items[0];projectId.value=x.id;projectTitle.value=x.title;projectType.value=x.type;projectDesc.value=x.desc;projectImage.value=x.image;dialog.showModal()}
editTrigger.onclick=()=>openEditor(items[0].id);
saveProject.onclick=async(e)=>{e.preventDefault();let x=items.find(p=>p.id==projectId.value), img=projectImage.value||x.image, file=projectFile.files[0];if(file) img=await new Promise(r=>{let reader=new FileReader();reader.onload=()=>r(reader.result);reader.readAsDataURL(file)});Object.assign(x,{title:projectTitle.value,type:projectType.value,desc:projectDesc.value,image:img});localStorage.setItem('hammour-projects',JSON.stringify(items));dialog.close();render()};
document.querySelector('.menu-btn').onclick=()=>document.querySelector('nav').classList.toggle('open');document.querySelector('#year').textContent=new Date().getFullYear();render();
