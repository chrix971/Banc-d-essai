/* =========================================================
   MODÈLE DE DONNÉES — catégories → piliers → champs
   Chaque champ : { code, label, hint }
   ========================================================= */
const ICONS = {
  smartphone:'<rect x="7" y="2" width="10" height="20" rx="2.5"/><path d="M11 18h2"/>',
  laptop:'<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
  audio:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="5" height="7" rx="1.5"/><rect x="17" y="14" width="5" height="7" rx="1.5"/>',
  watch:'<rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6 8 2h8l-1 4M9 18l-1 4h8l-1-4"/>',
  tablet:'<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M10 18h4"/>',
  tv:'<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  speaker:'<rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="15" r="3.5"/><circle cx="12" cy="7" r="1"/>',
  other:'<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>'
};

const CATEGORIES = {
  smartphone:{ label:"Smartphone", icon:ICONS.smartphone, pillars:[
    {name:"Design & Ergonomie", fields:[
      {label:"Matériaux & finition", hint:"Verre, métal, plastique ? Qualité d'assemblage, jeux dans les assemblages. <b>Piège : distinguer le ressenti premium du simple effet marketing.</b>"},
      {label:"Poids & équilibre", hint:"Pèse-t-il lourd en main ? Bon centre de gravité ? Comparez à un modèle connu du même segment."},
      {label:"Prise en main à une main", hint:"Atteint-on le haut de l'écran au pouce ? Bords glissants ? Tenue avec/sans coque."},
      {label:"Boutons & tranches", hint:"Course des boutons, position, bouton d'action éventuel. Tiroir SIM, port USB-C."},
      {label:"Résistance & robustesse", hint:"Indice IP (eau/poussière), type de verre, résistance aux rayures. <b>Ne jamais affirmer sans la fiche technique.</b>"},
    ]},
    {name:"Écran", fields:[
      {label:"Technologie & définition", hint:"OLED / LCD, taille en pouces, définition. Piqué à l'usage."},
      {label:"Taux de rafraîchissement", hint:"60/90/120 Hz, adaptatif (LTPO) ? <b>Vérifiez qu'il tient réellement le 120 Hz partout, pas qu'en réglages.</b>"},
      {label:"Luminosité en plein soleil", hint:"Lisible dehors ? Testez en extérieur, pas seulement en intérieur. Notez le pic annoncé vs ressenti."},
      {label:"Colorimétrie & modes", hint:"Couleurs justes ou saturées ? Profils disponibles, température, always-on display."},
      {label:"Tactile & fluidité", hint:"Réactivité, rejet de paume, sensibilité avec doigts humides."},
    ]},
    {name:"Performances", fields:[
      {label:"Puce (SoC) & mémoire", hint:"Processeur, RAM, variante testée. Positionnement (entrée / milieu / haut de gamme)."},
      {label:"Fluidité au quotidien", hint:"Navigation, multitâche, ouverture d'apps. Micro-ralentissements ?"},
      {label:"Jeu & charge lourde", hint:"Testez un jeu exigeant 15-20 min. Framerate stable ? <b>Mesurez sur la durée, pas 2 minutes.</b>"},
      {label:"Chauffe & throttling", hint:"Le dos chauffe-t-il ? Perte de performance après effort prolongé ? Où se situe le point chaud ?"},
      {label:"Stockage & débit", hint:"Capacité, extensible ? Rapidité d'écriture (transferts, install de jeux)."},
    ]},
    {name:"Photo & Vidéo", fields:[
      {label:"Capteur principal — jour", hint:"Piqué, dynamique, colorimétrie en bonne lumière. Traitement trop agressif ?"},
      {label:"Ultra grand-angle", hint:"Distorsion sur les bords, cohérence des couleurs avec le principal."},
      {label:"Zoom / téléobjectif", hint:"Zoom optique vs numérique. À partir de quel niveau ça décroche ?"},
      {label:"Mode nuit", hint:"Bruit, temps de pose, lissage. Testez en très faible lumière ET en éclairage urbain."},
      {label:"Portrait & frontal", hint:"Détourage, bokeh naturel ? Qualité du selfie, mode vidéo frontal."},
      {label:"Vidéo & stabilisation", hint:"Définitions/fps dispo, stabilisation en marchant, gestion des transitions de lumière."},
    ]},
    {name:"Autonomie & Charge", fields:[
      {label:"Endurance (usage réel)", hint:"Tenez une journée type et notez le % restant au coucher. <b>Précisez votre usage (écran, réseau) pour être crédible.</b>"},
      {label:"Écran allumé (SoT)", hint:"Heures d'écran allumé obtenues. Indiquez la luminosité et le réseau utilisés."},
      {label:"Charge filaire", hint:"Puissance, chargeur fourni ? Temps mesuré 0→50 % et 0→100 %."},
      {label:"Charge sans fil / inversée", hint:"Compatible Qi ? Puissance, présence de charge inversée."},
    ]},
    {name:"Logiciel & Écosystème", fields:[
      {label:"OS & version", hint:"Android/iOS, version à la sortie, surcouche du constructeur."},
      {label:"Personnalisation & fluidité logicielle", hint:"Options de thème, cohérence de l'interface, animations."},
      {label:"Suivi des mises à jour", hint:"Nombre d'années d'MAJ Android + de sécurité promises. <b>Argument clé pour la durée de vie.</b>"},
      {label:"Bloatware & publicités", hint:"Applications préinstallées imposées ? Pubs dans le système ?"},
      {label:"Fonctions IA", hint:"Outils d'IA embarqués (photo, texte, traduction). Utiles ou gadgets ? En local ou dans le cloud ?"},
    ]},
    {name:"Audio & Connectivité", fields:[
      {label:"Haut-parleurs", hint:"Stéréo ? Puissance, distorsion à fort volume, présence de basses."},
      {label:"Micros & appels", hint:"Voix claire pour l'interlocuteur ? Réduction du bruit ambiant en appel."},
      {label:"Réseau & 5G", hint:"Tenue du réseau, qualité de réception dans les zones faibles, double SIM/eSIM."},
      {label:"Wi-Fi / Bluetooth / NFC", hint:"Normes supportées, stabilité, paiement sans contact."},
      {label:"Biométrie", hint:"Empreinte (sous écran/latérale) et/ou visage. Rapidité et fiabilité au quotidien."},
    ]},
  ]},

  laptop:{ label:"Ordinateur portable", icon:ICONS.laptop, pillars:[
    {name:"Design & Châssis", fields:[
      {label:"Matériaux & robustesse", hint:"Alu, magnésium, plastique ? Rigidité du capot et du clavier (flex)."},
      {label:"Format & poids", hint:"Poids, épaisseur, transportabilité au quotidien."},
      {label:"Finition & ouverture", hint:"Qualité des charnières, ouverture à une main, points de faiblesse."},
    ]},
    {name:"Écran", fields:[
      {label:"Dalle & définition", hint:"IPS/OLED/Mini-LED, définition, mat ou brillant, taux de rafraîchissement."},
      {label:"Luminosité & couleurs", hint:"Luminosité (nits), couverture colorimétrique (sRGB/DCI-P3), usage extérieur."},
      {label:"Confort visuel", hint:"Reflets, scintillement (PWM), bords/encoches."},
    ]},
    {name:"Clavier & Touchpad", fields:[
      {label:"Frappe", hint:"Course des touches, retour, bruit, disposition. Rétroéclairage."},
      {label:"Touchpad", hint:"Taille, glisse, précision, clic. Présence de pavé tactile haptique."},
    ]},
    {name:"Performances", fields:[
      {label:"Processeur & GPU", hint:"CPU, carte graphique, RAM/SSD de la config testée."},
      {label:"Puissance soutenue", hint:"Performance sur charge longue (rendu, compilation). Gestion thermique."},
      {label:"Nuisances sonores & chauffe", hint:"Ventilateurs audibles ? Zones chaudes (repose-poignets, dessous) ?"},
    ]},
    {name:"Autonomie & Charge", fields:[
      {label:"Autonomie réelle", hint:"Heures obtenues en usage bureautique/vidéo. <b>Précisez luminosité et scénario.</b>"},
      {label:"Charge", hint:"USB-C ou barillet, puissance, temps de charge, charge rapide."},
    ]},
    {name:"Connectique & Webcam", fields:[
      {label:"Ports", hint:"Nombre et type (USB-C/Thunderbolt, HDMI, jack, lecteur SD). Suffisant sans dock ?"},
      {label:"Webcam & micros", hint:"Définition, qualité en visio, obturateur physique, Windows Hello."},
    ]},
    {name:"Logiciel", fields:[
      {label:"Système & logiciels préinstallés", hint:"OS, utilitaires du constructeur utiles ou envahissants, bloatware."},
    ]},
  ]},

  audio:{ label:"Casque / Écouteurs", icon:ICONS.audio, pillars:[
    {name:"Design & Confort", fields:[
      {label:"Confort longue durée", hint:"Points de pression après 1-2 h. Poids, maintien à l'effort (intra)."},
      {label:"Construction & finition", hint:"Matériaux, robustesse de l'arceau/tiges, boîtier de charge (intra)."},
      {label:"Commandes", hint:"Tactiles ou physiques ? Précision, faux contacts."},
    ]},
    {name:"Qualité audio", fields:[
      {label:"Signature sonore", hint:"Basses/médiums/aigus. Neutre ou marqué ? Testez plusieurs styles musicaux."},
      {label:"Scène & détails", hint:"Spatialisation, séparation des instruments, restitution des détails."},
      {label:"Codecs & Hi-Res", hint:"SAC/AAC/aptX/LDAC (LDAC = codec haute résolution Bluetooth). Différence audible ?"},
    ]},
    {name:"Réduction de bruit (ANC)", fields:[
      {label:"Efficacité de l'ANC", hint:"Testez transports, bureau, rue. <b>ANC = suppression active du bruit ; jugez sur les graves et les voix.</b>"},
      {label:"Mode transparence", hint:"Naturel ou artificiel ? Utile pour les annonces/conversations ?"},
      {label:"Confort acoustique", hint:"Sensation de pression, souffle de l'ANC."},
    ]},
    {name:"Micro & Appels", fields:[
      {label:"Qualité en appel", hint:"Voix claire ? Réduction du bruit de fond (vent, café). Faites un vrai appel test."},
    ]},
    {name:"Autonomie & Charge", fields:[
      {label:"Autonomie annoncée vs réelle", hint:"Avec/sans ANC. Recharges via boîtier (intra)."},
      {label:"Charge", hint:"Charge rapide (X h en Y min), sans fil, USB-C."},
    ]},
    {name:"App & Connectivité", fields:[
      {label:"Application & réglages", hint:"Égaliseur, mises à jour, personnalisation des commandes."},
      {label:"Bluetooth & multipoint", hint:"Stabilité, portée, connexion à deux appareils (multipoint), latence en vidéo/jeu."},
    ]},
  ]},

  watch:{ label:"Montre connectée", icon:ICONS.watch, pillars:[
    {name:"Design & Écran", fields:[
      {label:"Boîtier & bracelet", hint:"Matériaux, poids, confort jour et nuit, choix de bracelets."},
      {label:"Écran", hint:"Technologie, luminosité au soleil, always-on, lisibilité."},
    ]},
    {name:"Suivi santé & sport", fields:[
      {label:"Capteurs santé", hint:"Fréquence cardiaque, SpO2, ECG, température. <b>Ne présentez jamais comme dispositif médical.</b>"},
      {label:"Précision GPS & cardio", hint:"Comparez à une ceinture/appli de référence sur une sortie réelle."},
      {label:"Suivi du sommeil", hint:"Détail des phases, cohérence, confort au poignet la nuit."},
    ]},
    {name:"Logiciel & Apps", fields:[
      {label:"OS & fluidité", hint:"Système, réactivité, gestion des notifications."},
      {label:"Écosystème d'apps", hint:"Catalogue, cadrans, dépendance au smartphone/à la marque."},
    ]},
    {name:"Autonomie", fields:[
      {label:"Autonomie réelle", hint:"Jours tenus avec always-on et suivi activé. Temps de charge."},
    ]},
    {name:"Connectivité", fields:[
      {label:"Connexions", hint:"Bluetooth, Wi-Fi, LTE/eSIM, NFC (paiement), appairage."},
    ]},
  ]},

  tablet:{ label:"Tablette", icon:ICONS.tablet, pillars:[
    {name:"Design & Écran", fields:[
      {label:"Format & construction", hint:"Poids, tenue en main, finitions, bordures."},
      {label:"Écran", hint:"Dalle, définition, luminosité, taux de rafraîchissement, qualité pour la vidéo."},
    ]},
    {name:"Performances", fields:[
      {label:"Puissance", hint:"Puce, RAM, fluidité, jeu et création (retouche, dessin)."},
    ]},
    {name:"Autonomie", fields:[
      {label:"Autonomie", hint:"Heures en lecture vidéo, charge."},
    ]},
    {name:"Accessoires", fields:[
      {label:"Stylet & clavier", hint:"Latence du stylet, confort du clavier, prix des accessoires (souvent en option)."},
    ]},
    {name:"Logiciel", fields:[
      {label:"OS & multitâche", hint:"Optimisation grand écran, fenêtrage, suivi des mises à jour, bloatware."},
    ]},
    {name:"Audio & Connectivité", fields:[
      {label:"Son & connexions", hint:"Haut-parleurs, jack, USB-C, Wi-Fi/5G, accessoires magnétiques."},
    ]},
  ]},

  tv:{ label:"Téléviseur", icon:ICONS.tv, pillars:[
    {name:"Image", fields:[
      {label:"Technologie de dalle", hint:"OLED/QLED/LCD, définition, luminosité, gestion des noirs."},
      {label:"HDR & couleurs", hint:"Formats HDR (Dolby Vision, HDR10+), volume colorimétrique, précision."},
      {label:"Reflets & angles", hint:"Traitement antireflet, tenue des couleurs de côté, uniformité."},
    ]},
    {name:"Gaming", fields:[
      {label:"Fonctions jeu", hint:"120 Hz, VRR, ALLM, input lag mesuré, nombre de ports HDMI 2.1."},
    ]},
    {name:"Son", fields:[
      {label:"Audio intégré", hint:"Puissance, dialogues, basses. Besoin d'une barre de son ?"},
    ]},
    {name:"Système & Apps", fields:[
      {label:"Interface & applications", hint:"OS TV, fluidité, catalogue d'apps, pubs, télécommande."},
    ]},
    {name:"Design & Connectique", fields:[
      {label:"Design & ports", hint:"Finesse, pied/fixation, nombre et type de ports, gestion des câbles."},
    ]},
  ]},

  speaker:{ label:"Enceinte connectée", icon:ICONS.speaker, pillars:[
    {name:"Son", fields:[
      {label:"Signature & puissance", hint:"Équilibre, basses, distorsion à fort volume, tenue de la pièce."},
      {label:"Spatialisation", hint:"Restitution stéréo, calibration automatique selon la pièce."},
    ]},
    {name:"Assistant & Micros", fields:[
      {label:"Reconnaissance vocale", hint:"Portée des micros, compréhension dans le bruit, assistant intégré."},
    ]},
    {name:"Connectivité", fields:[
      {label:"Connexions", hint:"Wi-Fi, Bluetooth, AirPlay/Chromecast, entrée ligne, multiroom."},
    ]},
    {name:"Design & App", fields:[
      {label:"Design & application", hint:"Finitions, commandes physiques, égaliseur et réglages dans l'app."},
    ]},
  ]},

  other:{ label:"Autre produit", icon:ICONS.other, pillars:[
    {name:"Design & Ergonomie", fields:[
      {label:"Construction & finition", hint:"Matériaux, qualité perçue, robustesse."},
      {label:"Prise en main", hint:"Facilité d'installation et d'utilisation au quotidien."},
    ]},
    {name:"Fonctionnalités", fields:[
      {label:"Fonctions clés", hint:"Ce que le produit promet : est-ce tenu ? Fonctions marquantes ou manquantes."},
    ]},
    {name:"Performances / Qualité", fields:[
      {label:"Efficacité", hint:"Le produit fait-il bien son travail ? Testez ses cas d'usage principaux et extrêmes."},
    ]},
    {name:"Autonomie / Consommables", fields:[
      {label:"Énergie & consommables", hint:"Autonomie, charge, coût et disponibilité des consommables éventuels."},
    ]},
    {name:"Logiciel / App", fields:[
      {label:"Application & mises à jour", hint:"Ergonomie de l'app compagnon, suivi logiciel, connectivité."},
    ]},
    {name:"Rapport qualité-prix", fields:[
      {label:"Positionnement", hint:"Prix face à la concurrence directe. Justifié ?"},
    ]},
  ]},
};

/* =========================================================
   ÉTAT & PERSISTANCE
   ========================================================= */
const $ = s => document.querySelector(s);
// Stockage à 3 niveaux : window.storage (aperçu) → localStorage (vrai site) → mémoire (secours)
function hasLocal(){ try{ const k="__be_t"; localStorage.setItem(k,"1"); localStorage.removeItem(k); return true; }catch(e){ return false; } }
const store = {
  mem:{},
  mode: (typeof window!=="undefined" && window.storage && typeof window.storage.get==="function") ? "cloud"
      : (hasLocal() ? "local" : "mem"),
  async get(k){
    if(this.mode==="cloud"){ try{const r=await window.storage.get(k);return r?r.value:null;}catch(e){return null;} }
    if(this.mode==="local"){ return localStorage.getItem(k); }
    return this.mem[k]??null;
  },
  async set(k,v){
    if(this.mode==="cloud"){ try{await window.storage.set(k,v);}catch(e){} return; }
    if(this.mode==="local"){ try{localStorage.setItem(k,v);}catch(e){ toast("Stockage plein — exportez une sauvegarde"); } return; }
    this.mem[k]=v;
  },
  async del(k){
    if(this.mode==="cloud"){ try{await window.storage.delete(k);}catch(e){} return; }
    if(this.mode==="local"){ localStorage.removeItem(k); return; }
    delete this.mem[k];
  },
};
const IDX_KEY="be:index";
const ITEM=id=>"be:item:"+id;

let state=null, activeStep=0, saveTimer=null;

function blankState(){
  return { id:"t_"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),
    category:null, marque:"", modele:"", prix:"", config:"", date:new Date().toISOString().slice(0,10),
    testeur:"", fields:{}, ratings:{}, likes:[], dislikes:[], verdict:"", pourqui:"", note:null,
    updated:Date.now() };
}
function pillarsOf(){ return state.category ? CATEGORIES[state.category].pillars : []; }
function fieldKey(p,f){ return "p"+p+"f"+f; }
function fieldCode(cat,p,f){
  const pref=(CATEGORIES[cat]?.label||"GEN").slice(0,3).toUpperCase().replace(/[^A-Z]/g,'X');
  return pref+"-"+String(p+1).padStart(2,'0')+String.fromCharCode(97+f).toUpperCase();
}

/* completion */
function pillarStats(pi){
  const p=pillarsOf()[pi]; let filled=0;
  p.fields.forEach((f,fi)=>{ if((state.fields[fieldKey(pi,fi)]||"").trim()) filled++; });
  return {filled,total:p.fields.length};
}
function totalPct(){
  const ps=pillarsOf(); if(!ps.length) return 0;
  let f=0,t=0; ps.forEach((_,pi)=>{const s=pillarStats(pi);f+=s.filled;t+=s.total;});
  const idFilled = state.marque.trim()&&state.modele.trim()?1:0;
  const synthFilled = (state.likes.length||state.dislikes.length||state.verdict.trim()||state.note!=null)?1:0;
  t+=2; f+=idFilled+synthFilled;
  return t?Math.round(f/t*100):0;
}

/* =========================================================
   RENDU
   ========================================================= */
function stepDefs(){
  // 0 = identité, 1..n = piliers, dernier = synthèse
  const defs=[{type:"ident",label:"Identité produit"}];
  pillarsOf().forEach((p,i)=>defs.push({type:"pillar",label:p.name,pi:i}));
  defs.push({type:"synth",label:"Verdict & synthèse"});
  return defs;
}

function renderNav(){
  const defs=stepDefs(), nav=$("#stepNav"); nav.innerHTML="";
  defs.forEach((d,i)=>{
    let done=false, ratio=0;
    if(d.type==="ident"){ done=!!(state.marque.trim()&&state.modele.trim()); ratio=done?1:0; }
    else if(d.type==="pillar"){ const s=pillarStats(d.pi); ratio=s.total?s.filled/s.total:0; done=ratio===1; }
    else { done=!!(state.verdict.trim()||state.note!=null||state.likes.length||state.dislikes.length); ratio=done?1:0; }
    const b=document.createElement("button");
    b.className="navitem"+(i===activeStep?" active":"")+(done?" done":"");
    b.innerHTML=`<span class="idx mono">${d.type==="ident"?"00":d.type==="synth"?"★":String(d.pi+1).padStart(2,'0')}</span>
      <span class="lab">${d.label}</span>
      <span class="gge"><i style="width:${Math.round(ratio*100)}%"></i></span>
      <svg class="chk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M20 6 9 17l-5-5"/></svg>`;
    b.onclick=()=>{ activeStep=i; render(); window.scrollTo({top:0,behavior:'smooth'}); };
    nav.appendChild(b);
  });
}

function renderProgress(){
  const pct=totalPct();
  $("#progBar").style.width=pct+"%"; $("#progPct").textContent=pct+"%";
  const pr=$("#identProd"), pc=$("#identCat");
  if(state.marque.trim()||state.modele.trim()){
    pr.innerHTML=`${escapeHtml(state.marque)} ${escapeHtml(state.modele)}`.trim();
  } else pr.innerHTML='<span class="ph">Nouveau test</span>';
  pc.textContent=state.category?("· "+CATEGORIES[state.category].label):"";
}

function render(){
  const defs=stepDefs();
  if(activeStep>=defs.length) activeStep=defs.length-1;
  const d=defs[activeStep];
  const main=$("#main"); main.innerHTML="";
  const sec=document.createElement("section"); sec.className="step on";

  if(d.type==="ident") sec.innerHTML=identHTML();
  else if(d.type==="pillar") sec.innerHTML=pillarHTML(d.pi);
  else sec.innerHTML=synthHTML();

  sec.innerHTML+=stepnavHTML(defs.length);
  main.appendChild(sec);
  bindStep(d);
  bindStepnav();
  renderNav(); renderProgress();
}

function identHTML(){
  const cats=Object.entries(CATEGORIES).map(([k,v])=>
    `<button class="catchip${state.category===k?' sel':''}" data-cat="${k}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${v.icon}</svg>
      <span>${v.label}</span></button>`).join("");
  const disabled = !state.category;
  return `<div class="stephead">
      <div class="eyebrow"><span class="n">00 · SETUP</span><span class="rule"></span></div>
      <h1>Identité du produit</h1>
      <p class="sub">Choisissez la catégorie : la checklist des piliers de test se génère automatiquement en dessous. Renseignez ensuite la fiche.</p>
    </div>
    <div class="field"><label class="lbl">Catégorie du produit</label><div class="catgrid">${cats}</div></div>
    <div class="field">
      <div class="idgrid">
        <div class="cell"><label class="lbl">Marque</label><input id="f_marque" placeholder="ex. Sony" value="${escapeAttr(state.marque)}"></div>
        <div class="cell"><label class="lbl">Modèle</label><input id="f_modele" placeholder="ex. WH-1000XM5" value="${escapeAttr(state.modele)}"></div>
        <div class="cell"><label class="lbl">Prix public (€)</label><input id="f_prix" placeholder="ex. 419 €" value="${escapeAttr(state.prix)}"></div>
        <div class="cell"><label class="lbl">Configuration testée</label><input id="f_config" placeholder="ex. 12/256 Go, coloris noir" value="${escapeAttr(state.config)}"></div>
        <div class="cell"><label class="lbl">Date du test</label><input id="f_date" type="date" value="${escapeAttr(state.date)}"></div>
        <div class="cell"><label class="lbl">Testeur</label><input id="f_testeur" placeholder="Votre nom" value="${escapeAttr(state.testeur)}"></div>
      </div>
    </div>
    ${disabled?'<p class="empty">Sélectionnez une catégorie pour débloquer le protocole de test →</p>':''}`;
}

function pillarHTML(pi){
  const p=pillarsOf()[pi], s=pillarStats(pi);
  const fields=p.fields.map((f,fi)=>{
    const key=fieldKey(pi,fi), val=state.fields[key]||"", rate=state.ratings[key]||null;
    const code=fieldCode(state.category,pi,fi);
    const rbtns=[1,2,3,4,5].map(n=>`<button data-rate="${key}" data-n="${n}" class="${rate===n?'sel':''}">${n}</button>`).join("");
    return `<div class="field${val.trim()?' filled':''}">
      <div class="fh">
        <span class="fcode">${code}</span>
        <div class="fmeta"><div class="flab">${f.label}</div><div class="fhint">${f.hint}</div></div>
        <div class="rate" title="Note du critère (1-5)">${rbtns}</div>
      </div>
      <textarea data-field="${key}" placeholder="Vos observations concrètes, chiffres, comparaisons…">${escapeHtml(val)}</textarea>
    </div>`;
  }).join("");
  return `<div class="stephead">
      <div class="eyebrow"><span class="n">${String(pi+1).padStart(2,'0')} · PILIER</span><span class="rule"></span><span class="cnt mono">${s.filled}/${s.total}</span></div>
      <h1>${p.name}</h1>
      <p class="sub">Notez des faits vérifiables : chaque observation nourrira une affirmation prouvée dans l'article.</p>
    </div>${fields}`;
}

function synthHTML(){
  const likes=state.likes.map((t,i)=>chipHTML(t,i,'like')).join("")||'<span class="empty">Aucun point fort ajouté.</span>';
  const dislikes=state.dislikes.map((t,i)=>chipHTML(t,i,'dislike')).join("")||'<span class="empty">Aucun point faible ajouté.</span>';
  const scores=[];for(let n=0;n<=10;n+=0.5){scores.push(`<button data-score="${n}" class="${state.note===n?'sel':''}">${n}</button>`);}
  return `<div class="stephead">
      <div class="eyebrow"><span class="n">★ · SYNTHÈSE</span><span class="rule"></span></div>
      <h1>Verdict & synthèse</h1>
      <p class="sub">Le condensé qui structurera la fiche : « On aime / On aime moins », note globale et recommandation.</p>
    </div>
    <div class="synthgrid">
      <div class="likecard pos"><h4><span class="dot">●</span> On aime</h4>
        <div class="chips" id="likeChips">${likes}</div>
        <div class="addrow"><input id="likeIn" placeholder="Ajouter un point fort…"><button data-add="like">+</button></div>
      </div>
      <div class="likecard neg"><h4><span class="dot">●</span> On aime moins</h4>
        <div class="chips" id="dislikeChips">${dislikes}</div>
        <div class="addrow"><input id="dislikeIn" placeholder="Ajouter un point faible…"><button data-add="dislike">+</button></div>
      </div>
    </div>
    <div class="verdictcard">
      <div class="flab">Note globale</div>
      <div class="scorewrap">
        <div class="scoreval">${state.note!=null?state.note:'—'}<small>/10</small></div>
        <div class="scorebtns">${scores}</div>
      </div>
    </div>
    <div class="verdictcard">
      <div class="flab">Verdict — faut-il l'acheter&nbsp;?</div>
      <textarea id="f_verdict" placeholder="Votre conclusion argumentée : promesse tenue ou non, à qui vous le conseillez et pourquoi.">${escapeHtml(state.verdict)}</textarea>
    </div>
    <div class="verdictcard">
      <div class="flab">Pour quel profil&nbsp;?</div>
      <textarea id="f_pourqui" placeholder="ex. Idéal pour les grands voyageurs cherchant la meilleure réduction de bruit ; à éviter pour les audiophiles nomades sur petit budget.">${escapeHtml(state.pourqui)}</textarea>
    </div>`;
}

function chipHTML(t,i,kind){ return `<span class="chip">${escapeHtml(t)}<button data-remove="${kind}" data-i="${i}"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span>`; }

function stepnavHTML(total){
  const prevHidden=activeStep===0?' hidden':'';
  const last=activeStep===total-1;
  return `<div class="stepnav">
    <button class="prevb${prevHidden}" data-nav="prev"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>Précédent</button>
    ${last
      ? `<button class="btn solid wide" data-nav="export"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>Générer le fichier .md</button>`
      : `<button class="btn solid wide" data-nav="next">Suivant<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button>`}
  </div>`;
}

/* =========================================================
   BINDINGS
   ========================================================= */
function bindStep(d){
  if(d.type==="ident"){
    document.querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{
      const c=b.dataset.cat;
      if(state.category!==c){ state.category=c; }
      touch(); render();
    });
    bindInput("#f_marque","marque"); bindInput("#f_modele","modele");
    bindInput("#f_prix","prix"); bindInput("#f_config","config");
    bindInput("#f_date","date"); bindInput("#f_testeur","testeur");
  }
  else if(d.type==="pillar"){
    document.querySelectorAll("textarea[data-field]").forEach(t=>{
      t.oninput=()=>{ state.fields[t.dataset.field]=t.value; t.closest('.field').classList.toggle('filled',!!t.value.trim()); touch(true); };
    });
    document.querySelectorAll("[data-rate]").forEach(b=>b.onclick=()=>{
      const k=b.dataset.rate,n=+b.dataset.n;
      state.ratings[k]= state.ratings[k]===n?null:n;
      document.querySelectorAll(`[data-rate="${k}"]`).forEach(x=>x.classList.toggle('sel',+x.dataset.n===state.ratings[k]));
      touch();
    });
  }
  else if(d.type==="synth"){
    document.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>addChip(b.dataset.add));
    ["like","dislike"].forEach(kind=>{ const inp=$("#"+kind+"In"); if(inp) inp.onkeydown=e=>{if(e.key==="Enter"){e.preventDefault();addChip(kind);}};});
    document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{
      const arr=b.dataset.remove==="like"?state.likes:state.dislikes; arr.splice(+b.dataset.i,1); touch(); render();
    });
    document.querySelectorAll("[data-score]").forEach(b=>b.onclick=()=>{
      const v=parseFloat(b.dataset.score); state.note = state.note===v?null:v; touch(); render();
    });
    bindInput("#f_verdict","verdict"); bindInput("#f_pourqui","pourqui");
  }
}
function bindInput(sel,key){ const el=$(sel); if(!el) return; el.oninput=()=>{ state[key]=el.value; touch(true);
  if(key==="marque"||key==="modele"||key==="category") renderProgress(); }; }
function addChip(kind){
  const inp=$("#"+kind+"In"); const v=inp.value.trim(); if(!v) return;
  (kind==="like"?state.likes:state.dislikes).push(v); inp.value=""; touch(); render();
  const nx=$("#"+kind+"In"); if(nx) nx.focus();
}
function bindStepnav(){
  document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{
    const a=b.dataset.nav, total=stepDefs().length;
    if(a==="prev"&&activeStep>0){activeStep--;render();window.scrollTo({top:0,behavior:'smooth'});}
    else if(a==="next"&&activeStep<total-1){activeStep++;render();window.scrollTo({top:0,behavior:'smooth'});}
    else if(a==="export"){openExport();}
  });
}

/* =========================================================
   SAUVEGARDE (debounce) + LISTE DES TESTS
   ========================================================= */
function touch(debounced){
  state.updated=Date.now();
  if(debounced){ clearTimeout(saveTimer); saveTimer=setTimeout(persist,500); }
  else persist();
  if(!debounced){ renderNav(); renderProgress(); }
}
async function persist(){
  await store.set(ITEM(state.id), JSON.stringify(state));
  let idx=await loadIndex();
  const title=(state.marque||state.modele)?`${state.marque} ${state.modele}`.trim():"Test sans titre";
  const cat=state.category?CATEGORIES[state.category].label:"—";
  const e={id:state.id,title,cat,updated:state.updated};
  const i=idx.findIndex(x=>x.id===state.id);
  if(i>=0) idx[i]=e; else idx.unshift(e);
  idx.sort((a,b)=>b.updated-a.updated);
  await store.set(IDX_KEY, JSON.stringify(idx));
  renderDrafts(idx);
}
async function loadIndex(){ const raw=await store.get(IDX_KEY); try{return raw?JSON.parse(raw):[];}catch(e){return [];} }

function renderDrafts(idx){
  const list=$("#draftList");
  if(!idx.length){ list.innerHTML='<p class="empty" style="padding:2px 10px 6px">Aucun test enregistré.</p>'; return; }
  list.innerHTML=idx.map(e=>`
    <div class="draftrow">
      <button class="draftitem${e.id===state.id?' active':''}" data-open="${e.id}">
        <span class="dt">${escapeHtml(e.title)}</span>
        <span class="dm">${escapeHtml(e.cat)} · ${fmtDate(e.updated)}</span>
      </button>
      <button class="del" data-del="${e.id}" title="Supprimer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button>
    </div>`).join("");
  list.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openTest(b.dataset.open));
  list.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>delTest(b.dataset.del));
}
async function openTest(id){
  if(id===state.id) return;
  const raw=await store.get(ITEM(id));
  if(raw){ try{ state=JSON.parse(raw); activeStep=0; render(); toast("Test chargé"); }catch(e){} }
}
async function delTest(id){
  let idx=await loadIndex();
  const e=idx.find(x=>x.id===id);
  const name=e?e.title:"ce test";
  if(!confirm(`Supprimer « ${name} » ?\nCette action est définitive.`)) return;
  await store.del(ITEM(id));
  idx=idx.filter(x=>x.id!==id);
  await store.set(IDX_KEY, JSON.stringify(idx));
  if(id===state.id){
    if(idx.length){ await openTest(idx[0].id); }
    else { state=blankState(); activeStep=0; render(); }
  }
  renderDrafts(idx); toast("Test supprimé");
}

/* ---- Sauvegarde / restauration de TOUS les tests (fichier .json) ---- */
async function backupAll(){
  const idx=await loadIndex();
  if(!idx.length){ toast("Aucun test à sauvegarder"); return; }
  const tests=[];
  for(const e of idx){
    const raw=await store.get(ITEM(e.id));
    if(raw){ try{ tests.push(JSON.parse(raw)); }catch(err){} }
  }
  const payload={ app:"banc-essai", version:1, exportedAt:new Date().toISOString(), tests };
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob); const a=document.createElement("a");
  const stamp=new Date().toISOString().slice(0,10);
  a.href=url; a.download=`banc-essai-sauvegarde-${stamp}.json`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  toast(`Sauvegarde de ${tests.length} test${tests.length>1?'s':''} téléchargée`);
}

function triggerRestore(){ $("#restoreFile").value=""; $("#restoreFile").click(); }

async function restoreFrom(file){
  if(!file) return;
  let data;
  try{ data=JSON.parse(await file.text()); }
  catch(e){ toast("Fichier illisible — JSON invalide"); return; }
  const tests = Array.isArray(data) ? data : (data && Array.isArray(data.tests) ? data.tests : null);
  if(!tests){ toast("Fichier non reconnu"); return; }
  const valid=tests.filter(t=>t && t.id);
  if(!valid.length){ toast("Aucun test valide dans le fichier"); return; }

  let idx=await loadIndex();
  const known=new Set(idx.map(e=>e.id));
  const overlap=valid.filter(t=>known.has(t.id)).length;
  let msg=`Restaurer ${valid.length} test${valid.length>1?'s':''} depuis ce fichier ?`;
  if(overlap) msg+=`\n${overlap} test${overlap>1?'s':''} déjà présent${overlap>1?'s':''} ser${overlap>1?'ont':'a'} écrasé${overlap>1?'s':''} par la version du fichier.`;
  if(!confirm(msg)) return;

  for(const t of valid){
    await store.set(ITEM(t.id), JSON.stringify(t));
    const title=(t.marque||t.modele)?`${t.marque||""} ${t.modele||""}`.trim():"Test sans titre";
    const cat=t.category&&CATEGORIES[t.category]?CATEGORIES[t.category].label:"—";
    const e={id:t.id,title,cat,updated:t.updated||Date.now()};
    const i=idx.findIndex(x=>x.id===t.id);
    if(i>=0) idx[i]=e; else idx.push(e);
  }
  idx.sort((a,b)=>b.updated-a.updated);
  await store.set(IDX_KEY, JSON.stringify(idx));
  const raw=await store.get(ITEM(idx[0].id));
  if(raw){ try{ state=JSON.parse(raw); activeStep=0; render(); }catch(e){} }
  renderDrafts(idx);
  toast(`${valid.length} test${valid.length>1?'s':''} restauré${valid.length>1?'s':''}`);
}

/* =========================================================
   EXPORT MARKDOWN
   ========================================================= */
function buildMarkdown(){
  const L=[]; const S=state;
  const prod=`${S.marque} ${S.modele}`.trim()||"Produit non nommé";
  const cat=S.category?CATEGORIES[S.category].label:"Non défini";
  L.push(`# Notes de test — ${prod}`);
  L.push("");
  L.push("> Notes brutes issues du protocole de test. À transmettre à la rédaction pour la mise en forme de l'article (titre, chapeau, corps, verdict).");
  L.push("");
  L.push("## Fiche produit");
  L.push(`- **Catégorie** : ${cat}`);
  L.push(`- **Marque** : ${S.marque||"—"}`);
  L.push(`- **Modèle** : ${S.modele||"—"}`);
  if(S.config) L.push(`- **Configuration testée** : ${S.config}`);
  L.push(`- **Prix public** : ${S.prix||"—"}`);
  L.push(`- **Date du test** : ${S.date||"—"}`);
  L.push(`- **Testeur** : ${S.testeur||"—"}`);
  if(S.note!=null) L.push(`- **Note globale** : ${S.note}/10`);
  L.push("");

  if(S.likes.length||S.dislikes.length){
    L.push("## Synthèse rapide");
    if(S.likes.length){ L.push("**On aime**"); S.likes.forEach(t=>L.push(`- ${t}`)); L.push(""); }
    if(S.dislikes.length){ L.push("**On aime moins**"); S.dislikes.forEach(t=>L.push(`- ${t}`)); L.push(""); }
  }

  L.push("## Observations par pilier");
  L.push("");
  pillarsOf().forEach((p,pi)=>{
    const s=pillarStats(pi);
    L.push(`### ${pi+1}. ${p.name}  _(${s.filled}/${s.total} renseignés)_`);
    let any=false;
    p.fields.forEach((f,fi)=>{
      const key=fieldKey(pi,fi), v=(S.fields[key]||"").trim(), r=S.ratings[key];
      if(v||r){
        any=true;
        const note=r?`  \`${r}/5\``:"";
        L.push(`- **${f.label}**${note} : ${v||"_(noté sans commentaire)_"}`);
      }
    });
    if(!any) L.push("- _Aucune observation renseignée._");
    L.push("");
  });

  if(S.verdict.trim()||S.pourqui.trim()){
    L.push("## Verdict provisoire");
    if(S.verdict.trim()) L.push(S.verdict.trim());
    if(S.pourqui.trim()){ L.push(""); L.push(`**Pour qui ?** ${S.pourqui.trim()}`); }
    L.push("");
  }

  L.push("---");
  L.push("### Consignes pour la rédaction");
  L.push("Rédige un article de test au format : **titre accrocheur**, **chapeau** (2-3 phrases avec verdict rapide), fiche **On aime / On aime moins**, **corps** découpé par pilier avec sous-titres évocateurs, puis **verdict « Faut-il l'acheter et pour qui ? »**. Ton factuel, phrases courtes, voix active. Chaque affirmation doit s'appuyer sur une observation ci-dessus ; ne rien inventer, et signaler tout point manquant plutôt que de le combler.");
  L.push("");
  return L.join("\n");
}

function openExport(){
  if(!state.category){ toast("Choisissez d'abord une catégorie"); activeStep=0; render(); return; }
  const md=buildMarkdown();
  $("#mdOut").value=md;
  $("#modal").classList.add("on");
}
function closeExport(){ $("#modal").classList.remove("on"); }

function download(){
  const md=$("#mdOut").value;
  const slug=(`${state.marque}-${state.modele}`.trim()||"test").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")||"test";
  const blob=new Blob([md],{type:"text/markdown;charset=utf-8"});
  const url=URL.createObjectURL(blob); const a=document.createElement("a");
  a.href=url; a.download=`test-${slug}.md`; document.body.appendChild(a); a.click();
  a.remove(); URL.revokeObjectURL(url); toast("Fichier .md téléchargé");
}
async function copyMd(){
  const md=$("#mdOut").value;
  try{ await navigator.clipboard.writeText(md); toast("Markdown copié"); }
  catch(e){ const t=$("#mdOut"); t.removeAttribute("readonly"); t.select(); document.execCommand("copy"); t.setAttribute("readonly","true"); toast("Markdown copié"); }
}

/* =========================================================
   UTILITAIRES
   ========================================================= */
function escapeHtml(s){return (s||"").replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));}
function escapeAttr(s){return (s||"").replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function fmtDate(ts){ const d=new Date(ts); return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'short'})+" "+d.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}); }
let toastTimer;
function toast(msg){ $("#toastMsg").textContent=msg; const t=$("#toast"); t.classList.add("on"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("on"),2200); }

/* =========================================================
   INIT
   ========================================================= */
$("#exportBtn").onclick=openExport;
$("#modalX").onclick=closeExport;
$("#modal").onclick=e=>{ if(e.target===$("#modal")) closeExport(); };
$("#dlBtn").onclick=download;
$("#copyBtn").onclick=copyMd;
$("#newBtn").onclick=()=>{ state=blankState(); activeStep=0; render(); persist(); toast("Nouveau test créé"); };
$("#backupBtn").onclick=backupAll;
$("#restoreBtn").onclick=triggerRestore;
$("#restoreFile").onchange=e=>{ const f=e.target.files&&e.target.files[0]; if(f) restoreFrom(f); };
$("#resetBtn").onclick=()=>{
  if(confirm("Réinitialiser ce test ? Les observations non exportées seront perdues.")){
    const id=state.id; state=blankState(); state.id=id; activeStep=0; render(); persist(); toast("Test réinitialisé");
  }
};
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeExport(); });

(async function init(){
  const idx=await loadIndex();
  if(idx.length){ const raw=await store.get(ITEM(idx[0].id)); if(raw){ try{state=JSON.parse(raw);}catch(e){state=blankState();} } else state=blankState(); }
  else state=blankState();
  render(); renderDrafts(idx.length?idx:[]);
  if(store.mode==="mem") toast("Sauvegarde auto indisponible — pensez à exporter une sauvegarde");
})();
