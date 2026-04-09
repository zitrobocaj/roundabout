import { useState, useEffect, useRef } from "react";

const C = {
  ember:   "#1E1208",
  coal:    "#2E1A0A",
  coal2:   "#3D2410",
  flame:   "#FF7A2F",
  flameD:  "#CC5A18",
  chalk:   "#FFF0E6",
  chalkD:  "#C8A888",
  chalkDD: "#8A6A4A",
  glow:    "rgba(255,122,47,0.12)",
  glowMd:  "rgba(255,122,47,0.22)",
  success: "#4ECB8D",
  sky:     "#5BA8D4",
  font:    "Georgia, serif",
  mono:    "'Courier New', monospace",
};

const LISTINGS = [
  { id:1,  x:44, y:36, type:"object", cat:"Creative",    title:"Vintage film camera",     user:"Maya K.",    avatar:"M", circle:3, available:true,  desc:"35mm Olympus OM-1, fully working. One roll of Kodak Gold included. Handle with love.",                            offer:"Open to offers — surprise me",    time:"2h ago",  dist:"0.3mi", img:"📷" },
  { id:2,  x:62, y:53, type:"skill",  cat:"Music",       title:"Guitar lessons",           user:"Tom R.",     avatar:"T", circle:2, available:true,  desc:"10 years playing, acoustic or electric. Beginners very welcome. Weekends work best.",                            offer:"Borrow something of mine",        time:"5h ago",  dist:"0.7mi", img:"🎸" },
  { id:3,  x:27, y:59, type:"object", cat:"Kitchen",     title:"Bread proving basket",     user:"Priya S.",   avatar:"P", circle:4, available:false, desc:"Lined banneton + dutch oven. Barely used. Perfect if you're getting into sourdough.",                             offer:"Skills or objects welcome",       time:"1d ago",  dist:"0.4mi", img:"🍞" },
  { id:4,  x:73, y:27, type:"object", cat:"Sport",       title:"Full ski set",             user:"Leon B.",    avatar:"L", circle:1, available:true,  desc:"Boots UK 10, 170cm skis, poles. Collect from Hackney. Available outside ski season.",                           offer:"Something useful",                time:"2d ago",  dist:"1.1mi", img:"⛷️" },
  { id:5,  x:19, y:33, type:"skill",  cat:"Writing",     title:"Copywriting & editing",    user:"Sal O.",     avatar:"S", circle:3, available:true,  desc:"10 years in publishing. CV reviews, pitch decks, creative writing feedback — all welcome.",                     offer:"Trade a skill",                   time:"3d ago",  dist:"0.5mi", img:"✍️" },
  { id:6,  x:55, y:71, type:"object", cat:"Creative",    title:"Sewing machine",           user:"Jo W.",      avatar:"J", circle:2, available:true,  desc:"Singer Heavy Duty 4432. Perfect for clothes, repairs or upholstery. I'll show you the basics.",                  offer:"Open to anything",                time:"4d ago",  dist:"0.6mi", img:"🧵" },
  { id:7,  x:35, y:77, type:"skill",  cat:"Sport",       title:"Bike repair",              user:"Rafi M.",    avatar:"R", circle:5, available:true,  desc:"Can fix most things — brakes, gears, punctures, wheel truing. Bring it round any evening.",                    offer:"Help me with something",          time:"5d ago",  dist:"0.9mi", img:"🔧" },
  { id:8,  x:80, y:62, type:"object", cat:"Creative",    title:"Darkroom enlarger",        user:"Chen W.",    avatar:"C", circle:3, available:true,  desc:"Durst M605. Full analogue setup. For the serious film photographer. Collect in person.",                         offer:"Teach me something creative",     time:"6h ago",  dist:"0.8mi", img:"🔭" },
  { id:9,  x:50, y:20, type:"skill",  cat:"Wellness",    title:"Yoga instruction",         user:"Aisha B.",   avatar:"A", circle:4, available:true,  desc:"200hr certified. 1-1 or small group. Hatha and Vinyasa. Your place or mine.",                                   offer:"Any skill swap",                  time:"1d ago",  dist:"0.2mi", img:"🧘" },
  { id:10, x:15, y:68, type:"object", cat:"Kitchen",     title:"Pasta machine + moulds",   user:"Marco D.",   avatar:"M", circle:2, available:false, desc:"Marcato Atlas + a full set of pasta moulds. Makes fresh pasta a joy. Collect from Bethnal Green.",               offer:"Cook me something",               time:"2d ago",  dist:"1.3mi", img:"🍝" },
];

const CATS = ["All","Objects","Skills","Creative","Music","Kitchen","Sport","Writing","Wellness"];

function useAnim(delay=0) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(()=>setVis(true), delay); return ()=>clearTimeout(t); }, [delay]);
  return vis;
}

function Logo({ size=36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 110 110" style={{flexShrink:0}}>
      <rect x="3" y="3" width="104" height="104" rx="22" fill={C.ember}/>
      <path d="M 20 55 C 18 26,38 10,55 10 C 72 10,92 26,90 55" fill="none" stroke={C.flame} strokeWidth="8.5" strokeLinecap="round"/>
      <path d="M 90 55 C 88 82,72 100,55 100 C 38 100,22 82,20 55" fill="none" stroke={C.flame} strokeWidth="5" strokeLinecap="round" strokeOpacity="0.28"/>
      <circle cx="20" cy="55" r="5" fill={C.flame}/>
      <circle cx="90" cy="55" r="3.2" fill={C.flame} opacity="0.4"/>
      <line x1="40" y1="32" x2="40" y2="78" stroke={C.chalk} strokeWidth="6" strokeLinecap="round"/>
      <path d="M 40 32 C 40 32,72 32,72 46 C 72 60,40 60,40 60" fill="none" stroke={C.chalk} strokeWidth="6" strokeLinecap="round"/>
      <path d="M 40 60 L 72 78" fill="none" stroke={C.flame} strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

function Av({ letter, size=38, flame=false }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background: flame ? C.flame : C.coal2,
      border:`2px solid ${flame ? C.chalk : C.flame}`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:size*0.38, fontWeight:"bold", fontFamily:C.mono,
      color: flame ? C.ember : C.flame, flexShrink:0,
    }}>{letter}</div>
  );
}

function Pill({ label, color, bg, small }) {
  return (
    <span style={{
      background: bg||C.glow, color: color||C.flame,
      fontSize: small ? 8 : 9, padding: small ? "1px 7px" : "2px 9px",
      borderRadius:20, fontFamily:C.mono, letterSpacing:1, fontWeight:"bold",
      border:`1px solid ${(color||C.flame)}44`,
    }}>{label}</span>
  );
}

function Circles({ level, small }) {
  return (
    <div style={{display:"flex",gap:small?2:3,alignItems:"center"}}>
      {[1,2,3,4,5].map(i=>(
        <div key={i} style={{
          width:small?5:7, height:small?5:7, borderRadius:"50%",
          background: i<=level ? C.flame : "transparent",
          border:`1.5px solid ${i<=level ? C.flame : C.chalkDD}`,
          opacity: i<=level ? 1-(i-1)*0.1 : 0.3,
          boxShadow: i<=level && !small ? `0 0 4px ${C.flame}66` : "none",
        }}/>
      ))}
    </div>
  );
}

function Btn({ children, onClick, full, secondary, small, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        width: full?"100%":"auto",
        background: secondary ? "transparent" : (hov ? C.flameD : C.flame),
        border: secondary ? `1.5px solid ${C.coal2}` : "none",
        color: secondary ? C.chalkD : C.ember,
        padding: small ? "8px 16px" : "13px 20px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: small ? 10 : 12,
        fontFamily:C.mono, letterSpacing:2, fontWeight:"bold",
        borderRadius:10, transition:"all 0.15s",
        opacity: disabled ? 0.4 : 1,
      }}
    >{children}</button>
  );
}

function Input({ value, onChange, placeholder, multiline, rows=3 }) {
  const [foc, setFoc] = useState(false);
  const base = {
    width:"100%", background:C.coal,
    border:`1.5px solid ${foc ? C.flame : C.coal2}`,
    borderRadius:10, padding:"12px 14px",
    fontSize:13, fontFamily:C.mono, color:C.chalk,
    boxSizing:"border-box", outline:"none",
    transition:"border-color 0.15s",
    resize:"none",
  };
  return multiline
    ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
        rows={rows} style={{...base}}/>
    : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        onFocus={()=>setFoc(true)} onBlur={()=>setFoc(false)}
        style={{...base}}/>;
}

function SkipLink({ onClick, label="Skip for now" }) {
  return (
    <button onClick={onClick} style={{
      fontSize:11, color:C.chalkDD, fontFamily:C.mono,
      cursor:"pointer", marginTop:10, display:"block",
      textAlign:"center", background:"none", border:"none", width:"100%",
    }}>{label}</button>
  );
}

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [hood, setHood] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [digits, setDigits] = useState(["","","","","",""]);
  const [photo, setPhoto] = useState(null);
  const [offer, setOffer] = useState("");
  const [anim, setAnim] = useState(true);

  const d0=useRef(),d1=useRef(),d2=useRef(),d3=useRef(),d4=useRef(),d5=useRef();
  const digitRefs=[d0,d1,d2,d3,d4,d5];
  const photoInputRef=useRef();

  const next = () => { setAnim(false); setTimeout(()=>{ setStep(s=>s+1); setAnim(true); }, 200); };

  const validateMobile = (v) => {
    const s = v.replace(/\s/g,"");
    return /^(07\d{9}|\+447\d{9})$/.test(s);
  };

  const handleMobileNext = () => {
    if (!validateMobile(mobile)) { setMobileError(true); return; }
    setMobileError(false);
    setVerifying(true);
  };

  const handleDigit = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const nd=[...digits]; nd[i]=val; setDigits(nd);
    if (val && i<5) digitRefs[i+1].current?.focus();
    if (nd.every(d=>d!=="")) { setTimeout(()=>{ setVerifying(false); next(); }, 400); }
  };

  const handlePhotoSelect = (e) => {
    const file=e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const TOTAL=5;

  const slides = [
    <div key="0" style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"0 8px"}}>
      <div style={{marginBottom:24}}><Logo size={80}/></div>
      <div style={{fontSize:32,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.1,marginBottom:12}}>
        What goes<br/>around,<br/><span style={{color:C.flame}}>comes around.</span>
      </div>
      <div style={{fontSize:14,color:C.chalkD,lineHeight:1.8,marginBottom:32,maxWidth:280}}>
        A moneyless neighbourhood exchange. Borrow. Lend. Share skills. Build trust.
      </div>
      <Btn full onClick={next}>GET STARTED →</Btn>
      <div style={{fontSize:10,color:C.chalkDD,marginTop:14,fontFamily:C.mono}}>No money. No ads. No algorithm.</div>
    </div>,

    <div key="1" style={{width:"100%"}}>
      <div style={{fontSize:11,color:C.flame,fontFamily:C.mono,letterSpacing:3,marginBottom:8}}>◎ STEP 1 OF {TOTAL}</div>
      <div style={{fontSize:26,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2,marginBottom:6}}>What do your<br/>neighbours call you?</div>
      <div style={{fontSize:12,color:C.chalkD,marginBottom:24,lineHeight:1.7}}>Just a first name. Roundabout is built on real people, not handles.</div>
      <Input value={name} onChange={setName} placeholder="Your first name..."/>
      <div style={{marginTop:16}}><Btn full onClick={next} disabled={!name.trim()}>NEXT →</Btn></div>
    </div>,

    <div key="2" style={{width:"100%"}}>
      <div style={{fontSize:11,color:C.flame,fontFamily:C.mono,letterSpacing:3,marginBottom:8}}>◎ STEP 2 OF {TOTAL}</div>
      <div style={{fontSize:26,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2,marginBottom:6}}>What's your<br/>postcode?</div>
      <div style={{fontSize:12,color:C.chalkD,marginBottom:8,lineHeight:1.7}}>Roundabout matches you with neighbours within a 2 mile radius.</div>
      <div style={{background:C.glow,border:`1px solid ${C.flame}44`,borderRadius:8,padding:"8px 12px",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:12}}>📍</span>
        <span style={{fontSize:10,color:C.chalkD,fontFamily:C.mono,lineHeight:1.6}}>Your postcode is used only to show listings within 2 miles. Never shared or sold.</span>
      </div>
      <Input value={hood} onChange={v=>setHood(v.toUpperCase())} placeholder="e.g. E8 1DY or SW1A 1AA"/>
      {hood.length>=5 && (
        <div style={{marginTop:10,background:C.coal,borderRadius:8,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:8,height:8,borderRadius:"50%",background:C.success,flexShrink:0}}/>
          <div>
            <div style={{fontSize:11,color:C.chalk,fontFamily:C.mono}}>Postcode recognised</div>
            <div style={{fontSize:10,color:C.chalkD,fontFamily:C.mono}}>Showing listings within 2 miles of <span style={{color:C.flame}}>{hood}</span></div>
          </div>
        </div>
      )}
      <div style={{marginTop:16}}><Btn full onClick={next} disabled={hood.length<5}>NEXT →</Btn></div>
    </div>,

    <div key="3" style={{width:"100%"}}>
      <div style={{fontSize:11,color:C.flame,fontFamily:C.mono,letterSpacing:3,marginBottom:8}}>◎ STEP 3 OF {TOTAL}</div>
      <div style={{fontSize:26,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2,marginBottom:6}}>What's your mobile<br/>number?</div>
      <div style={{fontSize:12,color:C.chalkD,marginBottom:20,lineHeight:1.7}}>So neighbours can get in touch. UK numbers only.</div>
      {!verifying ? (
        <>
          <Input value={mobile} onChange={v=>{ setMobile(v); if(mobileError) setMobileError(false); }} placeholder="e.g. 07700 900123"/>
          {mobileError && <div style={{fontSize:10,color:C.flame,fontFamily:C.mono,marginTop:6}}>Please enter a valid UK mobile number.</div>}
          <div style={{background:C.glow,border:`1px solid ${C.flame}44`,borderRadius:8,padding:"8px 12px",marginTop:14,display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:12}}>🔒</span>
            <span style={{fontSize:10,color:C.chalkD,fontFamily:C.mono,lineHeight:1.6}}>Used for verification only. Never sold, never shared.</span>
          </div>
          <div style={{marginTop:16}}><Btn full onClick={handleMobileNext} disabled={!mobile.trim()}>NEXT →</Btn></div>
        </>
      ) : (
        <div>
          <button onClick={()=>{ setVerifying(false); setDigits(["","","","","",""]); }} style={{fontSize:11,color:C.chalkD,fontFamily:C.mono,cursor:"pointer",display:"block",marginBottom:16,background:"none",border:"none",padding:0}}>← Wrong number?</button>
          <div style={{fontSize:13,color:C.chalkD,fontFamily:C.mono,marginBottom:20,lineHeight:1.7}}>
            We've sent a 6-digit code to <span style={{color:C.chalk}}>{mobile}</span>.
          </div>
          <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:8}}>
            {digits.map((d,i)=>(
              <input key={i} ref={digitRefs[i]} value={d} maxLength={1}
                onChange={e=>handleDigit(i,e.target.value)}
                onKeyDown={e=>{ if(e.key==="Backspace"&&!d&&i>0) digitRefs[i-1].current?.focus(); }}
                style={{width:36,height:44,textAlign:"center",background:C.coal,border:`1.5px solid ${d?C.flame:C.coal2}`,borderRadius:8,fontSize:20,fontFamily:C.mono,color:C.chalk,outline:"none",boxSizing:"border-box"}}
              />
            ))}
          </div>
          <div style={{fontSize:10,color:C.chalkDD,fontFamily:C.mono,textAlign:"center",marginTop:4}}>Enter the 6-digit code to continue</div>
        </div>
      )}
    </div>,

    <div key="4" style={{width:"100%"}}>
      <div style={{fontSize:11,color:C.flame,fontFamily:C.mono,letterSpacing:3,marginBottom:8}}>◎ STEP 4 OF {TOTAL}</div>
      <div style={{fontSize:26,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2,marginBottom:6}}>Put a face to<br/>your name.</div>
      <div style={{fontSize:12,color:C.chalkD,marginBottom:24,lineHeight:1.7}}>Roundabout is built on trust. A photo helps neighbours know who they're dealing with.</div>
      <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{display:"none"}}/>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
        {photo ? (
          <>
            <img src={photo} onClick={()=>photoInputRef.current?.click()} style={{width:80,height:80,borderRadius:"50%",objectFit:"cover",border:`2px solid ${C.flame}`,cursor:"pointer",display:"block"}}/>
            <button onClick={()=>photoInputRef.current?.click()} style={{fontSize:10,color:C.chalkDD,fontFamily:C.mono,cursor:"pointer",marginTop:10,background:"none",border:"none"}}>Change photo</button>
          </>
        ) : (
          <div onClick={()=>photoInputRef.current?.click()} style={{width:80,height:80,borderRadius:"50%",border:`2px dashed ${C.coal2}`,background:C.coal,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,cursor:"pointer"}}>📷</div>
        )}
      </div>
      <div style={{marginTop:24}}><Btn full onClick={next}>{photo?"NEXT →":"SKIP FOR NOW →"}</Btn></div>
    </div>,

    <div key="5" style={{width:"100%"}}>
      <div style={{fontSize:11,color:C.flame,fontFamily:C.mono,letterSpacing:3,marginBottom:8}}>◎ STEP 5 OF {TOTAL}</div>
      <div style={{fontSize:26,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2,marginBottom:6}}>What's one thing<br/>you could share?</div>
      <div style={{fontSize:12,color:C.chalkD,marginBottom:24,lineHeight:1.7}}>Something you own, something you know, or a bit of your time.</div>
      <Input value={offer} onChange={setOffer} placeholder="e.g. My guitar, baking lessons, a spare tent..." multiline rows={3}/>
      <div style={{marginTop:16}}><Btn full onClick={next} disabled={!offer.trim()}>JOIN THE ROUND →</Btn></div>
      <SkipLink onClick={()=>{ setOffer("I'll add something later"); next(); }}/>
    </div>,

    <div key="6" style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"0 8px"}}>
      <div style={{width:80,height:80,borderRadius:"50%",background:C.flame,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,fontWeight:"bold",fontFamily:C.mono,color:C.ember,marginBottom:24,boxShadow:`0 0 0 6px ${C.glow}`}}>{name?name[0].toUpperCase():"Y"}</div>
      <div style={{fontSize:28,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2,marginBottom:10}}>Welcome to the round,<br/><span style={{color:C.flame}}>{name||"neighbour"}.</span></div>
      <div style={{fontSize:13,color:C.chalkD,lineHeight:1.8,marginBottom:10}}>Showing listings within 2 miles of <span style={{color:C.chalk}}>{hood||"your postcode"}</span>.<br/>Your neighbours are waiting.</div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:32}}><Circles level={1}/></div>
      <Btn full onClick={onDone}>SEE WHAT'S NEARBY →</Btn>
    </div>,
  ];

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"32px 24px 24px",overflowY:"auto"}}>
      {step>0 && step<slides.length-1 && (
        <div style={{height:2,background:C.coal2,borderRadius:2,marginBottom:32,overflow:"hidden"}}>
          <div style={{height:"100%",background:C.flame,width:`${((step-1)/TOTAL)*100}%`,transition:"width 0.3s ease",borderRadius:2}}/>
        </div>
      )}
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",opacity:anim?1:0,transform:anim?"translateY(0)":"translateY(8px)",transition:"all 0.2s ease"}}>
        {slides[step]}
      </div>
    </div>
  );
}

function Pin({ pin, selected, onClick }) {
  const [hov,setHov]=useState(false);
  const active=selected||hov;
  return (
    <div onClick={()=>onClick(pin)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:"absolute",left:`${pin.x}%`,top:`${pin.y}%`,transform:`translate(-50%,-100%) scale(${active?1.1:1})`,cursor:"pointer",zIndex:selected?10:3,transition:"transform 0.18s cubic-bezier(.34,1.56,.64,1)"}}>
      <div style={{background:selected?C.flame:C.coal,border:`2px solid ${pin.available?C.flame:C.chalkDD}`,borderRadius:8,padding:"5px 9px",display:"flex",alignItems:"center",gap:5,minWidth:86,boxShadow:selected?`0 4px 16px ${C.flame}44`:"none",transition:"all 0.18s"}}>
        <div style={{fontSize:12,flexShrink:0}}>{pin.img}</div>
        <div style={{flex:1,overflow:"hidden"}}>
          <div style={{fontSize:9,fontFamily:C.mono,fontWeight:"bold",color:selected?C.ember:C.chalk,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:68}}>{pin.title}</div>
          <Circles level={pin.circle} small/>
        </div>
      </div>
      <div style={{width:0,height:0,margin:"0 auto",borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:`6px solid ${pin.available?C.flame:C.chalkDD}`}}/>
    </div>
  );
}

function MapScreen({ onDetail }) {
  const [sel,setSel]=useState(null);
  const [filter,setFilter]=useState("all");
  const pins=LISTINGS.filter(p=>{
    if(filter==="available") return p.available;
    if(filter==="objects") return p.type==="object";
    if(filter==="skills") return p.type==="skill";
    return true;
  });
  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"10px 14px 8px",display:"flex",gap:6,overflowX:"auto",flexShrink:0}}>
        {[["all","All"],["available","● Available"],["objects","Objects"],["skills","Skills"]].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(v)} style={{background:filter===v?C.flame:C.coal,border:`1.5px solid ${filter===v?C.flame:C.coal2}`,color:filter===v?C.ember:C.chalkD,padding:"5px 12px",cursor:"pointer",fontSize:10,fontFamily:C.mono,letterSpacing:1,borderRadius:20,fontWeight:filter===v?"bold":"normal",whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s"}}>{l}</button>
        ))}
      </div>
      <div style={{flex:1,position:"relative",background:"#1A0F06",margin:"0 14px",borderRadius:12,overflow:"hidden",border:`1.5px solid ${C.coal2}`,minHeight:280}}>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.5}} viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q24,48 50,50 Q76,52 100,50" stroke={C.coal2} strokeWidth="2.5" fill="none"/>
          <path d="M0,28 Q28,26 52,28 Q74,30 100,27" stroke={C.coal2} strokeWidth="1.5" fill="none"/>
          <path d="M0,73 Q26,71 56,74 Q78,76 100,72" stroke={C.coal2} strokeWidth="1.5" fill="none"/>
          <path d="M28,0 Q30,26 28,50 Q26,76 28,100" stroke={C.coal2} strokeWidth="1.5" fill="none"/>
          <path d="M64,0 Q66,30 64,62 Q62,82 64,100" stroke={C.coal2} strokeWidth="1.5" fill="none"/>
          {[[30,30,15,12],[47,30,14,12],[30,54,15,14],[47,54,14,14],[8,33,18,14],[68,33,20,13],[8,58,18,13],[68,56,20,14]].map(([x,y,w,h],i)=>(
            <rect key={i} x={x} y={y} width={w} height={h} rx="1.5" fill={C.coal2} opacity="0.6"/>
          ))}
          <circle cx="50" cy="50" r="3.5" fill={C.flame}/>
          <circle cx="50" cy="50" r="7.5" stroke={C.flame} strokeWidth="1" fill="none" opacity="0.35"/>
          <circle cx="50" cy="50" r="13" stroke={C.flame} strokeWidth="0.5" fill="none" opacity="0.15" strokeDasharray="2,2"/>
          <text x="53" y="43" fontSize="3.2" fill={C.flame} fontFamily="Courier New" opacity="0.8">you</text>
        </svg>
        {pins.map(p=><Pin key={p.id} pin={p} selected={sel?.id===p.id} onClick={p=>setSel(prev=>prev?.id===p.id?null:p)}/>)}
        <div style={{position:"absolute",bottom:10,right:10,background:`${C.ember}ee`,border:`1px solid ${C.coal2}`,borderRadius:8,padding:"6px 10px"}}>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><div style={{width:6,height:6,borderRadius:"50%",background:C.flame}}/><span style={{fontSize:8,color:C.chalkD,fontFamily:C.mono}}>available</span></div>
          <div style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:6,height:6,borderRadius:"50%",background:C.chalkDD}}/><span style={{fontSize:8,color:C.chalkD,fontFamily:C.mono}}>unavailable</span></div>
        </div>
      </div>
      {sel ? (
        <div style={{background:C.coal,margin:"10px 14px",borderRadius:12,padding:"14px",border:`1.5px solid ${C.flame}`,animation:"slideUp 0.2s cubic-bezier(.34,1.56,.64,1)",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:16}}>{sel.img}</span>
                <Pill label={sel.type.toUpperCase()}/>
                {sel.available?<Pill label="● Now" color={C.success} bg={`${C.success}18`}/>:<span style={{fontSize:9,color:C.chalkD,fontFamily:C.mono}}>○ unavailable</span>}
              </div>
              <div style={{fontSize:16,fontWeight:"bold",color:C.chalk,fontFamily:C.font,marginBottom:3,lineHeight:1.2}}>{sel.title}</div>
              <div style={{fontSize:11,color:C.chalkD,marginBottom:6}}>{sel.user} · {sel.dist} away</div>
              <Circles level={sel.circle}/>
            </div>
            <Av letter={sel.avatar} size={42}/>
          </div>
          <Btn full onClick={()=>onDetail(sel)}>VIEW + REQUEST →</Btn>
        </div>
      ) : (
        <div style={{padding:"10px",textAlign:"center",flexShrink:0}}><span style={{fontSize:10,color:C.chalkDD,fontFamily:C.mono}}>tap a pin to preview</span></div>
      )}
    </div>
  );
}

function BrowseScreen({ onDetail }) {
  const [cat,setCat]=useState("All");
  const items=LISTINGS.filter(l=>{
    if(cat==="All") return true;
    if(cat==="Objects") return l.type==="object";
    if(cat==="Skills") return l.type==="skill";
    return l.cat===cat;
  });
  return (
    <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
      <div style={{fontSize:9,letterSpacing:3,color:C.chalkD,marginBottom:12,fontFamily:C.mono}}>◎ WITHIN 2 MILES OF E8</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
        {CATS.map(c=>(
          <button key={c} onClick={()=>setCat(c)} style={{background:cat===c?C.flame:C.coal,border:`1.5px solid ${cat===c?C.flame:C.coal2}`,color:cat===c?C.ember:C.chalkD,padding:"4px 11px",cursor:"pointer",fontSize:9,fontFamily:C.mono,letterSpacing:1,borderRadius:20,fontWeight:cat===c?"bold":"normal",transition:"all 0.15s"}}>{c}</button>
        ))}
      </div>
      {items.map(l=><BrowseCard key={l.id} item={l} onClick={()=>onDetail(l)}/>)}
    </div>
  );
}

function BrowseCard({ item, onClick }) {
  const [hov,setHov]=useState(false);
  const firstName=item.user.split(" ")[0];
  const truncOffer=item.offer.length>28?item.offer.slice(0,28)+"…":item.offer;
  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?C.coal2:"#251408",border:`1.5px solid ${hov?C.flame:C.coal2}`,borderRadius:12,padding:"14px",marginBottom:10,cursor:"pointer",transition:"all 0.18s"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:7,flexWrap:"wrap"}}>
            <span style={{fontSize:14}}>{item.img}</span>
            <Pill label={`${item.cat} · ${item.type}`} color={C.sky} bg={`${C.sky}18`}/>
            {item.available?<Pill label="● Now" color={C.success} bg={`${C.success}18`}/>:<span style={{fontSize:9,color:C.chalkD,fontFamily:C.mono}}>○ unavailable</span>}
          </div>
          <div style={{fontSize:15,fontWeight:"bold",color:C.chalk,fontFamily:C.font,marginBottom:4,lineHeight:1.25}}>{item.title}</div>
          <div style={{fontSize:11,color:C.chalkD,lineHeight:1.65,marginBottom:10}}>{item.desc.length > 120 ? item.desc.slice(0, item.desc.lastIndexOf(" ", 120)) + "…" : item.desc}</div>
        </div>
        <Av letter={item.avatar} size={38}/>
      </div>
      <div style={{borderTop:`1px solid ${C.coal2}`,paddingTop:8,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
        <span style={{fontSize:11,color:C.chalkD,fontFamily:C.mono,flexShrink:0}}>{firstName} · {item.dist}</span>
        <span style={{fontSize:11,color:C.flame,fontFamily:C.mono,textAlign:"right"}}>Wants: {truncOffer}</span>
      </div>
    </div>
  );
}

function DetailScreen({ listing, onBack }) {
  const [sent,setSent]=useState(false);
  const [msg,setMsg]=useState("");
  const vis=useAnim(0);
  return (
    <div style={{flex:1,overflowY:"auto",padding:"14px",opacity:vis?1:0,transition:"opacity 0.2s"}}>
      <button onClick={onBack} style={{background:"none",border:"none",color:C.chalkD,cursor:"pointer",fontSize:10,letterSpacing:2,padding:"0 0 16px",fontFamily:C.mono,display:"block"}}>← BACK</button>
      <div style={{background:C.coal,borderRadius:14,padding:20,marginBottom:12,border:`1.5px solid ${C.coal2}`}}>
        <div style={{fontSize:32,marginBottom:10,textAlign:"center"}}>{listing.img}</div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
              <Pill label={listing.type.toUpperCase()}/>
              <Pill label={listing.cat} color={C.sky} bg={`${C.sky}18`}/>
              {listing.available?<Pill label="● Available now" color={C.success} bg={`${C.success}18`}/>:<span style={{fontSize:9,color:C.chalkD,fontFamily:C.mono}}>○ Not available</span>}
            </div>
            <div style={{fontSize:22,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2}}>{listing.title}</div>
          </div>
          <Av letter={listing.avatar} size={46}/>
        </div>
        <div style={{fontSize:13,color:C.chalkD,lineHeight:1.85,marginBottom:16}}>{listing.desc}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,borderTop:`1px solid ${C.coal2}`,paddingTop:14}}>
          {[["LISTED BY",listing.user],["DISTANCE",listing.dist],["POSTED",listing.time],["TRUST LEVEL",`Circle ${listing.circle}`]].map(([k,v])=>(
            <div key={k}><div style={{fontSize:8,letterSpacing:2,color:C.chalkDD,marginBottom:3,fontFamily:C.mono}}>{k}</div><div style={{fontSize:12,color:C.chalk,fontFamily:C.mono}}>{v}</div></div>
          ))}
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:8,letterSpacing:2,color:C.chalkDD,marginBottom:6,fontFamily:C.mono}}>TRUST CIRCLES</div><Circles level={listing.circle}/></div>
          <div style={{gridColumn:"1/-1"}}><div style={{fontSize:8,letterSpacing:2,color:C.chalkDD,marginBottom:3,fontFamily:C.mono}}>WANTS IN RETURN</div><div style={{fontSize:13,color:C.flame,fontFamily:C.mono}}>{listing.offer}</div></div>
        </div>
      </div>
      {!sent ? (
        <div style={{background:C.coal,borderRadius:14,padding:16,border:`1.5px solid ${C.coal2}`}}>
          <div style={{fontSize:11,fontWeight:"bold",color:C.chalk,fontFamily:C.font,marginBottom:4}}>Make a request</div>
          <div style={{fontSize:11,color:C.chalkD,fontFamily:C.mono,marginBottom:2}}>What can you offer in return?</div>
          <div style={{fontSize:11,color:C.chalkDD,fontFamily:C.mono,marginBottom:14}}>Be specific — it makes a yes much easier.</div>
          <Input value={msg} onChange={setMsg} placeholder="e.g. I could lend you my pasta machine in return…" multiline rows={4}/>
          <div style={{marginTop:12}}><Btn full onClick={()=>setSent(true)} disabled={!msg.trim()}>SEND REQUEST →</Btn></div>
        </div>
      ) : (
        <div style={{background:C.coal,borderRadius:14,padding:28,textAlign:"center",borderLeft:`4px solid ${C.success}`,animation:"slideUp 0.3s ease"}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:C.success,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,margin:"0 auto 16px"}}>✓</div>
          <div style={{color:C.success,fontSize:16,fontFamily:C.mono,fontWeight:"bold",marginBottom:6}}>Request sent.</div>
          <div style={{color:C.chalkD,fontSize:12,lineHeight:1.8,fontFamily:C.mono}}>{listing.user} will get back to you.<br/><span style={{color:C.flame,fontSize:11,fontStyle:"italic"}}>What goes around, comes around.</span></div>
        </div>
      )}
    </div>
  );
}

function OfferScreen() {
  const [type,setType]=useState("object");
  const [step,setStep]=useState(0);
  const [anim,setAnim]=useState(true);
  const [photoPreview,setPhotoPreview]=useState(null);
  const [form,setForm]=useState({title:"",desc:"",available:"",offer:""});
  const [done,setDone]=useState(false);
  const photoInputRef=useRef();
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));

  const nextStep=()=>{ setAnim(false); setTimeout(()=>{ setStep(s=>s+1); setAnim(true); },180); };
  const prevStep=()=>{ setAnim(false); setTimeout(()=>{ setStep(s=>s-1); setAnim(true); },180); };
  const submit=()=>{ setDone(true); setTimeout(()=>{ setDone(false); setStep(0); setForm({title:"",desc:"",available:"",offer:""}); setPhotoPreview(null); },3500); };
  const handlePhotoSelect=(e)=>{ const f=e.target.files?.[0]; if(f) setPhotoPreview(URL.createObjectURL(f)); };

  const TOTAL_DOTS=5;
  const contentSteps=[
    {title:`What are you ${type==="object"?"lending":"sharing"}?`,sub:"Be specific — the best listings get snapped up fast."},
    {title:"Tell them more.",sub:"A little detail goes a long way."},
    {title:"When is it available?",sub:"The more flexible, the more exchanges you'll make."},
    {title:"What would you like in return?",sub:"Keep it open — the right offer will surprise you."},
  ];
  const fields=["title","desc","available","offer"];
  const placeholders={
    object:["e.g. Vintage Olympus OM-1 film camera, great condition","35mm, fully working, comes with film. Handle with love.","Weekends, or any time with a day's notice","Open to offers — I'm curious what you'd bring"],
    skill:["e.g. Guitar lessons — 10 years experience","Acoustic or electric, all levels welcome. I come to you.","Evenings and weekends","Borrow something of mine, or teach me something back"],
  };

  return (
    <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
      <div style={{fontSize:9,letterSpacing:3,color:C.chalkD,marginBottom:6,fontFamily:C.mono}}>◎ PUT SOMETHING IN THE ROUND</div>
      <div style={{fontSize:24,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.2,marginBottom:18}}>What can you<br/>lend or share?</div>
      <div style={{display:"flex",marginBottom:18,borderRadius:10,overflow:"hidden",border:`1.5px solid ${C.coal2}`}}>
        {["object","skill"].map(t=>(
          <button key={t} onClick={()=>setType(t)} style={{flex:1,background:type===t?C.flame:"transparent",border:"none",color:type===t?C.ember:C.chalkD,padding:"12px",cursor:"pointer",fontSize:11,fontFamily:C.mono,letterSpacing:2,fontWeight:"bold",transition:"all 0.15s"}}>{t.toUpperCase()}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:5,marginBottom:22}}>
        {Array.from({length:TOTAL_DOTS}).map((_,i)=>(
          <div key={i} style={{height:3,flex:1,borderRadius:2,background:i<=step?C.flame:C.coal2,opacity:i===step?1:i<step?0.6:0.3,transition:"all 0.2s"}}/>
        ))}
      </div>
      {!done ? (
        <div style={{opacity:anim?1:0,transform:anim?"translateY(0)":"translateY(8px)",transition:"all 0.18s"}}>
          {step===0 ? (
            <>
              <div style={{fontSize:20,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.25,marginBottom:4}}>Add a photo.</div>
              <div style={{fontSize:11,color:C.chalkD,marginBottom:16,lineHeight:1.6}}>Photos help neighbours know what they're getting.</div>
              <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoSelect} style={{display:"none"}}/>
              {photoPreview ? (
                <div>
                  <img src={photoPreview} onClick={()=>photoInputRef.current?.click()} style={{width:"100%",height:140,objectFit:"cover",borderRadius:10,display:"block",cursor:"pointer"}}/>
                  <button onClick={()=>photoInputRef.current?.click()} style={{fontSize:10,color:C.chalkDD,fontFamily:C.mono,cursor:"pointer",marginTop:8,background:"none",border:"none",display:"block"}}>Change photo</button>
                </div>
              ) : (
                <div onClick={()=>photoInputRef.current?.click()} style={{width:"100%",height:140,borderRadius:10,border:`1.5px dashed ${C.coal2}`,background:C.coal,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",gap:6}}>
                  <span style={{fontSize:28}}>📷</span>
                  <span style={{fontSize:10,color:C.chalkDD,fontFamily:C.mono}}>Tap to upload a photo</span>
                </div>
              )}
              <div style={{marginTop:18}}><Btn full onClick={nextStep}>{photoPreview?"ADD PHOTO →":"SKIP FOR NOW →"}</Btn></div>
            </>
          ) : (
            <>
              <div style={{fontSize:20,fontWeight:"bold",color:C.chalk,fontFamily:C.font,lineHeight:1.25,marginBottom:4}}>{contentSteps[step-1].title}</div>
              <div style={{fontSize:11,color:C.chalkD,marginBottom:16,lineHeight:1.6}}>{contentSteps[step-1].sub}</div>
              <Input value={form[fields[step-1]]} onChange={v=>set(fields[step-1],v)} placeholder={placeholders[type][step-1]} multiline={step===2} rows={step===2?4:1}/>
              {step===4 && form.title && (
                <div style={{background:C.coal,borderRadius:10,padding:14,marginTop:14}}>
                  <div style={{fontSize:9,letterSpacing:2,color:C.chalkD,marginBottom:10,fontFamily:C.mono}}>YOUR LISTING PREVIEW</div>
                  {photoPreview && <img src={photoPreview} style={{width:48,height:48,objectFit:"cover",borderRadius:6,display:"block",marginBottom:10}}/>}
                  {[["Offering",form.title],["Available",form.available||"—"],["In return",form.offer||"—"]].map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.coal2}`}}>
                      <span style={{fontSize:10,color:C.chalkD,fontFamily:C.mono}}>{k}</span>
                      <span style={{fontSize:10,color:C.flame,fontFamily:C.mono,maxWidth:180,textAlign:"right"}}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{display:"flex",gap:10,marginTop:18}}>
                <Btn secondary onClick={prevStep} small>← Back</Btn>
                <Btn full onClick={step<TOTAL_DOTS-1?nextStep:submit} disabled={!form[fields[step-1]].trim()}>
                  {step<TOTAL_DOTS-1?"NEXT →":"PUT IT IN THE ROUND →"}
                </Btn>
              </div>
            </>
          )}
        </div>
      ) : (
        <div style={{background:C.coal,borderRadius:14,padding:28,textAlign:"center",borderLeft:`4px solid ${C.flame}`,animation:"slideUp 0.3s ease"}}>
          <div style={{marginBottom:14}}><Logo size={56}/></div>
          <div style={{color:C.flame,fontSize:16,fontFamily:C.mono,fontWeight:"bold",marginBottom:6}}>It's in the round.</div>
          <div style={{color:C.chalkD,fontSize:12,lineHeight:1.9,fontFamily:C.mono}}>Your neighbours will find it.<br/><span style={{color:C.flame,fontStyle:"italic"}}>What goes around, comes around.</span></div>
        </div>
      )}
      <div style={{borderTop:`1px solid ${C.coal2}`,marginTop:28,paddingTop:14,textAlign:"center"}}>
        <div style={{fontSize:10,color:C.chalkDD,lineHeight:2,fontFamily:C.mono}}>No money. No ads. No algorithm.<br/>Just neighbours.</div>
      </div>
    </div>
  );
}

function ProfileScreen({ onNavigate }) {
  const circles=[
    {l:1,name:"New neighbour",desc:"Just getting started",done:true},
    {l:2,name:"Known face",desc:"Complete 3 exchanges",done:false},
    {l:3,name:"Trusted",desc:"Earn 2 vouches",done:false},
    {l:4,name:"Cornerstone",desc:"10 exchanges · 5 vouches",done:false},
    {l:5,name:"Pillar",desc:"The neighbourhood knows you",done:false},
  ];
  const activity=[
    {icon:"📷",text:"Maya K. listed a vintage film camera",time:"2h ago",type:"new"},
    {icon:"🧘",text:"Aisha B. joined your neighbourhood",time:"3h ago",type:"join"},
    {icon:"🔧",text:"Rafi M. completed an exchange",time:"1d ago",type:"exchange"},
    {icon:"✍️",text:"Sal O. listed copywriting help",time:"2d ago",type:"new"},
  ];
  return (
    <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
      <div style={{fontSize:9,letterSpacing:3,color:C.chalkD,marginBottom:14,fontFamily:C.mono}}>◎ YOUR PROFILE</div>
      <div style={{background:C.coal,borderRadius:14,padding:20,marginBottom:12}}>
        <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:18}}>
          <Av letter="Y" size={56} flame/>
          <div>
            <div style={{fontSize:20,fontWeight:"bold",color:C.chalk,fontFamily:C.font}}>You</div>
            <div style={{fontSize:11,color:C.chalkD,marginBottom:6}}>E8 1DY · 2 mile radius</div>
            <Circles level={1}/>
            <div style={{fontSize:10,color:C.flame,fontFamily:C.mono,marginTop:4}}>Circle 1 · New neighbour</div>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {[["0","Exchanges"],["0","Vouches"],["1","Listings"]].map(([n,l])=>(
            <div key={l} style={{background:C.ember,borderRadius:10,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:"bold",color:C.flame,fontFamily:C.font}}>{n}</div>
              <div style={{fontSize:8,color:C.chalkDD,fontFamily:C.mono,letterSpacing:1}}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:C.coal,borderRadius:14,padding:16,marginBottom:12}}>
        <div style={{fontSize:9,letterSpacing:2,color:C.chalkD,marginBottom:14,fontFamily:C.mono}}>YOUR CIRCLES — HOW TRUST IS BUILT</div>
        {circles.map((c,i)=>(
          <div key={c.l}>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<circles.length-1?`1px solid ${C.coal2}`:"none",opacity:c.done?1:0.4}}>
              <div style={{width:18,height:18,borderRadius:"50%",flexShrink:0,background:c.done?C.flame:"transparent",border:`2px solid ${c.done?C.flame:C.chalkDD}`,boxShadow:c.done?`0 0 10px ${C.flame}66`:"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:C.ember,fontWeight:"bold",fontFamily:C.mono}}>{c.done?"✓":c.l}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:c.done?C.chalk:C.chalkD,fontFamily:C.mono,fontWeight:c.done?"bold":"normal"}}>{c.name}</div>
                <div style={{fontSize:10,color:C.chalkDD}}>{c.desc}</div>
              </div>
              {c.done&&<span style={{fontSize:8,background:C.flame,color:C.ember,padding:"2px 8px",borderRadius:20,fontFamily:C.mono,letterSpacing:1}}>YOU</span>}
            </div>
            {i===0&&(
              <div style={{paddingBottom:10,borderBottom:`1px solid ${C.coal2}`}}>
                <button onClick={()=>onNavigate("browse")} style={{fontSize:11,color:C.flame,fontFamily:C.mono,cursor:"pointer",marginTop:4,display:"inline-block",background:"none",border:"none",padding:0,opacity:1}}>Complete your first exchange →</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{background:C.coal,borderRadius:14,padding:16,marginBottom:12}}>
        <div style={{fontSize:9,letterSpacing:2,color:C.chalkD,marginBottom:14,fontFamily:C.mono}}>NEIGHBOURHOOD ACTIVITY</div>
        {activity.map((a,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<activity.length-1?`1px solid ${C.coal2}`:"none"}}>
            <div style={{fontSize:18,flexShrink:0}}>{a.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:11,color:C.chalk,lineHeight:1.5}}>{a.text}</div>
              <div style={{fontSize:9,color:C.chalkDD,fontFamily:C.mono,marginTop:2}}>{a.time}</div>
            </div>
            <div style={{width:6,height:6,borderRadius:"50%",flexShrink:0,background:a.type==="exchange"?C.success:a.type==="join"?C.sky:C.flame}}/>
          </div>
        ))}
      </div>
      <div style={{background:C.coal,borderRadius:14,padding:16,borderLeft:`3px solid ${C.flame}`,marginBottom:4}}>
        <div style={{fontSize:9,letterSpacing:2,color:C.flame,marginBottom:8,fontFamily:C.mono}}>◎ THE ROUNDABOUT WAY</div>
        <div style={{fontSize:12,color:C.chalk,lineHeight:2,fontFamily:C.mono}}>No money changes hands. Ever.<br/>Your reputation is your currency.<br/>What goes around, comes around.</div>
      </div>
    </div>
  );
}

export default function App() {
  const [onboarded,setOnboarded]=useState(false);
  const [screen,setScreen]=useState("map");
  const [detail,setDetail]=useState(null);

  if (!onboarded) return (
    <div style={{background:C.ember,minHeight:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",fontFamily:C.font}}>
      <style>{`@keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}} *{box-sizing:border-box} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:${C.ember}} ::-webkit-scrollbar-thumb{background:${C.coal2};border-radius:2px} input::placeholder,textarea::placeholder{color:${C.chalkDD}}`}</style>
      <Onboarding onDone={()=>setOnboarded(true)}/>
    </div>
  );

  const go=(s)=>{ setScreen(s); setDetail(null); };

  return (
    <div style={{background:C.ember,minHeight:"100vh",maxWidth:430,margin:"0 auto",display:"flex",flexDirection:"column",fontFamily:C.font}}>
      <style>{`@keyframes slideUp{from{transform:translateY(14px);opacity:0}to{transform:translateY(0);opacity:1}} *{box-sizing:border-box} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:${C.ember}} ::-webkit-scrollbar-thumb{background:${C.coal2};border-radius:2px} input::placeholder,textarea::placeholder{color:${C.chalkDD}}`}</style>
      <header style={{background:C.ember,padding:"11px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:`1px solid ${C.coal2}`,flexShrink:0}}>
        <button onClick={()=>go("map")} style={{background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",alignItems:"center",gap:10}}>
          <Logo size={34}/>
          <span style={{color:C.chalk,fontSize:18,fontWeight:"bold",fontFamily:C.font,letterSpacing:"-0.5px"}}>round<span style={{color:C.flame}}>about.</span></span>
        </button>
        <div style={{fontSize:9,color:C.chalkDD,fontFamily:C.mono,letterSpacing:2}}>E8 · 2MI RADIUS</div>
      </header>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {detail
          ?<DetailScreen listing={detail} onBack={()=>setDetail(null)}/>
          :screen==="map"    ?<MapScreen onDetail={setDetail}/>
          :screen==="browse" ?<BrowseScreen onDetail={setDetail}/>
          :screen==="offer"  ?<OfferScreen/>
          :<ProfileScreen onNavigate={go}/>
        }
      </div>
      {!detail&&(
        <nav style={{background:C.ember,borderTop:`1px solid ${C.coal2}`,display:"flex",flexShrink:0}}>
          {[{s:"map",label:"MAP",icon:"◎"},{s:"browse",label:"BROWSE",icon:"≡"},{s:"offer",label:"SHARE",icon:"↑"},{s:"profile",label:"YOU",icon:"○"}].map(({s,label,icon})=>(
            <button key={s} onClick={()=>go(s)} style={{flex:1,background:screen===s?C.glow:"transparent",border:"none",borderTop:screen===s?`2px solid ${C.flame}`:"2px solid transparent",color:screen===s?C.flame:C.chalkDD,padding:"12px 0 10px",cursor:"pointer",fontSize:9,fontFamily:C.mono,letterSpacing:2,fontWeight:screen===s?"bold":"normal",transition:"all 0.15s",display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontSize:15}}>{icon}</span>{label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}