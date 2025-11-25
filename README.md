# Test ISC™ - Indice de Souveraineté Cognitive

Test en ligne pour mesurer le niveau de déchargement techno-cognitif face à l'IA.

Par François-Luc Moraud — Acculturia

---

## 🚀 Déploiement rapide sur Vercel (5 minutes)

### Étape 1 : Créer un compte Formspree (capture des emails)

1. Va sur **https://formspree.io**
2. Crée un compte gratuit (50 soumissions/mois)
3. Clique sur "New Form"
4. Copie l'endpoint (ex: `https://formspree.io/f/xyzabcde`)
5. Ouvre le fichier `src/App.js`
6. Cherche la ligne `const FORMSPREE_ENDPOINT = "https://formspree.io/f/VOTRE_ID_ICI";`
7. Remplace `VOTRE_ID_ICI` par ton ID Formspree

### Étape 2 : Ajouter l'image pour LinkedIn

1. Crée une image 1200x630 pixels pour l'aperçu LinkedIn
2. Nomme-la `og-image.png`
3. Place-la dans le dossier `public/`

(Tu peux utiliser Canva ou autre pour créer cette image avec le logo Acculturia et le texte "Testez votre ISC™")

### Étape 3 : Déployer sur Vercel

**Option A : Via GitHub (recommandé)**

1. Crée un repo GitHub et pousse ce projet
2. Va sur **https://vercel.com**
3. Connecte ton compte GitHub
4. Clique "New Project" → sélectionne ton repo
5. Clique "Deploy"
6. Ton test est en ligne !

**Option B : Via Vercel CLI**

```bash
# Installe Vercel CLI
npm install -g vercel

# Dans le dossier du projet
vercel

# Suis les instructions
```

### Étape 4 : Personnaliser l'URL (optionnel)

Par défaut, Vercel te donne une URL type `test-isc-xxx.vercel.app`.

Tu peux :
- La renommer dans les settings Vercel
- Ajouter un domaine personnalisé (ex: `test.acculturia.com`)

---

## 📱 Partager sur LinkedIn

Une fois déployé, utilise ce modèle de post :

```
L'IA vous rend-elle plus intelligent... ou vous vide-t-elle lentement ?

J'ai créé un test en 3 minutes pour mesurer votre Indice de Souveraineté Cognitive (ISC™).

10 questions. 1 diagnostic. Des pistes concrètes.

→ [TON URL ICI]

Partagez votre score en commentaire 👇

#IA #SouverainetéCognitive #PenséeCritique #Acculturia
```

---

## 📊 Consulter les emails collectés

Dans Formspree :
1. Va dans ton dashboard
2. Tu verras chaque soumission avec : email, score, profil, date

Tu peux aussi configurer des notifications par email.

---

## 🔧 Personnalisations possibles

### Modifier les questions
Édite le tableau `questions` dans `src/App.js`

### Modifier les profils
Édite le tableau `profiles` dans `src/App.js`

### Modifier les produits/services
Édite le tableau `products` dans `src/App.js`

### Changer les couleurs
La couleur principale est `#6366f1` (indigo). Recherche-la dans le fichier pour la modifier.

---

## 📁 Structure du projet

```
test-isc-project/
├── public/
│   ├── index.html      # Page HTML avec meta tags
│   └── og-image.png    # Image pour partage LinkedIn (à ajouter)
├── src/
│   ├── App.js          # Composant principal du test
│   └── index.js        # Point d'entrée React
├── package.json        # Dépendances
└── README.md           # Ce fichier
```

---

## 📧 Support

francoisluc@acculturia.com

---

© 2025 François-Luc Moraud — Acculturia
Test ISC™ — Tous droits réservés
