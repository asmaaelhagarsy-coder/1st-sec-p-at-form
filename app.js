import { attachWordTTS } from './tts.js';
import { initMatchGame } from './match-game.js';
import { initExam } from './exam.js';
const UNITS=[
  {id:'unit1',title:'Unit 1',theme:'purple'},
  {id:'unit2',title:'Unit 2',theme:'blue'},
  {id:'unit3',title:'Unit 3',theme:'maroon'},
  {id:'unit4',title:'Unit 4',theme:'pink'},
  {id:'unit5',title:'Unit 5',theme:'mint'},
  {id:'unit6',title:'Unit 6',theme:'teal'}
];
const nav=document.getElementById('unitsNav');
const panel=document.getElementById('panel');
const tabs=[...document.querySelectorAll('.tab')];
let currentUnit=null;let currentTab='vocab';
function setTheme(t){document.body.className='';document.body.classList.add(`theme-${t}`)}
function renderUnitButtons(){UNITS.forEach((u,i)=>{const b=document.createElement('button');b.textContent=u.title;b.addEventListener('click',()=>selectUnit(u));if(i===0)b.classList.add('active');nav.appendChild(b);});}
function markActiveUnit(u){[...nav.children].forEach(b=>b.classList.remove('active'));const idx=UNITS.findIndex(x=>x.id===u.id);nav.children[idx]?.classList.add('active')}
async function loadTab(unitId,tab){try{const res=await fetch(`units/${unitId}/unit.html`);const html=await res.text();const doc=new DOMParser().parseFromString(html,'text/html');const section=doc.getElementById(tab)||doc.querySelector(`[data-tab="${tab}"]`);panel.innerHTML='';panel.appendChild(section?section.cloneNode(true):document.createTextNode('Not found.'));if(tab==='games')initMatchGame(panel);if(tab==='vocab')attachWordTTS(panel);if(tab==='exam')initExam(panel,`units/${unitId}/exam.html`);}catch(e){panel.innerHTML='<div class='card'>Failed to load this unit.</div>'}}
function selectUnit(u){currentUnit=u;setTheme(u.theme);markActiveUnit(u);loadTab(u.id,currentTab)}
tabs.forEach(t=>{t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));t.classList.add('active');currentTab=t.dataset.tab;if(currentUnit)loadTab(currentUnit.id,currentTab);});});
renderUnitButtons();selectUnit(UNITS[0]);
