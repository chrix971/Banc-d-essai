/* =============================================================
   cloud.js — Couche de synchronisation en ligne (Firebase)
   -------------------------------------------------------------
   Expose un objet global window.Cloud utilisé par app.js.
   Si Firebase n'est pas configuré (clés d'exemple) ou si le SDK
   n'a pas chargé, Cloud.enabled reste false et l'appli tourne
   en local uniquement — aucune erreur.

   Modèle de données Firestore :
     collection "tests" / document {id du test}
       { owner: <uid>, updated: <ms>, data: <état complet du test> }
   ============================================================= */
(function () {
  const Cloud = { enabled: false, user: null, onAuth: function () {} };
  window.Cloud = Cloud;

  const cfg = window.FIREBASE_CONFIG;
  const looksConfigured =
    cfg && typeof cfg.apiKey === "string" &&
    cfg.apiKey && !/REMPLACER|VOTRE_|xxxx|exemple/i.test(cfg.apiKey) &&
    cfg.projectId && !/ton-projet/i.test(cfg.projectId);

  if (!looksConfigured || typeof firebase === "undefined") {
    // Non configuré → mode local. app.js masquera le bouton de connexion.
    return;
  }

  let db, auth, authCb = null;
  try {
    firebase.initializeApp(cfg);
    auth = firebase.auth();
    db = firebase.firestore();
    // Cache hors-ligne Firestore (best-effort)
    db.enablePersistence({ synchronizeTabs: true }).catch(function () {});
    Cloud.enabled = true;
  } catch (e) {
    Cloud.enabled = false;
    return;
  }

  // Récupère un éventuel retour de connexion par redirection (mobile)
  auth.getRedirectResult().catch(function () {});

  auth.onAuthStateChanged(function (u) {
    Cloud.user = u || null;
    if (typeof authCb === "function") authCb(Cloud.user);
  });

  Cloud.onAuth = function (fn) { authCb = fn; };

  Cloud.signIn = async function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (e) {
      // Popup bloquée ou mobile → bascule sur la redirection
      try { await auth.signInWithRedirect(provider); } catch (_) {}
    }
  };

  Cloud.signOut = function () { return auth.signOut(); };

  Cloud.saveTest = async function (test) {
    if (!Cloud.user || !test || !test.id) return;
    await db.collection("tests").doc(test.id).set({
      owner: Cloud.user.uid,
      updated: test.updated || Date.now(),
      data: test
    });
  };

  Cloud.deleteTest = async function (id) {
    if (!Cloud.user || !id) return;
    await db.collection("tests").doc(id).delete();
  };

  Cloud.fetchAll = async function () {
    if (!Cloud.user) return [];
    const snap = await db.collection("tests").where("owner", "==", Cloud.user.uid).get();
    const out = [];
    snap.forEach(function (doc) {
      const v = doc.data();
      if (v && v.data) out.push(v.data);
    });
    return out;
  };
})();
