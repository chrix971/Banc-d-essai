# Activer la synchronisation en ligne (Firebase)

Suis ces étapes une seule fois. Tant que ce n'est pas fait, l'appli fonctionne
normalement **en local** et le bouton « Se connecter » reste masqué.

## 1. Créer le projet
1. Va sur https://console.firebase.google.com/ et connecte-toi avec ton compte Google.
2. Clique **Ajouter un projet**, donne-lui un nom (ex. `banc-essai`), valide.
   Tu peux désactiver Google Analytics, ce n'est pas nécessaire.

## 2. Activer la base de données Firestore
1. Menu de gauche → **Créer** → **Firestore Database** → **Créer une base de données**.
2. Choisis un emplacement (ex. `europe-west`), puis démarre en **mode production**.
3. Onglet **Règles**, colle exactement ceci puis **Publier** :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tests/{testId} {
      allow read, delete: if request.auth != null
                          && resource.data.owner == request.auth.uid;
      allow create, update: if request.auth != null
                            && request.resource.data.owner == request.auth.uid;
    }
  }
}
```

> Ces règles garantissent que chaque personne ne voit et ne modifie que **ses**
> propres tests.

## 3. Activer la connexion Google
1. Menu de gauche → **Authentication** → **Commencer**.
2. Onglet **Sign-in method** → active le fournisseur **Google** → **Enregistrer**.

## 4. Déclarer l'application Web et récupérer les clés
1. ⚙ (en haut à gauche) → **Paramètres du projet**.
2. Section **Tes applications** → icône **Web** `</>`.
3. Donne un surnom (ex. `banc-essai-web`), **enregistre** (inutile d'activer l'hébergement).
4. Firebase affiche un objet `firebaseConfig` avec `apiKey`, `authDomain`, etc.
5. Ouvre le fichier **`firebase-config.js`** et remplace les valeurs d'exemple par les tiennes.

## 5. Autoriser ton domaine
Dans **Authentication → Settings → Domaines autorisés**, ajoute le domaine où le
site est hébergé :
- `localhost` (déjà présent) pour tes tests en local ;
- ton domaine GitHub Pages, par ex. `ton-pseudo.github.io`.

## C'est prêt
Recharge le site : le bouton **« Se connecter »** apparaît en haut à droite.
Connecte-toi avec Google sur chaque appareil → tes tests se synchronisent
automatiquement (dernière version partout).

---

### Bon à savoir
- La clé `apiKey` de Firebase n'est **pas** un secret : elle identifie ton projet,
  la sécurité repose sur les **règles Firestore** de l'étape 2. Elle peut donc
  rester dans le dépôt public sans risque.
- Le stockage local (navigateur) sert de cache : tu peux continuer à travailler
  hors-ligne, la synchro se fait au retour de connexion.
- La sauvegarde `.json` (icône ↓ dans « Mes tests ») reste un filet de sécurité
  utile pour archiver ou migrer, indépendamment du cloud.
