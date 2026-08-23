'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { scraps as seedScraps, type Scrap } from './notes';
import BookEntrance from './components/BookEntrance';
import ThoughtField from './components/ThoughtField';
import FragmentReader, { type ContributionType } from './components/FragmentReader';
import './curiosity.css';
const KEY='nexus-curiosity-fragments-v1';
type Saved={id:string;type:ContributionType;text:string;createdAt:number};
const toScrap=(x:Saved):Scrap=>({id:x.id,kind:'sticky',title:x.type==='question'?'A question left behind':x.type==='beginning'?'A beginning left behind':'A thought left behind',body:x.text,x:0,y:0,rotation:0});
export default function CuriosityPage(){
 const [open,setOpen]=useState(false),[focus,setFocus]=useState<Scrap|null>(null),[visitors,setVisitors]=useState<Scrap[]>([]),[newId,setNewId]=useState<string|null>(null);
 useEffect(()=>{const t=window.setTimeout(()=>setOpen(true),3900);return()=>window.clearTimeout(t)},[]);
 useEffect(()=>{try{const raw=localStorage.getItem(KEY);if(raw){const parsed=JSON.parse(raw) as Saved[];if(Array.isArray(parsed))setVisitors(parsed.map(toScrap))}}catch{}},[]);
 const all=useMemo(()=>[...seedScraps,...visitors],[visitors]);
 const photoCount=all.filter(s=>s.kind==='polaroid').length; const questionCount=all.filter(s=>s.kind==='question'||s.title?.toLowerCase().includes('question')).length;
 const contribute=(text:string,type:ContributionType)=>{const saved:Saved={id:`visitor-${Date.now()}`,type,text,createdAt:Date.now()};const scrap=toScrap(saved);setVisitors(cur=>{const next=[...cur,scrap];try{const rows:Saved[]=next.map(s=>({id:s.id,type:s.title?.toLowerCase().includes('question')?'question':s.title?.toLowerCase().includes('beginning')?'beginning':'thought',text:s.body||'',createdAt:Date.now()}));localStorage.setItem(KEY,JSON.stringify(rows))}catch{}return next});setNewId(scrap.id);setFocus(null);window.setTimeout(()=>setNewId(null),2600)};
 return <main className={`curiosity-page ${open?'archive-is-open':''}`}><BookEntrance finished={open}/><header className="curiosity-topbar"><a href="/" className="curiosity-logo">NEXUS</a><div className="curiosity-section-id"><span>03</span><span>/</span><strong>CURIOSITY</strong></div><span className="curiosity-status">UNFINISHED / ONGOING</span></header><ThoughtField scraps={all} onOpen={setFocus} newlyCreatedId={newId} fragmentCount={all.length} photoCount={photoCount} questionCount={questionCount}/><FragmentReader scrap={focus} onClose={()=>setFocus(null)} onContributionSubmit={contribute}/></main>
}
