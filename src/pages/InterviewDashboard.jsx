import { useRef, useState } from 'react'
import '../dashboard.css'
import '../laptop.css'
import Sidebar from '../components/Sidebar'
import { mockResumes, getStoredUser, currentMockUser } from '../data/mockData'

const Icon = ({ name, size = 20 }) => {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-6h6v6"/></>,
    bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7z"/>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v5l3 2"/></>,
    gear: <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>,
    logout: <><path d="M14 3h5v18h-5M10 17l4-5-4-5M14 12H3"/></>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/></>,
    upload: <><path d="M12 16V3M7 8l5-5 5 5M4 16v4h16v-4"/></>,
    sliders: <><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="7" cy="18" r="2"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/></>,
    tag: <><path d="M20 13 13 20 3 10V3h7z"/><circle cx="7.5" cy="7.5" r="1"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>,
    mic: <><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></>
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function ResumeArt(){ return <div className="resume-art" aria-hidden="true"><div className="art-paper"><span className="art-avatar"/><i/><i/><i/><i/><small/></div><b/><em/></div> }
function Swoop(){return <svg className="swoop" viewBox="0 0 80 50" aria-hidden="true"><path d="M7 42C28 10 42 13 55 5M27 45c19-5 33-3 48 0"/></svg>}

function UploadForm({ onContinue }) {
  const [chosen,setChosen]=useState(''); const [error,setError]=useState(''); const input=useRef();
  const selectFile=f=>{ if(!f)return; if(!/\.(pdf|doc|docx)$/i.test(f.name)){setError('Choose a PDF, DOC, or DOCX file.');return} if(f.size>10*1024*1024){setError('This file is over the 10 MB limit.');return} setChosen(f.name);setError('') };
  return <div className="upload-card-content"><div className="upload-workflow"><header className="setup-title"><span className="round-icon"><Icon name="file" size={30}/></span><div><h2>Upload your resume</h2><p>We'll analyze your resume to tailor the questions for you.</p></div></header><div className="drop-zone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();selectFile(e.dataTransfer.files[0])}}><span className="round-icon"><Icon name="upload"/></span><p>{chosen?'Resume ready to personalize your interview':'Drag and drop your resume here'}</p><small>{chosen||'or'}</small><button type="button" className="black-button" onClick={()=>input.current.click()}><Icon name="upload"/>Choose file</button><input ref={input} type="file" accept=".pdf,.doc,.docx" onClick={e=>{e.currentTarget.value=''}} onChange={e=>selectFile(e.target.files[0])}/><small>Supports PDF, DOC, DOCX (Max 10 MB)</small>{error&&<strong className="form-error">{error}</strong>}</div><div className="or-divider"><i/>OR<i/></div><label className="resume-select"><span><Icon name="file"/>Select uploaded resume</span><select value={chosen} onChange={e=>setChosen(e.target.value)}><option value="">No resume selected</option>{mockResumes.map(r=><option key={r}>{r}</option>)}</select></label>{chosen&&<button className="resume-continue" onClick={()=>onContinue({type:'resume',name:chosen})}>Continue to configuration →</button>}</div><aside className="resume-message"><ResumeArt/><h2>Your resume<br/>speaks. We listen.</h2><p>Get customized questions based on your skills, experience and career goals.</p></aside></div>
}

function ManualForm({ onBack, onContinue }) {
  const user = getStoredUser() || currentMockUser
  const [form,setForm]=useState({role: user?.role || '', topics:'React, System Design, Architecture', years:'3', language: user?.language || 'English'});
  const [error,setError]=useState('');
  const set=k=>e=>setForm({...form,[k]:e.target.value});
  const submit=()=>{if(!form.role||!form.years){setError('Add your target role and years of experience to continue.');return}onContinue()};
  const field=(label,key,icon,required,props={})=><label className="manual-field">{label}{required&&<b> *</b>}<span><Icon name={icon}/><input value={form[key]} onChange={set(key)} {...props}/>{key==='years'&&<em>years</em>}</span></label>;
  return <div className="manual-form"><header className="manual-heading"><span className="round-icon"><Icon name="sliders" size={31}/></span><div><h2 className="manual-heading-title">Manual Setup</h2><p>Enter your details to customize your interview experience.</p></div></header><div className="fields-grid">{field('Target Role','role','briefcase',true,{placeholder:'e.g. Senior Frontend Engineer'})}{field('Focus Topics','topics','tag',false,{placeholder:'e.g. React, System Design, Performance'})}{field('Years of Experience','years','chart',true,{placeholder:'e.g. 2',inputMode:'numeric',type:'text'})}<label className="manual-field">Preferred Language<span><Icon name="globe"/><select value={form.language} onChange={set('language')}><option>English</option><option>Hindi</option><option>Gujarati</option><option>Spanish</option><option>French</option></select></span></label></div>{error&&<p className="form-error manual-error">{error}</p>}<div className="manual-actions"><button className="secondary-button" onClick={onBack}>← <span>Back</span></button><button className="black-button continue" onClick={submit}>Continue <span>→</span></button></div></div>
}

function Timeline(){ const steps=[['file','Analyze your resume','We extract your skills, experience and key highlights.'],['bolt','Personalize questions','Our AI creates role-specific questions tailored to you.'],['mic','Take a mock interview','Have a natural, voice-based conversation with our AI interviewer.'],['chart','Get feedback & report','Receive detailed insights, performance analysis and improvement tips.']];return <section className="timeline"><p>WHAT HAPPENS NEXT?</p><h2>Your Interview, Our Preparation</h2><span>We turn your resume into a personalized interview experience.</span><div className="timeline-steps"><svg viewBox="0 0 1100 70" preserveAspectRatio="none"><path d="M70 35c80-30 150 30 260 0s180 30 290 0 180 30 410 0"/></svg>{steps.map(([icon,title,text],i)=><article key={title}><div><span className="round-icon"><Icon name={icon}/></span><b>{i+1}</b></div><h3>{title}</h3><p>{text}</p></article>)}</div></section> }
function Configuration(){const [duration,setDuration]=useState('15 mins'),[difficulty,setDifficulty]=useState('Medium'),[report,setReport]=useState(true),[started,setStarted]=useState(false);return <section className="configuration"><header><span className="round-icon"><Icon name="sliders"/></span><div><h2>Interview Configuration</h2><p>Set your preferences for a personalized mock interview experience.</p></div><i>Practice<br/>Progress<br/>Perform</i></header><div className="config-grid"><div><span className="config-label"><Icon name="clock"/>Interview Duration</span><small>Choose how long you want the interview to be.</small><nav>{['15 mins','30 mins','45 mins','60 mins'].map(x=><button className={duration===x?'selected':''} onClick={()=>setDuration(x)} key={x}>{x}</button>)}</nav></div><div><span className="config-label"><Icon name="chart"/>Difficulty Level</span><small>Adjust the complexity of questions.</small><nav>{['Easy','Medium','Hard'].map(x=><button className={difficulty===x?'selected':''} onClick={()=>setDifficulty(x)} key={x}>{x}</button>)}</nav></div></div><label className="report-toggle"><span><Icon name="file"/><b>Report Generation</b><small>Get detailed feedback, performance analysis and suggested resources after the interview.</small></span><div style={{display:'flex',alignItems:'center'}}><input type="checkbox" checked={report} onChange={e=>setReport(e.target.checked)}/><em>Generate report after interview</em></div></label><button className="start-button" onClick={()=>setStarted(true)}><Icon name="bolt"/>Start Interview <span>→</span></button>{started&&<p className="started" role="status">Your {duration.toLowerCase()} {difficulty.toLowerCase()} interview is ready to begin.</p>}<small className="secure">● &nbsp; No credit card required</small></section> }

export default function InterviewDashboard(){
  const [state,setState]=useState('upload');
  const continueToConfig=()=>{setTimeout(()=>document.querySelector('.configuration')?.scrollIntoView({behavior:'smooth'}),0)};
  const goManual=()=>setState('manual');
  const goUpload=()=>setState('upload');
  const isManual=state==='manual';

  return <div className="dashboard-shell"><Sidebar active="Start Interview"/><main className="dashboard-main"><div className="dashboard-content">
    <header className="page-heading">
      <p>INTERVIEW SETUP</p>
      <h1>New Interview <Swoop/></h1>
      <span>Upload your resume to personalize your interview experience.</span>
      <i>Small Steps<br/>Big Opportunities<svg viewBox="0 0 120 30"><path d="M6 22C40 2 74 17 116 5"/></svg></i>
    </header>

    <section className="upload-layout">
      <article className={`setup-card${isManual?' setup-card--manual':''}`}>
        {isManual
          ? <ManualForm onBack={goUpload} onContinue={continueToConfig}/>
          : <UploadForm onContinue={continueToConfig}/>
        }
      </article>

      <aside className="quote-card">
        {isManual ? <>
          <ResumeArt/>
          <h2 style={{font:'600 27px/1.1 "Bodoni Moda",Georgia,serif',letterSpacing:'-.05em',margin:'14px 0 8px'}}>Your details<br/>shape the conversation.</h2>
          <p style={{fontSize:'13px',color:'var(--dash-muted)',lineHeight:1.5,margin:0}}>Help us understand your background so we can ask more relevant and personalized questions.</p>
        </> : <>
          <b>"</b>
          <p>Preparation<br/>today, confidence<br/>tomorrow.</p>
          <Swoop/>
          <hr/>
          <h3>What happens next?</h3>
          {['We analyze your resume','AI prepares personalized questions','You have a realistic mock interview','Get detailed feedback and insights'].map((t,i)=><div className="mini-step" key={t}><span>{i+1}</span>{t}</div>)}
        </>}
      </aside>
    </section>

    {isManual
      ? <button type="button" className="manual-card" onClick={goUpload}>
          <span className="round-icon"><Icon name="file"/></span>
          <div><h2>Or upload your resume instead</h2><p>We'll analyze your resume to tailor the questions for you.</p></div>
          <ResumeArt/>
          <b>UPLOAD RESUME <span>→</span></b>
        </button>
      : <button type="button" className="manual-card" onClick={goManual}>
          <span className="round-icon"><Icon name="sliders"/></span>
          <div><h2>Or configure manually</h2><p>Prefer to set things up yourself? Switch to manual setup and enter your details, target role, skills and more.</p></div>
          <b>MANUAL SETUP <span>→</span></b>
        </button>
    }

    <Timeline/>
    <Configuration/>
  </div></main></div>
}
